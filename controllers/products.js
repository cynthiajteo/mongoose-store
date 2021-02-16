const express = require('express');
const router = express.Router();
const Product = require('../models/products');

// seed data
router.get('/seed', async (req, res) => {
    const newProducts = [
        {
            name: 'Beans',
            description:
                'A small pile of beans. Buy more beans for a big pile of beans.',
            img:
                'https://cdn3.bigcommerce.com/s-a6pgxdjc7w/products/1075/images/967/416130__50605.1467418920.1280.1280.jpg?c=2',
            price: 5,
            qty: 99,
        },
        {
            name: 'Bones',
            description: "It's just a bag of bones.",
            img: 'http://bluelips.com/prod_images_large/bones1.jpg',
            price: 25,
            qty: 0,
        },
        {
            name: 'Bins',
            description: 'A stack of colorful bins for your beans and bones.',
            img: 'http://www.clipartbest.com/cliparts/9cz/rMM/9czrMMBcE.jpeg',
            price: 7000,
            qty: 1,
        },
    ];

    try {
        const seedItems = await Product.create(newProducts);
        res.send(seedItems);
    } catch (err) {
        res.send(err.message);
    }
});

// new route
router.get('/new', (req, res) => {
    res.render('new.ejs');
});

// create route
router.post('/', (req, res) => {
    Product.create(req.body, (error, createdProduct) => {
        // res.send(createdProduct);
        res.redirect('/products');
    });
});

// index route
router.get('/', (req, res) => {
    Product.find({}, (error, allProducts) => {
        res.render('index.ejs', {
            products: allProducts,
        });
    });
});

// show route
router.get('/:id', (req, res) => {
    Product.findById(req.params.id, (error, foundProduct) => {
        res.render('show.ejs', {
            product: foundProduct,
        });
    });
});

// delete route
router.delete('/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, (error, data) => {
        res.redirect('/products');
    });
});

// buy route
router.post('/:id', (req, res) => {
    const index = req.params.id;
    Product.findByIdAndUpdate(
        req.params.id,
        { $inc: { qty: -1 } },
        { new: true },
        (err, updatedModel) => {
            if (err) console.log(err.message);
            else {
                res.redirect(`/products/${index}`);
            }
        },
    );
});

// edit route
router.get('/:id/edit', (req, res) => {
    Product.findById(req.params.id, (error, foundProduct) => {
        res.render('edit.ejs', {
            product: foundProduct,
        });
    });
});

// put route
router.put('/:id', (req, res) => {
    const index = req.params.id;
    Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, updatedProduct) => {
            res.redirect(`/products/${index}`);
        },
    );
});

module.exports = router;
