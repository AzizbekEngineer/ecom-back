import express from "express";
import AdminsController from "../controller/admin.js";
import CategoryController from "../controller/category.js";
import ProductsController from "../controller/product.js";
import { auth } from "../middleware/auth.js";
import { upload } from "../middleware/uploader.js";
const router = express.Router();

//admins
router.get("/api/admins", [auth], AdminsController.get);
router.post("/api/admins/sign-up", AdminsController.registerAdmin);
router.post("/api/admins/sign-in", AdminsController.loginAdmin);
router.get("/api/profile", [auth], AdminsController.getProfile);
router.delete("/api/delete/admins/:id", AdminsController.delete);
router.patch("/api/update/admins/:id", [auth], AdminsController.updateAdmin);
router.get("/api/admins/:id", [auth], AdminsController.getAdmin);
router.patch("/api/update/profile", [auth], AdminsController.updateProfile);

//categories
router.get("/api/categories", CategoryController.get);
router.post("/api/categories", [auth], CategoryController.create);
router.delete("/api/delete/category/:id", CategoryController.delete);
router.patch("/api/update/category/:id", CategoryController.update);

//products
router.get("/api/products", ProductsController.get);
router.get("/api/products/category/:id", ProductsController.getCategory);
router.post(
  "/api/create/product",
  [auth, upload.array("photos")],
  ProductsController.create
);

export default router;
