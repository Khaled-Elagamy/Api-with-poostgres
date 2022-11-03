import { NextFunction, Request, Response } from 'express'
import OrderedproductModel from '../models/order-products.model'
import ProductModel from '../models/product.model'

const orderedproductModel = new OrderedproductModel()
const productModel = new ProductModel()

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const Orderproduct = await orderedproductModel.addProduct(
      req.body,
      req.params.id as unknown as number
    )
    const Product = await productModel.getOne(Orderproduct.product_id)
    //@ts-ignore
    Orderproduct.product = Product
    res.json({
      status: 'success',
      data: Orderproduct,
      message: 'Product added-Successfully',
    })
  } catch (error) {
    next(error)
  }
}

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const Orderproducts = await orderedproductModel.getProducts(
      req.params.id as unknown as number
    )
    const order = Orderproducts.map((obj) => ({
      ...obj,
      OrderProducts: {},
    }))
    for (let i = 0, iLen = Orderproducts.length; i < iLen; i++) {
      const result = await productModel.getOne(Orderproducts[i].product_id)
      //@ts-ignore
      Orderproducts[i].products = result
    }
    res.json({
      status: 'success',
      data: { Orderproducts },
      message: 'Products retrieved-Successfully',
    })
  } catch (error) {
    next(error)
  }
}
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const Orderproduct = await orderedproductModel.deleteProduct(
      req.params.id as unknown as number
    )
    const Product = await productModel.getOne(Orderproduct.product_id)
    //@ts-ignore
    Orderproduct.product = Product
    res.json({
      status: 'success',
      data: Orderproduct,
      message: 'Product Removed-Successfully',
    })
  } catch (error) {
    next(error)
  }
}
