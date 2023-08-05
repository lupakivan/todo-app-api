import { TTodo } from './todo.type';

export type TCreateTodoPayload = Omit<TTodo, 'id' | 'isDone'>;
