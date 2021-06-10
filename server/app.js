import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import usersRoutes from './routes/user.routes';
import invitationRoutes from './routes/invitation.routes';

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  return next();
});

app.use('/api', usersRoutes);
app.use('/api', invitationRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to SDA Church contribution Rest API api',
  });
});

app.use((req, res) => {
  res.type('json').status(404).json({
    status: 404,
    message: '404 Page not found',
  });
});

app.listen(port, console.log(`The app is running at localhost on port: ${port}`));

mongoose.connect('mongodb://localhost/remark', {
  useNewUrlParser: true,
});

mongoose.connection
  .once('open', () => console.log('Database Connected :)'))
  .on('error', (error) => {
    console.log('Error', error);
  });

export default app;
