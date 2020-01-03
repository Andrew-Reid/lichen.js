// Centered shape pattern master:
import widthHeight from './helpers/widthHeight.js';
import checkDefs from './helpers/checkDefs';
import checkPattern from './helpers/checkPattern.js';
import hxCentroids from './centroids/hxCentroids.js';
import patternProperties from './helpers/patternProperties.js';
import applyBackground from './helpers/applyBackground.js';

import ptCentered from './types/ptCentered.js';


export default function ptCircle(S,I) {
	var p = ptCentered(S,I);
	
	p.r = 10;
	p.radius = function(_)  	{ if(!arguments.length) return p.r; p.r = _; return p; }	
	
	p._sq = function(pt) {
		widthHeight(pt,p.r*2+p.sp,p.r*2+p.sp); 				
		applyBackground(pt,p.bg,p.r*2+p.sp,p.r*2+p.sp);		
		var d = [[p.sp/2+p.r,p.sp/2+p.r]];			
		var c = pt.selectAll("circle")
		  .data(d);
		
		c.exit().remove();
		c.enter().append("circle");
	}
	p._hx = function(pt) {
		var d = hxCentroids((p.sp/2 + p.r)/0.866); 
		widthHeight(pt,d.w,d.h);							  
		applyBackground(pt,p.bg,d.w,d.h);				  
		
		pt.selectAll("circle")
		  .data(d.c)
		  .enter()
		  .append("circle");		
	}	
	p._style = function(pt) {
		pt.selectAll("circle")
		  .attr("cx", function(d) { return d[0] })
		  .attr("cy", function(d) { return d[1] })
		  .attr("r", p.r)
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