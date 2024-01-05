import { Router } from 'express'

import productsRouter from './products.routes.js'
import { productRouterView } from './productsView.routes.js'
import cartsRouter from './carts.routes.js'
import { cartRouterView } from './cartView.routes.js'
import { authRouter } from './auth.routes.js'
import messagesRouter from './messages.routes.js'

export default class MainRouter {
  constructor() {
    this.router = Router()
    this.initRoutes()
  }

  initRoutes() {
    // APIS
    this.router.use('/api/products', productsRouter)
    this.router.use('/api/carts', cartsRouter)
    this.router.use('/api/chat', messagesRouter)

    // VIEWS
    this.router.use("/products", productRouterView);
    this.router.use("/carts", cartRouterView);
    this.router.get('/chat', async (req, res) => {
        res.render('chat', {})
    })

    this.router.use('/', authRouter)
  }

  getRouter() {
    return this.router
  }
}

