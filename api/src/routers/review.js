const express = require('express');
const router = new express.Router();
const Review = require('../models/review');
const Product = require('../models/product');
const auth = require('../middleware/auth');

router.get('/:productSku/reviews', async (req, res) => {
      try {
            const product = await Product.findOne({
                  sku: req.params.productSku
            });

            if (!product) {
                  return res.status(404).send();
            }

            await product.populate('reviews').execPopulate();

            res.status(200).send(product.reviews);
      }
      catch (e) {
            console.log(e);
            res.status(500).send(e);//todo move this to global middleware with error handling
      }
});

router.post('/:productSku/reviews', auth, async (req, res) => {
      try {
            const product = await Product.findOne({
                  sku: req.params.productSku
            });
            if (!product) {
                  return res.status(404).send();
            }

            const review = new Review({
                  ...req.body,
                  product: product.id,
                  owner: req.account._id
            });
            await review.save();

            res.status(201).send(review);
      }
      catch (e) {
            console.log(e);
            res.status(500).send(e);
      }
});

module.exports = router;