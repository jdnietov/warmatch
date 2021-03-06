import { Images } from './images.js';

var Schemas = {};

// TODO add createdAt
Schemas.Match = new SimpleSchema({
  local_id: {type: String},
	title: {type: String},
  challenger: {type: String},
  challenged: {type: String},
  sport: {
    type: String,
    label: "Deporte"
  },
  place: {type: String},
  message: {type: String},
  date: {type: String},
  status: {
    type: String,
    allowedValues: ["accepted", "rejected", "pending"]
  },
  confirmed: {type: Boolean}
});

Schemas.OpenMatch = new SimpleSchema({
  title: {type: String},
  creator: {type: String},
  sport: {
    type: String,
    label: "Deporte"
  },
  place: {type: String},
  date: {type: String},
  createdAt: {type: Date}
});

Schemas.Statistic = new SimpleSchema({
	name: {type: String},
	value: {type: Number}
})

Schemas.Team = new SimpleSchema({
	name: {type: String},
	description: {type: String},
	sport: {
		type: String,
		label: "Deporte"
	},
	logo: {type: String},
	statistics: {type: [Schemas.Statistic]},
  // TODO add messages
  requests: {type: [String]}
})

Schemas.Role = new SimpleSchema({
	name: {type: String},
	description: {type: String}
})

Schemas.RegisterTUR = new SimpleSchema({
	teamName: {type: String},
	userName: {type: String},
	roleName: {
    type: String,
    allowedValues: ["Administrador", "Jugador"]
  }
})

export const MatchSchema = Schemas.Match;
export const OpenMatchSchema = Schemas.OpenMatch;
export const PostSchema = Schemas.Post;
export const TeamSchema = Schemas.Team;
export const RoleSchema = Schemas.Role;
export const RegisterTURSchema = Schemas.RegisterTUR;
export const RatingsSchema = Schemas.Ratings;
