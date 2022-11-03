"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class ProductModel {
    //create new product
    async create(p) {
        //Check price
        if (p.price <= 0) {
            throw new Error('Cant add product{Please enter valid price}');
        }
        //Creating the product
        try {
            const connection = await database_1.default.connect();
            const sql = `INSERT INTO products (product_name, product_descrip, price)
        values ($1, $2, $3) RETURNING id, product_name, product_descrip, price`;
            const result = await connection.query(sql, [
                p.product_name,
                p.product_descrip,
                p.price,
            ]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Unable to create Product ${p.product_name}, ${error.message}`);
        }
    }
    //get all products
    async getMany() {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT id, product_name, product_descrip, price FROM products';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Error at retrieving products ${error.message}`);
        }
    }
    //get specific product
    async getOne(id) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT id, product_name,  product_descrip, price FROM Products WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not find product ${id}, ${error.message}`);
        }
    }
    //update product
    async updateOne(p, id) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'UPDATE products SET product_name=$1, product_descrip=$2, price=$3 WHERE id=$4 RETURNING id,product_name, product_descrip, price';
            const result = await connection.query(sql, [
                p.product_name,
                p.product_descrip,
                p.price,
                id,
            ]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Coulde not update Product: ${p.product_name}, ${error}.message`);
        }
    }
    //delete product
    async deleteOne(id) {
        try {
            const connection = await database_1.default.connect();
            const sql = `DELETE FROM products 
                     WHERE id=($1) RETURNING id, product_name, product_descrip, price`;
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not delete Product ${id}, ${error.message}`);
        }
    }
}
exports.default = ProductModel;
