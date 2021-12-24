import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3009;

app.use('/api', routes);
app.listen(port, () => process.stdout.write(`Server is running on http://localhost:${port}`));
