import * as dotenv from 'dotenv';
dotenv.config();

interface IDbCredentials {
  host: string | undefined;
  user: string | undefined;
  password: string | undefined;
  database: string | undefined;
  port: number | undefined;
}

const dbCredentials: IDbCredentials = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
};

export default dbCredentials;
