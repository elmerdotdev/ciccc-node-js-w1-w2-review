"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_1 = require("../middleware/auth");
const userRouter = (0, express_1.Router)();
userRouter.get('/list', auth_1.checkAuth, user_controller_1.default.getUsers);
userRouter.get('/list/:id', auth_1.checkAuth, user_controller_1.default.getUserById);
userRouter.post('/signup', user_controller_1.default.registerUser);
userRouter.post('/login', user_controller_1.default.loginUser);
userRouter.get('/logout', auth_1.checkAuth, user_controller_1.default.logoutUser);
userRouter.get('/profile', auth_1.checkAuth, user_controller_1.default.userProfile);
exports.default = userRouter;
