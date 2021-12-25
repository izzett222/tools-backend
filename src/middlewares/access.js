import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

dotenv.config();
const prisma = new PrismaClient();
export default async function access(req, res, next) {
  try {
    const token = req.headers.authorization.slice(7);
    if (!token) {
      return res.status(401).json({
        message: 'authentication token not found. login or sign up and retry',
      });
    }

    const jwtObject = jwt.verify(token, process.env.JSON_SECRET);
    const user = await prisma.user.findUnique({
      where: { username: jwtObject.username },
      select: { password: false, username: true, id: true },
    });
    req.user = user;
    return next();
  } catch (error) {
    if (error.message === 'invalid token') {
      return res.status(401).json({
        message: 'invalid token, please re authenticate',
      });
    }
    if (error.message === 'jwt expired') {
      return res.status(401).json({
        message: 'jwt expired, please re authenticate',
      });
    }
    return res.status(500).json({
      message: 'server error',
    });
  }
}
