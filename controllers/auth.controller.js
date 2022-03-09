import fs from 'fs';
import randomKey from '../utils/index'


exports.setfiledata = (req, res) => {
    const append_data = req.body.employees;
    fs.appendFile('./db.json', JSON.stringify(append_data), 'utf8',
        function (err) {
            if (err) {
                res.send({ status: 400, msg: 'Something went wrong.' });
            } else {
                res.send({ status: 200, msg: 'Data is appended to file successfully.' });
            }
        });
}

exports.getfiledata = (req, res) => {
    fs.readFile('./db.json', function (err, data) {
        if (err) {
            res.send({ status: 400, msg: 'Something went wrong.' });
        } else {
            res.send({
                status: 200, data: JSON.parse(data.toString()), msg: `File read Successfully. The total processing time of the call is ${Date.now() - req.session.login} miliseconds`
            });
        }
    });
}

exports.uploadFile = (req, res) => {
    let sampleFile, uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.file;
    uploadPath = __dirname + '/../public/images/' + randomKey + '_' + sampleFile.name;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function (err) {
        if (err)
            return res.status(500).send(err);
        res.send('File uploaded!');
    });
}

