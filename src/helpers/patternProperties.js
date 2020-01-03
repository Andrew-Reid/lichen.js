export default function patternProperties(p,a,id) {
	p.attr("patternUnits","userSpaceOnUse")
	  .attr("patternTransform","rotate("+a+")")
	  .attr("id", id);
}