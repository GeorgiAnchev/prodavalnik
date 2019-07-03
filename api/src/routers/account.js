const express = require('express');
const router = new express.Router();
const Account = require('../models/account');
const auth = require('../middleware/auth');
const fetch = require('node-fetch');
const config = require('../../config');

// const GOOGLE_RECAPTCHA_SECRET_KEY = '6LeNK6sUAAAAAC_2qtc3UnddVSKDMtifPhTEDJdE';//todo move this to a .gitignore file

router.post('/account/login', async (req, res) => {
      try {
            const account = await Account.findByCredentials(req.body.email, req.body.password);

            const token = await account.generateAuthToken();
            res.status(200).send({ account, token });
      }
      catch (e) {
            if (e.wrongCredentials) {
                  res.status(400).send("Wrong credentials");
            }
            else {
                  console.log(e);
                  res.status(500).send(e);
            }
      }
});

router.post('/account/logout', auth, async (req, res) => {
      try {
            req.account.tokens = req.account.tokens.filter(token => token.token !== req.token);
            await req.account.save();
            res.send();
      }
      catch (e) {
            console.log(e);
            res.status(500).send(e);
      }
});

router.post('/account/register', async (req, res) => {
      const account = new Account(req.body);
      try {
            const existingAccount = await Account.findOne({
                  $or: [{ email: req.body.email }, { username: req.body.username }]

            });
            if (existingAccount) {
                  if (existingAccount.email === req.body.email) {
                        return res.status(409).send("Email already taken");
                  }
                  else {
                        return res.status(409).send("Username already taken");
                  }
            }

            const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
                  method: "POST",
                  headers: { "Content-Type": "application/x-www-form-urlencoded" },
                  body: `secret=${config.GOOGLE_RECAPTCHA_SECRET_KEY}&response=${req.body.reCaptchaToken}`
            });

            const jsonResponse = await response.json();
            if (!jsonResponse.success) {
                  return res.status(400).send("Wrong reCaptcha");
            }

            await account.save();

            const token = await account.generateAuthToken();

            res.status(201).send({ account, token });//todo maybe omit the password
      }
      catch (e) {
            console.log(e);
            res.status(500).send(e);
      }
});

module.exports = router;