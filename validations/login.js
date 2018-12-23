
const _ = require('../utils/_')

const validate = (obj) => {

    var errors = {}
    var isValid = true;

    var email = _.isEmpty(obj.email) ? '' : obj.email;
    var password = _.isEmpty(obj.password) ? '' : obj.password;

    //check email
    if(_.isEmpty(email)){
        errors.email = 'Email cannot be empty';
        isValid = false
    }
    if(!/^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(email)){
        errors.email = 'Invalid Email'
        isValid = false
    }

    //check password
    if(_.isEmpty(password)){
        errors.password ='Password cannot be empty'
        isValid = false
    }
    if(0 < password.length && password.length < 6){
        errors.password = 'Password must have minimum 6 characters'
        isValid = false
    }

    return {
        errors, 
        isValid
    }
}

module.exports = validate