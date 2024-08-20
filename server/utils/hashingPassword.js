import bcryptjs from "bcryptjs";

export const hashPassword = async (password) => {
  return bcryptjs.hashSync(password, 10);
};

export const isPasswordMatch = async (password, dbPassword) => {
  return bcryptjs.compareSync(password, dbPassword);
};
