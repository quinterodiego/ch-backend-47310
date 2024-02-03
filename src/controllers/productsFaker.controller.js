import { generateProducts } from '../utils.js'


export default class ProductFakerController {
  constructor() {
  }
  
  getFakerProducts = async (_, res) => {
    console.log('llego')
    try {
      const products = []
      for (let i = 0; i < 100; i++) {
        const product = generateProducts();
        products.push(product)
      }
      return res.status(200).json({ products: products })
    } catch (error) {
      console.log(error)
    }
  }
}