export default function checkPattern(s,d,id) {
	var pt = s.select("#"+id);
	if (pt.empty()) pt = d.append("pattern");
	return pt;
}