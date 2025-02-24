import User from "../models/userModel.js";





export const setAvatar=async(req,res)=>{
    try {
        console.log("into set avatarController");
        const userId=req.body.user.id;

        
        const {avatarImage}=req.body;
        console.log(userId,avatarImage);
        const response=await User.findByIdAndUpdate(userId,{avatarImage,isAvatarSet:true},{ new: true });
        console.log(response);

        res.status(200).json({
            success:true,
            data:response,
            message:"updated successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "error in setting avatar",
            data:error,

        });
        
    }

}


export const getAllUsers=async(req,res)=>{
    try {
        // console.log("into getAllUsers");
        const userId=req.body.user.id;
        // const currentUser=req.body.user;

        const contacts=await User.find({_id:{ $ne: userId }}).select(["username","email","_id","avatarImage","isAvatarSet"]);
        const currentUser=await User.findById(userId).select(["username","email","_id","avatarImage","isAvatarSet"]);

        res.status(200).json({
            success:true,
            message:"contacts fetched successfully",
            contacts:contacts,
            currentUser:currentUser,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "error in getting all users",
            data:error,

        });
    }
}

