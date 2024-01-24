/* eslint-disable */
// import { DataSource, Repository } from 'typeorm';
// import { BadRequestException, Injectable } from '@nestjs/common';
// import { User } from '../auth/user.entity';
// import { Festival } from './festival.entity';
// import { CreateFestivalDto } from './dto/create-festival.dto';
// import { GetFestivalFilterDto } from './dto/get-festival-filters.dto';
// import { CloudinaryService } from 'src/uploads/cloudinary.service';

// @Injectable()
// export class FestivalRepository extends Repository<Festival> {
//   constructor(private dataSource: DataSource) {
//     super(Festival, dataSource.createEntityManager());
//   }

//   async getFestivals(filterDto: GetFestivalFilterDto): Promise<Festival[]> {
//     const { search, status, sortBy, page, limit } = filterDto;
//     const query = this.createQueryBuilder('festival');
    

//     if (status) {
//       query.andWhere('festival.status = :status', { status });
//     }

//     if (sortBy) {
//       const [sortField, sortOrder] = sortBy.split(':');
      
//       if (['ASC', 'DESC'].includes(sortOrder.toUpperCase())) {
//         query.orderBy(`festival.${sortField}`, sortOrder.toUpperCase() as 'ASC' | 'DESC');
//       } else {
//         throw new BadRequestException('Invalid sortOrder value. Use "ASC" or "DESC".');
//       }
//     } else {
//       // Default sorting by createdAt in descending order
//       query.orderBy('festival.id', 'ASC');
//     }

//     if (page && limit) {
//       const skip = (+page - 1) * +limit;
//       query.skip(skip).take(+limit);
//     }
//     const festivals = await query.getMany();
//     return festivals;
//   }

//   async createFestival(createFestivalDto: CreateFestivalDto, user: User): Promise<Festival> {
//     const {artist,banner,date,description,event,image,video, donors } = createFestivalDto;

//     const festival = this.create({
//       artist,
//       banner,
//       date,
//       description,
//       event,
//       image,
//       video,
//       donors
//     });

//     await this.save(festival);
//     return festival;
//   }
// }


import { DataSource, Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../auth/user.entity';
import { Festival } from './festival.entity';
import { CreateFestivalDto } from './dto/create-festival.dto';
import { GetFestivalFilterDto } from './dto/get-festival-filters.dto';
import { CloudinaryService } from 'src/uploads/cloudinary.service';

@Injectable()
export class FestivalRepository extends Repository<Festival> {
  constructor(private dataSource: DataSource) {
    super(Festival, dataSource.createEntityManager());
  }

  async getFestivals(filterDto: GetFestivalFilterDto): Promise<Festival[]> {
    const { search, status, sortBy, page, limit } = filterDto;
    const query = this.createQueryBuilder('festival');
    

    if (status) {
      query.andWhere('festival.status = :status', { status });
    }

    if (sortBy) {
      const [sortField, sortOrder] = sortBy.split(':');
      
      if (['ASC', 'DESC'].includes(sortOrder.toUpperCase())) {
        query.orderBy(`festival.${sortField}`, sortOrder.toUpperCase() as 'ASC' | 'DESC');
      } else {
        throw new BadRequestException('Invalid sortOrder value. Use "ASC" or "DESC".');
      }
    } else {
      // Default sorting by createdAt in descending order
      query.orderBy('festival.id', 'ASC');
    }

    if (page && limit) {
      const skip = (+page - 1) * +limit;
      query.skip(skip).take(+limit);
    }
    const festivals = await query.getMany();
    return festivals;
  }

  async createFestival(createFestivalDto: CreateFestivalDto, user: User): Promise<Festival> {
    const {artist,banner,date,description,event,image,video, donors } = createFestivalDto;

    const festival = this.create({
      artist,
      banner,
      date,
      description,
      event: event || [],
      image,
      video,
      donors
    });

    await this.save(festival);
    return festival;
  }
}
