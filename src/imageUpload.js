const multer = require('multer');
const {putImageToUserList, IsImageAccessable} = require('./util/memoryCache');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'uploads/');
    },

    filename: function(req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

async function uploadRequestProcess(req, res) {
    const verifyError = verifyHeader(req.body);
    if (!verifyError) {
        uploadProcess(req, res);
    } else {
        sendMessage(verifyError, res);
    }
}

function sendMessage(message, res) {
    res.json({
        message: message,
    });
}

function verifyHeader(body) {
    const userName = body.userName;
    if(!userName) {
        return 'Error: you should include your user Name/ID.';
    }
}

const imageFilter = function(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

function uploadProcess(req, res) {
    let upload = multer({ storage: storage, fileFilter: imageFilter }).array('multiple_images');

    upload(req, res, function(err) {
        const fileName = req.file;
        const userName = req.body.userName;
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!fileName) {
            return res.send('Please select an image to upload.');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
        
        putImageToUserList(userName, fileName);
        res.send('Upload finished!');
    });
}

module.exports = {
    uploadRequestProcess
}