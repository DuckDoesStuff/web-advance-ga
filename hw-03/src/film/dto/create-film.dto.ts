import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Rating } from '../entities/rating.enum';
import { SpecialFeatures } from '../entities/special_features.set';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFilmDto {
  @ApiProperty({
    description: 'Title of the film',
    example: 'Inception',
  })
  @IsString()
  @IsNotEmpty({message: "title is required"})
  title: string;

  @ApiPropertyOptional({
    description: 'Description of the film',
    example: 'A mind-bending thriller about dream invasion.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Release year of the film',
    example: 2010,
    maximum: new Date().getFullYear(),
  })
  @IsNotEmpty({message: "releaseYear is required"})
  @IsInt()
  releaseYear: number;

  @ApiProperty({
    description: 'Length of the film in minutes',
    example: 148,
    minimum: 1,
  })
  @IsNotEmpty({message: "length is required"})
  @IsNumber()
  length: number;

  @ApiProperty({
    description: 'Language of the film',
    example: 'English',
  })
  @IsString()
  @IsNotEmpty({message: "language is required"})
  language: string;

  @ApiProperty({
    description: 'Original language of the film',
    example: 'English',
  })
  @IsNotEmpty({message: "originalLanguage is required"})
  @IsString()
  originalLanguage: string;

  @ApiProperty({
    description: 'Rating of the film',
    enum: Rating,
    example: Rating.PG_13,
  })
  @IsEnum(Rating)
  @IsNotEmpty({message: "rating is required"})
  rating: Rating;

  @ApiProperty({
    description: 'Special features included in the film',
    enum: SpecialFeatures,
    example: SpecialFeatures['Behind the Scenes'],
  })
  @IsEnum(SpecialFeatures)
  @IsNotEmpty({message: "specialFeatures is required"})
  specialFeatures: SpecialFeatures;
}
