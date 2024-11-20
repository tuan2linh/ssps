import mongoose from 'mongoose';
import path from 'path';

const uploadFileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  pageSize: {
    type: String,
    required: true
  },
  pageCount: {
    type: Number,
    required: true
  },
  printed: {
    type: Boolean,
    default: false
  },
  dateUploaded: {
    type: Date,
    default: Date.now
  },
  path: {
    type: String,
    required: true
  }
});

const uploadFile = mongoose.model('uploadFile', uploadFileSchema);

export default uploadFile;
