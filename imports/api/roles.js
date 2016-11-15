import { Mongo } from 'meteor/mongo';
import { RoleSchema } from './schemas.js';

Role = new Mongo.Collection('roles');
Role.attachSchema(RoleSchema);

export const Roles = Role;
