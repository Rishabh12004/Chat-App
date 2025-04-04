import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    }) 

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true, //prevents XSS attacts cross-site scripting 
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"  //this is for whether website will be http / https in production it's https but since we are in dev then it'll be false .
    });

    return token;

};