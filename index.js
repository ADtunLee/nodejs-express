var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var productRouter = require('./routes/product.route');
var cartRoute = require('./routes/cart.router');
var transferRouer = require('./routes/transfer.router');

var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');

var port = 3000;


var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('asdasdasdasd'));
app.use(express.static('public'));
app.use(sessionMiddleware);

app.set('view engine', 'pug');
app.set('views', './views');
app.get('/', (req, res) => res.render('index',{
    name:'AAA'
}));
app.use('/users',authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products',authMiddleware.requireAuth,productRouter);
app.use('/cart', cartRoute);
app.use('/transfer', transferRouer);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));