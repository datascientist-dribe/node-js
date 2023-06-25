const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin.js')
const shopRoutes = require('./routes/shop.js')

app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// 404 message
app.use((req, res, next) => {
    //res.status(404).send('<h1> Page not found </h1>');
    res.status(404).sendFile(path.join(__dirname, 'views', 'page-not-found.html'))
});

app.listen(3000);



// const server = http.createServer(app);

// server.listen(3000);