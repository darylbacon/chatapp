// import packages
import express from 'express'
import path from 'path'
import mongoose from 'mongoose'

mongoose.connect( 'mongodb://localhost/nodekb' )
let db = mongoose.connection

// check connection
db.once( 'open', () => {
  console.log( 'Connected to MongoDB' )
} )

// check for db errors
db.on( 'error', ( err ) => {
  console.log( err )
} )

// init app
const app = express()
const port = 3000

// bring in models
let Article = require( './models/article' )
// import Article from './models/article'

// load view engine
app.set( 'views', path.join( __dirname, 'views' ) )
app.set( 'view engine', 'pug' )

// home route
app.get( '/', ( req, res ) => {
  Article.find( {}, ( err, articles) => {
    if (err) {
      console.log( err )
    } else {
      res.render( 'index', {
        title: 'Articles',
        articles: articles
      } )
    }
  } )
} )

// add route 
app.get( '/articles/add', ( req, res ) => {
  res.render( 'add_article', {
    title: 'Add Article'
  } )
} )

// Start server
app.listen( 3000, () => console.log(`Server started on port: ${port}`))