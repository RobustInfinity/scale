
const cloudinary = require('cloudinary')
const dbOperations = require('../../db/crudOperations/image')

const cloudOperations = {

    uploadImage : (filepath, callback)=>{
        cloudinary.v2.uploader.upload(filepath,function(err, result){
            if(err){
                console.log('cloud error')
                console.log(err)
                callback(err, null)
            }else{
                console.log(result)
                if(!result){
                    callback(null, null)
                }else{
                    var image = {}
                    image
                }
            }
        })
    }
}

module.exports = cloudOperations