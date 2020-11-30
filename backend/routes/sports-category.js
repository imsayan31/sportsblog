const express = require('express');

const router = express.Router();

const SportsCategory = require('../models/sports-category');

/* Fetch Categories */
router.get('/get-categories', (req, res, next) => {
  SportsCategory.find()
  .then(fetchCats => {
    res.status(200).json({
      status: 200,
      message: 'Category fetched successfully',
      categories: fetchCats
    });
  })
  .catch(catListError => {
    res.status(404).json({
      status: 404,
      message: 'No category found',
      categories: []
    });
  })
});

/* Add New Category */
router.post('/add-category', (req, res, next) => {
  const sportsCat = new SportsCategory({
    category_name: req.body.category_name,
    category_desc: req.body.category_desc
  });
  sportsCat.save()
  .then(catSuccess => {
    res.status(200).json({
      status: 200,
      message: 'Category created successfully.'
    });
  })
  .catch(catErr => {
    res.status(404).json({
      status: 400,
      message: 'Category can\'t be added.'
    });
  })
});

/* Delete Existing Category */
router.delete('/delete-category/:id', (req, res, next) => {
  SportsCategory.deleteOne({
    _id: req.params.id
  }).then(catDeleteSuc => {
    res.status(200).json({
      status: 200,
      message: 'Category deleted successfully.'
    });
  }).catch(catDelError => {
    res.status(404).json({
      status: 400,
      message: 'Category can\'t be deleted.'
    });
  });
});

/* Fetch details of a category */
router.get('/get-category-details', (req, res, next) => {
  SportsCategory.findById(req.query.catId)
  .then(categoryDetails => {
    res.status(200).json({
      status: 200,
      message: 'Category details fetched successfully.',
      catDetails: categoryDetails
    });
  })
  .catch(categoryError => {
    res.status(404).json({
      status: 404,
      message: 'Category detals not found.'
    });
  })
});

/* Update Category Details */
router.put('/update-category', (req, res, next) => {
  const dataToUpdate = {
    category_name: req.body.category_name,
    category_desc: req.body.category_desc
  }
  SportsCategory.updateOne({ _id: req.body.category_id}, dataToUpdate)
  .then(catDataUpdated => {
    res.status(200).json({
      status: 200,
      message: 'Category updated successfully.'
    });
  })
  .catch(catUpdateError => {
    res.status(400).json({
      status: 400,
      message: 'Category update failed.'
    });
  })
});

module.exports = router;
