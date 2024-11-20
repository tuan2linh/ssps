import mongoose from 'mongoose';
import { toJSON } from './plugins/index.js';
import uploadFile from './uploadFile.model.js';

const PrintingLogSchema = mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  printer: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Printer',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  printingFile: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'uploadFile',
    required: true
  },
  status: {
    type: String,
    default: 'success'
  },
  color: {
    type: Boolean,
    default: false,
    required: true
  },
  printType: {
    type: String,
    required: true
  },
  printCount: {
    type: Number,
    required: true
  },
  supportTicketID: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'SupportTicket',
    default: null
  },
  totalCost: {
    type: Number,
    required: true
  }
});

PrintingLogSchema.plugin(toJSON);

const PrintingLog = mongoose.model('PrintingLog', PrintingLogSchema);

export default PrintingLog;
