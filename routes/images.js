
var express = require('express')
var router = express.Router();

router.post('/upload-image',function(request, response){
    console.log(request.url)
    console.log(request.userData)
})

router.post('/search-image', function(request, response){
    console.log(request.url)
})

module.exports = router