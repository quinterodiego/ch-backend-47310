import UserService from '../services/user.services.js'
const userService = new UserService()

export default class UserController {

  async register(req, res) {
    const { firstname, lastname, email, password, role } = req.body
    if(!email || !password || !firstname || !lastname) {
      return res.status(400).render('error', { error: 'Debe completar todos los campos' })
    }
  
    try {
      const user = { firstname, lastname, email, password, role }
      await userService.register(user)
      req.session.firstname = firstname
      req.session.lastname = lastname
      req.session.email = email
      req.session.role = role
      return res.redirect('/')
    } catch (error) {
      console.log(error)
      return res.status(400).render('error', { error: 'No se pudo crear el usuario' })
    }
  }

  async registerView(req, res) {
    res.render('register', {})
  }

  async login(req, res) {
    const { email, password } = req.body
    if(!email || !password) {
      return res.status(400).render('error', { error: 'Debe completar todos los campos' })
    }
  
    const findUser = await userService.findByEmail( email )
    
    if(findUser && findUser.password == password) {
      req.session.firstname = findUser.firstname
      req.session.lastname = findUser.lastname
      req.session.email = findUser.email
      req.session.role = findUser.role
      return res.redirect('/products')
    } else {
      return res.status(401).render('error', { error: 'Email o password incorrectos' })
    }
  }

  async loginView(req, res) {
    res.render('login', {})
  }

  async logout(req, res) {
    req.session.destroy((err) => {
      if(err) {
        return res.status(500).render('error', { error: 'No se pudo cerrar la sesión ' })
      }
      return res.redirect('/')
    })
  }
}