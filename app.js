// import packages
import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

// bring in models
import { Article } from './models/article'

// init app
const app = express()

mongoose.connect( 'mongodb://localhost/nodekb' )
let db = mongoose.connection

// check connection
db.once( 'open', () => {
  console.log( 'Connected to MongoDB' )
})

// check for db errors
db.on( 'error', ( err ) => {
  console.log( err )
})

// load view engine
app.set( 'views', path.join( __dirname, 'views' ) )
app.set( 'view engine', 'pug' )

// body parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// set public folder
app.use( express.static( path.join( __dirname, 'public' )))

// home route
app.get( '/', ( req, res ) => {
  Article.find( {}, ( err, articles) => {
    if (err) {
      console.log( err )
    } else {
      res.render( 'index', {
        title: 'Articles',
        articles
      })
    }
  })
})

// add route 
app.get( '/articles/add', ( req, res ) => {
  res.render( 'add_article', {
    title: 'Add Article'
  })
})

// add submit post route
app.post( '/articles/add', ( req, res ) => {
  // article.title = req.body.title
  // article.author = req.body.author
  // article.body = req.body.body
  let { title, author, body } = req.body
  let article = new Article({
    'title': title,
    'author': author,
    'body': body
  })

  article.save( ( err ) => {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/')
    }
  } )
})

const port = 3000

// Start server
app.listen( 3000, () => console.log(`Server started on port: ${port}`))