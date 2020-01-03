export default function hxCentroids(r) {
	// units:
	var h = r*2;
	var w = Math.sqrt(3)/2 * h;
		
	// dimensions:		
	var dy = h*1.5;	
	var dx = w;
	
	return {"h":dy,"w":dx,"c":[[w/2,0],[w/2,dy],[0,h*3/4],[dx,h*3/4]]};
}