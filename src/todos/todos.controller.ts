import { Controller, Get } from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
    constructor(private todosService: TodosService) {}


    @Get()
    HelloWorld(): string {
        return 'Hello World from Todos!';
    }
}