const path = require('path');
const cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const aquarelleRoutes = require('./routes/aquarelle.route'); // Imports routes for the acuarelas
const usersRoutes = require('./routes/user.route');

const port = process.env.PORT || 8080;
const app = express();

// Set up mongoose connection
const mongoDB = process.env.MONGODB_URI || 'mongodb://localhost:27017/aquarelles';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());
app.use(bodyParser.json());
app.use('/aquarelles', aquarelleRoutes);
app.use('/users', usersRoutes);

//if (process.env.NODE_ENV === 'production') {
// Serve any static files
//TODO for prod### app.use(express.static(path.join(__dirname, '../client/build')));

// Handle React routing, return all requests to React app
/*TODO for prod#### app.get('*', function (req, res) {
  ####  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
#### });*/
//}

app.listen(port, () => {
  console.log('Server is up and running on port numner ' + port);
});
