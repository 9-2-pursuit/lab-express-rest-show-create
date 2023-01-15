const app = require('./app');  // The express app we just created
require('dotenv').config(); //load environment variables from .env file
const port = process.env.PORT || 3005; //establish port number



APP.listen(port, () => {
    console.log(`App running on port ${port}...`);
    });