const jwt = require("jsonwebtoken");

function verifyAdmin(req, res, next) {
    console.log("➡️ verifyAdmin middleware started");
    const authHeader = req.headers.authorization;
    console.log("  authHeader:", authHeader);

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // "Bearer <token>"

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error("  JWT Verification Error:", err);
            return res.status(403).json({ message: "Invalid token" });
        }
        console.log("  Decoded Token:", decoded);
        const isAdmin = decoded && decoded.email === process.env.ADMIN_EMAIL;
        console.log("  Is Admin:", isAdmin);
        if (!isAdmin) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        req.user = decoded;
        console.log("➡️ verifyAdmin middleware passed");
        next();
    });
}

module.exports = verifyAdmin;