// Third-party packages
import express from 'express';

// Local packages
import config from 'config';
import connect from './database/connect';
import routes from './routes';
import { deserializeUser } from './middleware';

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();

// Middleware
app.use(deserializeUser);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
  connect();
  routes(app);
});