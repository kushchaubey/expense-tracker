const {formValidation} = require("../validations/validation");



module.exports.formValidationMiddleWare = (req,res,next)=>{

    const {isValid,errors} = formValidation(req.body);
        
    if(!isValid){
       
        return res.status(400).send({errorcode:400,message:errors});

    }

    next();

}