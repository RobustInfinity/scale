
const cloudinary = require('cloudinary')
const dbOperations = require('../../db/crudOperations/image')

const cloudOperations = {

    //upload image to cloud storage
    uploadImage : (filepath, callback)=>{
        cloudinary.v2.uploader.upload(filepath,function(err, result){
            if(err){
                callback(err, null)
            }else{
                console.log(result)
                if(!result){
                    callback(null, null)
                }else{
                    callback(null, result)
                }
            }
        })
    }
}

module.exports = cloudOperations