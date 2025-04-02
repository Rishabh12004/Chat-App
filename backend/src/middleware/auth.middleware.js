import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {   //here next is the function which will be called if the token is validated for the user we're tryna change the profile pic 
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({message: "Unauthorised - no token provided"});
        }

        // if cookie found then we'll parse the cookie using cookie parser 
        // so the token is generated based on the userID and we'll have to decode the token and 
        //we'll get the userID from it to change the profile pic .
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({message: "Unauthorised - token is invalid"});
        }

        const user = await User.findById(decoded.userId).select("-password"); //except pass select all x

        if (!user) {
            return res.status(404).json({message: "User not found "});
        }

        //if we have reached till here that means the user is authenticated .

        req.user = user;    //the user we have got by parsing the cookie 
        next(); //this next function in our case is the  update profile till now we've authenticated the user now we can do out task .

    } catch (error) {
        console.log("Error in protectRoute controller", error.message);
        res.status(500).json({message: "Internal Server Error "})
    }
}