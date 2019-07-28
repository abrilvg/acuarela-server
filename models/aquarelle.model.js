const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AquarelleSchema = new Schema({
  name: { type: String, required: true, max: 50 },
  authorId: { type: String, required: true },
  author: { type: String, max: 30 },
  createdDate: { type: Date, required: false },
  images: { type: Object, required: false },
  technique: { type: String, required: false },
  material: { type: String, required: true },
  country: { type: String, required: true },
  approved: { type: Boolean, required: true },
  rating: { type: Number, required: true }
});

module.exports = mongoose.model('Aquarelle', AquarelleSchema);
