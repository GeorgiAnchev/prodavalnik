const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
      accessories: {
            type: 'Array'
      },
      addToCartUrl: {
            type: 'String'
      },
      bestSellingRank: {
            type: 'Number'
      },
      categoryPath: [{
            id: {
                  type: String
            },
            name: {
                  type: String
            }
      }],
      color: {
            type: 'String'
      },
      condition: {
            type: 'String'
      },
      customerReviewAverage: {
            type: 'Number'
      },
      customerReviewCount: {
            type: 'Number'
      },
      details: [{
            name: {
                  type: String
            },
            value: {
                  type: String
            },
            values: {
                  type: [
                        'String'
                  ]
            }
      }],
      dollarSavings: {
            type: 'Number'
      },
      features: [{
            feature: {
                  type: String
            }
      }],
      freeShipping: {
            type: 'Boolean'
      },
      frequentlyPurchasedWith: {
            type: 'Array'
      },
      image: {
            type: 'String'
      },
      includedItemList: [{
            includedItem: {
                  type: String
            }
      }],
      inStoreAvailability: {
            type: 'Boolean'
      },
      inStoreAvailabilityText: {
            type: 'String'
      },
      longDescription: {
            type: 'String'
      },
      manufacturer: {
            type: 'String'
      },
      mobileUrl: {
            type: 'String'
      },
      modelNumber: {
            type: 'String'
      },
      name: {
            type: 'String'
      },
      onlineAvailability: {
            type: 'Boolean'
      },
      onlineAvailabilityText: {
            type: 'String'
      },
      onSale: {
            type: 'Boolean'
      },
      percentSavings: {
            type: 'String'
      },
      preowned: {
            type: 'Boolean'
      },
      regularPrice: {
            type: 'Number'
      },
      relatedProducts: {
            type: 'Array'
      },
      salePrice: {
            type: 'Number'
      },
      shipping: [{
            ground: {
                  type: 'Mixed'
            },
            secondDay: {
                  type: 'Mixed'
            },
            nextDay: {
                  type: 'Mixed'
            },
            vendorDelivery: {
                  type: 'Mixed'
            }
      }],
      shippingCost: {
            type: 'Number'
      },
      shortDescription: {
            type: 'String'
      },
      sku: {
            type: 'Number',
            unique: true,
            required: true
      },
      thumbnailImage: {
            type: 'String'
      },
      type: {
            type: 'String'
      },
      upc: {
            type: 'String'
      },
      url: {
            type: 'String'
      }
});

productSchema.virtual('reviews', {
      ref: 'Review',
      localField: '_id',
      foreignField: 'product'
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;