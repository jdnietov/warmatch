import { Mongo } from 'meteor/mongo';
import { SportSchema } from '/imports/api/schemas.js';

Sport = new Mongo.Collection('matches');
Sport.attachSchema(SportSchema);

export const Sports = Sport;
