import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateProfileDto {
  @IsUrl()
  photo: string = null;

  @IsNotEmpty()
  @IsString()
  name: string = null;

  @IsPhoneNumber()
  phone: number = null;

  @IsNotEmpty()
  @IsString()
  bio: string = null;

  @IsEmail()
  email: string = null;
}
