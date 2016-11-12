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

Schemas.Match = new SimpleSchema({
  _id: {type: Number},
  playerOne: {type: String},
  playerTwo: {type: String},
  date: {type: Date}
});

Schemas.OpenMatch = new SimpleSchema({
  title: {type: String},
  sport: {type: String},
  place: {type: String},
  date: {type: String},
  createdAt: {type: Date}
});

export const MatchSchema = Schemas.Match;
export const OpenMatchSchema = Schemas.OpenMatch;
