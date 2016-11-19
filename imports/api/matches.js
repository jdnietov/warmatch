import { Mongo } from 'meteor/mongo';
import { MatchSchema } from './schemas.js';

Match = new Mongo.Collection('matches');
Match.attachSchema(MatchSchema);

export const Matches = Match;
