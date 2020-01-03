// Centered shape pattern master:
import widthHeight from './helpers/widthHeight.js';
import checkDefs from './helpers/checkDefs';
import checkPattern from './helpers/checkPattern.js';
import hxCentroids from './centroids/hxCentroids.js';
import patternProperties from './helpers/patternProperties.js';
import applyBackground from './helpers/applyBackground.js';

import ptCentered from './types/ptCentered.js';

export default function ptSymbol(S,I) {
	var p = ptCentered(S,I);

	p.sym = d3.symbol().type(d3.symbolWye).size(100);
	p.r = 14;
	p.symbol = function(_) { if(!arguments.length) return p.sym; p.sym = _; return p; }
	
	p.dx = 0; p.dy = 0; 
	p.center = function(_) { if(!arguments.length) return [p.dx,p.dy]; p.dx = _[0]; p.dy = _[1]; return p; }
	
	p.sc = 1;
	p.scale = function(_) { if(!arguments.length) return p.sc; p.sc = _; return p; }
	
	p.sp = 16;
	
	p._sq = function(pt) {
		widthHeight(pt,p.sp,p.sp); 						    
		applyBackground(pt,p.bg,p.sp,p.sp);		     		
		var d = [[p.sp/2,p.sp/2]];					
		var c = pt.selectAll("path")
		  .data(d);
		
		c.exit().remove();
		c.enter().append("path");
	}
	p._hx = function(pt) {
		var d = hxCentroids(p.sp/2*1.414); 	 	  
		widthHeight(pt,d.w,d.h);							  
		applyBackground(pt,p.bg,d.w,d.h);				  
		
		pt.selectAll("path")
		  .data(d.c)
		  .enter()
		  .append("path");		
	}	
	p._style = function(pt) {
		pt.selectAll("path")
		  .attr("d", p.sym)
		  .attr("transform",function(d) { return "translate("+([d[0]-(p.dx*p.sc),d[1]-(p.dy*p.sc)])+ ")scale("+p.sc+")" })
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