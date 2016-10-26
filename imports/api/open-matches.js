import { Mongo } from 'meteor/mongo';
import { OpenMatchSchema } from '/imports/api/schemas.js';

OpenMatch = new Mongo.Collection('openMatches');
OpenMatch.attachSchema(OpenMatchSchema);

console.log("exporting OpenMatches");

export const OpenMatches = OpenMatch;
