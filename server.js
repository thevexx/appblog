const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const port = 3000;

app.use(bodyparser.json()); 

const authRouter = require('./Server/Routes/auth');
app.use('/auth', authRouter);

const blogRouter = require('./Server/Routes/blog');
app.use('/blog', blogRouter);

app.listen(port, err => {
    console.log(`Connect with port ${port}`)
})
