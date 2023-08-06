import { IsDefined, IsOptional, IsString } from 'class-validator';
import { TUpdateTodoPayload } from '../types';

export class UpdateDto implements TUpdateTodoPayload {
  @IsString()
  @IsOptional()
  title: string;

  @IsDefined()
  @IsOptional()
  isDone: boolean;
}
