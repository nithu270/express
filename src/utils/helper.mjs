import bcrypt from "bcrypt";
const saltRounds = 10;
export const hashPwd = (password)=>{
const salt = bcrypt.genSaltSync(saltRounds);
return bcrypt.hashSync(password,salt);
};
