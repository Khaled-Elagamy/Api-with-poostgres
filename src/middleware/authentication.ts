import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import Error from '../interfaces/error.interface'
import config from '../config'

const UnauthorizedError = (next: NextFunction) => {
  const error: Error = new Error('Login Error:PLease try again')
  error.status = 401
  next(error)
}

const authMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get('Authorization')
    if (authHeader) {
      const bearer = authHeader.split(' ')[0].toLowerCase()
      const token = authHeader.split(' ')[1]
      if (token && bearer === 'bearer') {
        const decode = jwt.verify(
          token,
          config.tokenSecret as unknown as string
        )
        if (decode) {
          next()
        } else {
          UnauthorizedError(next)
        }
      } else {
        UnauthorizedError(next)
      }
    } else {
      UnauthorizedError(next)
    }
  } catch (error) {
    UnauthorizedError(next)
  }
}

export default authMiddleware
