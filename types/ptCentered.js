// Centered shape pattern master:
import pattern from '../pattern.js';

export default function ptCentered(S,I) {
	var p = pattern(S,I);
	
	p.f = "steelblue";
	p.hx = true;
	p.sp = 2;
	
	p.fill = function(_)  	{ if(!arguments.length) return p.f; p.f = _; return p; }
	p.hex = function(_)  	{ if(!arguments.length) return p.hx; p.hx = _; return p; }
	p.spacing = function(_) { if(!arguments.length) return p.sp; p.sp = _; return p; }
	
	return p;
}
