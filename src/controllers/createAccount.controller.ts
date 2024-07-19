import { Request, Response } from "express";

export const createAccount = (
  req: Request,
  res: Response
) => {
  try {
    console.log(req.body);
    res.send("Account created");
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error" });
  }
};
