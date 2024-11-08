"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const checkAuth = (req, res, next) => {
    const { isAuthenticated } = req.session;
    if (isAuthenticated) {
        next();
    }
    else {
        res.status(401).json({ message: "Unauthorized access" });
    }
};
exports.checkAuth = checkAuth;
