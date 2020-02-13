// import packages
import express from 'express'
import path from 'path'

// init app
const app = express()
const port = 3000

// load view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// home route
app.get( '/', ( req, res ) => {
  let articles = [
    {
      id: 1,
      title: 'Article One',
      author: 'Daryl Bacon',
      body: 'This is article one'
    },
    {
      id: 2,
      title: 'Article Two',
      author: 'John Doe',
      body: 'This is article two'
    },
    {
      id: 3,
      title: 'Article Three',
      author: 'Daryl Bacon',
      body: 'This is article three'
    }
  ]
  res.render( 'index', {
    title: 'Articles',
    articles: articles
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