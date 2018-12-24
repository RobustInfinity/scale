
var express = require('express')
var router = express.Router();
var validate = require('../validations/image')
var cloudOperations = require('../config/utils/cloudOperations')
var imageDbOperations = require('../db/crudOperations/image')


//@route POST /images/upload-image
//@description Upload Image Route
//@access Private
router.post('/upload-image',function(request, response){
    console.log(request.url)
    console.log(request.userData)
    var body = request.body
    var {errors, isValid} = validate(body)
    if(isValid){
        var userDbOperations = require('../db/crudOperations/user')
        userDbOperations.findByUserId(body.userId,function(err, user){
            if(err){
                response.send({'message' : 'Error Occured','success' : false,'error' : err})
            }else{
                if(!user){
                    response.send({'message' : 'Invalid User. Upload not allowed','success' : false})
                }else{
                    cloudOperations.uploadImage(body.filepath,function(err1, result1){
                        if(err1){
                            console.log(err1)
                            response.send({'message' : 'Error Occured. Failed to upload','success' : false,'error' : err})
                        }else{
                            if(!result1){
                                response.send({'message' : 'Unable to Upload','success' : false,})
                            }else{
                               var image = {}
                               image["public_id"] = result1.public_id
                               image['url'] = result1.url
                               image["enableSharing"] = body.enableSharing
                               image["title"] = body.title
                               image['description'] = body.description
                               image['user_id'] = user._id
                               imageDbOperations.createImage(image,function(err2, result2){
                                   if(err2){
                                        response.send({'message' : 'Error Occured. Unable to save.', 'success' : false,'error' : err2})
                                   }else{
                                       if(!result2){
                                            response.send({'message' : 'Unable to save. Try again Later','success' : false})
                                       }else{
                                            imageDbOperations.storeImageInUser(user._id,result2._id)
                                            response.send({'message' : 'Uploaded Successfully.','success' : true, 'data' : result2})
                                       }
                                   }
                               })
                            }
                        }
                    })
                }
            }
        })
    }else{
        response.status(200).send({'message' : errors})
    }
})


//@route POST /images/search-image
//@description Search Image Route
//@access Private
router.post('/search-image', function(request, response){
    var body = request.body
    imageDbOperations.searchImage(body.url,function(err, result){
        if(err){
            response.send({'message' : 'Error Occured. Try again later.','success' : false})
        }else{
            if(!result){
                response.send({'message' : 'No such Image found', 'success' : false})
            }else{
                if(!result.enableSharing){
                    response.send({'message' : 'This image is private. Not allowed to share', 'success' : true})
                }else{
                    var data = {}
                    data['url'] = result.url
                    data['title'] = result.title
                    data['description'] = result.description
                    data['uploadedAt'] = result.createdAt
                    data['uploadedBy'] = result.user
                    response.send({'message' : 'Image found Successfully','success' : true, data : data})
                }
            }
        }
    })
})

module.exports = router