import { TTodoId } from './todo-id.type';

export type TTodo = {
  id: TTodoId;
  title: string;
  isDone: boolean;
};
