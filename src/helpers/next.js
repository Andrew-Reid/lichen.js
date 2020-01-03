// Get the next free class for a pattern:
export default function next(svg) {
	function increment() {
	   var selection = svg.select("#lichen-"+i)
	   if (!selection.empty()) {
			return false;
	   }
	   return true;
	}
	
	var i = 0;
	while (!increment(i)) {
		 i++;
		if ( i > 1000) break;  // upper limit of patterns
	}
	
	return "lichen-"+i;
}