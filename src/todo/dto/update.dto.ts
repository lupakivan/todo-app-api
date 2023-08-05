import { IsDefined, IsString } from 'class-validator';
import { UpdateTodoPayload } from '../types';

export class UpdateDto implements UpdateTodoPayload {
  @IsString()
  @IsDefined()
  title: string;
}
