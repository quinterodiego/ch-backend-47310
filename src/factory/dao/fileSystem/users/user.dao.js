import fs from 'fs'

export default class UserDaoFilesystem {
  constructor (path) {
      this.path = path
  }

  async nextID() {
    const data = await fs.promises.readFile(this.path, 'utf-8')
    const users = await JSON.parse(data)
    const lastObject = users[users.length-1]
    const id = lastObject.id + 1
    return id
  }

  async create(user) {
    try {
      if(user.first_name && user.last_name && user.email && user.age && user.password) {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const users = await JSON.parse(data);

        if(users.length > 0){
          const email = users.find(u => u.email === user.email)
          if(email) {
            return 'Ya existe el email'
          }

          user.id = await this.nextID()
          user.status = true
          users.push(user)
          await fs.promises.writeFile(this.path, JSON.stringify(users))
        } else {
          user.id = 1
          user.status = true
          users.push(user)
          await fs.promises.writeFile(this.path, JSON.stringify(users))
        }
      } else {
          return 'Debe completar todos los campos'
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.path, 'utf-8')
      const users = await JSON.parse(data)
      return users
    } catch (error) {
      console.log(error)
    }
  }

  async getById(id) {
    try {
      const data = await fs.promises.readFile(this.path, 'utf-8')
      const users = await JSON.parse(data)
      const user = users.find(p => p.id === id)
      if(user){
        return user
      } else {
        return 'Not found'
      }
    } catch (error) {
      console.log(error)
    }
  }

  async update(id, updates) {
    try {
      const data = await fs.promises.readFile(this.path, 'utf-8')
      const users = await JSON.parse(data)
      const oldUsers = users.find(usr => usr.id === id)
      const newUser = { ...oldUsers, ...updates }
      users[id - 1] = newUser
      await fs.promises.writeFile(this.path, JSON.stringify(users))
      return 'Usuario actualizado'
    } catch (error) {
      console.log(error)
    }
  }

  async delete(id) {
    try {            
      const data = await fs.promises.readFile(this.path, 'utf-8')
      const users = await JSON.parse(data)
      const newUsers = users.filter(p => p.id !== id)
      await fs.promises.writeFile(this.path, JSON.stringify(newUsers))
      return 'Usuario eliminado'
    } catch (error) {
      console.log(error)
    }
  }
}