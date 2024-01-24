/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Festival } from './festival.entity';
import { FestivalRepository } from './festival.repository';
import { CreateFestivalDto } from './dto/create-festival.dto';
import { User } from 'src/auth/user.entity';
import { GetFestivalFilterDto } from './dto/get-festival-filters.dto';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(FestivalRepository)
        private festivalRepository: FestivalRepository,
    ) {}

    getFestivals(filterDto: GetFestivalFilterDto): Promise<Festival[]> {
        return this.festivalRepository.getFestivals(filterDto);
      }
    

    createFestival(createFestivalDto: CreateFestivalDto, user: User): Promise<Festival> {
        return this.festivalRepository.createFestival(createFestivalDto, user);
    }
}
