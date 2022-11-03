"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class OrderedproductModel {
    //create new Orderedproduct
    async addProduct(op, orderId) {
        //Check Product id
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await connection.query(sql, [op.product_id]);
            const products = result.rows[0];
            if (products == null) {
                throw new Error(`Could not add product ${op.product_id} to order ${orderId} because product id is wrong}`);
            }
            connection.release();
        }
        catch (error) {
            throw new Error(`Cant get order${orderId},${error.message}`);
        }
        //Check order status
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await connection.query(sql, [orderId]);
            const order = result.rows[0];
            if (order.status !== 'Active') {
                throw new Error(`Could not add product ${op.product_id} to order ${orderId} because order status is ${order.status}`);
            }
            connection.release();
        }
        catch (error) {
            throw new Error(`Cant get order${orderId},${error.message}`);
        }
        //Check quantity
        if (op.quantity <= 0) {
            throw new Error('Cant add order{Please enter valid quantity}');
        }
        //Adding the product
        try {
            const connection = await database_1.default.connect();
            const sql = `INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3)
      RETURNING id, quantity, order_id, product_id;`;
            const result = await connection.query(sql, [
                op.quantity,
                orderId,
                op.product_id,
            ]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Unable to add product ${op.product_id} to order ${op.order_id}, ${error.message}`);
        }
    }
    async getProducts(orderId) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT * FROM order_products WHERE order_id=$1';
            const result = await connection.query(sql, [orderId]);
            connection.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Could not get products of order ${orderId}, ${error.message}`);
        }
    }
    //delete Orderedproduct
    async deleteProduct(id) {
        try {
            const connection = await database_1.default.connect();
            const sql = `DELETE FROM order_products 
                     WHERE id=($1) RETURNING id,quantity, order_id, product_id`;
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not delete Orderedproduct ${id}, ${error.message}`);
        }
    }
}
exports.default = OrderedproductModel;
