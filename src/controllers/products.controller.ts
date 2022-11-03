import { NextFunction, Request, Response } from 'express'
import ProductModel from '../models/product.model'

const productModel = new ProductModel()

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productModel.create(req.body)
    res.json({
      status: 'success',
      data: { ...product },
      message: 'Product Created-Successfully',
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
    const products = await productModel.getMany()
    res.json({
      status: 'success',
      data: products,
      message: 'Products retrieved-Successfully',
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
    const product = await productModel.getOne(
      req.params.id as unknown as number
    )
    if (product == null) {
      return res.status(404).json({
        status: 'failed',
        ERROR: 'User Not-Found (Wrong ID)',
      })
    }
    return res.json({
      status: 'success',
      data: product,
      message: 'Product retrieved-Successfully',
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
    const product = await productModel.updateOne(
      req.body,
      req.params.id as unknown as number
    )
    if (product == null) {
      return res.status(404).json({
        status: 'failed',
        ERROR: 'User Not-Found (Wrong ID)',
      })
    }
    return res.json({
      status: 'success',
      data: product,
      message: 'Product Updated-Successfully',
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
    const product = await productModel.deleteOne(
      req.params.id as unknown as number
    )
    if (product == null) {
      return res.status(404).json({
        status: 'failed',
        ERROR: 'User Not-Found (Wrong ID)',
      })
    }
    return res.json({
      status: 'success',
      data: product,
      message: 'Product Deleted-Successfully',
    })
  } catch (error) {
    next(error)
  }
}
