import { Injectable, NotFoundException } from '@nestjs/common';
import { getOrThrow } from '../utils';
import {
  CreateTodoPayload,
  FindAllParams,
  Todo,
  TodoId,
  UpdateTodoPayload,
} from './types';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  create(payload: CreateTodoPayload): Todo {
    const todo = {
      id: Date.now().toString(),
      isDone: false,
      ...payload,
    };

    this.todos.push(todo);

    return todo;
  }

  findOne(id: TodoId): Todo {
    return getOrThrow(
      this.todos.find((todo) => todo.id === id),
      new NotFoundException(),
    );
  }

  findAll(params: FindAllParams): Todo[] {
    const filtered = this.todos.filter((todo: Todo) => {
      if (params.search) {
        return todo.title.includes(params.search);
      }

      return true;
    });

    if (params.limit) {
      return filtered.slice(0, params.limit);
    }

    return filtered;
  }

  update(id: TodoId, payload: UpdateTodoPayload): Todo {
    const todo = getOrThrow(this.findOne(id), new NotFoundException());

    const updatedTodo: Todo = { ...todo, ...payload };
    const todos: Todo[] = this.todos.filter((todo) => todo.id !== id);

    this.todos = [...todos, { ...this.findOne(id), ...payload }];

    return updatedTodo;
  }

  delete(id: TodoId): void {
    getOrThrow(this.findOne(id), new NotFoundException());

    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  deleteAll(): void {
    this.todos = [];
  }
}
