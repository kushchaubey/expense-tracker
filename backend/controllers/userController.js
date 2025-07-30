

const userModel = require("../models/UserModel")
const sendResponse = require("../Utils/sendResponse");
const expenesesModel = require("../models/ExpenseModel");
const messages = require("../Utils/Messages")
module.exports.postAddUser = (req, res, next) => {
  const userData = req.body;

  userModel.findOne({ where: { userName: userData.userName } })
    .then(existingUser => {
      if (existingUser){
        return sendResponse(res, 200, messages.statusText.fail, messages.validation.userAlreadyExists, null);
      }

      // No existing user, create one
      return userModel.create(userData);
    })
    .then(result => {
      // If a new user was created, return success
      if (result && !result.statusCode) {
        return sendResponse(res, 201, messages.statusText.success, messages.crud.UserCreated, null);
      }
    })
    .catch(err => {
      console.log(err);
      return sendResponse(res, 500, messages.statusText.fail, messages.server.error, null);
    });
};

module.exports.getUserByID = (req,res,next)=>{

      const userid = req.params.id
     

          userModel.findByPk(userid,
          {
              attributes:['id','userName']
          
          })
      
      .then((result)=>{
        if(result){
           return sendResponse(res,200, messages.statusText.success,  messages.crud.userRetrived ,result)
        }else{
            return sendResponse(res,404, messages.statusText.fail,messages.crud.userNotfound,null)

        }
      }
    )
    .catch((err)=>{
          console.log(err);
      return sendResponse(res, 500, messages.statusText.fail, messages.server.error, null);
    })
    

      
}

module.exports.getUsers = (req,res,next)=>{

    

      userModel.findAll(
          {
              attributes:['id','userName']
          
          }
      )
      .then((result)=>{
        if(result){
           return sendResponse(res,200,messages.statusText.success, messages.crud.userRetrived ,result)
        }else{
            return sendResponse(res,404,messages.statusText.fail, messages.crud.userNotfound,null)

        }
      }
    )
    .catch((err)=>{
          console.log(err);
      return sendResponse(res, 500, messages.statusText.fail, messages.server.error, null);
    })
    

      
}

module.exports.updateUser = (req,res,next)=>{

   const userData = req.body


   userModel.findOne({ where: { userName: userData.userName } })
    .then(existingUser => {
      if (existingUser && existingUser.id != req.params.id) {
        return sendResponse(res, 409, messages.statusText.fail, messages.validation.userAlreadyExists, null);
      }
      // No existing user, create one
      return  userModel.update(
        userData,
        {
            where: {
                id: req.params.id,
         }
        })

    })
      .then((result)=>{
        if(result){
           return sendResponse(res,201, messages.statusText.success, messages.crud.userUpdated,result)
        }else{
            return sendResponse(res,400, messages.statusText.fail,messages.crud.userNotUpdated,null)

        }
      }
    )
    .catch((err)=>{
          console.log(err);
      return sendResponse(res, 500, messages.statusText.fail, messages.server.error, null);
    })
    

      
}



module.exports.deleteUser = (req,res,next)=>{

    const userID = req.params.id

     expenesesModel.findOne({where:{"userId":userID}})
      .then((result)=>{

        if(result){


          return sendResponse(res,400,messages.statusText.fail, messages.crud.userCantDelete)

        }
      return userModel.destroy({
          where: {
            id: userID,
         },})

        })
      .then((result)=>{
        if(result){
           return sendResponse(res,201,messages.statusText.success,messages.crud.userDeleted,result)
        }else{
            return sendResponse(res,400,messages.statusText.fail, messages.crud.userNotDeleted,null)

        }
      }
    )
    .catch((err)=>{
          console.log(err);
      return sendResponse(res, 500, messages.statusText.fail, messages.server.error, null);
    })
    

      
}