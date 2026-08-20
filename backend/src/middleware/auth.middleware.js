import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


// A middleware function to protect routes
export const protectRoute = async (req, res, next) => {
  try {
    // Check if there is a token in the request cookies
    const token = req.cookies.jwt;
    // If there is no token
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    // if there is a token, verify it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.isVerified) {
      return res.status(403).json({ message: "Please verify your email to continue" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
