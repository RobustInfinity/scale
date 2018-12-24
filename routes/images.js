
var express = require('express')
var router = express.Router();
var validate = require('../validations/image')
var cloudOperations = require('../config/utils/cloudOperations')
//@route POST /images/upload-image
//@description Upload Image Route
//@access Private
router.post('/upload-image',function(request, response){
    console.log(request.url)
    console.log(request.userData)
    var body = request.body
    var {errors, isValid} = validate(body)
    if(isValid){
        cloudOperations.uploadImage(body.filepath, function(err, result){
            if(err){
                response.send({'message' : 'Error Occured. Failed to upload'})
            }else{
                if(!result){}
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
    console.log(request.url)
})

module.exports = router