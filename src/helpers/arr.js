export default function arr(a) {
	if(Array.isArray(a)) return a;
	else return [a];
}