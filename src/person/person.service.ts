/* eslint-disable */
import { Injectable } from '@nestjs/common';
import {Person} from './person.entity'
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import cloudinary from './cloudinary.config'
import * as moment from 'moment';
@Injectable()
export class PersonService {
    constructor(
        @InjectRepository(Person)
        private readonly personRepository: Repository<Person>,
      ) {}

      async resizeImages(files, name: string): Promise<Person> {
        const upload = await cloudinary.uploader.upload(files.photo[0].path, {
            width: 50,
            height: 50,
            crop: 'fill',
          });
        
          const imageUploadPromises = files.images.map(async (image, i) => {
            return cloudinary.uploader.upload(image.path, {
              width: 500,
              height: 500,
              crop: 'fill',
              gravity: 'auto',
            });
          });
        
          const uploadedImages = await Promise.all(imageUploadPromises);
        
          // Save the processed data to the database
          try {
            const date = moment(new Date()).toDate(); 
            const personData = new Person();
            personData.name = name;
            personData.imgpath = upload.secure_url
            personData.images = uploadedImages.map((img) => img.secure_url)
            personData.date = date
        
            // Save the user data to the database using TypeORM
            await this.personRepository.save(personData);
        
            // Return the saved user data
            return personData;
          } catch (error) {
            // Handle any errors that occur during the save process
            throw error;
          }
      }
}
