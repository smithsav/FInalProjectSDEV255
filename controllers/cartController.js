const mongoose = require('mongoose');
const Cart = require('../models/cart'); 

// Add a course to the cart
exports.addToCart = async (req, res) => {
    const studentId = req.user._id;
    const { courseIds } = req.body; 

    try {
        let cart = await Cart.findOne({ studentId });
        if (!cart) {
            cart = new Cart({
                studentId,
                courses: courseIds.map(id => ({ courseId: id }))
            });
        } else {
            // Add new courses, ensuring no duplicates
            courseIds.forEach(id => {
                if (!cart.courses.some(course => course.courseId.toString() === id)) {
                    cart.courses.push({ courseId: id });
                }
            });
        }

        await cart.save();
        // Use res.json() to send a JSON response
        res.status(200).json({ message: 'Courses added to cart successfully.' });
    } catch (error) {
        // Ensure error messages are also sent as JSON
        res.status(500).json({ message: 'Error adding courses to cart: ' + error.message });
    }
};



// View the cart
exports.viewCart = async (req, res) => {
    const studentId = req.user._id;

    try {
        const cart = await Cart.findOne({ studentId }).populate('courses.courseId');
        
        res.render('cart', { cart: cart, user: req.user });
    } catch (error) {
        console.error('Error fetching cart: ', error);
        res.status(500)
    }
};


// Remove a course from the cart
exports.removeFromCart = async (req, res) => {
    const studentId = req.user._id;
    const courseId = req.params.courseId; 

    try {
        await Cart.findOneAndUpdate(
            { studentId: studentId },
            { $pull: { courses: { courseId: courseId } } },
            { new: true }
        );
        res.json({ message: 'Course removed successfully' });
    } catch (error) {
        console.error('Error removing course from cart:', error);
        res.status(500).json({ message: 'Error removing course from cart' });
    }
};


