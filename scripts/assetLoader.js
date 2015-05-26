/* assetLoader.js
 * Loads assets, looks for resources locally. If it cannot find them 
 * then uses AWS for the files!
 */
 
var url;
function UrlExists(url)
{
  var http = new XMLHttpRequest();
  http.open('HEAD', url, false);
  http.send();
  return http.status!=404;
}
console.log(location.origin);
if (location.origin === "http://localhost:5000" && 
	UrlExists("/localAssets/flysheet2.png")){
  	url ="localAssets/";
} else {
  url = "https://s3-us-west-2.amazonaws.com/amara-assets/";
}