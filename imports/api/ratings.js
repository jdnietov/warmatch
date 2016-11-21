import { Mongo } from 'meteor/mongo';
import { RatingsSchema } from './schemas.js';

Rating = new Mongo.Collection('ratings');
Rating.attachSchema(RatingsSchema);

export const Ratings = Rating;
