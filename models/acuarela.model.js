const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AcuarelaSchema = new Schema({
    name: {type: String, required: true, max: 50},
    // artistId: {type: String, required: true},
    startDate: {type: Date, required: false},
    endDate: {type: Date, required: false},
    image: {type: String, required: false},
    technique: {type: String, required: false},
    material: {type: String, required: true},
    country: {type: String, required: true}, 
    approved: {type: Boolean, required: true},
    rating: {type: Number, required: true}
});

module.exports = mongoose.model('Acuarela', AcuarelaSchema);
