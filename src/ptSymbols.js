import ptSymbol from '../ptSymbol.js' 

export function ptWetland(S,I) {
	var pt = ptSymbol(S,I);
	pt.background("lightblue").fill("darkgreen").stroke("black").scale(0.8).strokeWidth(0).spacing(30).center([12,12])
	.symbol("M 2.6181942,7.0403716 C 3.2611586,6.454134 4.0830945,6.157614 4.9177382,6.2107118 6.7744687,6.0665089 8.4206096,7.5109538 8.699883,9.5293512 L 9.8799123,17.294968 C 8.912591,16.814927 7.7983711,16.845458 6.8541964,17.377933 L 5.64391,9.5293512 C 5.2012477,8.0935415 3.9988281,7.1045871 2.6181942,7.0403716 Z M 11.695343,18.224187 c 0.577305,-0.510407 1.248106,-0.878278 1.966714,-1.078557 L 15.507745,4.5513921 C 15.950405,3.1155825 17.152827,2.126628 18.53346,2.0624123 17.898363,1.4841395 17.088681,1.1881167 16.264172,1.2327526 14.407443,1.0885575 12.761302,2.532995 12.482028,4.5513921 L 10.515313,17.477493 c 0.421482,0.191155 0.818154,0.442211 1.18003,0.746694 z m 6.535546,-0.82966 0,0 c 0.236762,-0.211896 0.489864,-0.400559 0.756429,-0.56417 l 1.059,-7.3010058 C 20.488982,8.0935415 21.691399,7.1045871 23.072034,7.0403716 22.436936,6.462098 21.627254,6.1660758 20.802747,6.2107118 18.946017,6.0665089 17.299875,7.5109538 17.020603,9.5293512 l -1.013615,6.6372778 c 0.821632,0.204099 1.585173,0.625564 2.223901,1.227898 z m 3.328289,2.090743 0,0 c -0.657491,-0.0166 -1.297883,0.231308 -1.800303,0.696914 l -0.711042,0.68032 c -0.430713,0.422465 -1.082149,0.422465 -1.512861,0 -0.226928,-0.199119 -0.438726,-0.431422 -0.665655,-0.647135 -1.070499,-0.990281 -2.636005,-0.990281 -3.706504,0 -0.242056,0.215713 -0.468985,0.464611 -0.711042,0.680322 -0.43071,0.422464 -1.082147,0.422464 -1.512859,0 -0.242056,-0.215711 -0.468985,-0.464609 -0.711042,-0.680322 -1.0679267,-0.980989 -2.6234473,-0.980989 -3.6913739,0 C 6.3095677,20.431082 6.0977674,20.663385 5.8708388,20.862504 5.735892,20.981147 5.5820341,21.071246 5.4169813,21.127998 4.974924,21.236186 4.5139564,21.078058 4.206695,20.713167 3.8322624,20.358071 3.4325654,20.036328 3.0115371,19.750761 2.6992833,19.555125 2.3419462,19.462869 1.9827937,19.48527 l -0.090771,0 c -0.4177004,0 -0.7564291,0.371522 -0.7564291,0.829659 0,0.45814 0.3387287,0.82966 0.7564289,0.82966 l 0,0 c 0.3721631,0.02406 0.7204229,0.209075 0.9682291,0.514388 l 0.5446289,0.431425 c 1.0161869,0.912624 2.4671689,0.95361 3.524959,0.09956 0.2874433,-0.232304 0.5446289,-0.530982 0.8320721,-0.779879 0.4307105,-0.422462 1.0821469,-0.422462 1.5128579,0 l 0.5900146,0.580762 c 1.0494699,1.026953 2.6205729,1.075904 3.7216299,0.11614 0.226929,-0.182526 0.408472,-0.414832 0.635402,-0.61395 0.450227,-0.5041 1.187744,-0.512231 1.64735,-0.0184 0.0055,0.0061 0.01112,0.01222 0.0168,0.0184 l 0.590014,0.580763 c 0.736158,0.684303 1.737519,0.915281 2.662632,0.613948 0.578668,-0.171904 1.102269,-0.516545 1.512857,-0.995593 0.234342,-0.29403 0.555823,-0.48784 0.907718,-0.547574 l 0,0 c 0.417697,0 0.756426,-0.371521 0.756426,-0.82966 0,-0.458138 -0.338729,-0.829658 -0.756426,-0.829658 z");
	return pt;
}

export function ptFish(S,I) {
	var pt = ptSymbol(S,I);
	pt.background("#0077BE").fill("orange").stroke("black").strokeWidth(1).scale(0.8).spacing(30).center([12,12])
	.symbol("m 17.055085,18.852887 c -0.444915,-0.983199 -0.444915,-3.768927 0,-4.588259 0.593221,-0.983198 5.042373,2.294129 5.042373,2.294129 1.334746,0.655466 1.334746,-9.9958486 0,-9.3403831 0,0 -4.597458,3.4411941 -5.042373,2.2941292 -0.444915,-1.1470646 -0.444915,-3.4411939 0,-4.5882585 C 17.5,3.9410464 23.135594,3.77718 23.135594,3.77718 c 0,-1.1470646 -4.300848,-2.2941292 -6.080509,-2.2941292 -1.779661,0 -3.707627,0.1638664 -6.080508,1.310931 C 8.6016949,3.77718 6.6737288,5.4158438 4.8940678,7.3822402 3.1144068,9.3486367 0.88983051,13.28143 0.88983051,14.428495 c 0,1.147064 2.22457629,4.588258 5.48728809,6.063055 3.2627119,1.474798 4.8940684,1.80253 6.6737294,2.130263 1.631356,0.163866 3.855932,0 5.783898,-0.491599 1.483051,-0.327733 4.300848,-1.147065 4.300848,-1.80253 0,-0.327733 -5.635594,-0.491599 -6.080509,-1.474797 z M 7.5635593,15.08396 c -1.1864407,0 -2.2245763,-1.147065 -2.2245763,-2.457996 0,-1.310931 1.0381356,-2.457995 2.2245763,-2.457995 1.1864407,0 2.2245763,1.147064 2.2245763,2.457995 0,1.310931 -1.0381356,2.457996 -2.2245763,2.457996 z");
	return pt;
}
export function ptFire(S,I) {
	var fire = ptSymbol(S,I);
	fire.background("yellow").fill("orange").stroke("black").scale(0.6).spacing(30).center([12,12])
	.symbol("M 12.108051,0.7923729 7.9588913,7.0366745 5.4693956,3.9145237 C 4.5486141,5.4370405 0.99427797,9.0542083 0.99427797,12.974381 c 0,5.773481 4.97583813,10.453585 11.11377303,10.453585 6.137935,0 11.113773,-4.680104 11.113773,-10.453585 0,-3.9201727 -3.554336,-7.5373405 -4.475118,-9.0598573 L 16.25721,7.0366745 12.108051,0.7923729 Z m 0,10.1469901 c 0,0 4.149159,3.999163 4.149159,7.024839 0,1.306776 -1.370716,3.122151 -4.149159,3.122151 -2.7784433,0 -4.1491597,-1.815375 -4.1491597,-3.122151 0,-2.921865 4.1491597,-7.024839 4.1491597,-7.024839 z");
	return fire;
}
export function ptDanger(S,I) {
	var danger = ptSymbol(S,I);
	danger.background("darkorange").fill("black").stroke("black").strokeWidth(0).scale(0.8).spacing(40).center([12,12])
	.symbol("m 22.723729,22.613369 c -0.126052,0.290777 -0.44093,0.481882 -0.790981,0.479633 -0.100135,0.01604 -0.202793,0.01604 -0.302928,0 l -9.744214,-3.657207 -9.7610432,3.657207 c -0.4328517,0.150636 -0.9209039,-0.03987 -1.0898709,-0.425375 -0.00135,-0.0032 -0.00269,-0.0062 -0.00404,-0.0093 -0.2172674,-0.365871 -0.060249,-0.819425 0.3507243,-1.012776 0.043925,-0.02068 0.089868,-0.03792 0.1373278,-0.05141 L 9.6809563,18.596436 1.518705,15.598725 C 1.0740726,15.478367 0.82314655,15.059736 0.95828658,14.663738 1.0934264,14.267742 1.5634712,14.044262 2.0081035,14.16462 c 0.039885,0.01079 0.078762,0.02428 0.1164593,0.04017 l 9.7610432,3.612242 9.761043,-3.612242 c 0.419724,-0.177614 0.921745,-0.01858 1.121173,0.355229 0.199428,0.373815 0.02087,0.820924 -0.398856,0.998538 -0.0377,0.01604 -0.07658,0.02938 -0.116459,0.04017 l -8.179081,2.997711 8.162251,2.997711 c 0.438742,0.136395 0.670315,0.563719 0.517335,0.95447 -0.0086,0.02203 -0.01835,0.04361 -0.02928,0.06475 z m -3.2649,-15.6630409 0,0.6744849 c -0.0035,0.3191064 -0.121508,0.6289199 -0.336588,0.8843248 -0.940089,0.9267424 -1.952377,1.7932322 -3.029289,2.5930212 l 0,1.738672 c 0.0025,0.311761 -0.21205,0.592198 -0.53854,0.704462 l -3.635147,1.304004 -0.117806,0 -3.6519766,-1.304004 c -0.3002362,-0.1307 -0.4851911,-0.40709 -0.4712228,-0.704462 l 0,-1.738672 C 6.5890619,10.304018 5.5654987,9.4373789 4.6153117,8.5091378 4.4121811,8.2501355 4.3061559,7.9406219 4.3123827,7.624813 l 0,-0.6744849 C 4.5932652,3.625417 7.5055902,0.95595549 11.22926,0.61016949 l 0.605858,0 0,0 0.656346,0 c 3.746557,0.31940607 6.689344,2.99726121 6.967365,6.34015861 z M 9.361198,6.6055913 c 0,-0.8278179 -0.7534515,-1.4988554 -1.6829384,-1.4988554 -0.9294868,0 -1.6829384,0.6710375 -1.6829384,1.4988554 0,0.8278179 0.7534516,1.4988555 1.6829384,1.4988555 0.9294869,0 1.6829384,-0.6710376 1.6829384,-1.4988555 z m 1.682938,4.4965677 c 0,-0.413835 -0.376809,-0.749428 -0.841469,-0.749428 -0.4646591,0 -0.841469,0.335593 -0.841469,0.749428 l 0,0.749427 c 0,0.413834 0.3768099,0.749427 0.841469,0.749427 0.46466,0 0.841469,-0.335593 0.841469,-0.749427 l 0,-0.749427 z m 3.365878,0 c 0,-0.413835 -0.376811,-0.749428 -0.84147,-0.749428 -0.464659,0 -0.841469,0.335593 -0.841469,0.749428 l 0,0.749427 c 0,0.413834 0.37681,0.749427 0.841469,0.749427 0.464659,0 0.84147,-0.335593 0.84147,-0.749427 l 0,-0.749427 z m 3.365877,-4.4965677 c 0,-0.8278179 -0.753452,-1.4988554 -1.682939,-1.4988554 -0.929487,0 -1.682938,0.6710375 -1.682938,1.4988554 0,0.8278179 0.753451,1.4988555 1.682938,1.4988555 0.929487,0 1.682939,-0.6710376 1.682939,-1.4988555 z");
	return danger;
}