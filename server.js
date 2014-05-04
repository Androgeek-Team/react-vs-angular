/* global require */
/* global __dirname */
/* global process */

var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

var StatusList = {
  0: "New",
  1: "Pending",
  2: "Closed"
};

var Users = {
  1: "Yitsushi"
};

var risks = [
  {
    id: 1, name: "Risk 1",
    probability: 4, impact: 6,
    areas: [1],
    plan: "Mitigation / Response plan",
    status: {id: 0, name: StatusList[0]},
    owner: {name: Users[1], id: 1}
  },
  {
    id: 2, name: "Risk 2",
    probability: 7, impact: 2,
    areas: [0, 2],
    plan: "Mitigation / Response plan",
    status: {id: 1, name: StatusList[1]},
    owner: {name: Users[1], id: 1}
  }
];

app.use('/', express.static(__dirname));
app.use(bodyParser());

app.get('/risks.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  return res.send(JSON.stringify(risks));
});

//app.post('/comments.json', function(req, res) {
//  req.body.createdAt = new Date();
//  comments.push(req.body);
//  res.setHeader('Content-Type', 'application/json');
//  res.send(JSON.stringify(comments));
//});

var server = app.listen(process.env.PORT || 3000, function() {
    console.log('Listening on port %d', server.address().port);
});
