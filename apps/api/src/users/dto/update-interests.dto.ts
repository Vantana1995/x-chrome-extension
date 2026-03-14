import { ArrayMaxSize, IsArray, IsUUID } from 'class-validator';

export class UpdateInterestsDto {
  @IsArray()
  @IsUUID('4', { each: true })
  @ArrayMaxSize(5)
  categoryIds: string[];
}

