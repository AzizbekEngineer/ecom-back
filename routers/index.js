import express from "express";
import AdminsController from "../controller/admin.js";
const router = express.Router();

router.get("/api/admins", AdminsController.get);
router.post("/api/admins/sign-up", AdminsController.registerAdmin);

export default router;
