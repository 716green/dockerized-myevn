import express, { Request, Response } from 'express';
import dbConfig from './config/db.config';
import mysql from 'mysql';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '../.env' });
export const env = process.env;
const app = express();
const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : 5000;

console.log(dbConfig);
console.log('NODE_ENV=' + process.env.NODE_ENV);

const connection = mysql.createConnection(dbConfig);

app.get('/mysql', (_req: Request, res: Response) => {
  connection.connect();

  // connection.query('SELECT * FROM people;', (err, results, _fields) => {
  connection.query('SHOW tables;', (err, results, _fields) => {
    if (err) {
      console.error({ err });
    } else {
      console.log({ results });
      res.json(results);
    }
  });

  connection.end();
});

app.get('/', (_req: Request, res: Response) => {
  res.json({ hello: 'world' });
});

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
