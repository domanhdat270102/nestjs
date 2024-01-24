/* eslint-disable */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UnauthorizedException,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CloudinaryService } from './cloudinary.service';
import { EventService } from './event.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './event.entity';
import { User } from 'src/auth/user.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { GetEventFilterDto } from './dto/get-event-filter.dto';

@Controller('event')
@UseGuards(AuthGuard())
export class EventController {
  constructor(
    private eventService: EventService,
    private readonly cloudinaryService: CloudinaryService,
  ) {} //thêm

  @Get()
  getEvent(
    @Query() filterDto: GetEventFilterDto,
    @GetUser() user: User,
  ): Promise<Event[]> {
    if (!user || !user.role || user.role !== 'admin') {
      throw new UnauthorizedException(
        'You do not have permission to access this resource',
      );
    }
    return this.eventService.getEvent(filterDto);
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'photo', maxCount: 20 },
      { name: 'vid', maxCount: 1 },
    ]),
  )
  async createEvent(
    @UploadedFiles()
    files: {
      photo?: Express.Multer.File[];
      vid?: Express.Multer.File[];
    },
    @Body() createEvent: CreateEventDto,
    @GetUser() user: User,
  ): Promise<Event> {
    if (!user || !user.role || user.role !== 'admin') {
      throw new UnauthorizedException(
        'You do not have permission to access this resource',
      );
    }

    try {
      if (files.vid && files.vid.length > 0) {
        const vidResult = await this.cloudinaryService.uploadImage(
          files.vid[0].buffer,
          files.vid[0].originalname,
        );
        createEvent.vid = vidResult.secure_url;
      }

      if (files.photo && files.photo.length > 0) {
        const eventUploadPromises = files.photo.map(async (photoFile, i) => {
          const result = await this.cloudinaryService.uploadImage(
            photoFile.buffer,
            photoFile.originalname,
          );

          return result.secure_url;
        });

        createEvent.photo = await Promise.all(eventUploadPromises);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      throw new Error('Failed to upload images');
    }

    return this.eventService.createEvent(createEvent, user);
  }


  @Get('/:name')
  getTaskByName(@Param('name') name: string): Promise<Event> {
    return this.eventService.getTaskByName(name)
  }
}
