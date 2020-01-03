// Centered shape pattern master:
import widthHeight from './helpers/widthHeight.js';
import checkDefs from './helpers/checkDefs';
import checkPattern from './helpers/checkPattern.js';
import hxRects from './centroids/hxRects.js';
import patternProperties from './helpers/patternProperties.js';
import applyBackground from './helpers/applyBackground.js';

import ptCentered from './types/ptCentered.js';

export default function ptSquare(S,I) {
	var p = ptCentered(S,I);
	
	p.l = 10;
	p.side = function(_)  	{ if(!arguments.length) return p.l; p.l = _; return p; }
	
	p._sq = function(pt) {
		widthHeight(pt,p.l + p.sp, p.l + p.sp); 				
		applyBackground(pt,p.bg,p.l + p.sp, p.l + p.sp);	
		var d = [[p.sp/2,p.sp/2]];					
		var r = pt.selectAll(".rect")
		  .data(d);
		  
		r.exit().remove();
		r.enter().append("rect").attr("class","rect");	
	}
	
	p._hx = function(pt) {
		var d = hxRects(p.sp + p.l);		
		widthHeight(pt,d.w,d.h);							
		applyBackground(pt,p.bg,d.w,d.h);				
		
		pt.selectAll(".rect")
		  .data(d.c)
		  .enter()
		  .append("rect")
		  .attr("class","rect");
	}
	
	p._style = function(pt) {
		pt.selectAll(".rect")
		  .attr("x", function(d) { return d[0] })
		  .attr("y", function(d) { return d[1] })
		  .attr("width", p.l)
		  .attr("height",p.l)
		  .attr("fill", p.f)
		  .attr("stroke",p.s)
		  .attr("stroke-width",p.sw);	
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