const AWS = require('aws-sdk');
const Busboy = require('busboy');
const config = require('../../config/config');

const BUCKET_NAME = 'jeanlui21';
const IAM_USER_KEY = config.iamUser;
const IAM_USER_SECRET = config.iamSecret;

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

module.exports = (router) => {

  router.post('/api/upload', function (req, res, next) {

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
}