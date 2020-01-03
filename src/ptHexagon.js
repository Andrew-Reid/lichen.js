// Centered shape pattern master:
import widthHeight from './helpers/widthHeight.js';
import checkDefs from './helpers/checkDefs';
import checkPattern from './helpers/checkPattern.js';
import hxCentroids from './centroids/hxCentroids.js';
import hxThreeColor from './centroids/hxThreeColor.js';
import patternProperties from './helpers/patternProperties.js';
import applyBackground from './helpers/applyBackground.js';
import hexPath from './helpers/hexPath.js';

import ptCentered from './types/ptCentered.js';

export default function ptHexagon(S,I) {
	var p = ptCentered(S,I);
	
	p.r = 10;
	p.radius = function(_)  	{ if(!arguments.length) return p.r; p.r = _; return p; }	
	
	var fillMap = [0,0,1,2,1,1,0,2,2,1]; 
	
	p._sq = function(pt) {
		widthHeight(pt,p.r*2+p.sp,p.r*2+p.sp); 				
		applyBackground(pt,p.bg,p.r*2+p.sp,p.r*2+p.sp);		
		var d = [[p.sp/2+p.r,p.sp/2+p.r]];			
		var c = pt.selectAll("path")
		  .data(d);
		
		c.exit().remove();
		c.enter().append("path");
	}
	p._hx = function(pt) {
		var d;
		Array.isArray(p.f) ? d = hxThreeColor(p.sp/2 + p.r) : d = hxCentroids((p.sp/2 + p.r)); 
		
		widthHeight(pt,d.w,d.h);							  
		applyBackground(pt,p.bg,d.w,d.h);				  
		
		pt.selectAll("path")
		  .data(d.c)
		  .enter()
		  .append("path");		
	}	
	p._style = function(pt) {
		pt.selectAll("path")
		  .attr("d", function(d) { return hexPath(d[0],d[1],p.r); })
		  .attr("fill", function(d,i) {
			if(!Array.isArray(p.f)) return p.f;
			else {
				var c = fillMap[i];
				return p.f[c];
			}
		  })
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