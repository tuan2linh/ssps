import mongoose from 'mongoose';
import { toJSON } from './plugins/index.js';

const transactionLogSchema = mongoose.Schema({
  pageCount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  studentID: {
    type: Number,
    required: true
  },
  transactionCode: {
    type: String,
    required: true
  },
  system: {
    type: String,
    required: true
  }
});

transactionLogSchema.plugin(toJSON);

const TransactionLog = mongoose.model('TransactionLog', transactionLogSchema);

export default TransactionLog;
