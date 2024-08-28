import { Router } from "express";

import {
  getProducts, insertProductos,
} from "../controller/controller.js";

//cambiar el nombre del endpoint
const router = Router();
router.get("/product/:IdProduct", getProducts); 
router.post("/product/compra", insertProductos)
export default router;
