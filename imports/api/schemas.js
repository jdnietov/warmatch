import { Images } from './images.js';

var Schemas = {};

Schemas.UserProfile = new SimpleSchema({
    email: {
        type: String,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    name: {
        type: String,
    },
    lastName: {
        type: String,
    },
    photo: {
      type: String,
    },
    football:{
      type: Boolean
    },
    basketball:{
      type: Boolean
    },
    baseball:{
      type: Boolean
    },
    volleyball:{
      type: Boolean
    },
    tenis:{
      type: Boolean
    }

});

Schemas.User = new SimpleSchema({
    username: {
        type: String,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own val idation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: Schemas.UserProfile,
    }
});

Meteor.users.attachSchema(Schemas.User);

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

export const MatchSchema = Schemas.Match;
export const OpenMatchSchema = Schemas.OpenMatch;
export const PostSchema = Schemas.Post;
export const TeamSchema = Schemas.Team;
