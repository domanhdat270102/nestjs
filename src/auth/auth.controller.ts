/* eslint-disable */
import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards, } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { Response } from 'express';
import { AuthSignUpCredentialsDto } from './dto/auth-signup.dto';
import { JwtService } from '@nestjs/jwt';
import { SendResetPasswordEmailDto } from './dto/send-reset-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private jwtService: JwtService,) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthSignUpCredentialsDto): Promise<User> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Res({passthrough: true}) res: Response
  ): Promise<{ accessToken: string }> {
    return this.authService.SignIn(authCredentialsDto, res)
  }

  @Post('forgot-password')
  async sendResetPasswordEmail(
    @Body() sendResetPasswordEmailDto: SendResetPasswordEmailDto,
  ): Promise<void> {
    await this.authService.sendResetPasswordEmail(sendResetPasswordEmailDto);
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<{email: string, newPassword: string }> {
    return await this.authService.resetPassword(resetPasswordDto);
  }




  @Get('/all')
  getAllUsers(
    // @Query() filterDto: GetTasksFilterDto,
  ): Promise<User[]> {
    return this.authService.getAllUsers()
  }

  @Post('/signout')
  signOut(@Req() req: Request, @Res() res: Response) {
    // Xóa cookie chứa JWT
    res.clearCookie('auth-cookie',{ expires: new Date(0) });
    // Gửi phản hồi cho client
    res.send({ message: 'Logged out successfully' });
  }

//   @Post('/test')
//   @UseGuards(AuthGuard())
//   test(@Req() req) {
//     console.log(req);
//   }
}
