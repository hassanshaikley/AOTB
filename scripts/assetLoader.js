var url;

var flySprite = new Image();
var silverShield = new Image();
var silverSword = new Image();
var ground = new Image();
var CastleOfOne = new Image();
var RedhatterSprite = new Image();
var fireballSprite = new Image();

function UrlExists(url)
{
  var http = new XMLHttpRequest();
  http.open('HEAD', url, false);
  http.send();
  return http.status!=404;
}

if (location.origin == "http://localhost:5000" && UrlExists("/localAssets/flysheet.png")){
  url ="localAssets/";
} else {
  url = "https://s3-us-west-2.amazonaws.com/amara-assets/";
}

CastleOfOne.src = url + "CastleOfOne.png";
ground.src = url +"earthenfloor.png";
flySprite.src = url + "flysheet.png";
silverSword.src = url+ "silverSword.png";
silverShield.src = url+ "silverShield.png";
RedhatterSprite.src = url + "redHatter.png";
fireballSprite.src = url + "fireball.png";
