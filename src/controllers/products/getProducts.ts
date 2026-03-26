import { getProductsService } from '#services/products/getProducts.service.js';
import { getProductsByCategoryService } from '#services/products/getProductsByCategory.service.js';
import { getProductByIdService } from '#services/products/getProductById.service.js';
import { searchProductsByNameService } from '#services/products/searchProductsByName.service.js';
import { validateStockService } from '#services/products/validateStock.service.js';

import { GetProductsByCategoryDto } from '#domain/dtos/products/getProductsByCategory.dto.js';
import { GetProductByIdDto } from '#domain/dtos/products/getProductById.dto.js';
import { SearchProductsByNameDto } from '#domain/dtos/products/searchProductsByName.dto.js';
import { ValidateStockDto } from '#domain/dtos/products/validateStock.dto.js';

import { ok } from '#utils/returnSucces.js';
import { Request, Response, NextFunction } from 'express';


export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await getProductsService();
        ok(res, products, 200, "Products retrieved successfully");
    } catch (error) {
        next(error);
    }
};

export const getProductsByCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const [dto, error] = GetProductsByCategoryDto.create(req.query);

        if (error || !dto) {
            return res.status(400).json({
                status: 400,
                message: error?.message || "Invalid parameters"
            });
        }

        const { products, total } = await getProductsByCategoryService(
            dto.category_id, 
            dto.limit, 
            dto.offset, 
            dto.type_id
        );

        const totalPages = Math.ceil(Number(total) / dto.limit);

        ok(res, {
            products,
            pagination: {
                total: Number(total),
                totalPages,
                currentPage: dto.page,
                limit: dto.limit
            }
        }, 200, "Products retrieved successfully");
    } catch (error) {
        next(error);
    }
};

export const getProductById = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const [dto, error] = GetProductByIdDto.create(req.params);

        if (error || !dto) {
            return res.status(400).json({
                status: 400,
                message: error?.message || "Invalid parameters"
            });
        }

        const product = await getProductByIdService(dto.id);

        if (!product || product.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Product not found"
            });
        }

        ok(res, product[0], 200, "Product retrieved successfully");
    } catch (error) {
        next(error);
    }
};

export const searchProductsByName = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const [dto, error] = SearchProductsByNameDto.create(req.query);

        if (error || !dto) {
            return res.status(400).json({
                status: 400,
                message: error?.message || "Invalid parameters"
            });
        }

        const { products, total } = await searchProductsByNameService(
            dto.name,
            dto.limit,
            dto.offset,
            dto.type_id
        );

        const totalPages = Math.ceil(Number(total) / dto.limit);

        ok(res, {
            products,
            pagination: {
                total: Number(total),
                totalPages,
                currentPage: dto.page,
                limit: dto.limit
            }
        }, 200, "Products retrieved successfully");
    } catch (error) {
        next(error);
    }
};

export const validateStock = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const [dto, error] = ValidateStockDto.create(req.body);

        if (error || !dto) {
            return res.status(400).json({ status: 400, message: error?.message || "Invalid parameters" });
        }

        await validateStockService(dto.items);

        ok(res, null, 200, "All products have sufficient stock.");
    } catch (error: any) {
        if (error.status === 400 && error.data) {
            return res.status(400).json({
                status: 400,
                message: error.message,
                data: error.data
            });
        }
        next(error);
    }
};
