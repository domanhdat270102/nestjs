/* eslint-disable */
// import {
//   Body,
//   Controller,
//   Get,
//   Post,
//   Query,
//   UnauthorizedException,
//   UploadedFile,
//   UploadedFiles,
//   UseGuards,
//   UseInterceptors,
// } from '@nestjs/common';
// import { AdminService } from './admin.service';
// import { CreateFestivalDto } from './dto/create-festival.dto';
// import { GetUser } from 'src/auth/get-user.decorator';
// import { User } from 'src/auth/user.entity';
// import { Festival } from './festival.entity';
// import { AuthGuard } from '@nestjs/passport';
// import { GetFestivalFilterDto } from './dto/get-festival-filters.dto';
// import { CloudinaryService } from './cloudinary.service';
// import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

// @Controller('admin')
// @UseGuards(AuthGuard())
// export class AdminController {
//   constructor(
//     private adminService: AdminService,
//     private readonly cloudinaryService: CloudinaryService
//   ) {} //thêm

//   @Get()
//   getFestivals(
//     @Query() filterDto: GetFestivalFilterDto,
//     @GetUser() user: User,
//   ): Promise<Festival[]> {
//     if (!user || !user.role || user.role !== 'admin') {
//       throw new UnauthorizedException(
//         'You do not have permission to access this resource',
//       );
//     }
//     return this.adminService.getFestivals(filterDto);
//   }

//   @Post()
//   createFestival(
//     @Body() createFestival: CreateFestivalDto,
//     @GetUser() user: User,
//   ): Promise<Festival> {
//     if (!user || !user.role || user.role !== 'admin') {
//       throw new UnauthorizedException(
//         'You do not have permission to access this resource',
//       );
//     }

//     return this.adminService.createFestival(createFestival, user);
//   }

//   // @Post('upload')
//   //   @UseInterceptors(
//   //     FileInterceptor('banner'),
//   //   )
//   //   async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() createFestival: CreateFestivalDto, user: User): Promise<Festival> {
//   //       try {
//   //           const result = await this.cloudinaryService.uploadImage(file.buffer, file.originalname);
//   //           console.log('result',result);

//   //           createFestival.banner = result.secure_url
//   //           if (!createFestival.description) {
//   //             // You can handle this based on your business logic
//   //             throw new Error('Description is required.');
//   //           }

//   //           console.log(createFestival);

//   //           return this.adminService.createFestival(createFestival, user);
//   //       } catch (error) {
//   //           console.error('Error uploading image:', error);
//   //           throw new Error('Failed to upload image');
//   //       }
//   //   }

//   @Post('upload')
//   @UseInterceptors(
//     // FileInterceptor('banner'),
//     FilesInterceptor('image', 3), // Adjust the number as needed
//     // FilesInterceptor('event', 3)   // Adjust the number as needed
//   )
//   async uploadFiles(
//     // @UploadedFile() bannerFile: Express.Multer.File,
//     @UploadedFiles() imageFiles: Array<Express.Multer.File>,
//     // @UploadedFiles() eventFiles: Array<Express.Multer.File>,
//     // @UploadedFile() videoFile: Express.Multer.File,
//     @Body() createFestival: CreateFestivalDto,
//     @GetUser() user: User
//   ): Promise<Festival> {
//     try {
//       // Upload banner image
//       // const bannerResult = await this.cloudinaryService.uploadImage(
//       //   bannerFile.buffer,
//       //   bannerFile.originalname
//       // );
//       // createFestival.banner = bannerResult.secure_url;

//       // const videoResult = await this.cloudinaryService.uploadImage(
//       //  videoFile.buffer,
//       //  videoFile.originalname
//       // );
//       // createFestival.video = videoResult.secure_url;

//       const imageUploadPromises = imageFiles.map(async (image1, i) => {
//         const result = await this.cloudinaryService.uploadImage(
//           image1.buffer,
//           image1.originalname
//         );
//         // Assign the result to the corresponding field in createFestival
//         createFestival.image[i] = result.secure_url;
//       });

//       // Upload event images
//       // const eventUploadPromises = eventFiles.map(async (eventImage, i) => {
//       //   const result = await this.cloudinaryService.uploadImage(
//       //     eventImage.buffer,
//       //     eventImage.originalname
//       //   );
//       //   // Assign the result to the corresponding field in createFestival
//       //   createFestival.event[i] = result.secure_url;
//       // });

//       // Wait for all uploads to complete
//       await Promise.all([...imageUploadPromises]);

//       return this.adminService.createFestival(createFestival, user);
//     } catch (error) {
//       console.error('Error uploading images:', error);
//       throw new Error('Failed to upload images');
//     }
//   }
// }



// import {
//   Body,
//   Controller,
//   Get,
//   Post,
//   Query,
//   UnauthorizedException,
//   UploadedFile,
//   UploadedFiles,
//   UseGuards,
//   UseInterceptors,
// } from '@nestjs/common';
// import { AdminService } from './admin.service';
// import { CreateFestivalDto, EventDto } from './dto/create-festival.dto';
// import { GetUser } from 'src/auth/get-user.decorator';
// import { User } from 'src/auth/user.entity';
// import { Festival } from './festival.entity';
// import { AuthGuard } from '@nestjs/passport';
// import { GetFestivalFilterDto } from './dto/get-festival-filters.dto';
// import { CloudinaryService } from './cloudinary.service';
// import {
//   FileFieldsInterceptor,
//   FileInterceptor,
//   FilesInterceptor,
// } from '@nestjs/platform-express';

// @Controller('admin')
// @UseGuards(AuthGuard())
// export class AdminController {
//   constructor(
//     private adminService: AdminService,
//     private readonly cloudinaryService: CloudinaryService,
//   ) {} //thêm


//   @Get()
//   getFestivals(
//     @Query() filterDto: GetFestivalFilterDto,
//     @GetUser() user: User,
//   ): Promise<Festival[]> {
//     if (!user || !user.role || user.role !== 'admin') {
//       throw new UnauthorizedException(
//         'You do not have permission to access this resource',
//       );
//     }
//     return this.adminService.getFestivals(filterDto);
//   }

//   @Post()
//   createFestival(
//     @Body() createFestival: CreateFestivalDto,
//     @GetUser() user: User,
//   ): Promise<Festival> {
//     if (!user || !user.role || user.role !== 'admin') {
//       throw new UnauthorizedException(
//         'You do not have permission to access this resource',
//       );
//     }

//     return this.adminService.createFestival(createFestival, user);
//   }

//   @Post('upload')
//   @UseInterceptors(
//     FileFieldsInterceptor([
//       { name: 'banner', maxCount: 1 },
//       { name: 'date', maxCount: 20 },
//       { name: 'artist', maxCount: 20 },
//       { name: 'donors', maxCount: 20 },
//       { name: 'video', maxCount: 1 },
//       { name: 'image', maxCount: 1 },
//       { name: 'event', maxCount: 2 },
//     ]),
//   )
//   async uploadFiles(
//     @UploadedFiles()
//     files: {
//       banner?: Express.Multer.File[];
//       donors?: Express.Multer.File[];
//       artist?: Express.Multer.File[];
//       video?: Express.Multer.File[];
//       event?: Express.Multer.File[];
//       date?: Express.Multer.File[];
//       image?: Express.Multer.File[];
//     },
//     @Body() createFestival: CreateFestivalDto,
//     @GetUser() user: User,
//   ): Promise<Festival> {
//     try {
//       if (files.banner && files.banner.length > 0) {
//         const bannerResult = await this.cloudinaryService.uploadImage(
//           files.banner[0].buffer,
//           files.banner[0].originalname,
//         );
//         createFestival.banner = bannerResult.secure_url;
//       }

//       if (files.video && files.video.length > 0) {
//         const videoResult = await this.cloudinaryService.uploadImage(
//           files.video[0].buffer,
//           files.video[0].originalname,
//         );
//         createFestival.video = videoResult.secure_url;
//       }

//       if (files.image && files.image.length > 0) {
//         const imageResult = await this.cloudinaryService.uploadImage(
//           files.image[0].buffer,
//           files.image[0].originalname,
//         );
//         createFestival.image = imageResult.secure_url;
//       }
      
//       // Assuming you want to upload event images to Cloudinary and store the URLs in the createFestival object
//       if (files.event && files.event.length > 0) {
//         const eventUploadPromises = files.event.map(async (eventFile) => {
//           const result = await this.cloudinaryService.uploadImage(
//             eventFile.buffer,
//             eventFile.originalname,
//           );
//           return result.secure_url;
//         });

//         // Wait for all uploads to complete
//         createFestival.event = await Promise.all(eventUploadPromises);
//       }

    //   if (files.donors && files.donors.length > 0) {
    //   const donorsUploadPromises = files.donors.map(async (donor) => {
    //     const result = await this.cloudinaryService.uploadImage(
    //       donor.buffer,
    //       donor.originalname,
    //     );
    //     return result.secure_url;
    //   });
    //   createFestival.donors = await Promise.all(donorsUploadPromises);
    // }

//     if (files.artist && files.artist.length > 0) {

//       const artistUploadPromises = files.artist.map(async (artistFile) => {
//         const result = await this.cloudinaryService.uploadImage(
//           artistFile.buffer,
//           artistFile.originalname,
//           );
//           return result.secure_url;
//         });
//         createFestival.artist = await Promise.all(artistUploadPromises);
//       }

//       if (files.date && files.date.length > 0) {
//         const dateUploadPromises = files.date.map(async (dateFile) => {
//           const result = await this.cloudinaryService.uploadImage(
//             dateFile.buffer,
//             dateFile.originalname,
//           );
//           return result.secure_url;
//         });
//         createFestival.date = await Promise.all(dateUploadPromises);
//       }
      
//       return this.adminService.createFestival(createFestival, user);
//     } catch (error) {
//       console.error('Error uploading images:', error);
//       throw new Error('Failed to upload images');
//     }
//   }
// }




import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UnauthorizedException,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateFestivalDto, EventDto } from './dto/create-festival.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Festival } from './festival.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetFestivalFilterDto } from './dto/get-festival-filters.dto';
import { CloudinaryService } from './cloudinary.service';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';

@Controller('admin')
@UseGuards(AuthGuard())
export class AdminController {
  constructor(
    private adminService: AdminService,
    private readonly cloudinaryService: CloudinaryService,
  ) {} //thêm


  @Get()
  getFestivals(
    @Query() filterDto: GetFestivalFilterDto,
    @GetUser() user: User,
  ): Promise<Festival[]> {
    if (!user || !user.role || user.role !== 'admin') {
      throw new UnauthorizedException(
        'You do not have permission to access this resource',
      );
    }
    return this.adminService.getFestivals(filterDto);
  }

  @Post()
  createFestival(
    @Body() createFestival: CreateFestivalDto,
    @GetUser() user: User,
  ): Promise<Festival> {
    if (!user || !user.role || user.role !== 'admin') {
      throw new UnauthorizedException(
        'You do not have permission to access this resource',
      );
    }

    return this.adminService.createFestival(createFestival, user);
  }

  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'banner', maxCount: 1 },
      { name: 'date', maxCount: 20 },
      { name: 'artist', maxCount: 20 },
      { name: 'donors', maxCount: 20 },
      { name: 'video', maxCount: 1 },
      { name: 'image', maxCount: 1 },
      { name: 'event', maxCount: 20 },
    ]),
  )
  async uploadFiles(
    @UploadedFiles()
    files: {
      banner?: Express.Multer.File[];
      donors?: Express.Multer.File[];
      artist?: Express.Multer.File[];
      video?: Express.Multer.File[];
      pictures?: Express.Multer.File[];
      date?: Express.Multer.File[];
      image?: Express.Multer.File[];
      event?: Express.Multer.File[];
    },
    @Body() createFestival: CreateFestivalDto,
    @GetUser() user: User,
  ): Promise<Festival> {
    try {
      if (files.banner && files.banner.length > 0) {
        const bannerResult = await this.cloudinaryService.uploadImage(
          files.banner[0].buffer,
          files.banner[0].originalname,
        );
        createFestival.banner = bannerResult.secure_url;
      }

      if (files.video && files.video.length > 0) {
        const videoResult = await this.cloudinaryService.uploadImage(
          files.video[0].buffer,
          files.video[0].originalname,
        );
        createFestival.video = videoResult.secure_url;
      }

      if (files.image && files.image.length > 0) {
        const imageResult = await this.cloudinaryService.uploadImage(
          files.image[0].buffer,
          files.image[0].originalname,
        );
        createFestival.image = imageResult.secure_url;
      }

    if (files.event && files.event.length > 0) {
      const eventUploadPromises = files.event.map(async (eventFile, i) => {
        // Extract information from filename
        const fileNameParts = eventFile.originalname.split('.');
        const name = fileNameParts[0]; // Extracted name from filename
        const slug = name.toLowerCase().replace(/\s+/g, '_');
    
        // Upload event file to Cloudinary and get the secure URL
        const result = await this.cloudinaryService.uploadImage(
          eventFile.buffer,
          eventFile.originalname,
        );

        
        // Create an event object and set its properties
        const eventObject = new EventDto();
        eventObject.name = name; // Set name from the extracted filename
        eventObject.pictures = [result.secure_url]; // Set pictures from the uploaded file
        eventObject.slug = slug;
        return eventObject;
      });
    
      // Wait for all uploads to complete and set the event property of createFestival
      createFestival.event = await Promise.all(eventUploadPromises);
    }



    // if (files.event && files.event.length > 0) {
    //   const eventUploadPromises = files.event.map(async (eventFile, i) => {
    //     // Extract information from filename
    //     const fileNameParts = eventFile.originalname.split('.');
    //     const name = fileNameParts[0]; // Extracted name from filename
    
    //     // Upload event file to Cloudinary and get the secure URL
    //     const result = await this.cloudinaryService.uploadImage(
    //       eventFile.buffer,
    //       eventFile.originalname,
    //     );
    
    //     // Create an event object and set its properties
    //     const eventObject: EventDto = {
    //       name: name, // Set name from the extracted filename
    //       pictures: [result.secure_url], // Set pictures from the uploaded file
    //     };
    
    //     return eventObject;
    //   });
    
    //   // Wait for all uploads to complete and set the event property of createFestival
    //   createFestival.event = await Promise.all(eventUploadPromises);
    // }
    
    
    
    if (files.donors && files.donors.length > 0) {
      const donorsUploadPromises = files.donors.map(async (donor) => {
        const result = await this.cloudinaryService.uploadImage(
          donor.buffer,
          donor.originalname,
        );
        return result.secure_url;
      });
      // createFestival.donors = await Promise.all(donorsUploadPromises);
      createFestival.donors = createFestival.donors || [];
      createFestival.donors.push(...(await Promise.all(donorsUploadPromises)));
    }

    if (files.artist && files.artist.length > 0) {

      const artistUploadPromises = files.artist.map(async (artistFile) => {
        const result = await this.cloudinaryService.uploadImage(
          artistFile.buffer,
          artistFile.originalname,
          );
          return result.secure_url;
        });
        createFestival.artist = await Promise.all(artistUploadPromises);
      }

      if (files.date && files.date.length > 0) {
        const dateUploadPromises = files.date.map(async (dateFile) => {
          const result = await this.cloudinaryService.uploadImage(
            dateFile.buffer,
            dateFile.originalname,
          );
          return result.secure_url;
        });
        createFestival.date = await Promise.all(dateUploadPromises);
      }
      
      return this.adminService.createFestival(createFestival, user);
    } catch (error) {
      console.error('Error uploading images:', error);
      throw new Error('Failed to upload images');
    }
  }
}
