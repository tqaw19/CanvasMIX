const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');
const AWS = require('aws-sdk');
const Busboy = require('busboy');
const config = require('../config/config');
const BUCKET_NAME = 'jeanlui21';
const IAM_USER_KEY = config.iamUser;
const IAM_USER_SECRET = config.iamSecret;



router.get('/', async (req, res) =>{
    const tasks = await Contact.find();
    res.render('index', {
        tasks
    });
  
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Contact.remove({_id: id});
    res.redirect('/');

});

router.get('/edit/:id', async (req, res, next) => {
    const task = await Contact.findById(req.params.id);
    res.render('edit', {
        task
    });
});

router.post('/update/:id', async (req, res, next) => {
    const { id } = req.params;
    await Contact.update({_id: id}, req.body);
    res.redirect('/');
});

router.post('/add' , async (req, res) => {
    const task = new Contact(req.body);
    await task.save();
    res.redirect('/');
});

module.exports = router;

function uploadToS3(file) {
    let s3bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET,
      Bucket: BUCKET_NAME
    });
    s3bucket.createBucket(function () {
        var params = {
          Bucket: BUCKET_NAME,
          Key: file.name,
          Body: file.data
        };
        s3bucket.upload(params, function (err, data) {
          if (err) {
            console.log('error in callback');
            console.log(err);
          }
          console.log('success');
          console.log(data);
        });
    });
  }
  
 
router.post('/api/upload', (req, res, next) => {
  
      const element1 = req.body.element1;
  
      var busboy = new Busboy({ headers: req.headers });
  
      busboy.on('finish', function() {
        console.log('Upload finished');
        
  
        const file = req.files.element2;
        console.log(file);
        
        uploadToS3(file);
      });
  
      req.pipe(busboy);
    });
  