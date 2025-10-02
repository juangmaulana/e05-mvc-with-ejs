import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

     // TODO: Implement
    async create(data: any) {
      return this.prisma.post.create({ data });
    }

    async findAll() {
      return this.prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
        include: { replies: true, replyTo: true },
      });
    }

    async findOne(id: string) {
      return this.prisma.post.findUnique({
        where: { id },
        include: { replies: true, replyTo: true },
      });
    }

    async update(id: string, data: any) {
      return this.prisma.post.update({
        where: { id },
        data,
      });
    }

    async remove(id: string) {
      return this.prisma.post.delete({
        where: { id },
      });
    }
}
