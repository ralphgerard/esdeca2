var validator = require('validator');

var validationFn = {

    validateRegister: function (req, res, next) {
        var name = req.body.fullname;
        var email = req.body.email;
        var password = req.body.password;

        reName = new RegExp ("[A-Za-z]");
        
        rePassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$");
        
        if (rePassword.test(password) && validator.isEmail(email) && reName.test(name)) {

            next();
        } else {
            console.log("kuku");
            res.status(500);
            res.send(`{"Message":"Error!!"}`);
        }
    },

    validateUserid: function (req, res, next) {
        var userid = req.params.userid;
        reUserid = new RegExp(`^[1-9][0-9]*$`);
        

        if (reUserid.test(userid)) {
            next();
        } else {

            res.status(500);
            res.send(`{"Message":"Error!!"}`);
        }

    },

    sanitizeResult:function(result){

        for (i =0; i <result.length;i++){
            var row = result[i];
            console.log(row);
            for (var key in row) {
                val = row[key];
                if(typeof val == "string"){
                    row[key] = validator.blacklist(val, '\<|\>|\'|\"|\&');
                }
            }
        }
    }

}

module.exports = validationFn;