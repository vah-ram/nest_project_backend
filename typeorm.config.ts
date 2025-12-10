import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '12345',
  database: 'nest',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
});
