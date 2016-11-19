import { Mongo } from 'meteor/mongo';
import { PostSchema } from './schemas.js';

Post = new Mongo.Collection('posts');
//Posts.attachSchema(PostSchema);
Post.attachSchema(PostSchema);

export const Posts = Post;
