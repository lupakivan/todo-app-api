import { Expose } from 'class-transformer';
import { TTodo, TTodoId } from '../types';

export class TodoDto implements TTodo {
  @Expose()
  id: TTodoId;

  @Expose()
  title: string;

  @Expose()
  isDone: boolean;
}
