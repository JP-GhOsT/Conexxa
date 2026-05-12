import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";

import {
    getNotifications,
    markAsRead,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get(
    "/notifications",
    authMiddleware,
    getNotifications
);

router.patch(
    "/notifications/:id/read",
    authMiddleware,
    markAsRead
);

export default router;