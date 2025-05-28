const express = require('express');
const app = express();
require('dotenv').config();

app.get('/', (req, res) => {
    const PORT = process.env.PORT;
    const FLAG = process.env.FLAG;
});

app.listen(PORT, () => {
    console.log(`Challenge 1 is running on PORT ${PORT}`);
});
