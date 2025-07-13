

const userModel = require("../models/UserModel")
const sendResponse = require("../Utils/sendResponse")

module.exports.postAddUser = (req, res, next) => {
  const userData = req.body;

  userModel.findOne({ where: { userName: userData.userName } })
    .then(existingUser => {
      if (existingUser) {
        return sendResponse(res, 409, "User already exists with this username", null);
      }

      // No existing user, create one
      return userModel.create(userData);
    })
    .then(result => {
      // If a new user was created, return success
      if (result && !result.statusCode) {
        return sendResponse(res, 201, "User created successfully!", null);
      }
    })
    .catch(err => {
      console.log(err);
      return sendResponse(res, 500, "Internal server error", null);
    });
};

module.exports.getUserByID = (req,res,next)=>{

      const userid = req.params.id

      userModel.findByPk(userid,
          {
              attributes:['id','userName']
          
          }
      )
      .then((result)=>{
        if(result){
           return sendResponse(res,200,'user successfully retrieved',result)
        }else{
            return sendResponse(res,400,'user Not found',null)

        }
      }
    )
    .catch((err)=>{
          console.log(err);
          return sendResponse(res,500,'internal server error',null)
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
           return sendResponse(res,200,'all users',result)
        }else{
            return sendResponse(res,400,'users Not found',null)

        }
      }
    )
    .catch((err)=>{
          console.log(err);
          return sendResponse(res,500,'internal server error',null)
    })
    

      
}

module.exports.updateUser = (req,res,next)=>{

   const userData = req.body


   userModel.findOne({ where: { userName: userData.userName } })
    .then(existingUser => {
      if (existingUser && existingUser.id != req.params.id) {
        return sendResponse(res, 409, "User already exists with this username", null);
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
           return sendResponse(res,201,'User Updated',result)
        }else{
            return sendResponse(res,400,'user not updated',null)

        }
      }
    )
    .catch((err)=>{
          console.log(err);
          return sendResponse(res,500,'internal server error',null)
    })
    

      
}



module.exports.deleteUser = (req,res,next)=>{

    const userID = req.params.id

      userModel.destroy({
          where: {
            id: userID,
         },})
  
      .then((result)=>{
        if(result){
           return sendResponse(res,201,'User deleted',result)
        }else{
            return sendResponse(res,400,'user not deleted',null)

        }
      }
    )
    .catch((err)=>{
          console.log(err);
          return sendResponse(res,500,'internal server error',null)
    })
    

      
}