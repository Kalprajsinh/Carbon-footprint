const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

const User = mongoose.model('User', {
    name: String,
    noOfEmail: Number
});

module.exports = User;

//xocicar413@shouxs.com, Xocicar@413
