// function hasNumber(password){
//     return /\d/.test(password);
// }

// function password_strength(password){
//     var chars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\?~]/;
//     if (password.length<9){
//         return -1;
//     }
//     else if(password.toUppercase() == password){
//         return -1;
//     }
//     else if(password.toLowerCase() == password ){
//         return -1;
//     }

//     num = hasNumber(password);
//     if(num==false){
//         return-1;
//     }

//     else if(!password.match(chars)){
//         return -1;
//     }

// }

// var salt = bcrypt.genSaltSync();
// let hashed_password = await bcrypt.hashSync(password, salt);
// console.log(hashed_password);

// module.exports = password_strength;
module.exports.passwordValidation = (req,res, next) =>{
    var allowedString = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$`);
    let password = req.body.password;
    console.log(password)   
    if(allowedString.test(password)){
        next()        
    }else{
        res.status(403).json({message : "Unauthorized password input"})
    }
}

