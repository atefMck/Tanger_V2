const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/api/users')
const profiles = require('./routes/api/profiles')
const payments = require('./routes/api/payments')

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("DataBase Connected!"))
    .catch(err => console.log(err));

// Routing
app.use('/api/users', users);
app.use('/api', profiles);
app.use('/api', payments);

const port = process.env.PROT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
