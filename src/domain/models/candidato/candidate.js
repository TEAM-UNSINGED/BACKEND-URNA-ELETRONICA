const mongoose = require('mongoose');

const { Schema } = mongoose;

const CandidateSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  party: {
    type: String,
    required: true,
  },
  number:{
    type: Number,
    required: true,
  },
  photo:{
    type: String,
    required: true
  },
  nameVice:{
    type: String,
    required: true
  },
  photoVice:{
    type: String,
    required: true
  },
  votes:{
    type: Number
  }
});

module.exports = mongoose.model('Candidate', CandidateSchema);
