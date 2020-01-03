// Centered shape pattern master:
import ptCircle from './ptStripe.js';
import arr from './helpers/arr.js';


export default function ptManager(S) {
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
			values.push({key:d,color:m.f[i]})
		})
		return values;
	}	
	
	m.fills = function(_) { if(!_) return m.f; m.f = _; return m; }	
	m.width = function(_) { if(!_) return m.totalWidth; m.totalWidth = _; return m;	}
	
	m.datum = function(d) {
		var bStriped = false;
		
		// add new keys to key array:
		if (arr(d)) {
			d.forEach(function(e) {
				if (m.keys.indexOf(e) < 0) m.keys.push(e);
			})
			
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
			})
			if (existing != null) { return m.comboIds[existing]; }
			
			// create a new pattern:
			else {
				m.combos.push(d);
				var stripeColors = [];
				d.forEach(function(e) {
					stripeColors.push(m.f[m.keys.indexOf(e)]);
				})

				var w = m.totalWidth / stripeColors.length;
				var str = ptStripe(m.sel).fill(stripeColors).angle(m.a).width(w);
				m.comboIds.push(str.use());
				return str.use();		
			}
		}
		
		return m;
	}	
	return m;
}