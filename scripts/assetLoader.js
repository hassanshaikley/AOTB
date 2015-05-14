/* assetLoader.js
 * Loads assets, looks for resources locally. If it cannot find them 
 * then uses AWS for the files!
 */
var url;
var goldCoins = new Image();
var blood = new Image();
var trees = new Image();
var flySprite = new Image();
var silverShield = new Image();
var silverSword = new Image();
var ground = new Image();
var cobbleStone = new Image();
var CastleOfOne = new Image();
var tortStun = new Image();
var RedhatterSprite = new Image();
var fireballSprite = new Image();
var burningBuildingSide = new Image();
var castleLeft = new Image();
var shanker = new Image();
var cloud = new Image();
var skelly = new Image();
var crevice = new Image();
var healingcross = new Image();
var spire0 = new Image();
var spire1 = new Image();
var grimesSprite = new Image();
function UrlExists(url)
{
  var http = new XMLHttpRequest();
  http.open('HEAD', url, false);
  http.send();
  return http.status!=404;
}
console.log(location.origin);
if (location.origin === "http://localhost:5000" 
    && UrlExists("/localAssets/flysheet2.png")){
  url ="localAssets/";
} else {
  url = "https://s3-us-west-2.amazonaws.com/amara-assets/";
}

CastleOfOne.src = url + "CastleOfOne.png";
ground.src = url +"earthenfloor.png";
flySprite.src = url + "flysheet2.png";
silverSword.src = url+ "silverSword2.png";
silverShield.src = url+ "silverShield2.png";
RedhatterSprite.src = url + "redHatter_v2.png";
fireballSprite.src = url + "fireball.png";
burningBuildingSide.src = url + "burning_side.png";
castleLeft.src = url + "castleleft.png";
shanker.src = url + "shanker_2.png";
cobbleStone.src = url + "cobblestone_ground.png";
cloud.src = url + "cloud.png";
skelly.src = url + "skelly.png";
crevice.src = url + "crevice.png";
healingcross.src = url + "cloud.png";
goldCoins.src = url + "gold.png";
spire0.src = url + "spire_0.png";
spire1.src = url + "spire.png";
blood.src = url + "blood.png";
trees.src = url + "trees.png";
grimesSprite.src = url +"grimes.png";
tortStun.src = url + "tort_stun.png";
