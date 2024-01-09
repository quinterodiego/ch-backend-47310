import express from 'express';
import { getAllProducts } from '../controllers/productsView.controller.js'

export const productRouterView = express.Router();

productRouterView.get('/', getAllProducts);