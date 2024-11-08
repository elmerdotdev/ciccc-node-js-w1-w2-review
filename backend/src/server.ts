import express, { Request, Response } from 'express'
import cookieSession from 'cookie-session'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import userRouter from './routes/user.routes'
import productRouter from './routes/product.routes'

// Create server
const app = express()

// Middleware
app.use(cors({
  origin: 'http://localhost:4321',
  credentials: true
}))
app.use(cookieSession({
  name: 'session',
  keys: [
    process.env.COOKIE_SIGN_KEY ?? 'fewio31p3',
    process.env.COOKIE_ENCRYPT_KEY ?? 'heorlfejp12'
  ],
  httpOnly: true,
  maxAge: 3 * 60 * 1000
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/users', userRouter)
app.use('/products', productRouter)

// Start server
const PORT: number = Number(process.env.PORT || 3000)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})