import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class ListsController {
  static async create(req, res) {
    try {
      const { user } = req;
      const { name } = req.body;
      const createdList = await prisma.list.create({
        data: {
          name,
          user: { connect: { id: user.id } },
        },
      });
      return res.status(201).json({
        message: 'list created successfully',
        data: {
          name: createdList.name,
          id: createdList.id,
        },
      });
    } catch (error) {
      if (error.message.includes('Unique constraint failed on the fields: (`userId`,`name`)')) {
        return res.status(403).json({
          message: 'list already exist',
        });
      }
      return res.status(500).json({
        message: 'server error',
      });
    }
  }

  static async getAllLists(req, res) {
    try {
      const { user } = req;
      const userList = await prisma.list.findMany({ where: { userId: user.id } });
      if (!userList.length) {
        return res.status(200).json({
          message: 'user doesn\'t have any custom list yet',
          data: userList,
        });
      }
      return res.status(200).json({
        message: 'user list fetched successfully',
        data: userList,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'server error',
      });
    }
  }
}
