import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const prisma = new PrismaClient();
dotenv.config();

export default class UserController {
  static async create(req, res) {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });
    if (user) {
      return res.status(403).json({ message: 'user already exist' });
    }
    const incryptedPassword = await bcrypt.hash(password, 10);
    const createdUser = await prisma.user.create({
      data: {
        username,
        password: incryptedPassword,
      },

    });
    const token = jwt.sign({
      username: createdUser.username,
      id: createdUser.id,
    }, process.env.JSON_SECRET);
    return res.status(201).json({
      message: 'user created successfully',
      data: {
        username: createdUser.username,
        token,
      },
    });
  }

  static async login(req, res) {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res.status(403).json({
        message: 'Wrong username or password',
      });
    }
    const isPasswordCorrent = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrent) {
      return res.status(403).json({
        message: 'Wrong username or password',
      });
    }
    const token = jwt.sign({
      username: user.username,
      id: user.id,
    }, process.env.JSON_SECRET);
    return res.status(200).json({
      message: 'user logged in successfully',
      data: {
        username: user.username,
        token,
      },
    });
  }

  static async getUser(req, res) {
    try {
      const { user } = req;
      return res.status(200).json({
        message: 'user found',
        data: {
          username: user.username,
          id: user.id,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: 'server error',
      });
    }
  }
}
