const express = require('express');
const router = new express.Router();
const Product = require('../models/product');

const itemLimit = 8;
const pageSize = 10;

router.get('/topDailyDeals', async (req, res) => {
      try {
            const products = await Product.find(
                  {},
                  [],//todo maybe limit the columns sent
                  {
                        limit: itemLimit,
                        sort: {
                              percentSavings: -1 //desc
                        }
                  }
            );
            if (!products) {
                  return res.status(404).send();
            }
            res.status(200).send(products);
      }
      catch (e) {
            console.log(e);
            res.status(500).send(e);//todo move this to global middleware with error handling
      }
});

router.get('/trendingProducts', async (req, res) => {
      try {
            const products = await Product.find(
                  {},
                  [],//todo maybe limit the columns sent
                  {
                        limit: itemLimit,
                        sort: {
                              bestSellingRank: -1 // desc
                        }
                  }
            );
            if (!products) {
                  return res.status(404).send();
            }
            res.status(200).send(products);
      }
      catch (e) {
            console.log(e);
            res.status(500).send(e);
      }
});

router.get('/products/:ids', async (req, res) => {
      try {
            const ids = req.params.ids.split(',').map(id => parseInt(id));

            const products = await Product.find({
                  sku: {
                        $in: ids
                  }
            });
            if (!products) {
                  //todo maybe implement error handling if even one item is missing
                  return res.status(404).send();//todo handle 404 in prodavalnik
            }
            res.status(200).send(products);
      }
      catch (e) {
            console.log(e);
            res.status(500).send(e);
      }
});

router.get('/product/:sku', async (req, res) => {
      try {
            const product = await Product.findOne({ sku: req.params.sku });
            if (!product) {
                  return res.status(404).send();//todo handle 404 in prodavalnik
            }
            res.status(200).send(product);
      }
      catch (e) {
            console.log(e);
            res.status(500).send(e);
      }
});

router.get('/searchProducts', async (req, res) => {
      //search=${searchTerm}&page=${page}&filter=${filter}
      const searchTerm = req.query.search;
      const page = parseInt(req.query.page);
      const skipCount = (page - 1) * pageSize;
      const filter = req.query.filter;//todo implement the filter

      console.log(searchTerm, page, filter)

      try {
            const products = await Product.find(
                  { "name": { "$regex": searchTerm, "$options": "i" } },
                  [],//todo maybe limit the columns sent
                  {
                        skip: skipCount,
                        limit: pageSize
                  }
            );

            if (!products) {
                  return res.status(404).send();
            }
            res.status(200).send(products);
      }
      catch (e) {
            console.log(e);
            res.status(500).send(e);//todo move this to global middleware with error handling
      }
});

module.exports = router;