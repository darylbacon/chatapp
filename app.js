// import packages
import express from 'express'
import expressLayouts from 'express-ejs-layouts'
import mongoose from 'mongoose'

// import configs
import dbConnect from './config/db'

// bring in models
import { Article } from './models/article'

// init app
const app = express()

mongoose.connect( dbConnect )
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
app.set( 'view engine', 'ejs' )
app.use(expressLayouts)

// Bodyparser
app.use(express.urlencoded({ extended: false }))

// Public folder
app.use(express.static(__dirname + '/public'));

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
app.get( '/article/add', ( req, res ) => {
  res.render( 'add_article', {
    title: 'Add Article'
  })
})

// add submit post route
app.post( '/article/add', ( req, res ) => {
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

// Get single article
app.get( '/article/:id', ( req, res) => {
  Article.findById( req.params.id, ( err, article ) => {
    res.render( 'article', {
      article
    })
  })
})

const port = 5000

// Start server
app.listen( port, () => console.log(`Server started on port: ${port}`))