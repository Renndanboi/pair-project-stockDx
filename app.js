const express = require('express')
const app = express()
const port = 3000
const routers = require('./routers/index')
const path = require('path')

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')))

app.use(routers);

app.listen(port, () => {
  console.log(`Listening to destroy dedix ${port}`)
})