import express from 'express';
import {
  createCustomer,
  getCustomers
} from '../controllers/customerController.js';
const customerRouter = express.Router();

customerRouter.post('/customers', createCustomer);
customerRouter.get('/customers/:id', getCustomers);
//customerRouter.put('/customers/:id', UpdateCustomer);
//customerRouter.delete('/customers/:id', DeleteCustomer);

export default customerRouter;