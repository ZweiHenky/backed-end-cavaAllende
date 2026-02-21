import { getProductsModel, getProductsByCategoryPaginationModel, getProductByIdModel } from '#models/products/getProducts.model.js'
import { ok } from '#utils/returnSucces.js'
import {Request, Response, NextFunction} from 'express'


export const getProducts = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const products = await getProductsModel()
        ok(res, products, 200, "Products retrieved successfully")
    } catch (error) {
        next(error)
    }
}

export const getProductsByCategory = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const { category_id } = req.params
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10
        const offset = (page - 1) * limit

        const { products, total } = await getProductsByCategoryPaginationModel(Number(category_id), limit, offset)

        const totalPages = Math.ceil(Number(total) / limit)

        ok(res, {
            products,
            pagination: {
                total: Number(total),
                totalPages,
                currentPage: page,
                limit
            }
        }, 200, "Products retrieved successfully")
    } catch (error) {
        next(error)
    }
}

export const getProductById = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const { id } = req.params
        const product = await getProductByIdModel(Number(id))

        if (product.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Product not found"
            })
        }

        ok(res, product[0], 200, "Product retrieved successfully")
    } catch (error) {
        next(error)
    }
}


