const Course = require('../models/course');

let cartItems = [];

const cart_index = (req, res) => {
    res.render('cart', { cartItems, title: 'Your Cart' });
};

const cart_add = (req, res) => {
    const courseId = req.params.id;

    Course.findById(courseId)
        .then(course => {
            if (course) {
                cartItems.push({
                    _id: course._id,
                    name: course.name,
                });


                res.redirect('/cart');
            } else {
                res.status(404).send('Course not found');
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        });
};

const cart_remove = (req, res) => {
    const courseId = req.params.id;
    res.redirect('/cart');
};


const cart_clear = (req, res) => {
    cartItems = [];

    res.redirect('/cart');
};

module.exports = {
    cart_index,
    cart_add,
    cart_remove,
    cart_clear
};
