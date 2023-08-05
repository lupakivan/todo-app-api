import { TTodo } from './todo.type';

export type TUpdateTodoPayload = Omit<TTodo, 'id'>;
