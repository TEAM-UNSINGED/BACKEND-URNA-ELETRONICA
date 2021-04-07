const  Candidate = require('../../domain/models/candidato/candidate');
const VoterSchema = require('../../domain/models/voter/voter');
const logger = require('../../config/logger');
const removeVotes = require('./util/removeVotes');
const removeArrayVotes = require('./util/removeArrayVotes');

module.exports = {
 
  async store(req, res){

  
    const { name, type, party, number, photo, nameVice, photoVice } = req.body;

    try {
      let candidate = await Candidate.findOne({number: number, type: type});
      if (candidate) {res.status(400).send({ error: `${type} already exists` })}
      const votes = 0;
        candidate = await Candidate.create({
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
      return res.status(201).send(removeVotes.remove_votes(candidate));
    } catch (error) {
      logger.error(err);
      return res.status(500).send(err);
    }
  },
  async index(req, res){
    const {type} = req.query;

    try {
      const candidate = await Candidate.find({type: type})
      return res.status(201).send(removeArrayVotes.remove_array_votes(candidate));
    } catch (error) {
      logger.error(err);
      return res.status(500).send(err);
    }
  },
  async vote (req,res){
    const {president,governor,senator,cpf} = req.body;

    try{
      const PRESIDENT = await Candidate.findOne({number: president, type: 'Presidente'});
      if(!PRESIDENT){
        return res.status(400).send({ error: 'PRESIDENT not found' });
      }
      const GOVERNOR = await Candidate.findOne({number: governor, type: 'Governador'});
      if(!GOVERNOR){
        return res.status(400).send({ error: 'GORVERNOR not found' });
      }
      const SENATOR = await Candidate.findOne({number: senator, type: 'Senador'});
      if(!SENATOR){
        return res.status(400).send({ error: 'SENATOR not found' });
      }
      await VoterSchema.create({cpf:cpf});

      let vote =  PRESIDENT.votes + 1;
      await PRESIDENT.updateOne({$set:{votes:vote}});

      vote =  GOVERNOR.votes + 1;
      await GOVERNOR.updateOne({$set:{votes:vote}});

      vote =  SENATOR.votes + 1;
      await SENATOR.updateOne({$set:{votes:vote}});

      return res.status(200).send({message: "Computed Vote"});
    }catch (error){
      logger.error(error);
      return res.status(500).send(error);
    }
  }

}
