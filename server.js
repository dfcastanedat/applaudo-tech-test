// TOOK FROM: https://itnext.io/how-to-deploy-angular-application-to-heroku-1d56e09c5147

const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/applaudo-tech-test'));

app.get('/*', function (req, res) {

    res.sendFile(path.join(__dirname + '/dist/applaudo-tech-test/index.html'));
});


app.listen(process.env.PORT || 8080);