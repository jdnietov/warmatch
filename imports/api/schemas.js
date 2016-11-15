import { Images } from './images.js';

var Schemas = {};

// TODO add createdAt
Schemas.Match = new SimpleSchema({
  playerOne: {type: String},
  playerTwo: {type: String},
  sport: {
    type: String,
    label: "Deporte"
  },
  place: {type: String},
  message: {type: String},
  date: {type: String}
});

Schemas.OpenMatch = new SimpleSchema({
  title: {type: String},
  sport: {
    type: String,
    label: "Deporte"
  },
  place: {type: String},
  date: {type: String},
  createdAt: {type: Date}
});

Schemas.Post = new SimpleSchema({
  title: {
    type: String,
    max: 60
  },
  picture: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Images',
        uploadTemplate: 'uploadField', // <- Optional
        previewTemplate: 'uploadPreview' // <- Optional
      }
    }
  }
});

Schemas.Statistic = new SimpleSchema({
	name: {type: String},
	value: {type: Number}
})

Schemas.Team = new SimpleSchema({
	name: {type: String},
	description: {type: String},
	sport: {type: String},
	logo: {type: String},
	statistics: {type: [Schemas.Statistic]}
})

Schemas.Role = new SimpleSchema({
	name: {type: String},
	description: {type: String}
})

Schemas.RegisterTUR = new SimpleSchema({
	teamName: {type: String},
	userName: {type: String},
	roleName: {type: String}
})

export const MatchSchema = Schemas.Match;
export const OpenMatchSchema = Schemas.OpenMatch;
export const PostSchema = Schemas.Post;
export const TeamSchema = Schemas.Team;
export const RoleSchema = Schemas.Role;
export const RegisterTURSchema = Schemas.RegisterTUR;
