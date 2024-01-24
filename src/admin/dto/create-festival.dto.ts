/* eslint-disable */
// import { IsArray, IsDateString, IsNotEmpty, IsString } from 'class-validator';

// export class CreateFestivalDto {
//   // @IsString()
//   // @IsNotEmpty()
//   banner: string;

//   // @IsString()
//   // @IsNotEmpty()
//   description: string;

//   // @IsString()
//   video: string;


//   image: string[];
//   artist: string[];
//   date: string[];
//   event: string[];
//   donors: string[];
// }


export class EventDto {
  name?: string;

  pictures?: string[];
}
import { IsArray, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateFestivalDto {
  // @IsString()
  // @IsNotEmpty()
  banner: string;

  // @IsString()
  // @IsNotEmpty()
  description: string;

  // @IsString()
  video: string;


  image: string[];
  artist: string[];
  date: string[];
  event: EventDto[];
  donors: string[];
}


  