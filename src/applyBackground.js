export default function applyBackground(p,f,x,y) {
	var r = p.select(".lichenBackground")
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