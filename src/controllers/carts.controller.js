import Controller from './class.controller.js'
import CartService from '../services/cart.services.js'
const cartService = new CartService()

export default class CartController extends Controller {
  constructor() {
    super(cartService)
  }

  addProductById = async (req, res) => {
    const idCart = req.params.cid
    const idProduct = req.params.pid
    const resp = await service.addProductById(idCart, idProduct)
    res.status(201).send({
        "status": "success",
        "message": resp
    })
  }
  
  updateProductQuantity = async (req, res) => {
    const idCart = req.params.cid
    const idProduct = req.params.pid
    const quantity = req.body.quantity
    const resp = await service.updateProductQuantity(idCart, idProduct, quantity)
    
    res.status(201).send({
        "status": "success",
        "message": resp
    })
  }
  
  updateProductsArray = async (req, res) => {
    const idCart = req.params.cid
    const products = req.body.products
    const resp = await service.updateProductsArray(idCart, products)
    
    res.status(201).send({
        "status": "success",
        "message": resp
    })
  }
  
  deleteProduct = async (req, res) => {
    const idCart = req.params.cid
    const idProduct = req.params.pid
    const resp = await service.deleteProduct(idCart, idProduct)
    
    res.status(201).send({
        "status": "success",
        "message": resp
    })
  }
  
  deleteAllProducts = async (req, res) => {
    const idCart = req.params.cid
    const resp = await service.deleteAllProducts(idCart)
    
    res.status(201).send({
        "status": "success",
        "message": resp
    })
  }
}