import { Order, OrderProducts, Product } from "../entities";
import { connection } from '../../index'

export class OrderRepository {
    static async getOrders() {
        const sql = `
        SELECT
            Pedidos.cod AS PEDIDO,
            Pedidos.data AS DATA,
            Clientes.nome AS CLIENTE,
            Clientes.email AS EMAIL,
            Pedidos.pgto AS PAGAMENTO,
            Pedidos.obs AS OBSERVAÇÕES,
            CONCAT(Produtos.nome, ' ', Produtos.cor, ', ', Produtos.tamanho) AS PRODUTO,
            (Produtos.valor * Produtos_por_Pedido.quantidade) AS TOTAL,
            Produtos_por_Pedido.quantidade AS QUANTIDADE
        FROM
            Pedidos,
            Produtos_por_Pedido,
            Produtos,
            Clientes
        WHERE
            Produtos_por_Pedido.cod_pedido = Pedidos.cod AND Pedidos.cod_cliente = Clientes.cod && Produtos_por_Pedido.cod_produto = Produtos.cod;
        `;
        const [rows, fields] = await connection.query(sql);
        return rows;
    }
    static async getOrder(cod: string) {
        const sql = `
        SELECT
            Pedidos.cod AS PEDIDO,
            Pedidos.data AS DATA,
            Clientes.nome AS CLIENTE,
            Clientes.email AS EMAIL,
            Pedidos.pgto AS PAGAMENTO,
            Pedidos.obs AS OBSERVAÇÕES,
            CONCAT(Produtos.nome, ' ', Produtos.cor, ', ', Produtos.tamanho) AS PRODUTO,
            Produtos_por_Pedido.quantidade AS QUANTIDADE,
            (Produtos.valor * Produtos_por_Pedido.quantidade) AS TOTAL
        FROM
            Pedidos,
            Produtos_por_Pedido,
            Produtos,
            Clientes
        WHERE
            Produtos_por_Pedido.cod_pedido = Pedidos.cod AND Pedidos.cod_cliente = Clientes.cod && Produtos_por_Pedido.cod_produto = Produtos.cod && Pedidos.cod = ?;
        `;
        const [rows, fields] = await connection.query(sql, cod);
        return rows;
    }
    static async saveOrder(order: Order, products: OrderProducts[]) {
        if (products.length == 0) return null;
        let sql = 'INSERT INTO Pedidos(data, obs, pgto, cod_cliente) VALUES (?, ?, ?, ?);';
        let values = [order.date, order.obs, order.payment, order.cod_client];
        let [rows, fields] = await connection.execute(sql, values);

        if ((rows as any).insertId) {
            sql = 'INSERT INTO Produtos_por_Pedido(cod_pedido, cod_produto, quantidade) VALUES';
            values = [];
            for (let i = 0; i < products.length; i++) {
                sql += ' (?, ?, ?)';
                values.push( (rows as any).insertId, products[i].cod_product, products[i].quantity );
                sql += i == products.length - 1 ? ';' : ','
                console.log(sql, values);
            }
            [rows, fields] = await connection.query(sql, values);
            return rows;
        }
    }
    static async updateOrder(cod: string, order: Order) {
        const sql = 'UPDATE Pedidos SET data = ?, obs = ?, pgto = ? WHERE cod = ?';
        const values = [order.date, order.obs, order.payment, cod];
        const [rows, fields] = await connection.query(sql, values);
        return rows;
    }
    static async deleteOrder(cod: string) {
        let sql = 'DELETE FROM Produtos_por_Pedido WHERE cod_pedido = ?;';
        let [rows, fields] = await connection.query(sql, cod);
        sql = 'DELETE FROM Pedidos WHERE cod = ?;';
        [rows, fields] = await connection.query(sql, cod);
        return rows;
    }
}