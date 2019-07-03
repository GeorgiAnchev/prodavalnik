const axios = require('axios');
require('./mongoose');
const Product = require('../models/product');

const all = async function () {
      // // const data = await axios.get('https://api.bestbuy.com/v1/products?apiKey=U6193s76u8HnKmClJLZU4hRv&pageSize=100&format=json');
      for (let currentPage = 1; currentPage <= 200; currentPage++) {
            console.log(currentPage);
            const response = await axios.get(`https://api.bestbuy.com/v1/products?apiKey=U6193s76u8HnKmClJLZU4hRv&sort=bestSellingRank.asc&show=accessories.sku,addToCartUrl,bestSellingRank,categoryPath.id,categoryPath.name,color,condition,customerReviewAverage,customerReviewCount,details.name,details.value,dollarSavings,features.feature,freeShipping,frequentlyPurchasedWith.sku,image,includedItemList.includedItem,inStoreAvailability,inStoreAvailabilityText,longDescription,manufacturer,mobileUrl,modelNumber,name,onlineAvailability,onlineAvailabilityText,onSale,percentSavings,preowned,regularPrice,relatedProducts.sku,salePrice,shipping,shippingCost,shortDescription,sku,thumbnailImage,type,upc,url&pageSize=100&page=${currentPage}&format=json`);

            const products = response.data.products;

            try {
                  const bulkOps = products.map(product => {
                        return {
                              updateOne: {
                                    filter: { sku: product.sku },
                                    update: product,
                                    upsert: true
                              }
                        }
                  });

                  const result = await Product.collection.bulkWrite(bulkOps);
                  //console.log(result);
                  console.log(`BULK update of page ${currentPage} - OK`);
            }
            catch (e) {
                  console.log('BULK update ERROR');
                  console.log(e);
            }
      }
}

const byCatergories = async function () {
      let categoryIDs = [];
      for (let categoryPage = 1; categoryPage <= 4; categoryPage++) {
            console.log(categoryPage);
            const response = await axios.get(`https://api.bestbuy.com/v1/categories(id=abcat*)?apiKey=U6193s76u8HnKmClJLZU4hRv&pageSize=100&page=${categoryPage}&show=id,name&format=json`);

            categoryIDs = categoryIDs.concat(
                  response.data.categories.map(category => category.id)
            );
      }

      for (let categoryIndex = 0; categoryIndex < categoryIDs.length; categoryIndex++) {
            const categoryID = categoryIDs[categoryIndex];

            console.log(categoryIndex + ' = ' + categoryID);

            const response = await axios.get(`https://api.bestbuy.com/v1/products((categoryPath.id=${categoryID}))?apiKey=U6193s76u8HnKmClJLZU4hRv&pageSize=100&page=1&format=json`);

            const products = response.data.products;

            if (products.length === 0) continue;

            try {
                  const bulkOps = products.map(product => {
                        return {
                              updateOne: {
                                    filter: { sku: product.sku },
                                    update: product,
                                    upsert: true
                              }
                        }
                  });
                  // console.log(bulkOps);
                  const result = await Product.collection.bulkWrite(bulkOps);
                  //console.log(result);
                  console.log(`BULK update of page ${categoryIndex} - OK`);
            }
            catch (e) {
                  console.log('BULK update ERROR');
                  console.log(e);
            }

      }
}

byCatergories()