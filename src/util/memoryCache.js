const cache = require('memory-cache');

function putImageToUserList(userId, ImageName, isPrivate){
    let imageList = cache.get(userId);
    const payload = {
        ImageName: ImageName,
        isPrivate: isPrivate
    }

    if(!imageList){
        imageList = [];
    } 

    const index = imageList.findIndex((e) => e.ImageName == ImageName);

    if( index != -1) {
        imageList[index] = payload;
    } else {
        imageList.push(payload);
        cache.put(userId, imageList);
    }
}

function IsImageAccessable(userId, imageName, requestUser){
    let imageList = cache.get(userId);
    let index;

    if(imageList){
        index = imageList.findIndex((e) => e.ImageName == imageName && (!e.isPrivate || (e.isPrivate && userId == requestUser)));

        return (index > -1? true: false);
    } 

    return false;
}

module.exports = {
    putImageToUserList,
    IsImageAccessable,
    cache
}