const removeVotes = require('./removeVotes');


module.exports ={
    remove_array_votes(params ={}){
        let candidate = params;
        candidate = candidate.map((c) => removeVotes.remove_votes(c));
        return candidate;
    }
}