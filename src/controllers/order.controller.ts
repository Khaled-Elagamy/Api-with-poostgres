import { NextFunction, Request, Response } from 'express'
import OrderModel from '../models/order.model'

const orderModel = new OrderModel()

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await orderModel.create(req.body)
    res.json({
      status: 'success',
      data: { ...order },
      message: 'Order Created-Successfully',
    })
  } catch (error) {
    next(error)
  }
}

export const getMany = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await orderModel.getMany()
    res.json({
      status: 'success',
      data: orders,
      message: 'Orders retrieved-Successfully',
    })
  } catch (error) {
    next(error)
  }
}

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await orderModel.getOne(req.params.id as unknown as number)
    if (order == null) {
      return res.status(404).json({
        status: 'failed',
        ERROR: 'User Not-Found (Wrong ID)',
      })
    }
    return res.json({
      status: 'success',
      data: { ...order },
      message: 'Order retrieved-Successfully',
    })
  } catch (error) {
    next(error)
  }
}

export const updateOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await orderModel.updateOne(
      req.body,
      req.params.id as unknown as number
    )
    if (order == null) {
      return res.status(404).json({
        status: 'failed',
        ERROR: 'User Not-Found (Wrong ID)',
      })
    }
    return res.json({
      status: 'success',
      data: { ...order },
      message: 'Order Updated-Successfully',
    })
  } catch (error) {
    next(error)
  }
}

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await orderModel.deleteOne(req.params.id as unknown as number)
    if (order == null) {
      return res.status(404).json({
        status: 'failed',
        ERROR: 'User Not-Found (Wrong ID)',
      })
    }
    return res.json({
      status: 'success',
      data: { ...order },
      message: 'Order Deleted-Successfully',
    })
  } catch (error) {
    next(error)
  }
}
