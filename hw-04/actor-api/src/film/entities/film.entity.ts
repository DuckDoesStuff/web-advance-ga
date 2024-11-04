import {
	Column,
	Entity, PrimaryGeneratedColumn
} from 'typeorm';
import { Rating } from './rating.enum';
import { SpecialFeatures } from './special_features.set';

@Entity()
export class Film {
  @PrimaryGeneratedColumn({ type: 'tinyint' })
  filmId: Number;

  @Column('varchar', { length: 255 })
  title: String;

  @Column('text')
  description: String;

  @Column({type: 'year', width: 4})
  releaseYear: Number;

  @Column('tinyint')
  rentalDuration: Number;

  @Column('decimal', { precision: 4, scale: 2 })
  rentalRate: Number;

  @Column('smallint')
  length: Number;

  @Column('decimal', { precision: 5, scale: 2 })
  replacementCost: Number;

  @Column({
    type: 'enum',
    enum: Rating,
  })
  rating: Rating;

  @Column({
    type: 'set',
    enum: SpecialFeatures,
  })
  specialFeatures: SpecialFeatures;

  @Column('timestamp')
  lastUpdate: Date;
}
