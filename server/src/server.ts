import express from 'express'; 
import cors from 'cors';
import routes from './routes'; //arquivo da aplicação na mesma pasta do server (./)
import path from 'path';
import { errors } from 'celebrate';

const app = express();

app.use(cors());
app.use(express.json()); 
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(errors());

app.listen(3333);


