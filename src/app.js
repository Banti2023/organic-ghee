const express = require('express');
const mongoose = require('mongoose');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const route = require('./routers/main');
require('./handlebar'); // custom handlebars helpers

const app = express();

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://organic-ghee-mongo:27017/organic-ghee";
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully..'))
.catch((err) => console.error('MongoDB connection error:', err));

// Middlewares
app.use(fileUpload());
app.use(session({
    secret: 'restorent_datails',
    resave: false,           // required to remove deprecation warning
    saveUninitialized: true  // required to remove deprecation warning
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static('public'));

// Template engine
app.set('view engine', 'hbs');
app.set('views', 'views');
hbs.registerPartials('views/partials');

// Routes
app.use('', route);

// Start server
const PORT = process.env.PORT || 5656;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}..`);
});
