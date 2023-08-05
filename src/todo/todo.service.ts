import { Injectable, NotFoundException } from '@nestjs/common';
import { getOrThrow } from '../utils';
import { CreateTodoPayload, Todo, UpdateTodoPayload } from './types';
import { TodoId } from './types/todo-id.type';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  createTodo(payload: CreateTodoPayload): Todo {
    const todo = {
      id: Date.now().toString(),
      ...payload,
    };

    this.todos.push({ id: Date.now().toString(), ...todo });

    return todo;
  }

  getTodo(id: TodoId): Todo {
    return getOrThrow(
      this.todos.find((todo) => todo.id === id),
      new NotFoundException(),
    );
  }

  getAllTodos() {
    return this.todos;
  }

  updateTodo(id: TodoId, payload: UpdateTodoPayload): Todo {
    const todo = getOrThrow(this.getTodo(id), new NotFoundException());

    const updatedTodo: Todo = { ...todo, ...payload };
    const todos: Todo[] = this.todos.filter((todo) => todo.id !== id);

    this.todos = [...todos, { ...this.getTodo(id), ...payload }];

    return updatedTodo;
  }

  deleteTodo(id: TodoId): void {
    getOrThrow(this.getTodo(id), new NotFoundException());

    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}
