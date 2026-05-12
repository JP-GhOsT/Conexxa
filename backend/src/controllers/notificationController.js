const Notification = require(
    "../models/notificationModel"
);

/* =========================
   LISTAR NOTIFICAÇÕES
========================= */
async function getNotifications(
    req,
    res
) {
    try {
        const notifications =
            await Notification.find({
                user: req.user.id,
            }).sort({
                createdAt: -1,
            });

        return res.status(200).json({
            notifications,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message:
                "Erro ao buscar notificações",
        });
    }
}

/* =========================
   MARCAR COMO LIDA
========================= */
async function markAsRead(
    req,
    res
) {
    try {
        const notification =
            await Notification.findById(
                req.params.id
            );

        // 404
        if (!notification) {
            return res.status(404).json({
                message:
                    "Notificação não encontrada",
            });
        }

        // 403
        if (
            notification.user.toString() !==
            req.user.id
        ) {
            return res.status(403).json({
                message:
                    "Sem permissão para acessar esta notificação",
            });
        }

        notification.read = true;

        await notification.save();

        return res.status(200).json({
            message:
                "Notificação marcada como lida",
            notification,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Erro interno",
        });
    }
}

/* =========================
   CRIAR NOTIFICAÇÃO
========================= */
async function createNotification({
    user,
    type,
    message,
}) {
    try {
        return await Notification.create({
            user,
            type,
            message,
        });

    } catch (error) {
        console.log(
            "Erro ao criar notificação:",
            error
        );
    }
}

module.exports = {
    getNotifications,
    markAsRead,
    createNotification,
};