/***
 * @file
  Real elevation module for the game.
 */
define([], function() {
  
  var call = function(geom) {
    console.log(geom.vertices.length);
    // Request tiff image of the real zone.
    var http = new XMLHttpRequest();
    var url = "http://37.59.55.69/sites/all/modules/proxy.php";
    http.open("GET", url, true);

    http.onreadystatechange = function() {//Call a function when the state changes.
      if(http.readyState == 4 && http.status == 200) {
        var obj = JSON.parse(http.responseText);
        var altitudes = obj.resourceSets[0].resources[0].elevations;
        var moy = moyenne(altitudes);
        for (var i = 0; i < altitudes.length; i++) {
          geom.vertices[i].z = (altitudes[i] - moy) * 0.3;
          geom.computeFaceNormals();
          geom.computeVertexNormals();
          geom.verticesNeedUpdate = true;
          geom.normalsNeedUpdate = true;
        }
      }
    }
    http.send();
  }

  function moyenne(tableau) {
    var n = tableau.length;   // nombre de valeurs
    var somme = 0;
    for(i=0; i < n; i++) {
      somme += tableau[i];
    }
    return somme / n;   // somme divisee par le nombre de valeurs
  }

  var update = function() {
    // Update terrain man !
  }

  return {
    'call' : call,
    'upadate' : update,
  }
});
