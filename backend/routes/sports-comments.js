const express = require('express');

const router = express.Router();

const Comment = require('../models/sports-comments');

/* Add Comment */
router.post('/add-comment', (req, res, next) => {
  console.log(req.body.comment_name);
  const commentData = new Comment({
    parent_id: (req.body.parent_id) ? req.body.parent_id : '',
    blog_id: req.body.blog_id,
    name: req.body.comment_name,
    email: req.body.comment_email,
    comments: req.body.comment_box
  });
  commentData.save()
  .then(commentAdded => {
    res.status(200).json({
      status: 200,
      message: 'Comment added.'
    });
  })
  .catch(commentDeleted => {
    res.status(400).json({
      status: 400,
      message: 'Comment can\'t be added.'
    });
  });
});

/* Fetch Comments */
router.get('/get-comments', (req, res, next) => {
  const blogId = req.query.blogId;
  Comment.find({
    parent_id: '',
    blog_id: blogId
  })
  .sort([['createdDtm', -1]])
  .then(getParentComments => {
    res.status(200).json({
      status: 200,
      message: 'Parent comments received.',
      commentList: (getParentComments.length > 0) ? getParentComments : ''
    });
  })
  .catch(getCommentError => {
    res.status(404).json({
      status: 404,
      message: 'Comment not found.',
      commentList: []
    });
  });
});

/* Fetch Child Comments */
router.get('/get-child-comments', (req, res, next) => {
  const blogId = req.query.blogId;
  Comment.find({
    parent_id: {$ne: ''},
    blog_id: blogId
  })
  .sort([['createdDtm', -1]])
  .then(getParentComments => {
    res.status(200).json({
      status: 200,
      message: 'Child comments received.',
      commentList: (getParentComments.length > 0) ? getParentComments : ''
    });
  })
  .catch(getCommentError => {
    res.status(404).json({
      status: 404,
      message: 'Comment not found.',
      commentList: []
    });
  });
});

module.exports = router;
