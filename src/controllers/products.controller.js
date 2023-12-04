import * as service from './../services/product.services.js'

export const getAll =  async (req, res) => {
  const products = await service.getAll()
  const { limit = 0 } = req.query
  if(limit) {
    const productsLimit = products.splice(0, parseInt(limit))
    res.status(200).send({ 
      "status": "success",
      "payload": productsLimit 
    })
  } else {
    res.status(200).send(products)
  }
}

export const getById = async (req, res) => {
  const id = req.params.pid
  const product = await service.getById(id)
  if(product) {
    res.status(200).send({ 
      "status": "success",
      "payload": product
    })
  } else {
    res.status(404).send({ error: 'Producto no encontrado'})
  }
}

export const create = async (req, res) => {
  const product = req.body
  const newProduct = await service.create(product)
  if(newProduct) {
    res.status(200).send({
      "status": "success",
      "message": newProduct
    })
  } else {
    res.status(404).send({ error: 'Error al crear el producto'})
  }
}

export const updateById = async (req, res) => {
  const id = req.params.pid
  const updates = req.body
  const productUpdated = await service.updateById(id, updates);
  if(productUpdated){
    res.status(201).send({
        "status": "success",
        "message": productUpdated
    })
  } else {
    res.status(404).send({ error: 'Error al actualizar el producto'})
  }
}

export const deleteById = async (req, res) => {
  const id = req.params.pid
  const productDeleted = await service.deleteById(id)
  if(productDeleted) {
    res.status(200).send({
        "status": "success",
        "message": productDeleted
    })
  } else {
    res.status(404).send({ error: 'Error al eliminar el producto'})

  }
}
