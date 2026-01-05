import jwt from "jsonwebtoken";

export const authorizeMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

req.user = { id: decoded.id }; 
    console.log("Authorized user ID:", req.user.id);

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};