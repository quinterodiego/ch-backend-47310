import * as service from '../services/cart.services.js'

export const getById = async (req, res) => {
  const id = req.params.pid
  const cart = await service.getById(id)
  if(cart) {
    res.status(200).send({ 
      "status": "success",
      "payload": cart
    })
  } else {
    res.status(404).send({ error: 'Carrito no encontrado'})
  }
}

export const create = async (req, res) => {
  const newCart = await service.create()
  if(newCart) {
    res.status(200).send({
      "status": "success",
      "message": newCart
    })
  } else {
    res.status(404).send({ error: 'Error al crear el carrito'})
  }
}

export const addProductByIdInCart = async (req, res) => {
  const idCart = req.params.cid
  const idProduct = req.params.pid
  const quantity = req.body.quantity
  const cartUpdated = await service.addProductByIdInCart(idCart, idProduct, quantity);
  if(cartUpdated){
    res.status(201).send({
        "status": "success",
        "message": cartUpdated
    })
  } else {
    res.status(404).send({ error: 'Error al actualizar el carrito'})
  }
}