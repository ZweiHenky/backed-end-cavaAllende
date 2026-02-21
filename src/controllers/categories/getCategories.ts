import { getAllCategoriesModel } from "#models/categories/getCategories.model.js"
import { ok } from "#utils/returnSucces.js"
import { Request, Response, NextFunction } from "express"

export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await getAllCategoriesModel()
        ok(res, categories, 200, "Categories retrieved successfully")
    } catch (error) {
        next(error)
    }
}
