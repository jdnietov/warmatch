import { Mongo } from 'meteor/mongo';
import { OpenMatchSchema } from './schemas.js';

OpenMatch = new Mongo.Collection('openMatches');
OpenMatch.attachSchema(OpenMatchSchema);

export const OpenMatches = OpenMatch;
