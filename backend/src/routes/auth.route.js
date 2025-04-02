import express from 'express';
import { checkAuth, login, logout, signup, updateProfile} from '../controllers/auth.controller.js';
import {protectRoute} from "../middleware/auth.middleware.js"


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);
//protectRouter - this fn will check if user is logged in or not and will then 
//grant access to update the profile else will not validate the tokens .
//and this function is a part of the middleware .

//yeh endpoint will check if user is authenticated or nah .
router.get("/check", protectRoute, checkAuth);

export default router;