import jwt from "jsonwebtoken"

export const protect = (req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) {
        return res.sendStatus(401);
    }

    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.userId = decode.userId;
        next();
    }catch(error){
        res.sendStatus(401);
    }
}