
import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
    private posts: Post[] = [];
    private idCounter = 1;

    constructor() {
        // Seed some initial data for demonstration
        this.create({
            title: 'Welcome to NextNest',
            content: 'This is a demo post demonstrating NestJS backend.',
            author: 'Admin',
        });
    }

    create(createPostDto: CreatePostDto): Post {
        const newPost: Post = {
            id: this.idCounter++,
            ...createPostDto,
            slug: this.generateSlug(createPostDto.title),
            createdAt: new Date(),
        };
        this.posts.push(newPost);
        return newPost;
    }

    findAll(): Post[] {
        return this.posts;
    }

    findOneBySlug(slug: string): Post {
        const post = this.posts.find(p => p.slug === slug);
        if (!post) {
            throw new NotFoundException(`Post with slug "${slug}" not found`);
        }
        return post;
    }

    delete(id: number): void {
        const index = this.posts.findIndex(p => p.id === id);
        if (index === -1) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }
        this.posts.splice(index, 1);
    }

    private generateSlug(title: string): string {
        return title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '') + '-' + Date.now().toString().slice(-4); // Ensure uniqueness simply
    }
}
