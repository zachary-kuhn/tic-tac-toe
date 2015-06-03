var express = require('express');

var app = express();

app.use(express.static('app'));
app.use('/libs', express.static('node_modules'));

app.listen(3000);
