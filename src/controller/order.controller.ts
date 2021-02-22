import { Request, Response, NextFunction, json } from 'express';
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const pdf = require('html-pdf');
import fs from 'fs';
import { Order } from '../model/entities';
import { OrderRepository } from '../model/repo/order.repo';

let transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'gabriel.zanatto2@gmail.com',
        pass: '****'
    }
}))

function sendMail(to: string, html: string) {
    let mailOptions = {
        from: 'gabriel.zanatto2@gmail.com',
        to,
        subject: 'Pedido na loja online da VipCommerce!',
        html
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

function formatMsg(order: any) {
    let msg = `
        <h1>Pedido no site da VipCommerce: Código ${order[0].PEDIDO}</h1>
        <p>Pagamento: ${order[0].PAGAMENTO}</p>
        <p>Cliente: ${order[0].CLIENTE}</p>
        <p>Data: ${new Date(order[0].DATA).toLocaleString()}</p>
        <p>Observações: ${order[0].OBSERVAÇÔES}</p>
        <h2>Produtos</h2>
    `;
    let total = 0;
    order.forEach((o: any) => {
        total += o.TOTAL;
        msg += `
            <p>${o.PRODUTO}, ${o.QUANTIDADE} un., total desse produto: R$ ${(o.TOTAL).toFixed(2).replace('.',',')}</p>
        `;
    });
    msg += `<h2>Total Geral: R$ ${total.toFixed(2).replace('.',',')}</h2>`;
    return msg;
}

function pdfGenerator(html: string) {

}


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
    static async Order2Email(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { cod } = req.params;
            const order = await OrderRepository.getOrder(cod);
            if (order){
                let to = (order as any)[0].EMAIL
                sendMail(to, formatMsg(order));
                return res.json({ msg: 'Enviando e-mail' });
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async Order2PDF(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { cod } = req.params;
            const order = await OrderRepository.getOrder(cod);
            if (order){
                const options = {
                    type: 'pdf',
                    format: 'A4',
                    orientation: 'portrait'
                }
                pdf.create(formatMsg(order), options).toBuffer((err, buffer) => {
                    if(err) return res.status(500).json(err)
                    res.end(buffer);
                })
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