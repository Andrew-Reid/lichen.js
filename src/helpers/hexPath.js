export default function hexPath(x,y,r) {
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