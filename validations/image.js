const _ = require('../utils/_')

const validate = (obj)=>{

    var errors = {}
    var isValid = true
    console.log(obj)
    var filepath = _.isEmpty(obj.filepath) ? '' : obj.filep6ath
    var enableSharing = _.isEmpty(obj.enableSharing) ? '' : obj.enableSharing
    var userId = _.isEmpty(obj.userId) ? '' : obj.userId

    if(_.isEmpty(filepath)){
        errors.image = 'Image Path cannot be empty'
        isValid = false
    }
    //check file format
    if(!/jpeg|jpg|png|/.test(filepath)){
        errors.image = 'Invalid Image !!! Only image with .jpeg, .jpg, .png is allowed'
        isValid = false
    }

    //enableSharing
    if(_.isEmpty(enableSharing)){
        errors.enableSharing = 'Option cannot be left empty'
        isValid = false
    }

    if(typeof enableSharing !== "boolean"){
        errors.enableSharing = 'Option can be either true or false'
        isValid = false
    }

    if(_.isEmpty(userId)){
        errors.userId = 'User Id cannot be empty'
        isValid = false
    }

    return {
        'errors' : errors,
        'isValid' : isValid
    }
}

module.exports = validate