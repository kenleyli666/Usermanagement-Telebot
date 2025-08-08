const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    productId: {
        type: Number,
        // required: true,
        unique: true
    },
    shopId: {
        type: Number,
        // required: true
    },
    category_en: {
        type: String,
        // required: true
    },
    category_cn: {
        type: String,
        // required: true
    },
    productName_en: {
        type: String,
        // required: true
    },
    productName_cn: {
        type: String,
        // required: true
    },
    brand_en: {
        type: String,
        // required: true
    },
    price: {
        type: Number,
        // required: true,
        min: 0 // Ensure price is non-negative
    },
    description_en: {
        type: String,
        // required: true
    },
    description_cn: {
        type: String,
        // required: true
    },
    stock: {
        type: Number,
        // required: true,
        min: 0 // Ensure stock is non-negative
    },
    Longitude: {
        type: Number,
        // required: true
    },
    Latitude: {
        type: Number,
        // required: true
    },
    shop_tel: {
        type: String,
        validate: {
            validator: function(val) {
                return val.length === 8; // Check phone number length is 8
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    }
});

// Define models
const AirConditionersCll = mongoose.model('AirConditioners', ProductSchema, 'airconditioners');
const LaptopsCll = mongoose.model('Laptops', ProductSchema, 'laptops');
const SmartphonesCll = mongoose.model('Smartphones', ProductSchema, 'smartphones');

// Export models
module.exports = { AirConditionersCll, LaptopsCll, SmartphonesCll };