import { Mongo } from 'meteor/mongo';
import { RegisterTURSchema } from './schemas.js';

RegisterTUR = new Mongo.Collection('registerTURs');
RegisterTUR.attachSchema(RegisterTURSchema);

export const RegisterTURs = RegisterTUR;
