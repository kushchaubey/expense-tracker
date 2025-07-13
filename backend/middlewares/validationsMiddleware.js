const {formValidation, validateUSER} = require("../validations/validation");



module.exports.formValidationMiddleWare = (req,res,next)=>{

    const {isValid,errors} = formValidation(req.body);
        
    if(!isValid){
       
        return res.status(400).send({errorcode:400,message:errors});

    }

    next();

}



module.exports.validateUSER = (req,res,next)=>{

    const {isValid,errors} = validateUSER(req.body.userName, req.body.userPassword);
        
    if(!isValid){
       
        return res.status(400).send({errorcode:400,message:errors});

    }

    next();

}