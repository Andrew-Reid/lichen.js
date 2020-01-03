// Centered shape pattern master:
import checkDefs from './helpers/checkDefs';
import checkPattern from './helpers/checkPattern.js';
import patternProperties from './helpers/patternProperties.js';
import arr from './helpers/arr.js';
import pattern from './pattern.js';


export default function ptPlaid(S,I) {
	var p = pattern(S,I);

	p.w = [[10,5],[12,6]];
	p.f = [["crimson","red"],["steelblue","white"]];
	p.o = [[0.5,0.8],[0.6,0.4]];
	
	p.width = function(_) { if(!arguments.length) return p.w; p.w = _; return p; }
	p.fill = function(_)  { if(!arguments.length) return p.f; p.f = _; return p; }
    p.a = 45;
	
	// go about drawing:
	p.add = function() {
		var defs = checkDefs(p.sel);
		var pt = checkPattern(p.sel,defs,p.id);
		patternProperties(pt,p.a,p.id);
			  
		p.o = arr(p.o);
		p.w = arr(p.w);

		if (arr(p.w[0]) && p.w.length == 1) p.w.push(p.w[0]); else if(!arr(p.w[0])) { p.w = [p.w,p.w]; }
		if (arr(p.o[0]) && p.o.length == 1) p.o.push(p.o[0]); else if(!arr(p.o[0])) { p.o = [p.o,p.o]; }
		if (arr(p.f[0]) && p.f.length == 1) p.f.push(p.f[0]); else if(!arr(p.f[0])) { p.f = [p.f,p.f]; }

		var totalWidth = 0;
		var totalHeight = 0;
		var currentX = 0;
		var currentY = 0;
		
		p.f[0].forEach(function(d,i) {
		  totalWidth += p.w[0][i%p.w[0].length];
		})	
		p.f[1].forEach(function(d,i) {
		  totalHeight += p.w[1][i%p.w[1].length];
		})	
		
		pt.attr("width", totalWidth)
		  .attr("height", totalHeight)							
		  .attr("patternUnits","userSpaceOnUse")
	      .attr("patternTransform","rotate("+p.a+")")
	      .attr("id",p.id);		
		
		var r0 = pt.selectAll(".x")
		  .data(p.f[0]);		
		  
		var r1 = pt.selectAll(".y")
		  .data(p.f[1]);
		  
		r0.exit().remove();
		r1.exit().remove();
		
		var e0 = r0.enter().append("rect").attr("class","x");
		var e1 = r1.enter().append("rect").attr("class","y");
		
		e0.merge(r0)
		  .attr("width", function(d,i) { return p.w[0][i%p.w[0].length]; })
		  .attr("height", totalHeight)
		  .attr("x", function(d,i) { currentX += p.w[0][i%p.w[0].length]; return currentX - p.w[0][i%p.w[0].length]; })
		  .attr("y",0)
		  .attr("fill",function(d,i) { return p.f[0][i]; })
		  .attr("opacity",function(d,i) { return p.o[0][i%p.o.length]; })		  
		e1.merge(r1)
		  .attr("height", function(d,i) { return p.w[1][i%p.w[1].length]; })
		  .attr("width", totalWidth)
		  .attr("y", function(d,i) { currentY += p.w[1][i%p.w[1].length]; return currentY - p.w[1][i%p.w[1].length]; })
		  .attr("x",0)
		  .attr("fill",function(d,i) { return p.f[1][i]; })
		  .attr("opacity",function(d,i) { return p.o[1][i%p.o.length]; })
		
		return p;
	}
	p.add();
	return p;
}