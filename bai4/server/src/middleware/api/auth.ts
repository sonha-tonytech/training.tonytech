require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface CustomRequest extends Request {
  user: Object;
}

const verifyUserToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {                
    const token = req.headers.authorization.split(" ")[1];    
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);      
      req.user = decoded;
      return next();
    } else res.status(401).json(null);
  } catch (error) {
    res.status(401).json(null);
  }
};

export default { verifyUserToken };
