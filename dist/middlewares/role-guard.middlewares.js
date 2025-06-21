"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleGuard = RoleGuard;
// Accept one or more allowed roles
function RoleGuard(...allowedRoles) {
    return (req, res, next) => {
        try {
            const user = req.user;
            // console.log(user.role_id);
            if (!user || !user.role_id) {
                const error = new Error("Unauthorized: No role found");
                error.status = 403;
                throw error;
            }
            if (!allowedRoles.includes(user.role_id)) {
                const error = new Error("Forbidden: Access denied");
                error.status = 403;
                throw error;
            }
            next();
        }
        catch (error) {
            next(error);
        }
    };
}
