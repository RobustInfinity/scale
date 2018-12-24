
const jwt = require('jsonwebtoken')
const {SECRET_KEY} = require('../index')

const jwtOperations = {
    //return new JWT 
    generateToken : (payload, expiresIn)=>{
        console.log(SECRET_KEY)
        return jwt.sign(payload, SECRET_KEY, {"expiresIn" : expiresIn})
    },

    //verify token
    verifyToken : function(token, callback){
        // try{
            console.log(token)
           jwt.verify(token,SECRET_KEY,function(err, result){
               if(err){
                callback(err, null)
               }else{
                callback(null, result)
               }
           })
        // }
        // catch(exp){
        //     callback(exp, null)
        // }
    },

}

module.exports = jwtOperations