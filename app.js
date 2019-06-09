// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
//setting static files
app.use(express.static(`public`))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList.results })
})
app.get('/search', (req, res) => {
  console.log('req', req)
  const restaurants = restaurantList.results.filter((restaurant) => {
    return restaurant.name_en.toLowerCase().includes(req.query.keyword.toLowerCase())
  })

  res.render('index', { restaurant: restaurants, keyword: req.query.keyword })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  console.log('restaurant_id', req.params.restaurant_id)
  const selectRestaurant = restaurantList.results.filter(restaurant => restaurant.id == req.params.restaurant_id)
  res.render('show', { restaurant: selectRestaurant[0] })
})
// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})