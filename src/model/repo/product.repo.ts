import { Product } from "../entities";
import { connection } from '../../index'

export class ProductRepository {
    static async getProducts() {
        const sql = 'SELECT * FROM Produtos;';
        const [rows, fields] = await connection.query(sql);
        return rows;
    }
    static async getProduct(cod: string) {
        const sql = 'SELECT * FROM Produtos WHERE cod = ?;';
        const [rows, fields] = await connection.query(sql, cod);
        return rows;
    }
    static async saveProduct(product: Product) {
        const sql = 'INSERT INTO Produtos(nome, cor, tamanho, valor) VALUES (?, ?, ?, ?);';
        const values = [product.name, product.color, product.size, product.value];
        const [rows, fields] = await connection.query(sql, values);
        return rows;
    }
    static async updateProduct(cod: string, product: Product) {
        const sql = 'UPDATE Produtos SET nome = ?, cor = ?, tamanho = ?, valor = ? WHERE cod = ?';
        const values = [product.name, product.color, product.size, product.value, cod];
        const [rows, fields] = await connection.query(sql, values);
        return rows;
    }
    static async deleteProduct(cod: string) {
        const sql = 'DELETE FROM Produtos WHERE cod = ?;';
        const [rows, fields] = await connection.query(sql, cod);
        return rows;
    }
}