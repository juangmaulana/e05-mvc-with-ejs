import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Render,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @Render('index')
  async findAll() {
    const posts = await this.postsService.findAll();
    return { posts };
  }

  @Get('new')
  @Render('new')
  showCreateForm() {
    return {};
  }

  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Res() res: Response) {
    await this.postsService.create(createPostDto);
    res.redirect('/posts');
  }

  @Get(':id')
  @Render('show')
  async findOne(@Param('id') id: string) {
    const post = await this.postsService.findOne(id);
    if (!post) {
      return { post: null };
    }
    return { post };
  }

  @Get(':id/edit')
  @Render('edit')
  async showEditForm(@Param('id') id: string) {
    const post = await this.postsService.findOne(id);
    if (!post) {
      return { post: null };
    }
    return { post };
  }

  @Post(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Res() res: Response,
  ) {
    await this.postsService.update(id, updatePostDto);
    res.redirect(`/posts/${id}`);
  }

  @Get(':id/reply')
  @Render('reply')
  async showReplyForm(@Param('id') id: string) {
    const post = await this.postsService.findOne(id);
    if (!post) {
      return { post: null };
    }
    return { post };
  }

  @Post(':id/delete')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.postsService.remove(id);
    res.redirect('/posts');
  }
}
