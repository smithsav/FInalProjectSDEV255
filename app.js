const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = ('mongodb+srv://testUser:pass1234@nodeauthtutorial.osde3dd.mongodb.net/?retryWrites=true&w=majority&appName=nodeAuthTutorial');
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/courses', requireAuth, (req, res) => res.render('courses'));
app.use(authRoutes);

// course routes
app.use('/courses',courseRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});