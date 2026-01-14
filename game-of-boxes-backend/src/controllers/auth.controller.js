
import bcrypt from "bcryptjs"
import User from "../models/User.js";
import { sendResponse } from "../utils/response.js";
import Progress from "../models/Progress.js";
import { generateToken } from "../utils/token.js";
import { googleClient } from "../config/google.js";

// Simple Email Login
export const signupEmail = async (req,res) => {
    const {name,email,password} = req.body;

    const exists = await User.findOne({email});

    if(exists){
        if(exists.provider === "email") {
            return sendResponse({
                res,
             status: 409,
                error: "EMAIL_USER_EXISTS",
                message: "Account already exists with email/password. Please login with email.",
            });
        }
    }
    const hashed = await bcrypt.hash(password,10);

    const user = await User.create({
        name,
        email,
        password:hashed,
        provider:"email"
    })

    await Progress.create({userId:user._id});

    sendResponse({
        res,
        data: {token :generateToken(user._id),user},
        message: "Signup Successful"
    })
}

// Email Login

export const loginEmail = async(req,res) => {
    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(!user){
        return sendResponse({
            res,
            status: 404,
            error: "INVALID_CREDENTIALS",
            message: "Invalid credentials",
          });
    }

    if(user.provider !== "email"){
        return sendResponse({
            res,
            status: 400,
            error: "WRONG_PROVIDER",
            message: `Account was created with ${user.provider} login`,
        });
    }

    const match = await bcrypt.compare(password,user.password);

    if(!match){
        return sendResponse({
            res,
            status: 404,
            error: "INVALID_CREDENTIALS",
            message: "Invalid credentials",
          });
    }

    sendResponse({
        res,
        data: {token:generateToken(user._id),user},
        message: "Login Successful",
      });
}

// Google Signup
export const signupGoogle = async (req,res) => {
    const {token } = req.body;

    const ticket = await googleClient.verifyIdToken({
        idToken:token,
        audience: process.env.GOOGLE_CLIENT_ID
    })

    const {name,email} = ticket.getPayload();

    const exists = await User.findOne({email});

    if(exists){
        if(exists.provider === "google") {
            return sendResponse({
                res,
                status: 409,
                error: "GOOGLE_USER_EXISTS",
                message: "Account already exists with Google login. Please use Google login or reset password.",
            });
        }
    }
    const user = await User.create({
        name,
        email,
        provider:"google"
    })

    await Progress.create({userId:user._id});

    sendResponse({
        res,
        data: {token :generateToken(user._id),user},
        message: "Google Signup Successful"
    })
}

// Google Login 
export const loginGoogle = async(req,res) => {
    const {token} = req.body;

    const ticket = await googleClient.verifyIdToken({
        idToken:token,
        audience: process.env.GOOGLE_CLIENT_ID
    })
    const {name,email} = ticket.getPayload();

    const user = await User.findOne({email});

    if (!user ) {
        return sendResponse({
            res,
            status: 404,
            error: "USER_NOT_FOUND",
            message: "Please Signup First",
          });
    }

    if(user.provider !== "google") {
        return sendResponse({
            res,
            status: 400,
            error: "WRONG_PROVIDER",
            message: "Please use email/password login",
        });
    }

    user.lastLogin = new Date();
    await user.save();

    sendResponse({
        res,
        data: {token :generateToken(user._id),user},
        message: "Google Login Successful",
      });
}

// me
export const getMe = async (req, res) => {
    const user = await User.findById(req.userId).select(
      "name email avatar createdAt"
    );
  
    if (!user) {
      return sendResponse({
        res,
        status: 404,
        error: "USER_NOT_FOUND",
        message: "User not found",
      });
    }
  
    sendResponse({
      res,
      data: user,
      message: "User fetched",
    });
  };