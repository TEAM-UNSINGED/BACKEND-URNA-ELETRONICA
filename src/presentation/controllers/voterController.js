const VoterSchema = require('../../domain/models/voter/voter');
const logger = require('../../config/logger');

module.exports = {
  // No nosso caso utilizamos o pontos como avaliado
  async store(req, res){

    const { cpf } = req.body;
    if (!cpf) {
      return res.status(400).send({ error: 'CPF is required' });
    }
    try {
        const voter = await VoterSchema.create({cpf:cpf});
        return res.status(201).send(voter);
    } catch (err) {
        logger.error(err);
        return res.status(500)
    }
  },
  
}
