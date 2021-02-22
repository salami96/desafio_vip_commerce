import { Request, Response, NextFunction } from 'express';
import { Order } from '../model/entities';
import { OrderRepository } from '../model/repo/order.repo';

export class OrderController {
    static async getOrders(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const orders = await OrderRepository.getOrders();
            if (orders){
                return res.json(orders);
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async getOrder(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { cod } = req.params;
            const order = await OrderRepository.getOrder(cod);
            if (order){
                return res.json(order);
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async saveOrder(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { order, products } = req.body;
            order.date = new Date(order.date);
            console.log(order);
            const resp = await OrderRepository.saveOrder(order, products);
            if (resp){
                return res.json(resp);
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async updateOrder(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const order: Order = req.body;
            order.date = new Date(order.date);
            const { cod } = req.params;
            const resp = await OrderRepository.updateOrder(cod, order);
            if (resp){
                return res.json(resp);
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async deleteOrder(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { cod } = req.params;
            const resp = await OrderRepository.deleteOrder(cod);
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