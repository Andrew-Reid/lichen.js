// Three color hexes:
export default function hxThreeColor(r) {
	// units:
	var h = r*2;
	var w = Math.sqrt(3)/2 * h;
		
	// dimensions:		
	var dy = h*1.5;	
	var dx = w*3;
	
	return {"h":dy,"w":dx,"c":[[w/2,0],[w/2,dy],[0,h*3/4],[w,h*3/4], [w*1.5,0],[w*1.5,dy],[w*2,h*3/4],  [w*2.5,0],[w*2.5,dy],[w*3,h*3/4]  ]};
}
