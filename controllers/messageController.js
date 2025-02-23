import Message from "../models/messageModel.js";

export const addMsg=async(req,res)=>{
    try {
        console.log("into addMsg controller...");
        // console.log(req.body.user);
        const userId=req.body.user.id;
        const {msg,to}=req.body;

        const sendMsg=await Message.create({
            message:{text:msg},users:[userId,to],sender:userId
        })

        // console.log(sendMsg);
        res.status(200).json({
            success:true,
            message:"message added successfully..."
        })
        

    } catch (error) {
        console.log(error);
        res.status(501).json({
            success:false,
            message:"Failed to add msg.."
        })
    }
}

export const getMsgs=async(req,res)=>{
    try {
        const userId=req.body.user.id;
        const {to}=req.body;
        // console.log(to);

        const getMessages=await Message.find({users:{$all:[userId,to]}}).sort({ updatedAt: 1 });
        
        // console.log("id string compatibility=>",userId,getMessages[0].sender);
        // console.log(getMessages);
        const projectedMessages = getMessages.map((msg) => {
            return {
              senderBoolean: userId===msg.sender.toString(),
              message: msg.message.text,
            };
          });
        
        //   console.log(projectedMessages);

        res.status(200).json({
            success:true,
            message:"messages fetched successfully",
            data:projectedMessages,
        })

    } catch (error) {
        console.log(error);
        res.status(501).json({
            success:false,
            message:"Failed to add msg.."
        })
    }
}