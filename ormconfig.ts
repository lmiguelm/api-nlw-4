import dotenv from 'dotenv';
dotenv.config();

import { ConnectionOptions } from 'typeorm';

const environments = {
  test: {
    type: 'sqlite',
    database: './src/database/database.test.sqlite'
  },
  dev: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'usbw',
    database: 'nlw_04_api'
  },
  prod: {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
  }
}

const options: ConnectionOptions = {
  ...environments[process.env.NODE_ENV as string],
  migrations: ['./src/database/migrations/*.ts'],
  entities: ['./src/models/*.ts'],
  cli: {
    migrationsDir: './src/database/migrations'
  }
}

export default options;
