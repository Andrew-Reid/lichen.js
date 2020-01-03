// Centered shape pattern master:
import widthHeight from './helpers/widthHeight.js';
import checkDefs from './helpers/checkDefs';
import checkPattern from './helpers/checkPattern.js';
import hxCentroids from './centroids/hxCentroids.js';
import patternProperties from './helpers/patternProperties.js';
import applyBackground from './helpers/applyBackground.js';
import hexPath from './helpers/hexPath.js';

import ptCentered from './types/ptCentered.js';

export default function ptLetter(S,I) {
	var p = ptCentered(S,I);
	
	p.t = "\u03B1";
	p.dy = 5;
	p.k = 14;
	
	p.offsetY = function(_) { if(!arguments.length) return p.dy; p.dy = _; return p; }		
	p.text = function(_)  	{ if(!arguments.length) return p.t; p.t = _; return p; }		
	p.fontSize = function(_){ if(!arguments.length) return p.k; p.k = _; return p; }
	p.sp = 20;
	
	p._sq = function(pt) {
		widthHeight(pt,p.sp,p.sp); 							// set width/height
		applyBackground(pt,p.bg,p.sp,p.sp);					// set background rect
		var d = [[p.sp/2,p.sp/2]];					// middle of each path.
		var c = pt.selectAll("text")
		  .data(d);
		
		c.exit().remove();
		c.enter().append("text");
	}
	p._hx = function(pt) {
		var d = hxCentroids((p.sp/2 ));		 	  // get hex info,
		widthHeight(pt,d.w,d.h);							  // set width/height
		applyBackground(pt,p.bg,d.w,d.h);				  // set background rect
		
		pt.selectAll("text")
		  .data(d.c)
		  .enter()
		  .append("text");		
	}	
	p._style = function(pt) {
		pt.selectAll("text")
		  .text(p.t)
		  .style("text-anchor","middle")
		  .attr("fill", p.f)
		  .attr("stroke",p.s)
		  .attr("stroke-width",p.sw)
		  .attr("x", function(d) { return d[0]; })
		  .attr("y", function(d) { return d[1]; })
		  .style("font-size",p.k)
		  .attr("dy",p.dy);
	}	
	
	p.add = function() {
		var defs = checkDefs(p.sel);
		var pt = checkPattern(p.sel,defs,p.id);
		patternProperties(pt,p.a,p.id);
			  
		if (p.hx) p._hx(pt);
		else p._sq(pt);
		
		p._style(pt);
		return p;	
	}
	p.add();
	return p;
}