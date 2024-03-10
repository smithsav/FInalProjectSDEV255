const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');


// Route to add a course to the cart
router.post('/add', cartController.addToCart);

// Route to view the cart
router.get('/view', cartController.viewCart);

// Route to remove a course from the cart
router.delete('/remove/:courseId', cartController.removeFromCart);

module.exports = router;
