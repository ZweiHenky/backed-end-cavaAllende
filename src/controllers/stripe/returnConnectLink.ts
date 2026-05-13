import { Request, Response } from "express";

export const returnConnectLink = async (req: Request, res: Response) => {
    try {
        res.redirect("cavaallende://(tabs)/config/accountStripe");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
