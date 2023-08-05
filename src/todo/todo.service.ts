import { Injectable, NotFoundException } from '@nestjs/common';
import { getOrThrow } from '../utils';
import { CreateTodoPayload, Todo, UpdateTodoPayload } from './types';
import { TodoId } from './types/todo-id.type';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  create(payload: CreateTodoPayload): Todo {
    const todo = {
      id: Date.now().toString(),
      ...payload,
    };

    this.todos.push({ id: Date.now().toString(), ...todo });

    return todo;
  }

  findOne(id: TodoId): Todo {
    return getOrThrow(
      this.todos.find((todo) => todo.id === id),
      new NotFoundException(),
    );
  }

  findAll() {
    return this.todos;
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
}
