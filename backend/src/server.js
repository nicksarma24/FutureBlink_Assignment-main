const express = require('express');
const bodyParser = require('body-parser');
const emailRoutes = require('./routes/emailRoutes');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use('/api', emailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
