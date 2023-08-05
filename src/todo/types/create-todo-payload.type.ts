import { Todo } from './todo.type';

export type CreateTodoPayload = Omit<Todo, 'id' | 'isDone'>;
