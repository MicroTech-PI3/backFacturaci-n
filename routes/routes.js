import { Router } from "express";

import {
  getProducts, insertProductos, AllProducts, DeleteProduct
} from "../controller/controller.js";

//cambiar el nombre del endpoint

export const router = Router();
router.get("/product/:IdProduct", getProducts); 
router.post("/product/compra", insertProductos);
router.get("/allProducts", AllProducts);
router.delete("/product/:IdProduct", DeleteProduct);



