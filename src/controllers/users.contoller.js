import { generateToken } from '../middlewares/generateToken.js'
import UserService from '../services/user.services.js'
const userService = new UserService()

export default class UserController {

  async register(req, res) {
    try {
      const user = req.body
      if(!user.email || !user.password || !user.first_name || !user.last_name) {
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
    const { email, password } = req.body    
    const findUser = await userService.loginUser({ email, password })
    
    if(findUser) {
      const access_token = generateToken(findUser)
      console.log(access_token)
      res
        .cookie('token', access_token, { httpOnly: true })
        .redirect('/products')
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

  async current(req, res) {
    console.log(req.user)
    const { userID } = req.user
    const user = await userService.getById(userID)
    if(!user) res.json({ message: 'User not found' })
    else {
      console.log('USER -->', user)
      res.json({
        status: "success",
        userData: {
          token: req.cookies.token,
          email: user.email,
          role: user.role
        },
      }) 
    }
  }
}