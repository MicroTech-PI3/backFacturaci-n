import { Router } from "express";

import {
  getProducts,
} from "../controllers/controller.js";

//cambiar el nombre del endpoint
const router = Router();
router.get("/product/:IdProduct", getProducts); 
export default router;
