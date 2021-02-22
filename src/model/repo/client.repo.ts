import { Client } from "../entities";
import { connection } from '../../index'

export class ClientRepository {
    static async getClients() {
        const sql = 'SELECT * FROM Clientes;';
        const [rows, fields] = await connection.query(sql);
        return rows;
    }
    static async getClient(cod: string) {
        const sql = 'SELECT * FROM Clientes WHERE cod = ?;';
        const [rows, fields] = await connection.query(sql, cod);
        return rows;
    }
    static async saveClient(client: Client) {
        const sql = 'INSERT INTO Clientes(nome, cpf, sexo, email) VALUES (?, ?, ?, ?);';
        const values = [client.name, client.cpf, client.gender, client.email];
        const [rows, fields] = await connection.query(sql, values);
        return rows;
    }
    static async updateClient(cod: string, client: Client) {
        const sql = 'UPDATE Clientes SET nome = ?, cpf = ?, sexo = ?, email = ? WHERE cod = ?';
        const values = [client.name, client.cpf, client.gender, client.email, cod];
        const [rows, fields] = await connection.query(sql, values);
        return rows;
    }
    static async deleteClient(cod: string) {
        const sql = 'DELETE FROM Clientes WHERE cod = ?;';
        const [rows, fields] = await connection.query(sql, cod);
        return rows;
    }
}