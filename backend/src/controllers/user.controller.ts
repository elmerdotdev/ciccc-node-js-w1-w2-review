import { Request, Response } from 'express'
import userModel from '../models/user.model'
import { User } from '../types/user'
import bcrypt from 'bcrypt'

// Get users
const getUsers = (req: Request, res: Response) => {
  const users = userModel.findAll()
  res.json(users)
}

// Get user by id
const getUserById = (req: Request<{ id: string }>, res: Response): void => {
  const { id } = req.params
  const user = userModel.findById(id)
  if (!user) {
    res.status(404).json({ message: 'User not found!' })
    return
  }
  res.json(user)
}

// Register
const registerUser = async (req: Request<{}, {}, Omit<User, 'id'>>, res: Response): Promise<void> => {
  const { username, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 12)
  const user = userModel.create({ username, password: hashedPassword })
  res.status(201).json(user)
}

// Login
const loginUser = async (req: Request<{}, {}, Omit<User, 'id'>>, res: Response): Promise<void> => {
  const { username, password } = req.body
  const user = userModel.findByUsername(username)
  if (!user) {
    res.status(404).json({ message: 'User not found' })
    return
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    res.status(401).json({ message: 'Passwords do not match' })
    return
  }
  req.session!.isAuthenticated = true
  req.session!.userId = user.id
  res.json({ message: 'Login successful' })
}

// Log out
const logoutUser = (req: Request, res: Response): void => {
  req.session = null
  res.json({ message: 'User logged out successfully' })
}

// Profile
const userProfile = (req: Request, res: Response): void => {
  const user = userModel.findById(req.session!.userId)
  if (!user) {
    res.status(403).json({ message: 'User not found' })
    return
  }
  res.json(user)
}

export default {
  getUsers,
  getUserById,
  registerUser,
  loginUser,
  logoutUser,
  userProfile
}