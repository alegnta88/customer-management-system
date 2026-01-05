import express from 'express';
import {
  createCustomer,
  getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
} from '../controllers/customerController.js';
import { authorizeMiddleware } from '../middlewares/authorizeMiddleware.js';
const customerRouter = express.Router();

customerRouter.post('/customers', authorizeMiddleware, createCustomer);
customerRouter.get('/customers/:id', authorizeMiddleware, getCustomerById);

customerRouter.get('/customers', authorizeMiddleware, getCustomers);

customerRouter.put('/customers/:id', authorizeMiddleware, updateCustomer);
customerRouter.delete('/customers/:id', authorizeMiddleware, deleteCustomer);

export default customerRouter;