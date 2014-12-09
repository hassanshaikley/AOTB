// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
  window.oRequestAnimationFrame      || 
  window.webkitRequestAnimationFrame || 
  window.msRequestAnimationFrame     || 
  window.mozRequestAnimationFrame    || 
  function( callback){
    window.setTimeout(callback, 1000 / 60);
  };
})();
