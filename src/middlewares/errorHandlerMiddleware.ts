import { NextFunction, Request, Response } from "express";

export default function errorHandler (error: any, req: Request, res: Response, next: NextFunction) {
  console.log(error);
  if (error.code === "Unauthorized") {
    return res.status(401).send(error.message)
  } 
  if (error.code === "notFound") {
    return res.status(404).send(error.message)
  } 
  if(error.code === "Unprocessable_Entity"){
    return res.status(422).send(error.message)
  }
  
  return res.status(500).send(error); // internal server error
}