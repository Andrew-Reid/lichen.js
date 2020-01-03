export default function checkDefs(s) {
	var defs = s.select("defs");
	if(defs.empty()) defs = s.append("defs");
	
	return defs;	
}