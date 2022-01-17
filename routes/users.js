const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// User model
const User = require('../models/User');

// Benefits page
router.get('/benefits', (req, res) => {
    res.render('benefits');
})

// Loans page
router.get('/loans', (req, res) => {
    res.render('loans')
});

// Testimonial page
router.get('/register', (req, res) => {
    res.render('register')
});

// Contact Handle
router.post('/register', (req, res) => {
    const { name, email, password, confirmPassword, phone } = req.body;
    let errors = [];

    // Check required fields
    if(!name || !email || !password || !confirmPassword || !phone) {
        errors.push({ msg: 'please fill in all fields' });
    }

    // Check Password
    if(password != confirmPassword) {
        errors.push({ msg: 'Passwords do not match' });
    }

    // Check Passlength
    if(password.length < 8) {
        errors.push({ msg: 'Password must be atleast 8 characters' });
    }

    if(errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            confirmPassword,
            phone
        });
    }else {
        // Validation passed
        User.findOne({ email: email })
          .then(user => {
              if(user) {
                  // User exists
                  errors.push({ msg: 'Email already taken' });
                  res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    confirmPassword,
                    phone
                });

              }else {
                  const newUser = new User({
                      name,
                      email,
                      password,
                      phone
                  });

                  // Hash Password
                  bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                      if(err) throw err
                      // Set password to hasheed
                      newUser.password = hash;

                      // Save user
                      newUser.save()
                       .then(user => {
                           res.redirect('/login');
                       })
                       .catch(err => console.log(err));
                  }))
              }
          });
    }
});


module.exports = router;