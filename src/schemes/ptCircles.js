// Centered shape pattern master:
import ptCircle from '../ptCircle.js';
import arr from '../helpers/arr.js';


export default function ptCircles(S) {
	var c = {};
	c.bg = ["none"];
	c.f = ["black"];
	c.r = [1];
	c.s = [16,8,4,2];
			
	c.spacings = function(_)    { if(!arguments.length) return c.s; c.s = arr(_); return c; }
	c.fills = function(_) 	    { if(!arguments.length) return c.f; c.f = arr(_); return c; }
	c.radii = function(_) 	    { if(!arguments.length) return c.r; c.r = arr(_); return c; }	
	c.backgrounds = function(_) { if(!arguments.length) return c.bg; c.bg = arr(_); return c; }	
	
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
	}
	return c;
}
