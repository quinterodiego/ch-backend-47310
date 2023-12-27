import { Router } from 'express'

import productsRouter from './products.routes.js'
import { productRouterView } from './productsView.routes.js'
import cartsRouter from './carts.routes.js'
import { cartRouterView } from './cartView.routes.js'
import { authRouter } from './auth.routes.js'
import messagesRouter from './messages.routes.js'

const router = Router()

// APIS
router.use('/api/products', productsRouter)
router.use('/api/carts', cartsRouter)
router.use('/api/chat', messagesRouter)

// VIEWS
router.use("/products", productRouterView);
router.use("/carts", cartRouterView);
router.get('/chat', async (req, res) => {
    res.render('chat', {})
})

router.use('/', authRouter)

export default router