import { Mongo } from 'meteor/mongo';
import { OpenMatchSchema } from '/imports/api/schemas.js';

OpenMatch = new Mongo.Collection('open-matches');
OpenMatch.attachSchema(OpenMatchSchema);

export const OpenMatches = OpenMatch;
