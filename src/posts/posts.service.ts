import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    return this.prisma.post.create({
      data: createPostDto,
    });
  }

  async findAll() {
    return this.prisma.post.findMany({
      where: {
        replyToId: null, 
      },
      include: {
        replies: {
          include: {
            replies: true, 
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        replies: {
          include: {
            replies: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
        replyTo: true,
      },
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  async remove(id: string) {
    await this.deleteRepliesRecursively(id);
    
    return this.prisma.post.delete({
      where: { id },
    });
  }

  private async deleteRepliesRecursively(postId: string) {
    const replies = await this.prisma.post.findMany({
      where: { replyToId: postId },
      select: { id: true },
    });

    for (const reply of replies) {
      await this.deleteRepliesRecursively(reply.id);
    }

    await this.prisma.post.deleteMany({
      where: { replyToId: postId },
    });
  }

  async findReplies(parentId: string) {
    return this.prisma.post.findMany({
      where: {
        replyToId: parentId,
      },
      include: {
        replies: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}
