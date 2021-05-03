const {putImageToUserList, IsImageAccessable} = require('../src/util/memoryCache');
const assert = require('assert');

describe('new image added to cache', () =>{
    it('should be found from list after insert', ()=> {
        putImageToUserList('user1', 'image1', true);
        assert.strictEqual(IsImageAccessable('user1', 'image1', 'user1'), true);
    });

    it('new image added to existing cache, should be found from list after insert', ()=> {
        putImageToUserList('user1', 'image2' , true);
        assert.strictEqual(IsImageAccessable('user1', 'image2', 'user1'), true);
    });
})

describe('get image belongs to other user', () =>{
    it('you should not get image from other uesr', ()=> {
        assert.strictEqual(IsImageAccessable('user1', 'image2', 'user2'), false);
    });

    it('you should can not get image not exists', ()=> {
        assert.strictEqual(IsImageAccessable('user1', 'image3', 'user1'), false);
    });
})
