import { Mongo } from 'meteor/mongo';
import { SportSchema } from '/imports/api/schemas.js';

Sport = new Mongo.Collection('sport');
Sport.attachSchema(SportSchema);

export const Sports = Sport;
