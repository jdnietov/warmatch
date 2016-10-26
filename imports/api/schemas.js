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

Schemas.OpenMatch = new SimpleSchema({
  title: {type: String},
  sport: {type: String},
  place: {type: String},
  date: {type: String},
  createdAt: {type: Date}
});

export const SportSchema = Schemas.Sport;
export const MatchSchema = Schemas.Match;
export const OpenMatchSchema = Schemas.OpenMatch;
