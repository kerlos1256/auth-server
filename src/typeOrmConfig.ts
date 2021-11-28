import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Profile } from './profile/entities/profile.entity';

export const TOConfig: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'auth app',
  port: 5432,
  username: 'postgres',
  password: '123456',
  entities: [Profile],
  synchronize: true,
};
