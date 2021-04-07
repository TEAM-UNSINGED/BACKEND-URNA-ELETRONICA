module.exports = {

    remove_votes(params = {}) {
        let candidate = params;
        candidate = {
            name: candidate.name,
            type: candidate.type,
            party: candidate.party,
            number: candidate.number,
            photo: candidate.photo,
            nameVice: candidate.nameVice,
            photoVice: candidate.photoVice,
        }
         return candidate;
    }
}
