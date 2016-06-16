var tessUtils = {};

tessUtils.getRandomInt = function(min, max) { 
  	return Math.floor(Math.random() * (max - min)) + min;
};