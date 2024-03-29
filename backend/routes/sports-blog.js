const express = require('express');
const multer = require('multer');

const router = express.Router();

/* Setting Up Image Storage */
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/gif': 'gif'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if(isValid) {
      error = null;
    }
    cb(error, 'backend/images');
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, fileName + '-' + Date.now() + '.' + ext);
  }
});

/* const fileUpload = multer({ storage: storage}).single('image'); */

const SportsBlogModel = require('../models/sports-news');

/* Add Blog */
router.post('/add-blog', multer({ storage: storage }).single('blog_image'), (req, res, next) => {
  let imagePath;
  if(req.file) {
    const serverURL = req.protocol + '://' + req.get('host');
    imagePath = serverURL + '/images/' + req.file.filename;
  } else {
    imagePath = req.body.image;
  }
  const newBlog = new SportsBlogModel({
    blog_title: req.body.title,
    blog_description: req.body.desc,
    blog_image: imagePath
  });
  newBlog.save()
  .then(blogAdded => {
    res.status(200).json({
      status: 200,
      message: 'Blog added successfully'
    });
  })
  .catch(blogAddError => {
    res.status(400).json({
      status: 400,
      message: 'Blog can\'t be added'
    })
  })
});

/* Fetch Blogs */
router.get('/get-blogs', (req, res, next) => {
  SportsBlogModel.find().sort([['createdDtm', -1]])
  .then(blogData => {
    res.status(200).json({
      status: 200,
      message: 'Blog fetched',
      blogData: blogData
    });
  })
  .catch(blogListError => {
    res.status(404).json({
      status: 404,
      message: 'Blog fetched',
      blogData: blogListError
    });
  })
});

/* Fetch Blog Details */
router.get('/get-blog', (req, res, next) => {
  SportsBlogModel.findById(req.query.blog_id)
  .then(blogData => {
    res.status(200).json({
      status: 200,
      message: 'Blog fetched',
      blogDetails: blogData
    });
  })
  .catch(blogListError => {
    res.status(404).json({
      status: 404,
      message: 'Blog fetched',
      blogDetails: blogListError
    });
  })
});

router.put('/update-blog', multer({ storage: storage }).single('blog_image'), (req, res, next) => {

  if(!req.file) {
    let blogData = {
      blog_title: req.body.blog_title,
      blog_description: req.body.blog_desc,
      blog_image: req.body.blog_image
    }
    SportsBlogModel.updateOne({
      _id: req.body.blogId
    }, blogData)
      .then(blogUpdated => {
        res.status(200).json({
          status: 200,
          message: 'Blog updated successfully.'
        });
      })
      .catch(blogUpdateError => {
        res.status(400).json({
          status: 400,
          message: 'Blog update failed.'
        });
      });
  } else {

    let serverURL = req.protocol + '://' + req.get('host');
    let imagePath = serverURL + '/images/' + req.file.filename
    let blogData = {
      blog_title: req.body.blog_title,
      blog_description: req.body.blog_desc,
      blog_image: imagePath
    }
    SportsBlogModel.updateOne({
      _id: req.body.blogId
    }, blogData)
      .then(blogUpdated => {
        res.status(200).json({
          status: 200,
          message: 'Blog updated successfully.'
        });
      })
      .catch(blogUpdateError => {
        res.status(400).json({
          status: 400,
          message: 'Blog update failed.'
        });
      });
  }
});


module.exports = router;
