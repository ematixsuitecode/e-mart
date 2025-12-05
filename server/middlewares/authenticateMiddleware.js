import { decryptToken, verifyToken } from "../utils/tokenUtil.js";

export const authenticateUser = async (req, res, next) => {
  try {
    const encryptedToken = req.cookies?.token;

    // Check if the encrypted token exists
    if (!encryptedToken) {
      return res.status(401).json({ msg: "Authentication token missing" });
    }

    // Decrypt the token
    let token;
    try {
      token = decryptToken(encryptedToken);
      if (!token) throw new Error("Decryption failed");
    } catch (error) {
      console.error("Token Decryption Error:", error.message);
      return res.status(401).json({ msg: "Invalid or expired token" });
    }

    // Verify the decrypted token
    const { userId, role } = verifyToken(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    console.error("Authentication Error:", error.message);
    res.status(401).json({ msg: "Authentication failed" });
  }
};
