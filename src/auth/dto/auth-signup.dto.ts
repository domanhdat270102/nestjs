/* eslint-disable */
import { IsEnum, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { RoleStatus } from '../role-status.enum';

export class AuthSignUpCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;

  @IsEnum(RoleStatus)
  role: RoleStatus
}
