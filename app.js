const express = require('express');
const { routes } = require('./routes/routes');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;


app.use("/api",routes)


app.listen(PORT , () => {
    console.log('Server is running on port 3000');
});