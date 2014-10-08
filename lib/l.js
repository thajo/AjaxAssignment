//This is a simple simple logger module

(function(){
	/** DEBUG **/
	// could turn this on/off
	exports.debug_mode = true;

	exports.l = function(mess) {
		if(!exports.debug_mode) {return;}
		console.log("\n" +mess);
	};
})();