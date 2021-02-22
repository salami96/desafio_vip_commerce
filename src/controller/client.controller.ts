import { Request, Response, NextFunction } from 'express';
import { Client } from '../model/entities';
import { ClientRepository } from '../model/repo/client.repo';

export class ClientController {
    static async getClients(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const clients = await ClientRepository.getClients();
            if (clients){
                return res.json(clients);
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async getClient(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { cod } = req.params;
            const client = await ClientRepository.getClient(cod);
            if (client){
                return res.json(client);
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async saveClient(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const client: Client = req.body;
            console.log(client);
            const resp = await ClientRepository.saveClient(client);
            if (resp){
                return res.json(resp);
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async updateClient(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const client: Client = req.body;
            const { cod } = req.params;
            const resp = await ClientRepository.updateClient(cod, client);
            if (resp){
                return res.json(resp);
            } else {
                return res.json(null);
            }
        } catch (erro) {
            next(erro);
        }
    }
    static async deleteClient(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { cod } = req.params;
            const resp = await ClientRepository.deleteClient(cod);
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