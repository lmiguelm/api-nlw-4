import dotenv from 'dotenv';
dotenv.config({
  path: process.env.NODE_ENV == 'development' ? '.env.development' : process.env.NODE_ENV == 'test' ? '.env.test' : '.env'
});

import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: process.env.DATABASE_TYPE as any,
  host: process.env.DATABASE_HOST as string,
  port: Number(process.env.DATABASE_PORT as string) || undefined,
  username: process.env.DATABASE_USERNAME as string,
  password: process.env.DATABASE_PASSWORD as string,
  database: process.env.DATABASE as string,
  cli: {
    migrationsDir: './src/database/migrations'
  },
  migrations: ['./src/database/migrations/*.ts'],
  entities: ['./src/models/*.ts'],
}

export default config;