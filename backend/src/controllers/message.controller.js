import User from "../models/user.model.js"
import Message from "../models/message.model.js"

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id; //we can directyl get this user id since this req is protected by protect Route
        const filteredUsers = await User.find({ _id: {$ne: loggedInUserId}}).select("-password"); //moongoose will find all the uesrs except the one user who have currently logged in, we do this since in the left side chat secrtion we want to chat with all the users who have logged in .
    
        res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("Error in getUserForSidebar", error.message);
        res.status(500).json({message: "Internal server error ."});
    }
}

export const getMessages = async (req, res, next) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;   

        const messages = await Message.find({
            $or: [
                {myId: myId, recieverId: userToChatId}, //msg send my me to other user
                {myId: userToChatId, recieverId: myId}  //msg send by other user to me
            ]
        })

        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({message: "Internal Server Error ."});
    }    
}

export const sendMessage = async (req, res, next) => {
    //the msg can be img as well as text

    try {
        const {text, image} = req.body;
        const {id: recieverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploder.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId: senderId,
            recieverId: recieverId,
            text: text,
            image: imageUrl
        });

        await newMessage.save();

        //todo: real time functionality goes here => socket.io

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessages controller: ", error.message);
        res.status(500).json({message: "Internal Server Error ."});
    }
}