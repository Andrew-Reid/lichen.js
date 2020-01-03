// Centered shape pattern master:
import ptCircle from '../ptCircle';


export default function ptSchemeCategory10(S) {
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