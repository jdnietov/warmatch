var Schemas = {};

Schemas.Sport = new SimpleSchema({
  name: {
    type: String,
    max: 20
  }
});

Schemas.Match = new SimpleSchema({
  _id: {type: Number},
  playerOne: {type: String},
  playerTwo: {type: String},
  date: {type: Date}
});

export const SportSchema = Schemas.Sport;
export const MatchSchema = Schemas.Match;
