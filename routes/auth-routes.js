// router is a submodule: it is responsible for processing the routing logic of a specific path, and then mounting it to the app through app.use().

import express from "express";
import * as authController from "../controllers/auth-controllers.js";

const authRouter = express.Router();

// Registration route:
// Receive and process user-submitted registration form data
authRouter
  .route("/register")
  .post(authController.registerUser);

// User login route:
authRouter
  .route("/login")
  .post(authController.loginUser);

export default authRouter;
