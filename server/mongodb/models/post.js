import mongoose, { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  prompt: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
})

const Post = models.Post || model('Post', PostSchema)

export default Post

