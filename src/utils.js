import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

//Hasheo password
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

//Verificación de password
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);
