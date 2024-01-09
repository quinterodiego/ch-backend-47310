import Router from 'express'
import CartController from '../controllers/carts.controller.js'

export const cartRouterView = Router()
const cartController = new CartController()

cartRouterView.get('/:cid', async (req, res) => {
    const resp = await cartController.getById(req.params.cid)
    const resp2 = {
        payload: resp
    }
    res.status(200).render('cart', resp2)
});
