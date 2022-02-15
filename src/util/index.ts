import { ResonseError } from './ResponseError';
import  bcrypt  from 'bcrypt';
import { ErrorMessages } from '../constants';
import jwt from "jsonwebtoken";
export const encrypt = (password:string):string=>{
    const pepper = process.env.HASHING_PEPPER;
    const saltRounts = parseInt(process.env.SALT_ROUNDS as string);
    try {
        const hashed = bcrypt.hashSync( password  + pepper , saltRounts )
        return hashed
    } catch (error) {
        throw new ResonseError(500 , ErrorMessages.serverError)
    }
}
export const isPasswordMatchHashed = (password:string , hashedPassword:string):boolean=>{
    const pepper = process.env.HASHING_PEPPER;
    try {
        bcrypt.compareSync( password  + pepper , hashedPassword )
        return true;
    } catch (error) {
        return false;
    }
}

export const createToken = (payload:object):string=>{
    const key = process.env.TOKEN_SECRET as string;
    const token = jwt.sign( payload , key);
    return token;
    // jwt.verify();
// const authorizationHeader = req.headers.authorization
// const token = authorizationHeader.split(' ')[1]
}
export const verifyToken = (token:string):boolean=>{
    const key = process.env.TOKEN_SECRET as string;
    try {
        jwt.verify(token , key);
        return true;
    } catch (error) {
        return false;
    }
}