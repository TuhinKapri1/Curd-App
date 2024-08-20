import jwt from "jsonwebtoken";

export const generateToken = async (payload, secret_key, expire = "3h") => {
  return  jwt.sign(payload, secret_key, { expiresIn: expire });
};
