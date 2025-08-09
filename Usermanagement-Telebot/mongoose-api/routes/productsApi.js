// routes/productsApi.js
const express = require('express');
const { AirConditionersCll, LaptopsCll, SmartphonesCll } = require('../models/productsSchema.js');

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    try {
        const airconditioners = await AirConditionersCll.find();
        const laptops = await LaptopsCll.find();
        const smartphones = await SmartphonesCll.find();

        const allProducts = {
            airconditioners,
            laptops,
            smartphones
        };

        res.status(200).send(allProducts);
    } catch (error) {
        res.status(500).send({ message: "Error fetching products.", error });
    }
});

// Other CRUD operations can be added here...
module.exports = router;