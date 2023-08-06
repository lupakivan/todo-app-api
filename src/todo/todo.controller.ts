import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
  CreateDto,
  DeleteParamsDto,
  FindAllQueryDto,
  FindOneParamsDto,
  UpdateDto,
  UpdateParamsDto,
} from './dto';
import { TodoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';
import { TTodo } from './types';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() createTodoDto: CreateDto): Promise<TTodo> {
    const todo = await this.todoService.create(createTodoDto);

    return plainToInstance(TodoDto, todo, { excludeExtraneousValues: true });
  }

  @Get()
  async findAll(@Query() { search, limit }: FindAllQueryDto): Promise<TTodo[]> {
    const todos = await this.todoService.findAll({ search, limit });

    return plainToInstance(TodoDto, todos, { excludeExtraneousValues: true });
  }

  @Get(':id')
  async findOne(@Param() { id }: FindOneParamsDto): Promise<TTodo> {
    const todo = await this.todoService.findOne(id);

    return plainToInstance(TodoDto, todo, { excludeExtraneousValues: true });
  }

  @Patch(':id')
  async update(
    @Param() { id }: UpdateParamsDto,
    @Body() data: UpdateDto,
  ): Promise<TTodo> {
    const todo = await this.todoService.update(id, data);

    return plainToInstance(TodoDto, todo, { excludeExtraneousValues: true });
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param() { id }: DeleteParamsDto): Promise<void> {
    return this.todoService.delete(id);
  }

  @Delete()
  @HttpCode(204)
  deleteAll(): Promise<void> {
    return this.todoService.deleteAll();
  }
}
