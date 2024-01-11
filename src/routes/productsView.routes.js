import express from 'express';
import ProductViewController from '../controllers/productsView.controller.js'

export const productRouterView = express.Router();
const productViewController = new ProductViewController()

productRouterView.get('/', productViewController.getAllForView);