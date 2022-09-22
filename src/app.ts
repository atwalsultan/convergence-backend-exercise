// Node modules
import express from 'express';

// Local modules
import config from 'config';
import connect from './database/connect';

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
  connect();
});