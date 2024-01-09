import { Router } from 'express'

import productsRouter from './products.routes.js'
import cartsRouter from './carts.routes.js'
import { authRouter } from './auth.routes.js'

const router = Router()

router.use('/api/products', productsRouter)
router.use('/api/carts', cartsRouter)
// router.use('/api/chat', messagesRouter)
router.use('/auth', authRouter)

export default router