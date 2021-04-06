const  Candidate = require('../../domain/models/candidato/candidate');
const logger = require('../../config/logger');

module.exports = {
 
  async store(req, res){

    logger.debug(req.body)
    const { name, type, party, number, photo, nameVice, photoVice } = req.body;

    try {
        const candidate = await Candidate.create({
          name, type, party, number, photo, nameVice, photoVice
        });
        return res.status(201).send(candidate);
    } catch (err) {
        logger.error(err);
        return res.status(500).send(err)
    }
  },

 
  
}
