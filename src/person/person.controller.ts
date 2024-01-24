/* eslint-disable */
import { Body, Controller, Post, Req, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { PersonService } from './person.service';
import { RegisterDto } from './dto/register.dto';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('photo'), FilesInterceptor('images', 3))
  async register(@Body() registerDto: RegisterDto, @Req() request: any): Promise<any> {
    const { files } = request;
    const { name } = registerDto;
    return this.personService.resizeImages(files, name);
  }
}
