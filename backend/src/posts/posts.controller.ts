
import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostEntity } from './entities/post.entity';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Post()
    create(@Body() createPostDto: CreatePostDto): PostEntity {
        return this.postsService.create(createPostDto);
    }

    @Get()
    findAll(): PostEntity[] {
        return this.postsService.findAll();
    }

    @Get(':slug')
    findOne(@Param('slug') slug: string): PostEntity {
        return this.postsService.findOneBySlug(slug);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): void {
        return this.postsService.delete(id);
    }
}
