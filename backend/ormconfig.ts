export default [
  {
    name: 'default',

    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,

    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,

    entities: ['./src/modules/**/typeorm/entities/**/*.ts'],
    migrations: ['./src/shared/infrastructure/typeorm/migrations/*.ts'],

    cli: {
      migrationsDir: './src/shared/infrastructure/typeorm/migrations',
    },
  },
  {
    name: 'mongo',

    type: 'mongodb',
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,

    database: process.env.MONGO_DB_NAME,
    useUnifiedTopology: true,

    entities: ['./src/modules/**/typeorm/schemas/**/*.ts'],
  },
];
