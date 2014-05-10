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

var __lastRiskId = risks.length;
var getNextRiskId = function() {
  return ++__lastRiskId;
};

var findRiskIndexById = function(id) {
  for(var i = 0, _l = risks.length; i < _l; i++) {
    if (risks[i].id === id) {
      return i;
    }
  }
  return false;
};

app.use('/', express.static(__dirname));
app.use(bodyParser());

app.get('/risks.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  return res.send(JSON.stringify(risks));
});

app.post('/risks.json', function(req, res) {
  req.body.owner = { name: Users[1], id: 1 };
  req.body.impact = parseInt(req.body.impact, 10);
  req.body.probability = parseInt(req.body.probability, 10);
  req.body.status = {
    id: parseInt(req.body.status, 10),
    name: StatusList[req.body.status]
  };
  req.body.areas = req.body.areas.map(function(item) { return parseInt(item, 10); });

  console.log(req.body.id);
  if (typeof req.body.id !== "undefined") {
    req.body.id = parseInt(req.body.id, 10);
    var riskIndex = findRiskIndexById(req.body.id);
    risks[riskIndex] = req.body;
  } else {
    req.body.id = getNextRiskId();
    risks.push(req.body);
  }

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ success: true }));
});

var server = app.listen(process.env.PORT || 3000, function() {
    console.log('Listening on port %d', server.address().port);
});
