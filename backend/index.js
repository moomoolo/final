const express = require('express');
const cors = require('cors');

const loginRouter = require('./router/login');
const userRouter = require('./router/user');
const stationRouter = require('./router/station');

const PORT = 9527;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/station', stationRouter);

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
})