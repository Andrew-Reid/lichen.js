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

function hxRects(r) {
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
		var d = hxRects(p.sp + p.l);		
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

// Three color hexes:
function hxThreeColor(r) {
	// units:
	var h = r*2;
	var w = Math.sqrt(3)/2 * h;
		
	// dimensions:		
	var dy = h*1.5;	
	var dx = w*3;
	
	return {"h":dy,"w":dx,"c":[[w/2,0],[w/2,dy],[0,h*3/4],[w,h*3/4], [w*1.5,0],[w*1.5,dy],[w*2,h*3/4],  [w*2.5,0],[w*2.5,dy],[w*3,h*3/4]  ]};
}

function hexPath(x,y,r) {
	var x1 = x;
	var y1 = y-r;
	var x2 = x+(Math.cos(Math.PI/6)*r);
	var y2 = y-(Math.sin(Math.PI/6)*r);
	var x3 = x+(Math.cos(Math.PI/6)*r);
	var y3 = y+(Math.sin(Math.PI/6)*r);
	var x4 = x;
	var y4 = y+r;
	var x5 = x-(Math.cos(Math.PI/6)*r);
	var y5 = y+(Math.sin(Math.PI/6)*r);
	var x6 = x-(Math.cos(Math.PI/6)*r);
	var y6 = y-(Math.sin(Math.PI/6)*r);
	  
	var path = "M"+x1+" "+y1+" L"+x2+" "+y2+" L"+x3+" "+y3+" L"+x4+" "+y4+" L"+x5+" "+y5+" L"+x6+" "+y6+"z";
	return path;	
}

// Centered shape pattern master:

function ptHexagon(S,I) {
	var p = ptCentered(S,I);
	
	p.r = 10;
	p.radius = function(_)  	{ if(!arguments.length) return p.r; p.r = _; return p; };	
	
	var fillMap = [0,0,1,2,1,1,0,2,2,1]; 
	
	p._sq = function(pt) {
		widthHeight(pt,p.r*2+p.sp,p.r*2+p.sp); 				
		applyBackground(pt,p.bg,p.r*2+p.sp,p.r*2+p.sp);		
		var d = [[p.sp/2+p.r,p.sp/2+p.r]];			
		var c = pt.selectAll("path")
		  .data(d);
		
		c.exit().remove();
		c.enter().append("path");
	};
	p._hx = function(pt) {
		var d;
		Array.isArray(p.f) ? d = hxThreeColor(p.sp/2 + p.r) : d = hxCentroids((p.sp/2 + p.r)); 
		
		widthHeight(pt,d.w,d.h);							  
		applyBackground(pt,p.bg,d.w,d.h);				  
		
		pt.selectAll("path")
		  .data(d.c)
		  .enter()
		  .append("path");		
	};	
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

// Centered shape pattern master:

function ptLetter(S,I) {
	var p = ptCentered(S,I);
	
	p.t = "\u03B1";
	p.dy = 5;
	p.k = 14;
	
	p.offsetY = function(_) { if(!arguments.length) return p.dy; p.dy = _; return p; };		
	p.text = function(_)  	{ if(!arguments.length) return p.t; p.t = _; return p; };		
	p.fontSize = function(_){ if(!arguments.length) return p.k; p.k = _; return p; };
	p.sp = 20;
	
	p._sq = function(pt) {
		widthHeight(pt,p.sp,p.sp); 							// set width/height
		applyBackground(pt,p.bg,p.sp,p.sp);					// set background rect
		var d = [[p.sp/2,p.sp/2]];					// middle of each path.
		var c = pt.selectAll("text")
		  .data(d);
		
		c.exit().remove();
		c.enter().append("text");
	};
	p._hx = function(pt) {
		var d = hxCentroids((p.sp/2 ));		 	  // get hex info,
		widthHeight(pt,d.w,d.h);							  // set width/height
		applyBackground(pt,p.bg,d.w,d.h);				  // set background rect
		
		pt.selectAll("text")
		  .data(d.c)
		  .enter()
		  .append("text");		
	};	
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

// Centered shape pattern master:

function ptSymbol(S,I) {
	var p = ptCentered(S,I);

	p.sym = d3.symbol().type(d3.symbolWye).size(100);
	p.r = 14;
	p.symbol = function(_) { if(!arguments.length) return p.sym; p.sym = _; return p; };
	
	p.dx = 0; p.dy = 0; 
	p.center = function(_) { if(!arguments.length) return [p.dx,p.dy]; p.dx = _[0]; p.dy = _[1]; return p; };
	
	p.sc = 1;
	p.scale = function(_) { if(!arguments.length) return p.sc; p.sc = _; return p; };
	
	p.sp = 16;
	
	p._sq = function(pt) {
		widthHeight(pt,p.sp,p.sp); 						    
		applyBackground(pt,p.bg,p.sp,p.sp);		     		
		var d = [[p.sp/2,p.sp/2]];					
		var c = pt.selectAll("path")
		  .data(d);
		
		c.exit().remove();
		c.enter().append("path");
	};
	p._hx = function(pt) {
		var d = hxCentroids(p.sp/2*1.414); 	 	  
		widthHeight(pt,d.w,d.h);							  
		applyBackground(pt,p.bg,d.w,d.h);				  
		
		pt.selectAll("path")
		  .data(d.c)
		  .enter()
		  .append("path");		
	};	
	p._style = function(pt) {
		pt.selectAll("path")
		  .attr("d", p.sym)
		  .attr("transform",function(d) { return "translate("+([d[0]-(p.dx*p.sc),d[1]-(p.dy*p.sc)])+ ")scale("+p.sc+")" })
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

function arr(a) {
	if(Array.isArray(a)) return a;
	else return [a];
}

// Centered shape pattern master:


function ptChecker(S,I) {
	var p = pattern(S,I);

	p.w = 10;
	p.f = ["steelblue","white"];
	p.width = function(_) { if(!arguments.length) return p.w; p.w = _; return p; };
	p.fill = function(_)  { if(!arguments.length) return p.f; p.f = arr(_); return p; };
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
		  .append("rect");
		  
		enter.merge(rects)
		  .attr("width",  p.w)
		  .attr("height", p.w)
		  .attr("x", function(d,i) { return d[0]; })
		  .attr("y", function(d,i) { return d[1]; })
		  .attr("fill",function(d,i) { return p.f[i%2]; })
		  .attr("opacity",function(d,i) { return p.o[i%p.o.length]; });

		
		return p;
	};
	p.add();
	return p;
}

// Centered shape pattern master:


function ptStripe$1(S,I) {
	var p = pattern(S,I);

	p.w = [10];
	p.f = ["steelblue","white"];
	p.width = function(_) { if(!arguments.length) return p.w; p.w = arr(_); return p; };
	p.fill = function(_)  { if(!arguments.length) return p.f; p.f = arr(_); return p; };
    p.a = 45;
	
	// go about drawing:
	p.add = function() {
		var defs = checkDefs(p.sel);
		var pt = checkPattern(p.sel,defs,p.id);
		patternProperties(pt,p.a,p.id);
			  
		p.o = arr(p.o);	
		
		if (p.f.length == 1) p.f.push("white");
		
		var totalWidth = 0;
		var currentX = 0;
		
		p.f.forEach(function(d,i) {
		  totalWidth += p.w[i%p.w.length];
		});	
		
		pt.attr("width", totalWidth)
		  .attr("height", 20)							
		  .attr("patternUnits","userSpaceOnUse")
	      .attr("patternTransform","rotate("+p.a+")")
	      .attr("id",p.id);		
		
		var rects = pt.selectAll("rect")
		  .data(p.f);		
		  
		rects.exit().remove();
		
		var enter = rects.enter()
		  .append("rect");
		  
		enter.merge(rects)
		  .attr("width", function(d,i) { return p.w[i%p.w.length]; })
		  .attr("height", 20)
		  .attr("x", function(d,i) { currentX += p.w[i%p.w.length]; return currentX - p.w[i%p.w.length]; })
		  .attr("y",0)
		  .attr("fill",function(d,i) { return p.f[i]; })
		  .attr("opacity",function(d,i) { return p.o[i%p.o.length]; });
		
		return p;
	};
	p.add();
	return p;
}

// Centered shape pattern master:


function ptPlaid(S,I) {
	var p = pattern(S,I);

	p.w = [[10,5],[12,6]];
	p.f = [["crimson","red"],["steelblue","white"]];
	p.o = [[0.5,0.8],[0.6,0.4]];
	
	p.width = function(_) { if(!arguments.length) return p.w; p.w = _; return p; };
	p.fill = function(_)  { if(!arguments.length) return p.f; p.f = _; return p; };
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
		});	
		p.f[1].forEach(function(d,i) {
		  totalHeight += p.w[1][i%p.w[1].length];
		});	
		
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
		  .attr("opacity",function(d,i) { return p.o[0][i%p.o.length]; });		  
		e1.merge(r1)
		  .attr("height", function(d,i) { return p.w[1][i%p.w[1].length]; })
		  .attr("width", totalWidth)
		  .attr("y", function(d,i) { currentY += p.w[1][i%p.w[1].length]; return currentY - p.w[1][i%p.w[1].length]; })
		  .attr("x",0)
		  .attr("fill",function(d,i) { return p.f[1][i]; })
		  .attr("opacity",function(d,i) { return p.o[1][i%p.o.length]; });
		
		return p;
	};
	p.add();
	return p;
}

// Centered shape pattern master:


function ptCairo(S,I) {
	var p = pattern(S,I);
	
	p.base = [[[0.7071067811865476,1.224744871391589],[0.2981726899245648,2.750907676928317],[1.1165716605051963,3.560304443015607],[2.641768897701186,3.161464390300587],[2.2332695867232757,1.6336789626535717]],[[0.7071067811865476,1.224744871391589],[1.1160408724485302,-0.30141793414513884],[0.29764190186789885,-1.1108147002324285],[-1.4190814287039564,0.0028104639365018613],[-0.8190560243501803,0.8158107801296063]],[[3.0426663528105653,0.8152799920729403],[2.6438263000955455,-0.7099172451230495],[4.159364279028645,-1.1113454882890943],[4.977763249609277,-0.3019487222018049],[4.5688291583472935,1.224214083334923]],[[2.641768897701186,3.161464390300587],[4.15989506708531,2.750376888871651],[4.978294037665942,3.5597736549589403],[4.56935994640396,5.0859364604956685],[3.043197140867232,4.677002369233686]],[[-1.2296127377224502,3.1594069879062276],[0.2981726899245648,2.750907676928317],[1.1165716605051963,3.560304443015607],[0.7076375692432135,5.086467248552335],[-0.8185252362935145,4.677533157290352]],[[1.1160408724485302,-0.30141793414513884],[2.6438263000955455,-0.7099172451230495],[3.0426663528105653,0.8152799920729403],[2.2332695867232757,1.6336789626535717],[0.7071067811865476,1.224744871391589]],[[1.1165716605051963,3.560304443015607],[2.641768897701186,3.161464390300587],[3.043197140867232,4.677002369233686],[2.2338003747799418,5.495401339814318],[0.7076375692432135,5.086467248552335]],[[-0.8190560243501803,0.8158107801296063],[0.7071067811865476,1.224744871391589],[0.2981726899245648,2.750907676928317],[-1.2296127377224502,3.1594069879062276],[-1.62845279043747,1.6342097507102378]],[[3.0426663528105653,0.8152799920729403],[4.5688291583472935,1.224214083334923],[4.15989506708531,2.750376888871651],[2.641768897701186,3.161464390300587],[2.2332695867232757,1.6336789626535717]]];

	p.l = 20;
	p.f = ["#2b8cbe","#a8ddb5","#7bccc4","#ccebc5"];
	p.a = 15;
	p.sw = 1;
	
	p.side = function(_) { if(!arguments.length) return p.l; p.l = _; return p; };
	p.fill = function(_)   { if(!arguments.length) return p.f; p.f = _; return p; };
    p.a = 45;
	
	// go about drawing:
	p.add = function() {
		var defs = checkDefs(p.sel);
		var pt = checkPattern(p.sel,defs,p.id);
		patternProperties(pt,p.a,p.id);
		
		var k = p.l/2;
		var w = k * 3.864;
		var c = [0,1,1,1,1,2,2,3,3];
		
		var l = d3.line()
		  .x(function(d) { return d[0]*k; })
		  .y(function(d) { return d[1]*k; });
		
		pt.attr("width", w)
		  .attr("height", w)							
		  .attr("patternUnits","userSpaceOnUse")
	      .attr("patternTransform","rotate("+p.a+")")
	      .attr("id",p.id);		
		
		pt.selectAll("path")
		  .data(p.base)
		  .enter()
		  .append("path");
		  
		pt.selectAll("path")
		  .attr("d",l)
		  .attr("fill",function(d,i) { return p.f[c[i]]; })
		  .attr("stroke", p.s)
		  .attr("stroke-width", p.sw)
		  .attr("opacity",p.o);
		
		return p;
	};
	p.add();
	return p;
}

// Centered shape pattern master:


function ptOctagon(S,I) {
	var p = pattern(S,I);
	
	p.base = [[[0.707,0],[0,-0.707],[-0.707,0],[0,0.707]],[[0.707,2.41],[0,1.717],[-0.707,2.41],[0,3.12]],[[3.12,2.41],[2.41,1.71],[1.71,2.41],[2.41,3.12]],[[3.12,0],[2.41,-0.707],[1.71,0],[2.41,0.707]],[[0,0.707],[0,1.717],[0.71,2.41],[1.71,2.41],[2.41,1.71],[2.41,0.71],[1.71,0],[0.707,0],[0,0.707]]];

	p.l = 32;
	p.f = ["steelblue","white"];
	p.a = 15;
	p.sw = 1;
	
	p.side = function(_) { if(!arguments.length) return p.l; p.l = _; return p; };
	p.fill = function(_)   { if(!arguments.length) return p.f; p.f = _; return p; };
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
		  .y(function(d) { return d[1]*k; });
		
		pt.attr("width", w)
		  .attr("height", w)							
		  .attr("patternUnits","userSpaceOnUse")
	      .attr("patternTransform","rotate("+p.a+")")
	      .attr("id",p.id);		
		
		pt.selectAll("path")
		  .data(p.base)
		  .enter()
		  .append("path");
		  
		pt.selectAll("path")
		  .attr("d",l)
		  .attr("fill",function(d,i) { return p.f[c[i]]; })
		  .attr("stroke", p.s)
		  .attr("stroke-width", p.sw)
		  .attr("opacity",p.o);
		
		return p;
	};
	p.add();
	return p;
}

// Centered shape pattern master:


function ptSine(S,I) {
	var p = pattern(S,I);

	p.amp = 10;
	p.sam = 1;
	p.per = 100;
	p.sw = 10;
	p.s = "steelblue";
	p.f = "none";
	p.sp = 4;

	p.amplitude = function(_) { if(!arguments.length) return p.amp; p.amp = _; return p; };
	p.period = function(_) { if(!arguments.length) return p.per; p.per = _; return p; };
	p.sampling = function(_) { if(!arguments.length) return p.sam; p.sam = _; return p; };
	p.spacing = function(_)  { if(!arguments.length) return p.sp; p.sp = _; return p; };

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
		  .attr("fill",p.f);
		
		var paths = pt.selectAll("path")
		  .data([path]);		
		  
		paths.exit().remove();
		
		var enter = paths.enter()
		  .append("path");
		  
		enter.merge(paths)
		  .attr("transform","translate(0,"+(p.amp+p.sw/4+p.sp)+")")
		  .attr("d", path);
		
		return p;
	};
	p.add();
	return p;
}

// Centered shape pattern master:


function ptSchemeCategory10(S) {
	var sel = S || d3.select("svg"); // attempt to select SVG by default
	if(sel.node() && sel.node().nodeName != "svg") console.log("no svg found");

	return [
		ptCircle(sel).radius(2).spacing(2).fill("black"),
		ptCircle(sel).radius(6).fill("none").strokeWidth(1).spacing(2),
		ptCircle(sel).radius(5).spacing(4).fill("black"),
		ptCircle(sel).radius(1).spacing(1).fill("black"),
		ptCircle(sel).radius(3).fill("none").strokeWidth(1).spacing(2),
		ptCircle(sel).radius(2).spacing(5).hex(false).fill("black"),
		ptCircle(sel).radius(10).spacing(1).fill("black"),
		ptCircle(sel).radius(10).spacing(1).fill("none").strokeWidth(2),
		ptCircle(sel).radius(7).spacing(4).fill("none").strokeWidth(5),
		ptCircle(sel).radius(6).hex(false).spacing(5).fill("black")
	]
}

// Centered shape pattern master:


function ptCircles(S) {
	var c = {};
	c.bg = ["none"];
	c.f = ["black"];
	c.r = [1];
	c.s = [16,8,4,2];
			
	c.spacings = function(_)    { if(!arguments.length) return c.s; c.s = arr(_); return c; };
	c.fills = function(_) 	    { if(!arguments.length) return c.f; c.f = arr(_); return c; };
	c.radii = function(_) 	    { if(!arguments.length) return c.r; c.r = arr(_); return c; };	
	c.backgrounds = function(_) { if(!arguments.length) return c.bg; c.bg = arr(_); return c; };	
	
	c.get = function() {
		var max = Math.max(c.s.length,c.f.length,c.r.length,c.bg.length);
		var a = [];
		
		for(var i = 0; i < max; i++) {
			var p = ptCircle(S);
			if (c.s) p.spacing(c.s[i%c.s.length]);
			if (c.f) p.fill(c.f[i%c.f.length]);
			if (c.r) p.radius(c.r[i%c.r.length]);
			if (c.bg) p.background(c.bg[i%c.bg.length]);
			p.add();
			a.push(p);
		}	
		return a;	
	};
	return c;
}

// Centered shape pattern master:


function ptManager(S) {
	var m = {};

	m.keys = [];							
	m.f = d3.schemeCategory20;				
	m.combos = [];							
	m.comboIds = [];  						
	m.totalWidth = 12;
	m.a = 45;
	m.sel = S;

	m.values = function() {
		var values = [];
		m.keys.forEach(function(d,i) {
			values.push({key:d,color:m.f[i]});
		});
		return values;
	};	
	
	m.fills = function(_) { if(!_) return m.f; m.f = _; return m; };	
	m.width = function(_) { if(!_) return m.totalWidth; m.totalWidth = _; return m;	};
	
	m.datum = function(d) {
		var bStriped = false;
		
		// add new keys to key array:
		if (arr(d)) {
			d.forEach(function(e) {
				if (m.keys.indexOf(e) < 0) m.keys.push(e);
			});
			
			if (d.length > 1) bStriped = true;
		}
		else {
			if (m.keys.indexOf(d) < 0) m.keys.push(d);
		}
		
		// Return a fill - solid or stripe pattern:
		if (!bStriped) {
			if (arr(d)) return m.f[m.keys.indexOf(d[0])];
			else return m.f[m.keys.indexOf(d)];
		}
		// requires stripes:
		else {
			// ensure same order for areas with same stripes:
			d.sort();

			// don't create duplicate patterns
			var existing = null;
			m.combos.forEach(function(c,i) {
				if (c.length==d.length && c.every(function(e,j) { return d[j] === e})) existing = i;
			});
			if (existing != null) { return m.comboIds[existing]; }
			
			// create a new pattern:
			else {
				m.combos.push(d);
				var stripeColors = [];
				d.forEach(function(e) {
					stripeColors.push(m.f[m.keys.indexOf(e)]);
				});

				var w = m.totalWidth / stripeColors.length;
				var str = ptStripe(m.sel).fill(stripeColors).angle(m.a).width(w);
				m.comboIds.push(str.use());
				return str.use();		
			}
		}
		
		return m;
	};	
	return m;
}

function ptWetland(S,I) {
	var pt = ptSymbol(S,I);
	pt.background("lightblue").fill("darkgreen").stroke("black").scale(0.8).strokeWidth(0).spacing(30).center([12,12])
	.symbol("M 2.6181942,7.0403716 C 3.2611586,6.454134 4.0830945,6.157614 4.9177382,6.2107118 6.7744687,6.0665089 8.4206096,7.5109538 8.699883,9.5293512 L 9.8799123,17.294968 C 8.912591,16.814927 7.7983711,16.845458 6.8541964,17.377933 L 5.64391,9.5293512 C 5.2012477,8.0935415 3.9988281,7.1045871 2.6181942,7.0403716 Z M 11.695343,18.224187 c 0.577305,-0.510407 1.248106,-0.878278 1.966714,-1.078557 L 15.507745,4.5513921 C 15.950405,3.1155825 17.152827,2.126628 18.53346,2.0624123 17.898363,1.4841395 17.088681,1.1881167 16.264172,1.2327526 14.407443,1.0885575 12.761302,2.532995 12.482028,4.5513921 L 10.515313,17.477493 c 0.421482,0.191155 0.818154,0.442211 1.18003,0.746694 z m 6.535546,-0.82966 0,0 c 0.236762,-0.211896 0.489864,-0.400559 0.756429,-0.56417 l 1.059,-7.3010058 C 20.488982,8.0935415 21.691399,7.1045871 23.072034,7.0403716 22.436936,6.462098 21.627254,6.1660758 20.802747,6.2107118 18.946017,6.0665089 17.299875,7.5109538 17.020603,9.5293512 l -1.013615,6.6372778 c 0.821632,0.204099 1.585173,0.625564 2.223901,1.227898 z m 3.328289,2.090743 0,0 c -0.657491,-0.0166 -1.297883,0.231308 -1.800303,0.696914 l -0.711042,0.68032 c -0.430713,0.422465 -1.082149,0.422465 -1.512861,0 -0.226928,-0.199119 -0.438726,-0.431422 -0.665655,-0.647135 -1.070499,-0.990281 -2.636005,-0.990281 -3.706504,0 -0.242056,0.215713 -0.468985,0.464611 -0.711042,0.680322 -0.43071,0.422464 -1.082147,0.422464 -1.512859,0 -0.242056,-0.215711 -0.468985,-0.464609 -0.711042,-0.680322 -1.0679267,-0.980989 -2.6234473,-0.980989 -3.6913739,0 C 6.3095677,20.431082 6.0977674,20.663385 5.8708388,20.862504 5.735892,20.981147 5.5820341,21.071246 5.4169813,21.127998 4.974924,21.236186 4.5139564,21.078058 4.206695,20.713167 3.8322624,20.358071 3.4325654,20.036328 3.0115371,19.750761 2.6992833,19.555125 2.3419462,19.462869 1.9827937,19.48527 l -0.090771,0 c -0.4177004,0 -0.7564291,0.371522 -0.7564291,0.829659 0,0.45814 0.3387287,0.82966 0.7564289,0.82966 l 0,0 c 0.3721631,0.02406 0.7204229,0.209075 0.9682291,0.514388 l 0.5446289,0.431425 c 1.0161869,0.912624 2.4671689,0.95361 3.524959,0.09956 0.2874433,-0.232304 0.5446289,-0.530982 0.8320721,-0.779879 0.4307105,-0.422462 1.0821469,-0.422462 1.5128579,0 l 0.5900146,0.580762 c 1.0494699,1.026953 2.6205729,1.075904 3.7216299,0.11614 0.226929,-0.182526 0.408472,-0.414832 0.635402,-0.61395 0.450227,-0.5041 1.187744,-0.512231 1.64735,-0.0184 0.0055,0.0061 0.01112,0.01222 0.0168,0.0184 l 0.590014,0.580763 c 0.736158,0.684303 1.737519,0.915281 2.662632,0.613948 0.578668,-0.171904 1.102269,-0.516545 1.512857,-0.995593 0.234342,-0.29403 0.555823,-0.48784 0.907718,-0.547574 l 0,0 c 0.417697,0 0.756426,-0.371521 0.756426,-0.82966 0,-0.458138 -0.338729,-0.829658 -0.756426,-0.829658 z");
	return pt;
}

function ptFish(S,I) {
	var pt = ptSymbol(S,I);
	pt.background("#0077BE").fill("orange").stroke("black").strokeWidth(1).scale(0.8).spacing(30).center([12,12])
	.symbol("m 17.055085,18.852887 c -0.444915,-0.983199 -0.444915,-3.768927 0,-4.588259 0.593221,-0.983198 5.042373,2.294129 5.042373,2.294129 1.334746,0.655466 1.334746,-9.9958486 0,-9.3403831 0,0 -4.597458,3.4411941 -5.042373,2.2941292 -0.444915,-1.1470646 -0.444915,-3.4411939 0,-4.5882585 C 17.5,3.9410464 23.135594,3.77718 23.135594,3.77718 c 0,-1.1470646 -4.300848,-2.2941292 -6.080509,-2.2941292 -1.779661,0 -3.707627,0.1638664 -6.080508,1.310931 C 8.6016949,3.77718 6.6737288,5.4158438 4.8940678,7.3822402 3.1144068,9.3486367 0.88983051,13.28143 0.88983051,14.428495 c 0,1.147064 2.22457629,4.588258 5.48728809,6.063055 3.2627119,1.474798 4.8940684,1.80253 6.6737294,2.130263 1.631356,0.163866 3.855932,0 5.783898,-0.491599 1.483051,-0.327733 4.300848,-1.147065 4.300848,-1.80253 0,-0.327733 -5.635594,-0.491599 -6.080509,-1.474797 z M 7.5635593,15.08396 c -1.1864407,0 -2.2245763,-1.147065 -2.2245763,-2.457996 0,-1.310931 1.0381356,-2.457995 2.2245763,-2.457995 1.1864407,0 2.2245763,1.147064 2.2245763,2.457995 0,1.310931 -1.0381356,2.457996 -2.2245763,2.457996 z");
	return pt;
}
function ptFire(S,I) {
	var fire = ptSymbol(S,I);
	fire.background("yellow").fill("orange").stroke("black").scale(0.6).spacing(30).center([12,12])
	.symbol("M 12.108051,0.7923729 7.9588913,7.0366745 5.4693956,3.9145237 C 4.5486141,5.4370405 0.99427797,9.0542083 0.99427797,12.974381 c 0,5.773481 4.97583813,10.453585 11.11377303,10.453585 6.137935,0 11.113773,-4.680104 11.113773,-10.453585 0,-3.9201727 -3.554336,-7.5373405 -4.475118,-9.0598573 L 16.25721,7.0366745 12.108051,0.7923729 Z m 0,10.1469901 c 0,0 4.149159,3.999163 4.149159,7.024839 0,1.306776 -1.370716,3.122151 -4.149159,3.122151 -2.7784433,0 -4.1491597,-1.815375 -4.1491597,-3.122151 0,-2.921865 4.1491597,-7.024839 4.1491597,-7.024839 z");
	return fire;
}
function ptDanger(S,I) {
	var danger = ptSymbol(S,I);
	danger.background("darkorange").fill("black").stroke("black").strokeWidth(0).scale(0.8).spacing(40).center([12,12])
	.symbol("m 22.723729,22.613369 c -0.126052,0.290777 -0.44093,0.481882 -0.790981,0.479633 -0.100135,0.01604 -0.202793,0.01604 -0.302928,0 l -9.744214,-3.657207 -9.7610432,3.657207 c -0.4328517,0.150636 -0.9209039,-0.03987 -1.0898709,-0.425375 -0.00135,-0.0032 -0.00269,-0.0062 -0.00404,-0.0093 -0.2172674,-0.365871 -0.060249,-0.819425 0.3507243,-1.012776 0.043925,-0.02068 0.089868,-0.03792 0.1373278,-0.05141 L 9.6809563,18.596436 1.518705,15.598725 C 1.0740726,15.478367 0.82314655,15.059736 0.95828658,14.663738 1.0934264,14.267742 1.5634712,14.044262 2.0081035,14.16462 c 0.039885,0.01079 0.078762,0.02428 0.1164593,0.04017 l 9.7610432,3.612242 9.761043,-3.612242 c 0.419724,-0.177614 0.921745,-0.01858 1.121173,0.355229 0.199428,0.373815 0.02087,0.820924 -0.398856,0.998538 -0.0377,0.01604 -0.07658,0.02938 -0.116459,0.04017 l -8.179081,2.997711 8.162251,2.997711 c 0.438742,0.136395 0.670315,0.563719 0.517335,0.95447 -0.0086,0.02203 -0.01835,0.04361 -0.02928,0.06475 z m -3.2649,-15.6630409 0,0.6744849 c -0.0035,0.3191064 -0.121508,0.6289199 -0.336588,0.8843248 -0.940089,0.9267424 -1.952377,1.7932322 -3.029289,2.5930212 l 0,1.738672 c 0.0025,0.311761 -0.21205,0.592198 -0.53854,0.704462 l -3.635147,1.304004 -0.117806,0 -3.6519766,-1.304004 c -0.3002362,-0.1307 -0.4851911,-0.40709 -0.4712228,-0.704462 l 0,-1.738672 C 6.5890619,10.304018 5.5654987,9.4373789 4.6153117,8.5091378 4.4121811,8.2501355 4.3061559,7.9406219 4.3123827,7.624813 l 0,-0.6744849 C 4.5932652,3.625417 7.5055902,0.95595549 11.22926,0.61016949 l 0.605858,0 0,0 0.656346,0 c 3.746557,0.31940607 6.689344,2.99726121 6.967365,6.34015861 z M 9.361198,6.6055913 c 0,-0.8278179 -0.7534515,-1.4988554 -1.6829384,-1.4988554 -0.9294868,0 -1.6829384,0.6710375 -1.6829384,1.4988554 0,0.8278179 0.7534516,1.4988555 1.6829384,1.4988555 0.9294869,0 1.6829384,-0.6710376 1.6829384,-1.4988555 z m 1.682938,4.4965677 c 0,-0.413835 -0.376809,-0.749428 -0.841469,-0.749428 -0.4646591,0 -0.841469,0.335593 -0.841469,0.749428 l 0,0.749427 c 0,0.413834 0.3768099,0.749427 0.841469,0.749427 0.46466,0 0.841469,-0.335593 0.841469,-0.749427 l 0,-0.749427 z m 3.365878,0 c 0,-0.413835 -0.376811,-0.749428 -0.84147,-0.749428 -0.464659,0 -0.841469,0.335593 -0.841469,0.749428 l 0,0.749427 c 0,0.413834 0.37681,0.749427 0.841469,0.749427 0.464659,0 0.84147,-0.335593 0.84147,-0.749427 l 0,-0.749427 z m 3.365877,-4.4965677 c 0,-0.8278179 -0.753452,-1.4988554 -1.682939,-1.4988554 -0.929487,0 -1.682938,0.6710375 -1.682938,1.4988554 0,0.8278179 0.753451,1.4988555 1.682938,1.4988555 0.929487,0 1.682939,-0.6710376 1.682939,-1.4988555 z");
	return danger;
}

export { ptCairo, ptChecker, ptCircle, ptCircles, ptDanger, ptFire, ptFish, ptHexagon, ptLetter, ptManager, ptOctagon, ptPlaid, ptSchemeCategory10, ptSine, ptSquare, ptStripe$1 as ptStripe, ptSymbol, ptWetland };
