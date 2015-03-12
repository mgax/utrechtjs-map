var fs = require('fs');
var request = require('request');
var osmtogeojson = require('osmtogeojson');

var pub_query = '[out:json][timeout:25];node[amenity~"pub|cafe"](52.0718,5.0938,52.0999,5.1570);out;';
var road_query = '[out:json][timeout:25];way[highway~""](52.0718,5.0938,52.0999,5.1570);(._;>;);out;';


function overpass(q, cb) {
  var url = 'http://overpass-api.de/api/interpreter?data=' + encodeURIComponent(q);
  request(url, function(err, res, body) {
    cb(osmtogeojson(JSON.parse(body)));
  });
}


overpass(pub_query, function(pubs) {
  overpass(road_query, function(roads) {
    var data = {
      pubs: pubs,
      roads: roads
    };
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  });
});
