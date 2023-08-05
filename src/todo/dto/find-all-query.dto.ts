import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class FindAllQueryDto {
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  limit: number;

  @IsString()
  @IsOptional()
  search: string;

  @IsOptional()
  @IsBoolean()
  isDone: boolean;
}
