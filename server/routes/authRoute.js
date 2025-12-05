import { Router } from "express";
import {
  adminLogin,
  getCurrentUser,
  logout,
  userLogin,
  userRegister,
} from "../controllers/authController.js";
import { authenticateUser } from "../middlewares/authenticateMiddleware.js";

const router = Router();
// router.use(authenticateUser);
router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/current-user", authenticateUser, getCurrentUser);
router.post("/login-admin", authenticateUser, adminLogin);
router.post("/logout", logout);

export default router;
