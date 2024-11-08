import { Router, Request, Response } from 'express'

const productRouter = Router()

productRouter.get('/', (req: Request, res: Response) => {
  res.send('Welcome to server')
})

export default productRouter