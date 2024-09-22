import { Router } from "express";

import {
  getProducts, insertProductos, AllProducts
} from "../controller/controller.js";

//cambiar el nombre del endpoint

export const router = Router();
router.get("/product/:IdProduct", getProducts); 
router.get("/allProducts", AllProducts);
router.post("/product/compra", insertProductos);
router.get("/suppliers/all", getSuppliers);


