var express = require('express');
var dbOperations = require('../db/crudOperations/user')
var router = express.Router();

/* GET users listing. */
router.post('/signup', function(request, response) {
      var body = request.body;
      var validateSignUp = require('../validations/signup')
      var {errors, isValid} = validateSignUp(body)
      if(isValid){
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

router.post('/login', function(request, response){
      var body = request.body
      var validateLogIn = require('../validations/login')
      var {errors, isValid} = validateLogIn(body)
      if(isValid){
        dbOperations.findByCredentials(body.email, body.password, function(err, result){
          if(err){
            response.status(503).send({ 'error' : err})
          }else{
            if(!result){
              response.status(200).send({'message' : "User doesn't exists"})
            }else if(Object.keys(result).length === 0 && result){
              response.status(200).send({'message' : 'Incorrect Password'})
            }else{
              response.status(200).send({'message' : 'Logged In Successfully','result' : result})
            }
          }
        })
      }else{
        response.status(200).send({'message' : errors})
      }
})

module.exports = router;
