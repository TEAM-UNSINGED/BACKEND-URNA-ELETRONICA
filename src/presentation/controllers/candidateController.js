const  Candidate = require('../../domain/models/candidato/candidate');
const VoterSchema = require('../../domain/models/voter/voter');
const logger = require('../../config/logger');

module.exports = {
 
  async store(req, res){

  
    const { name, type, party, number, photo, nameVice, photoVice } = req.body;

    try {
      const votes = 0;
        const candidate = await Candidate.create({
          name, type, party, number, photo, nameVice, photoVice, votes
        });
        return res.status(201).send(candidate);
    } catch (err) {
        logger.error(err);
        return res.status(500).send(err);
    }
  },
  async show(req, res){
    const { number, type} = req.query;
    try {
      const candidate = await Candidate.findOne({number: number, type: type})
      return res.status(201).send(candidate);
    } catch (error) {
      logger.error(err);
      return res.status(500).send(err);
    }
  },
  async index(req, res){
    const {type} = req.query;

    try {
      const candidate = await Candidate.find({type: type})
      return res.status(201).send(candidate);
    } catch (error) {
      logger.error(err);
      return res.status(500).send(err);
    }
  },
  async vote (req,res){
    const {president,governor,senator,cpf} = req.body;

    try{
      let candidate = await Candidate.findOne({number: president, type: 'Presidente'});
      if(!candidate){
        return res.status(400).send({ error: 'PRESIDENT not found' });
      }
      let vote =  candidate.votes + 1;
      await candidate.updateOne({$set:{votes:vote}});
      candidate = await Candidate.findOne({number: governor, type: 'Governador'});
      if(!candidate){
        return res.status(400).send({ error: 'GORVERNOR not found' });
      }
      vote =  candidate.votes + 1;
      await candidate.updateOne({$set:{votes:vote}});
      candidate = await Candidate.findOne({number: senator, type: 'Senador'});
      if(!candidate){
        return res.status(400).send({ error: 'SENATOR not found' });
      }
      vote =  candidate.votes + 1;
      await candidate.updateOne({$set:{votes:vote}});
      const voter = await VoterSchema.create({cpf:cpf});
      return res.status(200).send({message: "Computed Vote"});
    }catch (error){
      logger.error(error);
      return res.status(500).send(error);
    }
  }

}
