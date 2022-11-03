"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = exports.updateOne = exports.getOne = exports.getMany = exports.create = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const productModel = new product_model_1.default();
const create = async (req, res, next) => {
    try {
        const product = await productModel.create(req.body);
        res.json({
            status: 'success',
            data: { ...product },
            message: 'Product Created-Successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.create = create;
const getMany = async (_, res, next) => {
    try {
        const products = await productModel.getMany();
        res.json({
            status: 'success',
            data: products,
            message: 'Products retrieved-Successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getMany = getMany;
const getOne = async (req, res, next) => {
    try {
        const product = await productModel.getOne(req.params.id);
        if (product == null) {
            return res.status(404).json({
                status: 'failed',
                ERROR: 'User Not-Found (Wrong ID)',
            });
        }
        return res.json({
            status: 'success',
            data: product,
            message: 'Product retrieved-Successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getOne = getOne;
const updateOne = async (req, res, next) => {
    try {
        const product = await productModel.updateOne(req.body, req.params.id);
        if (product == null) {
            return res.status(404).json({
                status: 'failed',
                ERROR: 'User Not-Found (Wrong ID)',
            });
        }
        return res.json({
            status: 'success',
            data: product,
            message: 'Product Updated-Successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateOne = updateOne;
const deleteOne = async (req, res, next) => {
    try {
        const product = await productModel.deleteOne(req.params.id);
        if (product == null) {
            return res.status(404).json({
                status: 'failed',
                ERROR: 'User Not-Found (Wrong ID)',
            });
        }
        return res.json({
            status: 'success',
            data: product,
            message: 'Product Deleted-Successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteOne = deleteOne;
