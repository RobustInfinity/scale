const User = require('../UserSchema')
const _ = require('../../utils/_')

const dbOperations = {

    //for user signUp
    createUser : (obj, callback)=>{
        var data = {}
        data['userId'] = _.generateRandomString(6);
        data['name'] = obj.name;
        data['email'] = obj.email;
        data['password'] = obj.password;
        var user = new User({...data})
        User.findOne({
            'email' : obj.email
        }, function(err, result){
            if(err){
                callback(err, null)
            }else{
                if(result){                //user already exist
                    callback(null, null)   
                }else{
                    user.save(function(err1, result1){
                        if(err){
                            callback(err1, null)
                        }else{
                            callback(null, result1)  //saved successfully
                        }
                    })
                }
            }
        })
    },

    //for login, find by email and check password 
    findByCredentials : (email, password, callback)=>{
        User.findOne({
            'email' : email
        },function(err, user){
            if(err){
                callback(err, null)
            }else{
                if(!user){
                    callback(null, null)
                }else{
                    if(user.password === password){
                        callback(null, user)
                    }else{
                        callback(null, {})
                    }
                }
            }
        })
    },

    //find bu userId
    findByUserId : (userId,callback)=>{
        User.findOne({
            'userId' : userId
        },function(err, result){
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