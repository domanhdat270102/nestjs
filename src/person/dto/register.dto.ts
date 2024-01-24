import { IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  readonly name: string;
}