import express from 'express';
import bodyParser from 'body-parser';
import authRouter from './routes/auth';

const host = 'localhost';
const port = 8000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', authRouter);

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
