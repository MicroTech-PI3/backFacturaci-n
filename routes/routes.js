import { Router } from "express";

import {
  getProducts, insertProductos
} from "../controller/controller.js";

//cambiar el nombre del endpoint

//shopcart
export const router = Router();
router.get("/shopcart/:IdProduct", getProducts); 
router.post("/shopcart/compra", insertProductos);




