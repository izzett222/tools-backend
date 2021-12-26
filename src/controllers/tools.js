import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ log: ['query'] });
export default class ToolsController {
  static async create(req, res) {
    try {
      const { user } = req;
      const {
        name, description, link, lists, tags,
      } = req.body;
      const tagsObj = {
        connectOrCreate: tags.map((tag) => ({
          where: { userId_name: { name: tag, userId: user.id } },
          create: { name: tag, userId: user.id },
        })),
      };
      const listObj = lists === 'All my tools' ? undefined : {
        connectOrCreate: {
          where:
            { userId_name: { name: lists, userId: user.id } },
          create: { name: lists, userId: user.id },
        },
      };
      const createdTool = await prisma.tool.create({
        data: {
          name,
          description,
          link,
          lists: listObj,
          tags: tagsObj,
          user: { connect: { id: user.id } },
        },
        include: {
          tags: true,
          lists: true,
        },
      });
      return res.status(201).json({
        message: 'tool created successfully',
        data: createdTool,
      });
    } catch (error) {
      console.log(error);
      if (error.message.includes('Unique constraint failed on the fields: (`userId`,`name`)')) {
        return res.status(403).json({
          message: 'The tool already exist',
        });
      }
      return res.status(500).json({
        message: 'server error',
      });
    }
  }

  static async getAllTools(req, res) {
    try {
      const { user } = req;
      const queryString = new URLSearchParams(req.query);
      const list = queryString.get('list');
      const tools = await prisma.tool.findMany({
        where: {
          userId: user.id,
          lists: list === 'All my tools' ? undefined : {
            some: {
              name: list,
            },

          },
        },
        include: {
          lists: true,
          tags: true,
        },
      });
      return res.status(200).json({
        message: 'tools fetched successfully',
        data: tools,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'server error',
      });
    }
  }
}
