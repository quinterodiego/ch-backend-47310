import { CartModel } from './models/carts.model.js'

export default class CartDaoMongoDB {

    create = async () => {
        const products = []
        const resp = await CartModel.create({products})
        return resp
    }

    getById = async (id) => {
        const resp = await CartModel.findById(id)
        console.log('RESP => ', resp)
        if(resp) {
        //   const products = resp.products.map(prod => {
        //       const { product } = prod
        //       return {      
        //           "_id": product._id,
        //           "title": product.title,
        //           "description": product.description,
        //           "price": product.price,
        //           "stock": product.stock,
        //           "brand": product.brand,
        //           "category": product.category,
        //           "code": product.code,
        //           "status": product.status,
        //           "thumbnail": product.thumbnail[0],
        //           "quantity": prod.quantity
        //       }
        //   })
          return resp
        } else {
          return []
        }
    }

    addProductById = async (idCart, idProduct) => {
      const cart = await CartModel.findById(idCart)
      const exist = cart.products.find(prod => prod.product.toString() === idProduct)
      let resp = ''
      if(!exist) {
          cart.products.push({ product: idProduct, quantity: 1 })
          resp = await cart.save()
          return resp
      } else {
          resp = 'El producto ya existe en el carrito'
          return resp
      }
    }

    updateProductQuantity = async (idCart, idProduct, quantity) => {
      const cart = await CartModel.findOne({_id: idCart})
        const exist = cart.products.find(prod => prod.product.toString() === idProduct)
        let resp = ''
        if(!exist) {
            resp = 'El producto que intenta actualizar no existe en el carrito'
            return resp
        } else {
            const oldProducts = cart.products
            const index = oldProducts.findIndex(product => product.product.toString() === idProduct)
            oldProducts[index].quantity += quantity
            resp = await CartModel.findByIdAndUpdate(idCart, { products: oldProducts}, { new: true })
            return resp
        }
    }

    deleteProduct = async (idCart, idProduct) => {
        const cart = await CartModel.findById(idCart)
        const exist = cart.products.find(prod => prod.product.toString() === idProduct)
        let resp = ''
        if(!exist) {
            resp = 'El producto que intenta borrar no existe en el carrito'
            return resp
        } else {
            const oldProducts = cart.products
            const newProducts = oldProducts.filter( prod => prod.product.toString() !== idProduct)
            resp = await CartModel.findByIdAndUpdate(idCart, { products: newProducts}, { new: true })
            return resp
        }
    }

    deleteAllProducts = async (idCart) => {
        const resp = await CartModel.findByIdAndUpdate(idCart, { products: []}, { new: true })
        return resp
    }
}