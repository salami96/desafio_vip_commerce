import { Router } from "express";
import { ClientController } from "./controller/client.controller";
import { OrderController } from "./controller/order.controller";
import { ProductController } from "./controller/product.controller";

const router = Router();

// Rotas dos clientes
router.get('/clientes', ClientController.getClients);
router.get('/clientes/:cod', ClientController.getClient);
router.post('/clientes', ClientController.saveClient);
router.put('/clientes/:cod', ClientController.updateClient);
router.delete('/clientes/:cod', ClientController.deleteClient);

// Rotas dos produtos
router.get('/produtos', ProductController.getProducts);
router.get('/produtos/:cod', ProductController.getProduct);
router.post('/produtos', ProductController.saveProduct);
router.put('/produtos/:cod', ProductController.updateProduct);
router.delete('/produtos/:cod', ProductController.deleteProduct);

// Rotas dos pedidos
router.get('/pedidos', OrderController.getOrders);
router.get('/pedidos/:cod', OrderController.getOrder);
router.post('/pedidos', OrderController.saveOrder);
router.put('/pedidos/:cod', OrderController.updateOrder);
router.delete('/pedidos/:cod', OrderController.deleteOrder);

export { router };