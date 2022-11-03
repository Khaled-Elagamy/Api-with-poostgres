"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../models/user.model"));
const product_model_1 = __importDefault(require("../../models/product.model"));
const order_model_1 = __importDefault(require("../../models/order.model"));
const order_products_model_1 = __importDefault(require("../../models/order-products.model"));
const database_1 = __importDefault(require("../../database"));
const userModel = new user_model_1.default();
const productModel = new product_model_1.default();
const orderModel = new order_model_1.default();
const ordedproductModel = new order_products_model_1.default();
describe('OrderedProduct Model', () => {
    describe('Test Methods exists', () => {
        it('should have Create order method', () => {
            expect(ordedproductModel.addProduct).toBeDefined();
        });
    });
    it('should have Get many orderedProducts method', () => {
        expect(ordedproductModel.getProducts).toBeDefined();
    });
    it('should have Delete one orderedProduct method', () => {
        expect(orderModel.deleteOne).toBeDefined();
    });
});
describe('Test OrderProduct Model ', () => {
    const testuser = {
        email: 'test1.com',
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
    const testorderedproduct = {
        quantity: 10,
        product_id: 1,
    };
    beforeAll(async () => {
        await userModel.create(testuser);
        await productModel.create(testproduct);
        await orderModel.create(testorder);
    });
    afterAll(async () => {
        const connection = await database_1.default.connect();
        const sql = 'DELETE FROM order_products;\n ALTER SEQUENCE order_products_id_seq RESTART WITH 1;\nDELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;';
        await connection.query(sql);
        connection.release();
    });
    it('Add product method should add product to order', async () => {
        const addedproduct = await ordedproductModel.addProduct(testorderedproduct, 1);
        expect(addedproduct.id).toBe(1);
        expect(addedproduct.quantity).toBe(10);
        expect(Number(addedproduct.order_id)).toBe(1);
        expect(Number(addedproduct.product_id)).toBe(1);
    });
    it('Check Get products method to return All products in certain order in DB', async () => {
        const products = await ordedproductModel.getProducts(1);
        expect(products.length).toBe(1);
    });
    it('Check Delete product method to delete the product from the order ', async () => {
        const deletedproduct = await ordedproductModel.deleteProduct(1);
        expect(deletedproduct.id).toBe(1);
    });
});
