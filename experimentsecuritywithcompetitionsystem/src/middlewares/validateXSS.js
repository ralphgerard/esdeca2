module.exports.checkForMalCode = (req,res, next) =>{
    var allowedString = new RegExp(`^[a-zA-Z0-9 ',.]+$`);
    let designTitle = req.body.designTitle;
    let designDescription = req.body.designDescription;
    console.log(designDescription,designTitle)   
    if(allowedString.test(designTitle) && allowedString.test(designDescription)){
        next()        
    }else{
        res.status(403).json({message : "Unauthorized text input"})
    }
}