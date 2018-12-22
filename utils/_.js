

module.exports = {
    
    //return true for null, undefined, empty string or object
    isEmpty : (value)=> value === undefined || value === null || 
                value.length === 0 || Object.keys(value).length === 0
}