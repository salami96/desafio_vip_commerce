import { Request, Response, NextFunction } from 'express';
import { Product } from '../model/entities';
import { ProductRepository } from '../model/repo/product.repo';

export class ProductController {
    static async getProducts(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const products = await ProductRepository.getProducts();
            if (products){
                return res.json(products);
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async getProduct(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { cod } = req.params;
            const product = await ProductRepository.getProduct(cod);
            if (product){
                return res.json(product);
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async saveProduct(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const product: Product = req.body;
            console.log(product);
            const resp = await ProductRepository.saveProduct(product);
            if (resp){
                return res.json(resp);
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async updateProduct(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const product: Product = req.body;
            const { cod } = req.params;
            const resp = await ProductRepository.updateProduct(cod, product);
            if (resp){
                return res.json(resp);
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { cod } = req.params;
            const resp = await ProductRepository.deleteProduct(cod);
            if (resp){
                return res.json(resp);
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
}