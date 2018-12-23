
const Image = require('../ImageSchema')
const _ = require('../../utils/_')

const dbOperations = {

    createImage : (image, callback)=>{

        var data = {};
        data['imageId'] = _.generateRandomString(8);
        data['public_id'] = image.public_id;
        data['url'] = image.url
        data['enableSharing'] = image.enableSharing
        data['title'] = image.title !== undefined ? image.title : ''
        data['description'] = image.description !== undefined ? image.description : ''
        var image = new Image({...data})
        image.save(function(err, result){
            if(err){
                callback(err, null)
            }else{
                if(!result){
                    callback(null, null)
                }else{
                    callback(null, result)
                }
            }
        })
    }
}

module.exports = dbOperations