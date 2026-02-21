import { Response } from "express";

export const ok = <T>(res:Response,data: T, statusCode: number = 200, message: string = "Success") => {
    return res.status(statusCode).json({
        status: "success",
        data
    })
}