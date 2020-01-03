(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.lichen = {}));
}(this, function (exports) { 'use strict';

	function widthHeight(e,w,h) {
	    e.attr("width",w);
		e.attr("height",h);
	}

	function checkDefs(s) {
		var defs = s.select("defs");
		if(defs.empty()) defs = s.append("defs");
		
		return defs;	
	}

	function checkPattern(s,d,id) {
		var pt = s.select("#"+id);
		if (pt.empty()) pt = d.append("pattern");
		return pt;
	}

	function hxCentroidsRects(r) {
		// units:
		var h = r*2;
		var w = Math.sqrt(3)/2 * h;
			
		// dimensions:		
		var dy = h*1.5;	
		var dx = w;
		
		return {"h":dy,"w":dx,"c":[[-w/2,0],[-w/2,dy],[w/2,0],[w/2,dy],[0,h*3/4],[dx,h*3/4]]};
	}

	function patternProperties(p,a,id) {
		p.attr("patternUnits","userSpaceOnUse")
		  .attr("patternTransform","rotate("+a+")")
		  .attr("id", id);
	}

	function applyBackground(p,f,x,y) {
		var r = p.select(".lichenBackground");
		r.remove();
		r = p.append("rect");  
		r.attr("width", x)
		 .attr("height",y)
		 .attr("fill",f)
		 .attr("x",0)
		 .attr("y",0)
		 .lower()
		 .attr("class","lichenBackground");
	}

	// Get the next free class for a pattern:
	function next(svg) {
		function increment() {
		   var selection = svg.select("#lichen-"+i);
		   if (!selection.empty()) {
				return false;
		   }
		   return true;
		}
		
		var i = 0;
		while (!increment()) {
			 i++;
			if ( i > 1000) break;  // upper limit of patterns
		}
		
		return "lichen-"+i;
	}

	// Base to patterns:

	function pattern(S,I) {
		var p = function() {
			p.add();
			return "url(#"+p.id+")";
		};
		// basic set up:
		var selection = (S.tagName == "svg") ? d3.select(S) : S;
	    selection ? selection : d3.select("svg");
		p.sel = selection;
		
		if(I)  p.id = I; 
		else p.id = next(p.sel);	// get new ID
		
		// basic pattern info:
		p.bg = "none";
		p.sw = 0;
		p.s = "#000";
		p.o = 1;
		p.a = 0;
			
		p.background = function(_)  { if(!arguments.length) return p.bg; p.bg = _; return p; };
		p.strokeWidth = function(_)	{ if(!arguments.length) return p.sw; p.sw = _; return p; };
		p.stroke = function(_) 		{ if(!arguments.length) return p.s; p.s = _; return p; };
		p.opacity = function(_)     { if(!arguments.length) return p.o; p.o = _; return p; };
		p.angle = function(_)	 	{ if(!arguments.length) return p.a; p.a = _; return p; };
		
		return p;	
	}

	// Centered shape pattern master:

	function ptCentered(S,I) {
		var p = pattern(S,I);
		
		p.f = "steelblue";
		p.hx = true;
		p.sp = 2;
		
		p.fill = function(_)  	{ if(!arguments.length) return p.f; p.f = _; return p; };
		p.hex = function(_)  	{ if(!arguments.length) return p.hx; p.hx = _; return p; };
		p.spacing = function(_) { if(!arguments.length) return p.sp; p.sp = _; return p; };
		
		return p;
	}

	// Centered shape pattern master:

	function ptSquare(S,I) {
		var p = ptCentered(S,I);
		
		p.l = 10;
		p.side = function(_)  	{ if(!arguments.length) return p.l; p.l = _; return p; };
		
		p._sq = function(pt) {
			widthHeight(pt,p.l + p.sp, p.l + p.sp); 				
			applyBackground(pt,p.bg,p.l + p.sp, p.l + p.sp);	
			var d = [[p.sp/2,p.sp/2]];					
			var r = pt.selectAll(".rect")
			  .data(d);
			  
			r.exit().remove();
			r.enter().append("rect").attr("class","rect");	
		};
		
		p._hx = function(pt) {
			var d = hxCentroidsRects(p.sp + p.l);		
			widthHeight(pt,d.w,d.h);							
			applyBackground(pt,p.bg,d.w,d.h);				
			
			pt.selectAll(".rect")
			  .data(d.c)
			  .enter()
			  .append("rect")
			  .attr("class","rect");
		};
		
		p._style = function(pt) {
			pt.selectAll(".rect")
			  .attr("x", function(d) { return d[0] })
			  .attr("y", function(d) { return d[1] })
			  .attr("width", p.l)
			  .attr("height",p.l)
			  .attr("fill", p.f)
			  .attr("stroke",p.s)
			  .attr("stroke-width",p.sw);	
		};		
		p.add = function() {
			var defs = checkDefs(p.sel);
			var pt = checkPattern(p.sel,defs,p.id);
			patternProperties(pt,p.a,p.id);
				  
			if (p.hx) p._hx(pt);
			else p._sq(pt);
			
			p._style(pt);
			return p;	
		};
		p.add();
		return p;
	}

	function hxCentroids(r) {
		// units:
		var h = r*2;
		var w = Math.sqrt(3)/2 * h;
			
		// dimensions:		
		var dy = h*1.5;	
		var dx = w;
		
		return {"h":dy,"w":dx,"c":[[w/2,0],[w/2,dy],[0,h*3/4],[dx,h*3/4]]};
	}

	// Centered shape pattern master:


	function ptCircle(S,I) {
		var p = ptCentered(S,I);
		
		p.r = 10;
		p.radius = function(_)  	{ if(!arguments.length) return p.r; p.r = _; return p; };	
		
		p._sq = function(pt) {
			widthHeight(pt,p.r*2+p.sp,p.r*2+p.sp); 				
			applyBackground(pt,p.bg,p.r*2+p.sp,p.r*2+p.sp);		
			var d = [[p.sp/2+p.r,p.sp/2+p.r]];			
			var c = pt.selectAll("circle")
			  .data(d);
			
			c.exit().remove();
			c.enter().append("circle");
		};
		p._hx = function(pt) {
			var d = hxCentroids((p.sp/2 + p.r)/0.866); 
			widthHeight(pt,d.w,d.h);							  
			applyBackground(pt,p.bg,d.w,d.h);				  
			
			pt.selectAll("circle")
			  .data(d.c)
			  .enter()
			  .append("circle");		
		};	
		p._style = function(pt) {
			pt.selectAll("circle")
			  .attr("cx", function(d) { return d[0] })
			  .attr("cy", function(d) { return d[1] })
			  .attr("r", p.r)
			  .attr("fill", p.f)
			  .attr("stroke",p.s)
			  .attr("stroke-width",p.sw);	
		};	
		
		p.add = function() {
			var defs = checkDefs(p.sel);
			var pt = checkPattern(p.sel,defs,p.id);
			patternProperties(pt,p.a,p.id);
				  
			if (p.hx) p._hx(pt);
			else p._sq(pt);
			
			p._style(pt);
			return p;	
		};
		p.add();
		return p;
	}

	exports.circle = ptCircle;
	exports.square = ptSquare;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
