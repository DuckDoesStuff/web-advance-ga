import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateActorDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Actor first name',
    type: String,
    example: 'John',
  })
  firstName: String;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Actor last name',
    type: String,
    example: 'Doe',
  })
  lastName: String;
}
