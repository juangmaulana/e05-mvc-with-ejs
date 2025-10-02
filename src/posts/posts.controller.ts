import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

    // TODO: Implement
    @Get()
    async findAll() {
      return this.postsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.postsService.findOne(id);
    }

    @Post()
    async create(@Body() createPostDto: CreatePostDto) {
      return this.postsService.create(createPostDto);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
      return this.postsService.update(id, updatePostDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
      return this.postsService.remove(id);
    }
}
