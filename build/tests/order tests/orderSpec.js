"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../models/user.model"));
const product_model_1 = __importDefault(require("../../models/product.model"));
const order_model_1 = __importDefault(require("../../models/order.model"));
const database_1 = __importDefault(require("../../database"));
const userModel = new user_model_1.default();
const productModel = new product_model_1.default();
const orderModel = new order_model_1.default();
describe('Order Model', () => {
    describe('Test Methods exists', () => {
        it('should have Create order method', () => {
            expect(orderModel.create).toBeDefined();
        });
        it('should have Update one order method', () => {
            expect(orderModel.updateOne).toBeDefined();
        });
        it('should have Delete one order method', () => {
            expect(orderModel.deleteOne).toBeDefined();
        });
        it('should have Get many orders method', () => {
            expect(orderModel.getMany).toBeDefined();
        });
        it('should have Get one order method', () => {
            expect(orderModel.getOne).toBeDefined();
        });
    });
});
describe('Test Order Model ', () => {
    const testuser = {
        email: 'test@test.com',
        user_name: 'testUser',
        first_name: 'Test',
        last_name: 'User',
        password: 'test@123',
    };
    const testproduct = {
        product_name: 'testproduct',
        product_descrip: 'Product to test',
        price: 100,
    };
    const testorder = {
        user_id: 1,
    };
    beforeAll(async () => {
        await userModel.create(testuser);
        await productModel.create(testproduct);
    });
    afterAll(async () => {
        const connection = await database_1.default.connect();
        const sql = 'DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;';
        await connection.query(sql);
        connection.release();
    });
    it('Create method should return an order after created', async () => {
        const createdorder = await orderModel.create(testorder);
        expect(createdorder.id).toEqual(1);
    });
    it('Check Get many method to return All orders in DB', async () => {
        const orders = await orderModel.getMany();
        expect(orders.length).toBe(1);
    });
    it('Check Get one method to return order from DB', async () => {
        const callorder = await orderModel.getOne(1);
        expect(callorder.id).toBe(1);
        expect(callorder.status).toBe('Active');
    });
    it('Check Update one method to update order', async () => {
        const updatedorder = await orderModel.updateOne({
            ...testorder,
            status: 'Completed',
        }, 1);
        expect(updatedorder.id).toBe(testorder.user_id);
        expect(updatedorder.status).toBe('Completed');
    });
    it('Check Delete one method to delete the product from DB', async () => {
        const deletedorder = await orderModel.deleteOne(1);
        expect(deletedorder.id).toBe(1);
    });
});
