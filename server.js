const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/social-api',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('debug', true);
app.listen(PORT, () => console.log(`Social-API is now localhost:${PORT}`))