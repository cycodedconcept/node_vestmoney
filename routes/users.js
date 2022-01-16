const express = require('express');
const router = express.Router();

// Benefits page
router.get('/benefits', (req, res) => {
    res.render('benefits');
})

// Loans page
router.get('/loans', (req, res) => {
    res.render('loans');
})

// Testimonial page
router.get('/contact', (req, res) => {
    res.render('contact');
})


module.exports = router;