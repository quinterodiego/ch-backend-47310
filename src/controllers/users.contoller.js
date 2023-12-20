import UserService from '../services/user.services.js'
const userService = new UserService()

export default class UserController {

  async register(req, res) {
    try {
      const user = req.body
      if(!user.email || !user.password || !user.firstname || !user.lastname) {
        return res.status(400).render('error', { error: 'Debe completar todos los campos' })
      }
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
    const id = req.session.passport.user;    
    const findUser = await userService.getById( id )
    
    if(findUser) {
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

  async loginGitHub(req, res) {
    const user = req.user
    
    if(user) {
      req.session.firstname = user.firstname
      req.session.lastname = user.lastname
      req.session.email = user.email
      req.session.role = user.role
      return res.redirect('/products')
    } else {
      return res.status(401).render('error', { error: 'Email o password incorrectos' })
    }
  
  }
  async loginGoogle(req, res) {
    const user = req.user
    
    if(user) {
      req.session.firstname = user.firstname
      req.session.lastname = user.lastname
      req.session.email = user.email
      req.session.role = user.role
      return res.redirect('/products')
    } else {
      return res.status(401).render('error', { error: 'Email o password incorrectos' })
    }
  }
}