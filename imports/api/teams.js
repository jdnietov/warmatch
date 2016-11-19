import { Mongo } from 'meteor/mongo';
import { TeamSchema } from './schemas.js';

Team = new Mongo.Collection('teams');
Team.attachSchema(TeamSchema);

//Team._ensureIndex({"$**": "text"});
export const Teams = Team;
