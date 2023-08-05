import { IsBoolean, IsDefined, IsString } from 'class-validator';
import { TUpdateTodoPayload } from '../types';

export class UpdateDto implements TUpdateTodoPayload {
  @IsString()
  @IsDefined()
  title: string;

  @IsDefined()
  @IsBoolean()
  isDone: boolean;
}
