const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectToDB = require('./db/db')
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');

connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/users', userRoutes);
app.use(cookieParser());

app.get('/', (req,res) => {
    res.send('Hellouber clone')
});

module.exports = app;