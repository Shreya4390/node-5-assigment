import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import authRouter from './routes/auth';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const host = 'localhost';
const port = 5000;

const app = express();

// Enable files upload
app.use(fileUpload({
    createParentPath: true
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

// Creating session 
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 } }))

app.use((req, res, next) => {
    req.session.login = Date.now()
    next();
});

app.use('/api', authRouter);

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});


