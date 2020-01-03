// Centered shape pattern master:
import checkDefs from './helpers/checkDefs';
import checkPattern from './helpers/checkPattern.js';
import patternProperties from './helpers/patternProperties.js';
import arr from './helpers/arr.js';
import pattern from './pattern.js';


export default function ptSine(S,I) {
	var p = pattern(S,I);

	p.amp = 10;
	p.sam = 1;
	p.per = 100;
	p.sw = 10;
	p.s = "steelblue";
	p.f = "none";
	p.sp = 4;

	p.amplitude = function(_) { if(!arguments.length) return p.amp; p.amp = _; return p; }
	p.period = function(_) { if(!arguments.length) return p.per; p.per = _; return p; }
	p.sampling = function(_) { if(!arguments.length) return p.sam; p.sam = _; return p; }
	p.spacing = function(_)  { if(!arguments.length) return p.sp; p.sp = _; return p; }

	p.add = function() {
		var defs = checkDefs(p.sel);
		var pt = checkPattern(p.sel,defs,p.id);
		patternProperties(pt,p.a,p.id);
			  
		
		var points=[]; 
		var x,y;
		var width = p.per;
		var samples = width/p.sam;
		
		for (var i =0; i < (samples+20); i++) {
			x= (i-10) * p.sam;
			y= Math.sin(i/samples*Math.PI*8) * p.amp;
			if(i==0) points.push("M"+x+" "+y); 
			else points.push(" L"+x+" "+y);
		}
		
		var path = points.join(" ");
		
		pt.attr("width", width)
		  .attr("height", (p.amp+p.sw/4+p.sp)*2)							
		  .attr("patternUnits","userSpaceOnUse")
	      .attr("patternTransform","rotate("+p.a+")")
		  .attr("stroke-width",p.sw)
		  .attr("stroke",p.s)
	      .attr("id",p.id)
		  .attr("fill",p.f)
		
		var paths = pt.selectAll("path")
		  .data([path]);		
		  
		paths.exit().remove();
		
		var enter = paths.enter()
		  .append("path");
		  
		enter.merge(paths)
		  .attr("transform","translate(0,"+(p.amp+p.sw/4+p.sp)+")")
		  .attr("d", path)
		
		return p;
	}
	p.add();
	return p;
}