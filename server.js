const express = require('express');
const Routes = require('./routes/routes');

// const { authenticateToken } = require('../middleware/authMiddleware');


const app = express();
const port = process.env.APP_PORT;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/v1/users', Routes);
app.use('/api/v1/login', Routes);
app.use('/api/v1/register', Routes);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
