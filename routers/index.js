import express from "express";
import AdminsController from "../controller/admin.js";
import CategoryController from "../controller/category.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

router.get("/api/admins", AdminsController.get);
router.post("/api/admins/sign-up", AdminsController.registerAdmin);
router.post("/api/admins/sign-in", AdminsController.loginAdmin);
router.get("/api/profile", [auth], AdminsController.getProfile);
router.delete("/api/delete/admins/:id", AdminsController.delete);
router.patch("/api/update/admins/:id", AdminsController.updateAdmin);
router.get("/api/admins/:id", AdminsController.getAdmin);
router.patch("/api/update/profile", [auth], AdminsController.updateProfile);

router.get("/api/categories", CategoryController.get);
router.post("/api/categories", [auth], CategoryController.create);
router.delete("/api/delete/category/:id", CategoryController.delete);
router.patch("/api/update/category/:id", CategoryController.update);

export default router;
