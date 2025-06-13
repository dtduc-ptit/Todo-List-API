import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Like } from 'typeorm';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todo)
        private todoRepository: Repository<Todo>,
    ) {}

    async findAll(
    page: number,
    limit: number,
    title = '',
    sort = 'id',
    order: 'ASC' | 'DESC' = 'ASC'
    ) {
    const skip = limit * (page - 1);

    const where: any = {};

    if (title) {
        where.title = Like(`%${title}%`);
    }

    const [todos, total] = await this.todoRepository.findAndCount({ 
        select: ['id', 'title', 'description'], 
        skip, 
        take: limit, 
        where, 
        order: { [sort]: order },
    });

    return {
        data: todos,
        page,
        limit,
        total,
    };
    }

    async create(createTodoDto: CreateTodoDto, userId: number) {
        const todo = this.todoRepository.create({
            ...createTodoDto,
            userId
        });
        await this.todoRepository.save(todo);
        return {  id: todo.id, title: todo.title, description: todo.description};
    }

    async update(id: number, updateTodoDto: UpdateTodoDto, userId: number) {
        const todo = await this.todoRepository.findOne({ where: { id } });

        if (!todo) {
            throw new NotFoundException('Todo not found');
        }

        if (todo.userId !== userId) {
            throw new UnauthorizedException('Unauthorized');
        }

        Object.assign(todo, updateTodoDto);
        await this.todoRepository.save(todo);

        return { id: todo.id, title: todo.title, description: todo.description };
    }

    async remove(id: number, userId: number) {
        const todo = await this.todoRepository.findOne({ where: { id } });

        if (!todo) {
            throw new NotFoundException('Todo not found');
        }

        if (todo.userId !== userId) {
            throw new UnauthorizedException('Unauthorized');
        }

        await this.todoRepository.delete(todo);
    }

}