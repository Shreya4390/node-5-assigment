import express from 'express';
import fs from 'fs';
import authentication from '../middleware/verifyToken'
var router = express.Router();

router.post('/auth/setdata', authentication, (req, res) => {
    const append_data = req.body.employees;
    fs.appendFile('./db.json', JSON.stringify(append_data), 'utf8',
        function (err) {
            if (err) {
                res.send({ status: 400, msg: 'Something went wrong.' });
            } else {
                res.send({ status: 200, msg: 'Data is appended to file successfully.' });
            }
        });
});


router.get('/auth/getdata', authentication, (req, res) => {
    fs.readFile('./db.json', function (err, data) {
        if (err) {
            res.send({ status: 400, msg: 'Something went wrong.' });
        } else {
            res.send({ status: 200, data: JSON.parse(data.toString()), msg: 'File read Successfully.' });
        }
    });
});

export default router;