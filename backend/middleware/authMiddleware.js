const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

const jwtAuthMiddleware = (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;
  const isHtml = req.headers.accept?.includes("text/html");

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return isHtml
      ? res.redirect("/login")
      : res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verification error:", err);
    return isHtml
      ? res.redirect("/login")
      : res.status(401).json({ error: "Invalid or expired token" });
  }
};

const generateToken = (userData) => {
  return jwt.sign(userData, JWT_SECRET, { expiresIn: "1h" });
};

module.exports = {
  jwtAuthMiddleware,
  generateToken,
};
