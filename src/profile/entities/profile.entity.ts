import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  photo: string;

  @Column()
  phone: number;

  @Column()
  bio: string;

  @Column()
  password: string;
}
