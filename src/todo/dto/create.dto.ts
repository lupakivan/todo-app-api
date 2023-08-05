import { IsDefined, IsString } from 'class-validator';
import { TCreateTodoPayload } from '../types';

export class CreateDto implements TCreateTodoPayload {
  @IsString()
  @IsDefined()
  title: string;
}
