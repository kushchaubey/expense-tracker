

const validation = require("../Utils/validation");

exports.getAllExpensesByDate= (req,res,next)=>{
      
    const {isValid, errors} = validation.validateDate(req.params.date)
         if(!isValid){
        return res.status(400).send({errorcode:400,message:errors});

         }

    try{
        
       return res.status(200).send({message:`its a get all route by date ${req.params.date}`})
         
         
     
    }catch(err){
        console.log(err);
    }

}

exports.AddExpense = (req,res,next)=>{

   const {isValid, errors} = validation(req.body)
   if(!isValid){

    return res.status(400).send({errorCode:400,message:errors});
         
        }
    try{
       res.status(200).send({data:req.body})
    }catch(err){
        console.log(err);
    }

}


exports.updateExpense = (req,res,next)=>{

    try{
           res.status(200).send({data:req.body})

    }catch(err){
        console.log(err);
    }

}


exports.deteExpense = (req,res,next)=>{

    try{
           res.status(200).send({data:req.body})

    }catch(err){
        console.log(err);
    }

}