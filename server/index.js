import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { PORT, DATABASE } from './config';

const app = express();
const appRouter = express.Router();
const port = process.env.PORT || PORT;

app.use(express.static(path.resolve(__dirname, '../front-end/build')));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(DATABASE, err => { if(err) console.log(err) });

import './models/User';
import { userRoutes } from './routes/User';
const User = mongoose.model('User');
appRouter.use('/user', userRoutes(User));

app.use('/api', appRouter);

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../front-end/build', 'index.html'));
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
