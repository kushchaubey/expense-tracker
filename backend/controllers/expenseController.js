

exports.getAllExpensesByDate= (req,res,next)=>{
      

    try{
        
       return res.status(200).send({message:`its a get all route by date ${req.params.date}`})
         
         
     
    }catch(err){
        console.log(err);
    }

}

exports.AddExpense = (req,res,next)=>{

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