import { v4 as uuidv4 } from 'uuid'
import { User } from '../types/user'

class UserModel {
  private users: User[] = []

  findAll(): User[] {
    return this.users
  }

  findById(id: string): User | undefined {
    const user = this.users.find(user => user.id === id)
    if (!user) return undefined
    return user
  }

  findByUsername(username: string): User | undefined {
    const user = this.users.find(user => user.username === username)
    if (!user) return undefined
    return user
  }

  create(newUser: Omit<User, 'id'>): User {
    const user = {
      id: uuidv4(),
      ...newUser
    }
    this.users.push(user)
    return user
  }

  edit(id: string, newData: Partial<User>): User | undefined {
    const index = this.users.findIndex(user => user.id === id)
    if (index === -1) return undefined
    const user = {
      ...this.users[index],
      ...newData
    }
    this.users[index] = user
    return user
  }

  delete(id: string): boolean {
    const index = this.users.findIndex(user => user.id === id)
    if (index === -1) return false
    this.users.splice(index, 1)
    return true
  }
}

export default new UserModel