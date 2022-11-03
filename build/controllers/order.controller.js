"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = exports.updateOne = exports.getOne = exports.getMany = exports.create = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
const orderModel = new order_model_1.default();
const create = async (req, res, next) => {
    try {
        const order = await orderModel.create(req.body);
        res.json({
            status: 'success',
            data: { ...order },
            message: 'Order Created-Successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.create = create;
const getMany = async (_, res, next) => {
    try {
        const orders = await orderModel.getMany();
        res.json({
            status: 'success',
            data: orders,
            message: 'Orders retrieved-Successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getMany = getMany;
const getOne = async (req, res, next) => {
    try {
        const order = await orderModel.getOne(req.params.id);
        if (order == null) {
            return res.status(404).json({
                status: 'failed',
                ERROR: 'User Not-Found (Wrong ID)',
            });
        }
        return res.json({
            status: 'success',
            data: { ...order },
            message: 'Order retrieved-Successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getOne = getOne;
const updateOne = async (req, res, next) => {
    try {
        const order = await orderModel.updateOne(req.body, req.params.id);
        if (order == null) {
            return res.status(404).json({
                status: 'failed',
                ERROR: 'User Not-Found (Wrong ID)',
            });
        }
        return res.json({
            status: 'success',
            data: { ...order },
            message: 'Order Updated-Successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateOne = updateOne;
const deleteOne = async (req, res, next) => {
    try {
        const order = await orderModel.deleteOne(req.params.id);
        if (order == null) {
            return res.status(404).json({
                status: 'failed',
                ERROR: 'User Not-Found (Wrong ID)',
            });
        }
        return res.json({
            status: 'success',
            data: { ...order },
            message: 'Order Deleted-Successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteOne = deleteOne;
