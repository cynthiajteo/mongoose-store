const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const productController = require('./controllers/products');
const methodOverride = require('method-override');
// require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/basiccrud', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// mongoose.connect(process.env.mongoURL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});

app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use('/products', productController);

app.listen(port, () => {
    console.log('listening');
});
