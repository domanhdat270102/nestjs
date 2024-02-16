/* eslint-disable */
// import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
// import { CloudinaryService } from "./cloudinary.service";
// import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";

// @Controller('images')
// export class ImageController {
//     constructor(private readonly cloudinaryService: CloudinaryService) {}

//     @Post('upload')
//     @UseInterceptors(FileInterceptor('image'))
//     async uploadFile(@UploadedFile() file: Express.Multer.File) {
//         console.log('File path:', file.path); // Add this line
//         try {
//             const result = await this.cloudinaryService.uploadImage(file.path);
//             return result;
//         } catch (error) {
//             console.error('Error uploading image:', error);
//             throw new Error('Failed to upload image');
//         }
//     }

//     @Post('uploads')
//     @UseInterceptors(FilesInterceptor('images', 3)) // Specify the field name and maximum number of files
//     async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
//         console.log('Number of files:', files.length); // Add this line to check the number of uploaded files

//         try {
//             const uploadPromises = files.map(async (file) => {
//                 const result = await this.cloudinaryService.uploadImage(file.path);
//                 return result;
//             });

//             const results = await Promise.all(uploadPromises);
//             return results;
//         } catch (error) {
//             console.error('Error uploading images:', error);
//             throw new Error('Failed to upload images');
//         }
//     }
// }


import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { CloudinaryService } from "./cloudinary.service";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";

@Controller('images')
export class ImageController {
    constructor(private readonly cloudinaryService: CloudinaryService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('image'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        try {
            const result = await this.cloudinaryService.uploadImage(file.buffer, file.originalname);
            
            return result;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw new Error('Failed to upload image');
        }
    }

    @Post('uploads')
    @UseInterceptors(FilesInterceptor('images', 3))
    async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
        try {
            const uploadPromises = files.map(async (file) => {
                const result = await this.cloudinaryService.uploadImage(file.buffer, file.originalname);
                return result;
            });

            const results = await Promise.all(uploadPromises);
            return results;
        } catch (error) {
            console.error('Error uploading images:', error);
            throw new Error('Failed to upload images');
        }
    }
}
