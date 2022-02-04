const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs')
const logger = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

app.use(bodyParser());
app.set("json spaces", 2);
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(cors())
app.use(logger('dev'))
app.use(express.urlencoded({
    extended: false
}))
app.use(cookieParser())
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

const multer = require('multer')
const storage = multer.diskStorage({
    destination: 'public/file',
    filename: (req, file, cb) => {
        cb(null, makeid(12) +
            path.extname(file.originalname))
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 18000000 // 18 MB
    }
})

app.use('/', upload.single('file'), async(req, res) => {
  if(req.method === "GET") {
res.render('index', {})
  } else if (req.method === "POST") {
const deepai = require('deepai'); // OR include deepai.min.js as a script tag in your HTML

deepai.setApiKey(process.env.DEEPAI);

(async function() {
    var resp = await deepai.callStandardApi("waifu2x", {
            image: fs.createReadStream("./public/file/" + req.file.filename),
    });
   //console.log(resp);
  res.render('result', { urlimage: resp.output_url }), fs.unlinkSync("./public/file/" + req.file.filename)
})()
  }
})


const listener = app.listen(3000, () => {
  console.log("[ EXPRESS ] Your app listen on port " + listener.address().port);
});
