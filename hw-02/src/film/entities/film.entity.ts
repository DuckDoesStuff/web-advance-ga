import { Language } from 'src/language/entities/language.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Rating } from './rating.enum';
import { SpecialFeatures } from './special_features.set';
import { Exclude } from 'class-transformer';
import { Category } from '../../category/entities/category.entity';
import { Actor } from '../../actor/entities/actor.entity';

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

  @ManyToOne((type) => Language, (language) => language.films)
  @JoinColumn({ name: 'language_id' })
  language: Language;

  @ManyToOne((type) => Language, (language) => language.filmsOriginal)
  @JoinColumn({ name: 'original_language_id' })
  originalLanguage: Language;

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

  @ManyToMany((type) => Category, (category) => category.films)
  @JoinTable({
    name: 'film_category',
    joinColumn: {
      name: 'film_id',
      referencedColumnName: 'filmId',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'categoryId',
    },
  })
  categories: Category[];

  @ManyToMany((type) => Actor, (actor) => actor.films)
  @JoinTable({
    name: 'film_actor', // join table name
    joinColumn: {
      name: 'film_id', // column name use in join table
      referencedColumnName: 'filmId', // column name use in entity table
    },
    inverseJoinColumn: {
      name: 'actor_id', // column name use in join table
      referencedColumnName: 'actorId', // column name use in entity table
    },
  })
  actors: Actor[];
}
