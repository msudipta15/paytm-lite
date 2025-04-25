import express from "express";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

export async function userauth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.token;
  const valid = jwt.verify(token?.toString()!, process.env.jwt_key!) as {id : String}
  if (valid) {
    const id = valid.id;
    req.id = id;
    next();
  } else {
    res.json({ msg: "You are not signed in" });
  }
}
