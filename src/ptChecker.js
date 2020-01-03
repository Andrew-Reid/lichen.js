// Centered shape pattern master:
import checkDefs from './helpers/checkDefs';
import checkPattern from './helpers/checkPattern.js';
import patternProperties from './helpers/patternProperties.js';
import arr from './helpers/arr.js';
import pattern from './pattern.js';


export default function ptChecker(S,I) {
	var p = pattern(S,I);

	p.w = 10;
	p.f = ["steelblue","white"];
	p.width = function(_) { if(!arguments.length) return p.w; p.w = _; return p; }
	p.fill = function(_)  { if(!arguments.length) return p.f; p.f = arr(_); return p; }
    p.a = 45;

	// go about drawing:
	p.add = function() {
		var defs = checkDefs(p.sel);
		var pt = checkPattern(p.sel,defs,p.id);
		patternProperties(pt,p.a,p.id);
			  
		p.o = arr(p.o);	
		
		if (p.f.length == 1) p.f.push("white");
		
		var totalWidth = p.w * 2;
		
		pt.attr("width", totalWidth)
		  .attr("height", totalWidth)	
		  .attr("patternUnits","userSpaceOnUse")
	      .attr("patternTransform","rotate("+p.a+")")
	      .attr("id",p.id);		
		
		var rects = pt.selectAll("rect")
		  .data([[0,0],[0,p.w],[p.w,p.w],[p.w,0]]);		
		  
		rects.exit().remove();
		
		var enter = rects.enter()
		  .append("rect")
		  
		enter.merge(rects)
		  .attr("width",  p.w)
		  .attr("height", p.w)
		  .attr("x", function(d,i) { return d[0]; })
		  .attr("y", function(d,i) { return d[1]; })
		  .attr("fill",function(d,i) { return p.f[i%2]; })
		  .attr("opacity",function(d,i) { return p.o[i%p.o.length]; })

		
		return p;
	}
	p.add();
	return p;
}