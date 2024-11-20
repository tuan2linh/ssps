import mongoose from 'mongoose';

const supportTicketSchema = mongoose.Schema({
  student: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  printinglog: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'PrintingLog'
  },
  printer: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Printer'
  },
  officer: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  description: {
    type: String,
    required: true
  },
  response: {
    type: String
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  closedAt: {
    type: Date
  }
});

const SupportTicket = mongoose.model('SupportTicket', supportTicketSchema);

export default SupportTicket;
