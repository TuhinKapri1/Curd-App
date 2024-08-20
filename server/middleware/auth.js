import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "You need to Login first",
      });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Authentication faild please login again",
        });
      }
      req.user = decoded;
      next();
    });
  } catch (err) {
    console.log("Error Happen in isAuth function", err);
    res.status(500).json({
      success: false,
      messgae: "Internal server error",
    });
  }
};

