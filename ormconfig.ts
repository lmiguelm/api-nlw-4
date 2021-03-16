import dotenv from 'dotenv';
dotenv.config({
  path: process.env.NODE_ENV == 'development' ? '.env.development' : process.env.NODE_ENV == 'test' ? '.env.test' : 'env'
});

const defaultConfig = {
  cli: {
    migrationsDir: './src/database/migrations'
  },
  migrations: ['./src/database/migrations/*.ts'],
  entities: ['./src/models/*.ts'],
}

let config;

if (process.env.NODE_ENV == 'development') {
  config = {
    ...defaultConfig,
    type: process.env.DATABASE_TYPE as string,
    host: process.env.DATABASE_HOST as string,
    port: process.env.DATABASE_PORT as string,
    username: process.env.DATABASE_USERNAME as string,
    password: process.env.DATABASE_PASSWORD as string,
    database: process.env.DATABASE as string,
  }
} else if (process.env.NODE_ENV == 'test') {
  config = {
    ...defaultConfig,
    type: process.env.DATABASE_TYPE as string,
    database: process.env.DATABASE as string,
  }
} else {
  config = {
    ...defaultConfig,
    type: process.env.DATABASE_TYPE as string,
    host: process.env.DATABASE_HOST as string,
    port: process.env.DATABASE_PORT as string,
    username: process.env.DATABASE_USERNAME as string,
    password: process.env.DATABASE_PASSWORD as string,
    database: process.env.DATABASE as string,
  }
}

export default config;