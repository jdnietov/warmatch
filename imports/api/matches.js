import { Mongo } from 'meteor/mongo';

Match = new Mongo.Collection('matches');
Match.schema = new SimpleSchema({
  _id: {type: Number},
  playerOne: {type: String},
  playerTwo: {type: String},
  date: {type: Date}
});

export const Matches = Match;
