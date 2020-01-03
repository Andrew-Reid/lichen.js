// Centered shape pattern master:
import checkDefs from './helpers/checkDefs';
import checkPattern from './helpers/checkPattern.js';
import patternProperties from './helpers/patternProperties.js';
import arr from './helpers/arr.js';
import pattern from './pattern.js';


export default function ptOctagon(S,I) {
	var p = pattern(S,I);
	
	p.base = [[[0.707,0],[0,-0.707],[-0.707,0],[0,0.707]],[[0.707,2.41],[0,1.717],[-0.707,2.41],[0,3.12]],[[3.12,2.41],[2.41,1.71],[1.71,2.41],[2.41,3.12]],[[3.12,0],[2.41,-0.707],[1.71,0],[2.41,0.707]],[[0,0.707],[0,1.717],[0.71,2.41],[1.71,2.41],[2.41,1.71],[2.41,0.71],[1.71,0],[0.707,0],[0,0.707]]]

	p.l = 32;
	p.f = ["steelblue","white"]
	p.a = 15;
	p.sw = 1;
	
	p.side = function(_) { if(!arguments.length) return p.l; p.l = _; return p; }
	p.fill = function(_)   { if(!arguments.length) return p.f; p.f = _; return p; }
    p.a =0;

	p.add = function() {
		var defs = checkDefs(p.sel);
		var pt = checkPattern(p.sel,defs,p.id);
		patternProperties(pt,p.a,p.id);
		
		var k = p.l/2.41;
		var w = k * 2.41 + p.sw/2;
		var c = [1,1,1,1,0];
		
		var l = d3.line()
		  .x(function(d) { return d[0]*k; })
		  .y(function(d) { return d[1]*k; })
		
		pt.attr("width", w)
		  .attr("height", w)							
		  .attr("patternUnits","userSpaceOnUse")
	      .attr("patternTransform","rotate("+p.a+")")
	      .attr("id",p.id);		
		
		pt.selectAll("path")
		  .data(p.base)
		  .enter()
		  .append("path")
		  
		pt.selectAll("path")
		  .attr("d",l)
		  .attr("fill",function(d,i) { return p.f[c[i]]; })
		  .attr("stroke", p.s)
		  .attr("stroke-width", p.sw)
		  .attr("opacity",p.o)
		
		return p;
	}
	p.add();
	return p;
}