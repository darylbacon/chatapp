import mongoose from 'mongoose'

// Article schema
let articleSchema = mongoose.Schema( {
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
} )

export const Article = mongoose.model( 'Article', articleSchema )