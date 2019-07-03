const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const accountSchema = new mongoose.Schema({
      username: {
            type: String,
            uniqe: true,
            required: true,
            trim: true,
            lowercase: true
      },
      email: {
            type: String,
            uniqe: true,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {
                  if (!validator.isEmail(value)) {
                        throw new Error('Email is invalid');
                  }
            }
      },
      password: {
            type: String,
            required: true,
            trim: true,
            minlength: 6
      },
      tokens: [{
            token: {
                  type: String,
                  required: true
            }
      }]
}, {
            timestamps: true
      });

accountSchema.methods.toJSON = function () {
      const account = this;
      const accountObject = account.toObject();

      delete accountObject.password;
      delete accountObject.tokens;

      return accountObject;
}

accountSchema.methods.generateAuthToken = async function () {
      const account = this;
      const token = jwt.sign({ _id: account._id.toString() }, 'ThisIsVerySecretSecret');

      account.tokens = account.tokens.concat({ token });
      await account.save();

      return token;
}

accountSchema.statics.findByCredentials = async (email, password) => {
      const account = await Account.findOne({ email });

      if (!account) {
            throw { message: 'Unable to login', wrongCredentials: true };
      }

      const isMatch = await bcrypt.compare(password, account.password);

      if (!isMatch) {
            throw { message: 'Unable to login', wrongCredentials: true };
      }
      return account;
}

accountSchema.pre('save', async function (next) {
      const user = this;
      if (user.isModified('password')) {
            user.password = await bcrypt.hash(user.password, 8);
      }
      next();
})

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;