const mongoose = require('mongoose');
const Account = require('./account');


const reviewSchema = new mongoose.Schema({
      owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Account'
      },
      ownerUsername: {
            type: String
      },
      product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
      },
      // title: {
      //       type: String,
      //       required: true
      // },
      content: {
            type: String,
            required: true
      },
      rating: {
            type: Number,
            required: true

      }
}, {
            timestamps: true
      });

reviewSchema.pre('save', async function (next) {
      const review = this;
      const owner = await Account.findById(review.owner);
      review.ownerUsername = owner.username;
      next();
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;