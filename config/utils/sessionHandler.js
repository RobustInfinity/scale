const {TIMEOUT} = require('../index')
const Session = require('../../db/SessionSchema')
const AUTH_URLS = require('./auth_urls')
const SIMPLE_URLS = require('./simple_urls')

const sessionOpearations = {


    //fill new JWT session 
    fillSession : function(userData, callback){
        var payload = {}
        payload['userId'] = userData.userId
        payload['name'] = userData.name
        payload['email'] = userData.email
        console.log(TIMEOUT)
        var jwtOperations = require('./jwtOperations')
        console.log(TIMEOUT)
        var sessionId = jwtOperations.generateToken(payload, TIMEOUT)  //session expires in 24 hrs from login
        payload['sessionId'] = sessionId 
        Session.create(payload,function(error, result){
            if(error){
                callback(error, null)
            }else{
                if(!result){
                    callback(null, null)
                }else{
                    callback(null, result)
                }
            }
        })
    },


    destroySession : function(userId,callback){
        Session.find({
            'userId' : userId
        }).remove(function(err, result){
            if(err){
                console.log(err)
            }else{
                console.log(result)
                callback(null, 'User successfully logged out.')
            }
        })
    },

    //check session for auth urls
    checkSession : function(request, response, next){

        if(AUTH_URLS.indexOf(request.url) > -1){
            var tokenHeader = request.header('authorization');
            if(tokenHeader !== undefined){
                var tokenArray = tokenHeader.split(" ")
                var token = tokenArray[1]
                
                //find session fromm DB
                Session.findOne({
                    sessionId : token
                },function(err, session){
                    if(err){
                        response.json({'message' : 'Some error occured. Try again Later','success' : false})
                    }else{
                        if(!session){
                            response.send({"message" : 'Session not found. Login in again'})
                        }else{
                            
                            var jwtOperations = require('./jwtOperations')
                            jwtOperations.verifyToken(session.sessionId,function(err, result){
                                if(err){
                                    //if session expired, delete from db
                                    session.remove(function(err, result1){
                                        if(err){
                                            response.json({'message' : 'Some Error Occured !!!'})
                                        }else{
                                            if(!result1){
                                                response.json({'message' : 'Session not Found. Please Login.'})
                                            }else{
                                                response.json({'message' : 'Session Expired. Please Login.'})
                                            }
                                        }
                                    })
                                }else{
                                    if(!result){
                                        response.json({'message' : 'Some Error Occured'})
                                    }else{
                                        request.userData = session
                                        next();
                                    }
                                }
                            })
                        }
                    }
                })
                
            }else{
                response.status(401).send({'message' : 'Unknown User. Please Login'})
            }
        }else{
            if(SIMPLE_URLS.indexOf(request.url) > -1){
                next()
            }else{
                response.status(404).send({'message' : 'Unknown URL','success' : false})
            }
        }
    },

    

}

module.exports = sessionOpearations