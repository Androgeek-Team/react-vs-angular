var Client = require('mongodb').MongoClient;

var Store = {
  'status': null,
  'area': null,
  'impact': null,
  'probability': null,
  'risk': null
};

var MongoURL = process.env.MONGOHQ_URL || "mongodb://127.0.0.1:27017/risk-register";

Client.connect(MongoURL, function(error, db) {
  if(error) throw error;

  Store.status = db.collection('status');
  Store.area = db.collection('area');
  Store.impact = db.collection('impact');
  Store.probability = db.collection('probability');
  Store.risk = db.collection('risks');

  Store.status.count({}, function(error, result) {
    if (result < 1) {
      populateStatusList();
    }
  });
  Store.area.count({}, function(error, result) {
    if (result < 1) {
      populateAreaList();
    }
  });
  Store.impact.count({}, function(error, result) {
    if (result < 1) {
      populateImpactList();
    }
  });
  Store.probability.count({}, function(error, result) {
    if (result < 1) {
      populateProbabilityList();
    }
  });
});

/* Default values */
var populateStatusList = function() {
  var StatusList = [
    { _id: 1, name: "New", className: "label-danger" },
    { _id: 2, name: "Pending", className: "label-warning" },
    { _id: 3, name: "Closed", className: "label-success" }
  ];

  Store.status.insert(StatusList, {safe: true}, function(error, results) {});
};

var populateAreaList = function() {
  var AreaList = [
    { _id: 1, name: "Cost" },
    { _id: 2, name: "Schedule" },
    { _id: 3, name: "Performance" }
  ];

  Store.area.insert(AreaList, {safe: true}, function(error, results) {});
};

var populateImpactList = function() {
  var ImpactList = [
    { _id: 1, name: "1 (Low)      " },
    { _id: 2, name: "2 (Low)      " },
    { _id: 3, name: "3 (Low)      " },
    { _id: 4, name: "4 (Medium)   " },
    { _id: 5, name: "5 (Medium)   " },
    { _id: 6, name: "6 (Medium)   " },
    { _id: 7, name: "7 (High)     " },
    { _id: 8, name: "8 (High)     " },
    { _id: 9, name: "9 (High)     " }
  ];

  Store.impact.insert(ImpactList, {safe: true}, function(error, results) {});
};

var populateProbabilityList = function() {
  var ProbabilityList = [
    { _id: 1, name: "1 (Low)      Almost impossible" },
    { _id: 2, name: "2 (Low)      There is a minimal chance" },
    { _id: 3, name: "3 (Low)      This can even be done" },
    { _id: 4, name: "4 (Medium)   Have a chance" },
    { _id: 5, name: "5 (Medium)   We have to deal with this soon" },
    { _id: 6, name: "6 (Medium)   This week let's talk about it" },
    { _id: 7, name: "7 (High)     We need to talk about it in a few days" },
    { _id: 8, name: "8 (High)     We need to talk about it today" },
    { _id: 9, name: "9 (High)     We need to talk about it now!" }
  ];

  Store.probability.insert(ProbabilityList, {safe: true}, function(error, results) {});
};

/* Public Methods */
module.exports.statusList = function(req, res) {
  Store.status.find().sort({_id: 1}).toArray(function(error, list) {
    res.setHeader('Content-Type', 'application/json');
    res.send(list);
  });
};
module.exports.areaList = function(req, res) {
  Store.area.find().sort({_id: 1}).toArray(function(error, list) {
    res.setHeader('Content-Type', 'application/json');
    res.send(list);
  });
};
module.exports.impactList = function(req, res) {
  Store.impact.find().sort({_id: 1}).toArray(function(error, list) {
    res.setHeader('Content-Type', 'application/json');
    res.send(list);
  });
};
module.exports.probabilityList = function(req, res) {
  Store.probability.find().sort({_id: 1}).toArray(function(error, list) {
    res.setHeader('Content-Type', 'application/json');
    res.send(list);
  });
};
module.exports.riskList = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  return Store.risk.find({}).sort({id: 1}).toArray(function(error, risks) {
    return res.send(risks);
  });
};
module.exports.saveRisk = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  return Store.risk.find({}).sort({id: -1}).limit(1).toArray(function(error, lastRisk) {
    if (error) {
      return res.send({error: error});
    }

    var newId = 1;
    if (lastRisk.length > 0) {
      newId = lastRisk[0].id + 1;
    }

    return Store.risk.findOne({id: parseInt(req.body.id, 10)}, function(error, risk) {
      if (error) {
        return res.send({error: error});
      }

      if (typeof risk === "undefined" || risk === null) {
        risk = {
          id: newId,
          owner: { name: "yitsushi", id: 1 }
        };
      }

      risk.name = req.body.name;
      risk.impact = parseInt(req.body.impact, 10);
      risk.probability = parseInt(req.body.probability, 10);
      risk.status = parseInt(req.body.status, 10);
      risk.areas = req.body.areas.map(function(item) { return parseInt(item, 10); });
      risk.plan = req.body.plan;

      return Store.risk.save(risk, function(error, result) {
        return res.send({error: error, risk: result});
      });
    });

  });
};
