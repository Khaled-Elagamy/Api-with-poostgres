"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class OrderModel {
    //create new Order
    async create(o) {
        //Check user id
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await connection.query(sql, [o.user_id]);
            const user = result.rows[0];
            if (user == null) {
                throw new Error(`Could not create order ${o.id} {because user id is wrong}`);
            }
            connection.release();
        }
        catch (error) {
            throw new Error(`Cant get user${o.user_id},${error.message}`);
        }
        //Creating the order
        try {
            const connection = await database_1.default.connect();
            const sql = `INSERT INTO orders (user_id,status) values($1,'Active')
      RETURNING id,user_id,status`;
            const result = await connection.query(sql, [o.user_id]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Unable to create Order ${o.id}, ${error.message}`);
        }
    }
    //get all Orders
    async getMany() {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT id, user_id, status FROM orders';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Error at retrieving Orders ${error.message}`);
        }
    }
    //get specific Order
    async getOne(user_id) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'SELECT id, user_id, status FROM orders WHERE user_id=($1)';
            const result = await connection.query(sql, [user_id]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not find Order of user ${user_id}, ${error.message}`);
        }
    }
    //update Order
    async updateOne(o, id) {
        try {
            const connection = await database_1.default.connect();
            const sql = 'UPDATE orders SET user_id=$1, status=$2 WHERE id=$3 RETURNING id,user_id,status';
            const result = await connection.query(sql, [o.user_id, o.status, id]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Coulde not update Order: ${o.id}, ${error}.message`);
        }
    }
    //delete Order
    async deleteOne(id) {
        try {
            const connection = await database_1.default.connect();
            const sql = `DELETE FROM orders 
                     WHERE id=($1) RETURNING id, user_id, status`;
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not delete Order ${id}, ${error.message}`);
        }
    }
}
exports.default = OrderModel;
