import { HttpResponse, errorsDictionary } from '../http.response.js'

const httpResponse = new HttpResponse()

export default class Controller { 
  constructor(service) {
    this.service = service
  }

  create = async (req, res, next) => {
    try {
      const newItem = await this.service.create(req.body)
      !newItem ? httpResponse.NotFound(res, errorsDictionary.ERROR_CREATE_PRODUCT) : httpResponse.Ok(res, newItem)
      
    } catch (error) {
      next(error.message)
    }
  }

  getAll = async (req, res, next) => {
    try {
      const items = await this.service.getAll()
      !items ? httpResponse.NotFound(res, 'Item not found!') : httpResponse.Ok(res, items)
    } catch (error) {
      next(error.message)
    }
  }

  getById = async (req, res, next) => {
    try {
      const { id } = req.params
      const item = await this.service.getById(id)
      !item ? httpResponse.NotFound(res, 'Item not found!') : httpResponse.Ok(res, item)
    } catch (error) {
      next(error.message)
    }
  }

  update = async (req, res, next) => {
    try {
      const { id } = req.params
      const item = await this.service.getById(id)
      !item && httpResponse.NotFound(res, 'Error update item!')
      const itemUpdated = await this.service.update(id, req.body)
      httpResponse.Ok(res, itemUpdated)
    } catch (error) {
      next(error.message)
    }
  }

  delete = async (req, res, next) => {
    try {
      const { id } = req.params
      const item = await this.service.getById(id)
      !item && httpResponse.NotFound(res, 'Error delete item!')
      const itemDeleted = await this.service.delete(id)
      httpResponse.Ok(res, itemDeleted)
    } catch (error) {
      next(error.message)
    }
  }
}