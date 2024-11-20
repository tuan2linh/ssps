import mongoose from 'mongoose';
import { toJSON } from './plugins/index.js';
import PrintingLog from './printingLog.model.js';
import TransactionLog from './transactionLog.model.js';
import User from './user.model.js';

const StudentSchema = new mongoose.Schema({
  studentID: {
    type: String,
    required: true,
    unique: true
  },
  department: {
    type: String,
    required: true
  },
  paper: [
    {
      pageCount: {
        type: Number,
        required: true
      },
      pageType: {
        type: String,
        required: true
      }
    }
  ]
});

StudentSchema.plugin(toJSON);

const Student = User.discriminator('Student', StudentSchema);

export default Student;
