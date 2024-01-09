import { createResponse } from './../utils.js'

export default class Controller { 
  constructor(service) {
    this.service = service
  }

  create = async (req, res, next) => {
    try {
      const newItem = await this.service.create(req.body)
      !newItem ? createResponse(res, 404, { method: 'create', error: 'Error create newItem!' }) : createResponse(res, 200, newItem)
      
    } catch (error) {
      next(error.message)
    }
  }

  getAll = async (req, res, next) => {
    try {
      const items = await this.service.getAll()
      createResponse(res, 200, items)
    } catch (error) {
      next(error.message)
    }
  }

  getById = async (req, res, next) => {
    try {
      const { id } = req.params
      const item = await this.service.getById(id)
      !item ? createResponse(res, 404, { method: 'getById', error: 'Item not found!' }) : createResponse(res, 200, item)
    } catch (error) {
      next(error.message)
    }
  }

  update = async (req, res, next) => {
    try {
      const { id } = req.params
      const item = await this.service.getById(id)
      !item && createResponse(res, 404, { method: 'update', error: 'Error update item!' })
      const itemUpdated = await this.service.update(id, req.body)
      createResponse(res, 200, itemUpdated)
    } catch (error) {
      next(error.message)
    }
  }

  delete = async (req, res, next) => {
    try {
      const { id } = req.params
      const item = await this.service.getById(id)
      !item && createResponse(res, 404, { method: 'delete', error: 'Error delete item!' })
      const itemDeleted = await this.service.delete(id)
      createResponse(res, 200, itemDeleted)
    } catch (error) {
      next(error.message)
    }
  }
}