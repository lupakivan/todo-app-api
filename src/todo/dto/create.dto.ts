import { IsDefined, IsString } from 'class-validator';
import { CreateTodoPayload } from '../types';

export class CreateDto implements CreateTodoPayload {
  @IsString()
  @IsDefined()
  title: string;
}
