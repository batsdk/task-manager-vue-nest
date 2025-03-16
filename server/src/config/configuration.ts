export default () => ({
  port: parseInt(process.env.PORT!, 10) || 3000,
  jwt: {
    secret: process.env.JWT_SECRET || 'secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT!, 10) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '123456',
    name: process.env.DB_NAME || 'taskdb',
    synchronize: process.env.DB_SYNCHRONIZE === 'true' || true,
  },
});