import { Mongo } from 'meteor/mongo';
import { TeamSchema } from '/imports/api/schemas.js';

Team = new Mongo.Collection('teams');
Team.attachSchema(TeamSchema);

export const Teams = Team;
