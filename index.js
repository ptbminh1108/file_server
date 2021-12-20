const express = require('express')
const app = express()
const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const readdir = require('fs/promises')

var cors = require('cors');

const corsOpts = {
    origin: '*',

    methods: [
        'GET',
        'POST',
    ],

    allowedHeaders: [
        'Content-Type',
    ],
};

app.use(cors(corsOpts));
app.use(express.static(path.join(__dirname, 'public')));




app.post('/upload_file', function (req, res) {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
        await saveFile(files.file);
        return res.status(201).send("");
    })
})

app.get('/list_files', async function (req, res) {


    getDirectories("./public",(err,files) =>{

        return res.status(201).send(files);

    })

    
})


function getDirectories(path, callback) {
    fs.readdir(path, function (err, content) {
        if (err) return callback(err)
        callback(null, content)
    })
}


const saveFile = async (file) => {

    const data = fs.readFileSync(file.filepath);
    fs.writeFileSync(`./public/${file.originalFilename}`, data);
    await fs.unlinkSync(file.filepath);
    return;
};




module.exports = app;
