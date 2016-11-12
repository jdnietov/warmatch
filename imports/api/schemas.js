import { Images } from './images.js';

var Schemas = {};

Schemas.Sport = new SimpleSchema({
  name: {
    type: String,
    max: 20
  }
});

Schemas.Match = new SimpleSchema({
  playerOne: {type: String},
  playerTwo: {type: String},
  sport: {
    type: String,
    label: "Deporte",
    // allowedValues: ['Fútbol', 'Basquetball', 'Tenis', 'Baseball']
  },
  place: {
    type: String,
    label: "Lugar de encuentro"
  },
  message: {type: String},
  date: {type: Date}
});

Schemas.OpenMatch = new SimpleSchema({
  title: {type: String},
  sport: {type: String},
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

export const SportSchema = Schemas.Sport;
export const MatchSchema = Schemas.Match;
export const OpenMatchSchema = Schemas.OpenMatch;
export const PostSchema = Schemas.Post;
