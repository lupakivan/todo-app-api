import { Todo } from './todo.type';

export type UpdateTodoPayload = Omit<Todo, 'id'>;
