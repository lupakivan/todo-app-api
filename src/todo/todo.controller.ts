import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  CreateDto,
  DeleteParamsDto,
  FindAllQueryDto,
  FindOneParamsDto,
  UpdateDto,
  UpdateParamsDto,
} from './dto';
import { TodoService } from './todo.service';
import { Todo } from './types';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateDto): Todo {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  findAll(@Query() { search, limit }: FindAllQueryDto): Todo[] {
    return this.todoService.findAll({ search, limit });
  }

  @Get(':id')
  findOne(@Param() { id }: FindOneParamsDto): Todo {
    return this.todoService.findOne(id);
  }

  @Put(':id')
  update(@Param() { id }: UpdateParamsDto, @Body() data: UpdateDto): Todo {
    return this.todoService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param() { id }: DeleteParamsDto): void {
    return this.todoService.delete(id);
  }

  @Delete()
  @HttpCode(204)
  deleteAll(): void {
    return this.todoService.deleteAll();
  }
}
