import { IsOptional, IsString } from 'class-validator';

export class UpdateProfileDTO {
  @IsString()
  @IsOptional()
  name?: string;
}
