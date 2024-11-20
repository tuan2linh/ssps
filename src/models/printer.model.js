import mongoose from 'mongoose';

const printerSchema = mongoose.Schema({
  room: {
    type: String,
    required: true
  },
  building: {
    type: String,
    required: true
  },
  campus: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  enabled: {
    type: Boolean,
    default: true
  },
  deleted: {
    type: Boolean,
    default: false
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  lastModified: {
    type: Date,
    default: Date.now
  }
});

printerSchema.methods.getLocation = () => {
  return `${this.room}, ${this.building}, ${this.campus}`;
};

const Printer = mongoose.model('Printer', printerSchema);

export default Printer;
