const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.get('/', cartController.cart_index);
router.post('/add/:id', cartController.cart_add);
router.post('/remove/:id', cartController.cart_remove);
router.post('/clear', cartController.cart_clear);

module.exports = router;
