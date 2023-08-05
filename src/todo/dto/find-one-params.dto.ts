import { IsDefined, IsString } from 'class-validator';
import { TodoId } from '../types/todo-id.type';

export class FindOneParamsDto {
  @IsString()
  @IsDefined()
  id: TodoId;
}
