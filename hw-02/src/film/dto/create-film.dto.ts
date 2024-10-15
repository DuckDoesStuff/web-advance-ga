import { IsEnum, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { Rating } from '../entities/rating.enum';
import { SpecialFeatures } from '../entities/special_features.set';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFilmDto {
  @ApiProperty({
    description: 'Title of the film',
    example: 'Inception',
  })
  @IsString()
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
  @IsInt()
  releaseYear: number;

  @ApiProperty({
    description: 'Length of the film in minutes',
    example: 148,
    minimum: 1,
  })
  @IsNumber()
  length: number;

  @ApiProperty({
    description: 'Language of the film',
    example: 'English',
  })
  @IsString()
  language: string;

  @ApiProperty({
    description: 'Original language of the film',
    example: 'English',
  })
  @IsString()
  originalLanguage: string;

  @ApiProperty({
    description: 'Rating of the film',
    enum: Rating,
    example: Rating.PG_13,
  })
  @IsEnum(Rating)
  rating: Rating;

  @ApiProperty({
    description: 'Special features included in the film',
    enum: SpecialFeatures,
    example: SpecialFeatures['Behind the Scenes'],
  })
  @IsEnum(SpecialFeatures)
  specialFeatures: SpecialFeatures;
}
