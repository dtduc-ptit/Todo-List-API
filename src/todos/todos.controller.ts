import { Body, Controller, Get, Post, Delete, UseGuards, Param, Put, Request, HttpStatus, HttpCode, Query } from '@nestjs/common';
import { TodosService } from './todos.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';


@Controller('todos')
@UseGuards(AuthGuard)
export class TodosController {
    constructor(private todosService: TodosService) {}

    @Get()
    findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('title') title = '',
    @Query('sort') sort = 'id',
    @Query('order') order: 'ASC' | 'DESC' = 'ASC'
    ) {
    return this.todosService.findAll(
        parseInt(page, 10),
        parseInt(limit, 10),
        title,
        sort,
        order
    );
    }

    @Post()
    create(@Body() createTodoDto: CreateTodoDto, @Request() req: any) {
        return this.todosService.create(createTodoDto, req.user.sub);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto, @Request() req: any) {
        return this.todosService.update(id, updateTodoDto, req.user.sub);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    delete(@Param('id') id: number, @Request() req: any) {
        return this.todosService.remove(id, req.user.sub);
    }
}