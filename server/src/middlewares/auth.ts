import { NextFunction, Request, Response } from "express";
import User from "../entities/User";

export default async (req: Request, res: Response, next:NextFunction) => {
  try {
    const user: User | undefined = res.locals.user;
    if (!user) { 
      console.log("Unauthenticated")
      throw new Error("Unauthenticated"); 
    }
    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({error:"Unauthenticated User"})
  }
};