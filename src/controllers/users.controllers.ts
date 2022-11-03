import { NextFunction, Request, Response } from 'express'
import UserModel from '../models/user.model'
import jwt from 'jsonwebtoken'
import config from '../config'

const userModel = new UserModel()

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.create(req.body)
    const token = jwt.sign({ user }, config.tokenSecret as unknown as string)

    res.json({
      status: 'success',
      data: { ...user, token },
      message: 'User Created-Successfully',
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
    const users = await userModel.getMany()
    res.json({
      status: 'success',
      data: users,
      message: 'Users retrieved-Successfully',
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
    const user = await userModel.getOne(req.params.id as unknown as number)
    if (user == null) {
      return res.status(404).json({
        status: 'failed',
        ERROR: 'User Not-Found (Wrong ID)',
      })
    }
    return res.json({
      status: 'success',
      data: user,
      message: 'User retrieved-Successfully',
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
    const user = await userModel.updateOne(
      req.body,
      req.params.id as unknown as number
    )
    if (user == null) {
      return res.status(404).json({
        status: 'failed',
        ERROR: 'User Not-Found (Wrong ID)',
      })
    }
    return res.json({
      status: 'success',
      data: user,
      message: 'User Updated-Successfully',
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
    const user = await userModel.deleteOne(req.params.id as unknown as number)
    if (user == null) {
      return res.status(404).json({
        status: 'failed',
        ERROR: 'User Not-Found (Wrong ID)',
      })
    }
    return res.json({
      status: 'success',
      data: user,
      message: 'User Deleted-Successfully',
    })
  } catch (error) {
    next(error)
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body

    const user = await userModel.authenticate(email, password)
    const token = jwt.sign({ user }, config.tokenSecret as unknown as string)
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'The username and password do not match',
      })
    }
    return res.json({
      status: 'success',
      data: { ...user, token },
      message: 'User Authenticated-Successfully',
    })
  } catch (error) {
    return next(error)
  }
}
