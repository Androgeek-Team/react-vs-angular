/* global require */
/* global __dirname */
/* global process */

var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    Store = require('./mongo-store');

app.use('/', express.static(__dirname));
app.use(bodyParser());

app.get('/risks.json', Store.riskList);

app.get('/list/status.json', Store.statusList);
app.get('/list/area.json', Store.areaList);
app.get('/list/impact.json', Store.impactList);
app.get('/list/probability.json', Store.probabilityList);

app.post('/risks.json', Store.saveRisk);

var server = app.listen(process.env.PORT || 3000, function() {
    console.log('Listening on port %d', server.address().port);
});
