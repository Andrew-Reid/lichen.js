// Base to patterns:
//
import next from './helpers/next.js';

export default function pattern(S,I) {
	var p = function() {
		p.add();
		return "url(#"+p.id+")";
	}
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
		
	p.background = function(_)  { if(!arguments.length) return p.bg; p.bg = _; return p; }
	p.strokeWidth = function(_)	{ if(!arguments.length) return p.sw; p.sw = _; return p; }
	p.stroke = function(_) 		{ if(!arguments.length) return p.s; p.s = _; return p; }
	p.opacity = function(_)     { if(!arguments.length) return p.o; p.o = _; return p; }
	p.angle = function(_)	 	{ if(!arguments.length) return p.a; p.a = _; return p; }
	
	return p;	
}