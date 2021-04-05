const mongoose = require('mongoose');

const { Schema } = mongoose;

const VoterSchema = new Schema({
  cpf: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('voter', VoterSchema);