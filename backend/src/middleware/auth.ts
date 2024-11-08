import { Request, Response, NextFunction } from 'express'

export const checkAuth = (req: Request, res: Response, next: NextFunction): void => {
  const { isAuthenticated } = req.session!
  if (isAuthenticated) {
    next()
  } else {
    res.status(401).json({ message: "Unauthorized access" })
  }
}