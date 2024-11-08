import { Router, Request, Response } from 'express'
import userController from '../controllers/user.controller'
import { checkAuth } from '../middleware/auth'

const userRouter = Router()

userRouter.get('/list', checkAuth, userController.getUsers)
userRouter.get('/list/:id', checkAuth, userController.getUserById)
userRouter.post('/signup', userController.registerUser)
userRouter.post('/login', userController.loginUser)
userRouter.get('/logout', checkAuth, userController.logoutUser)
userRouter.get('/profile', checkAuth, userController.userProfile)

export default userRouter