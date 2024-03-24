require('dotenv').config(); // helps us use environment variables in all files
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const {logger} = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConn');
const mongoose = require('mongoose');
const { logEvents } = require('./middleware/logger');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session)
const flash = require('express-flash');

const PORT = process.env.PORT || 3500;

connectDB();

const app = express();

app.set('view engine', 'ejs');

app.set('views','views');

const store = new MongoDBSession({
    uri: process.env.DATABASE_URI,
    collection: "sessions"
})

app.use(session({
    secret: process.env.SESSION_TOKEN_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store
}))

app.use(flash());

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger)

app.use('/',express.static(path.join(__dirname, '/public')));

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use('/', require('./routes/root'));
app.use('/auth',require('./routes/controllers/authRoutes'));
app.use('/dashboard',require('./routes/controllers/dashboardRoutes'));
app.use('/users',require('./routes/controllers/userRoutes'));
app.use('/astromon-infos',require('./routes/controllers/astromonInfoRoutes'));
app.use('/astromons',require('./routes/controllers/astromonRoutes'));
app.use('/skills',require('./routes/controllers/skillRoutes'));
app.use('/members',require('./routes/controllers/memberRoutes'));
app.use('/messages',require('./routes/controllers/messageRoutes'));
app.use('/apophis',require('./routes/controllers/apophisRoutes'));
app.use('/golems',require('./routes/controllers/golemRoutes'));
app.use('/titans',require('./routes/controllers/titanRoutes'));
app.use('/api/auth', require('./routes/apis/authRoutes'));
app.use('/api/users', require('./routes/apis/userRoutes'));
app.use('/api/members',require('./routes/apis/memberRoutes'));
app.use('/api/astromons',require('./routes/apis/astromonRoutes'));
app.use('/api/messages',require('./routes/apis/messageRoutes'));
app.use('/api/skills', require('./routes/apis/skillRoutes'));
app.use('/api/apophis',require('./routes/apis/apophisRoutes'));
app.use('/api/golems',require('./routes/apis/golemroutes'));
app.use('/api/titans',require('./routes/apis/titanRoutes'));

app.all('*',(req,res)=>{
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'));
    } else if (req.accepts('json')) {
        res.json({ message: "404 Not Found"});
    } else {
        res.type('txt').send('404 Not Found');
    }
});

app.use(errorHandler);

mongoose.connection.once('open', ()=>{
    console.log('Connected to MongoDB')
    app.listen(PORT, ()=>{
        console.log(`Server running on port ${PORT}`)
    });
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,'mongoErrLog.log')
})

