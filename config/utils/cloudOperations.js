
const cloudinary = require('cloudinary')

const cloudOperations = {

    uploadImage : (filepath, callback)=>{
        cloudinary.v2.uploader.upload("D:\Images"+filepath,function(err, result){
            if(err){
                console.log(err)
            }else{
                console.log(result)
            }
        })
    }
}

module.exports = cloudOperations