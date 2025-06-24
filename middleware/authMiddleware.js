const jwt = require("jsonwebtoken");

// Middleware to verify JWT token and attach user to request
const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists and starts with "Bearer"
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];

    try {
        // Verify and decode token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user info to request
        req.user = {
            id: decoded.id,
            name: decoded.name,
        };

        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = requireAuth;
