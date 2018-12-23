var express = require('express');
var dbOperations = require('../db/crudOperations/user')
var router = express.Router();

//@route POST /users/signup
//@description SignUp Users Route
//@access Public
router.post('/signup', function(request, response) {
      var body = request.body;
      var validateSignUp = require('../validations/signup')
      var {errors, isValid} = validateSignUp(body)
      if(isValid){
        //creating unique Users
        dbOperations.createUser(body,function(err, result){
          if(err){
            response.status(503).send({'error' : err})
          }else{
            if(!result){
              response.status(200).send({'message' : 'User already exists'})
            }else{
              response.status(200).send({'message' : 'Registered Successfully'})
            }
          }
        })
      }else{
        response.status(200).send({'message' : errors})
      }
});


//@route POST /users/login
//@description Login Users Route
//@access Public
router.post('/login', function(request, response){
      var body = request.body
      var validateLogIn = require('../validations/login')
      var {errors, isValid} = validateLogIn(body)
      if(isValid){

        //verifying using email and password
        dbOperations.findByCredentials(body.email, body.password, function(err, result){
          if(err){
            response.status(503).send({'error' : err})
          }else{
            if(!result){
              response.status(200).send({'message' : "User doesn't exists"})
            }else if(Object.keys(result).length === 0 && result){
              response.status(200).send({'message' : 'Incorrect Password'})
            }else{
             
              //managing session for valid login
              var sessionHandler = require('../config/utils/sessionHandler')
              sessionHandler.fillSession(result,function(err1, session){
                if(err1){
                  response.status(500).send({'error' : err1})
                }else{
                  if(!session){
                    response.status(200).send({'message' : 'Login Error!!!'})
                  }else{
                   var data = {}
                   session = session.toObject();            //converting doc into JSON
                    session._id = undefined;
                    session.__v = undefined;
                    data = {...session}
                    response.status(200).send({'message' : 'Logged In Successfully','success' : true,'userData' : data})
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

//@route POST /users/logout
//@description Logout Users Route
//@access Private
router.post('/logout',function(request, response){
  console.log(request.userData)
  var body = request.body
  if(body.userId !== undefined){
    dbOperations.findByUserId(body.userId,function(err, result){
      if(err){
        response.json({'success' : false, 'error' : err})
      }else{
        if(!result){
          response.status(200).json({'message' : 'User Not found'})
        }else{
          var sessionHandler = require('../config/utils/sessionHandler')
          sessionHandler.destroySession(body.userId, function(err, result){
            if(err){
              response.send(err)
            }else{
              if(!result){
                response.send({'message' : result})
              }else{
                response.status(200).json({'message' : result})
              }
            }
          })
        }
      }
    })
  }else{
    response.status(404).json({'message' : 'N0 user found.'})
  }
})
module.exports = router;
