
const Image = require('../ImageSchema')
const _ = require('../../utils/_')

const dbOperations = {

    //create new image document
    createImage : function(image, callback){

        var data = {};
        data['imageId'] = _.generateRandomString(8);
        data['public_id'] = image.public_id;
        data['url'] = image.url
        data['enableSharing'] = image.enableSharing === 'true' ? true : false
        data['title'] = image.title !== undefined ? image.title : ''
        data['description'] = image.description !== undefined ? image.description : ''
        data['user'] = image.user_id
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
    },

    //store image id in user
    storeImageInUser : function(user_id, image_id){
        var User = require('../UserSchema')
        User.updateOne({
            '_id' : user_id
        },{
            '$push' : {
                'images' : image_id
            }
        },function(err, result){
            if(err){
                console.log(err)
            }else{
                console.log(result)
            }
        })
    },

    //for search Image information from db, using image url
    searchImage : function(url, callback){
        Image.findOne({
            'url' : url
        }).populate(
            {
                path : 'user', 
                select : {
                    'userId' : 1, 
                    'name' : 1
                }
            }).exec(function(err, result){
                console.log(err)
                console.log(result)
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