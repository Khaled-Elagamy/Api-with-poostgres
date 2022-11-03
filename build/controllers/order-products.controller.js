"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.getProducts = exports.addProduct = void 0;
const order_products_model_1 = __importDefault(require("../models/order-products.model"));
const product_model_1 = __importDefault(require("../models/product.model"));
const orderedproductModel = new order_products_model_1.default();
const productModel = new product_model_1.default();
const addProduct = async (req, res, next) => {
    try {
        const Orderproduct = await orderedproductModel.addProduct(req.body, req.params.id);
        const Product = await productModel.getOne(Orderproduct.product_id);
        //@ts-ignore
        Orderproduct.product = Product;
        res.json({
            status: 'success',
            data: Orderproduct,
            message: 'Product added-Successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.addProduct = addProduct;
const getProducts = async (req, res, next) => {
    try {
        const Orderproducts = await orderedproductModel.getProducts(req.params.id);
        const order = Orderproducts.map((obj) => ({
            ...obj,
            OrderProducts: {},
        }));
        for (let i = 0, iLen = Orderproducts.length; i < iLen; i++) {
            const result = await productModel.getOne(Orderproducts[i].product_id);
            //@ts-ignore
            Orderproducts[i].products = result;
        }
        res.json({
            status: 'success',
            data: { Orderproducts },
            message: 'Products retrieved-Successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getProducts = getProducts;
const deleteProduct = async (req, res, next) => {
    try {
        const Orderproduct = await orderedproductModel.deleteProduct(req.params.id);
        const Product = await productModel.getOne(Orderproduct.product_id);
        //@ts-ignore
        Orderproduct.product = Product;
        res.json({
            status: 'success',
            data: Orderproduct,
            message: 'Product Removed-Successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteProduct = deleteProduct;
