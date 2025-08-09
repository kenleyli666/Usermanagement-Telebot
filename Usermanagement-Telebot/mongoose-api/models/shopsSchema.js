const mongoose = require("mongoose");

// Define shop schema
const ShopSchema = new mongoose.Schema({
    shopId: {
        type: Number,
        // required: true,
        unique: true
    },
    shop_en: {
        type: String,
        // required: true
    },
    shop_cn: {
        type: String,
        // required: true
    },
    address_en: {
        type: String,
        // required: true
    },
    address_cn: {
        type: String,
        // required: true
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

const ShopsCll = mongoose.model('Shops', ShopSchema, 'shops');

module.exports = { ShopsCll };