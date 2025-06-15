const AdminMideleware = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "You are not authenticated" });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "You are not authorized to access this resource" });
    }
    
    next();
};

module.exports = { AdminMideleware };