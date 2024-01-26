export default class ProductReqDTO {
  constructor(product) {
    this.title = product.nameProd,
    this.description = product.descriptionProd,
    this.price = product.priceProd,
    this.stock = product.stockProd
  }
}