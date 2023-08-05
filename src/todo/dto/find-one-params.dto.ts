import { IsDefined, IsString } from 'class-validator';
import { TTodoId } from '../types/todo-id.type';

export class FindOneParamsDto {
  @IsString()
  @IsDefined()
  id: TTodoId;
}
