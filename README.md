# lichen.js
A Patterning Utility for SVG &amp; D3

Provides easy to use patterns for use with D3, or for SVG in general (but is dependent on D3).

Take a look at the demos:

* [Pattern Groups: Pattern Explorer](https://bl.ocks.org/andrew-reid/1d835f33b0f0d1a730f84ffdee8f15c5)
* [Stripe Manager: Official Languages in the Americas](https://bl.ocks.org/Andrew-Reid/24d275006f122a2fe888fbaf2d3ec53b)
* [Choropleth + Texture: Prescriptions and Opioid Overdoses in the US](https://bl.ocks.org/andrew-reid/c705aba23d4e8f5f1272485abe58c353)
* [Basics: Simple Example](https://bl.ocks.org/Andrew-Reid/439cb191d1e9a6d624f6d1a63aaf1b0d)


## Patterns

All patterns take the form 

`var pattern = ln.pattern(S,I)`

Both parameters are optional.

S is the SVG where the pattern will be used. If not provided, the first SVG in the DOM will be used,
I is the id of the pattern that will be created. If not provided, an id will be selected.

For the most part pattern methods are chainable similar to d3 methods.

### ln.circle()

Creates a new pattern of circles:

`var circle = ln.circle();`

**circle.add()**

Adds the circle pattern to the DOM. Invoked on creation and with `circle.use()`. Only need to use this method is to update the pattern in place, (re)adding or updating the pattern in the DOM.

**circle.angle(angle)**

Takes an angle in degrees and rotates the pattern by that amount. If not provided, returns the current value. Defaults to 0.

**circle.background(color)**

Takes a color (including "none") to set the background color of the pattern. If not provided, returns the current value. Defaults to "none".

**circle.fill(color)**

Takes a color to set the fill of the pattern's shapes. If not provided returns the current value. Defaults to "steelblue".

**circle.hex(hexagonal)**

If true, returns a hexagonal grid, if false, returns a square grid. If not provided, returns current value. Defaults to true.

**circle.opacity(opacity)**

Sets the opacity of the pattern shapes (not the background). 0 is completely transparent, 1 is completely opaque. If not provided, returns the current opacity value. Defaults to 1.

**circle.radius(radius)**

If radius is provided, sets the radius of circles in the pattern in pixels. If not, returns the current radius. Defaults to 10.

**circle.spacing(spacing)**

If spacing is provided, sets the distance between circles - not including stroke width. If not provided, returns the current spacing. Defaults to 2.

**circle.stroke(color)**

If a color is provided, sets the stroke color of the pattern. If not provided, returns the current value. Defaults to black.

**circle.strokeWidth(width)**

If a width is provided, sets the stroke width to the specified number, in pixels. If not provided, returns the current value. Defaults to 0.

**circle.use()**

Returns a string containing the location of the pattern. Can be used to set the fill of polygons, eg:

`rect.attr("fill",circle.use());`


### ln.square()

Creates a new pattern of squares:

`var square = ln.square();`

**square.add()**

Adds the square pattern to the DOM. Invoked on creation and with `square.use()`. Only need to use this method is to update the pattern in place, (re)adding or updating the pattern in the DOM.

**square.angle(angle)**

Takes an angle in degrees and rotates the pattern by that amount. If not provided, returns the current value. Defaults to 0.

**square.background(color)**

Takes a color (including "none") to set the background color of the pattern. If not provided, returns the current value. Defaults to "none".

**square.fill(color)**

Takes a color to set the fill of the pattern's shapes. If not provided returns the current value. Defaults to "steelblue".

**square.hex(hexagonal)**

If true, returns a hexagonal grid, if false, returns a square grid. If not provided, returns current value. Defaults to true.

**square.length(length)**

If length is provided, sets the edge length of squares in the pattern, in pixels. If not, returns the current edge length. Defaults to 10.

**square.opacity(opacity)**

Sets the opacity of the pattern shapes (not the background). 0 is completely transparent, 1 is completely opaque. If not provided, returns the current opacity value. Defaults to 1.

**square.spacing(spacing)**

If spacing provided, sets the distance between squares (on x axis) - not including stroke width. If not provided, returns the current spacing. Defaults to 2.

**square.stroke(color)**

If a color is provided, sets the stroke color of the pattern. If not provided, returns the current value. Defaults to black.

**square.strokeWidth(width)**

If a width is provided, sets the stroke width to the specified number, in pixels. If not provided, returns the current value. Defaults to 0.

**square.use()**

Returns a string containing the location of the pattern. Can be used to set the fill of polygons, eg:

`rect.attr("fill",square.use());`

### ln.hexagon()

Creates a new pattern of hexagons:

`var hexagon = ln.hexagon();`

**hexagon.add()**

Adds the hexagon pattern to the DOM. Invoked on creation and with `hexagon.use()`. Only need to use this method is to update the pattern in place, (re)adding or updating the pattern in the DOM.

**hexagon.angle(angle)**

Takes an angle in degrees and rotates the pattern by that amount. If not provided, returns the current value. Defaults to 0.

**hexagon.background(color)**

Takes a color (including "none") to set the background color of the pattern. If not provided, returns the current value. Defaults to "none".

**hexagon.fill(color)**

Takes a color to set the fill of the pattern's shapes. If not provided returns the current value. Defaults to "steelblue".

**hexagon.hex(hexagonal)**

If true, returns a hexagonal grid, if false, returns a square grid. If not provided, returns current value. Defaults to true.

**hexagon.opacity(opacity)**

Sets the opacity of the pattern shapes (not the background). 0 is completely transparent, 1 is completely opaque. If not provided, returns the current opacity value. Defaults to 1.

**hexagon.radius(radius)**

If radius is provided, sets the radius used to calculate the hexagon's vertices in the pattern. If not, returns the current radius. Defaults to 10.

**hexagon.spacing(spacing)**

If spacing provided, sets the distance between hexagons (on the x axis) - not including stroke width. If not provided, returns the current spacing. Defaults to 2.

**hexagon.stroke(color)**

If a color is provided, sets the stroke color of the pattern. If not provided, returns the current value. Defaults to black.

**hexagon.strokeWidth(width)**

If a width is provided, sets the stroke width to the specified number, in pixels. If not provided, returns the current value. Defaults to 0.

**hexagon.use()**

Returns a string containing the location of the pattern. Can be used to set the fill of polygons, eg:

`rect.attr("fill",hexagon.use());`


### ln.text()

Creates a new pattern of repeated text:

`var text = ln.text();`

**text.add()**

Adds the text pattern to the DOM. Invoked on creation and with `text.use()`. Only need to use this method is to update the pattern in place, (re)adding or updating the pattern in the DOM.

**text.angle(angle)**

Takes an angle in degrees and rotates the pattern by that amount. If not provided, returns the current value. Defaults to 0.

**text.background(color)**

Takes a color (including "none") to set the background color of the pattern. If not provided, returns the current value. Defaults to "none".

**text.fill(color)**

Takes a color to set the fill of the pattern's shapes. If not provided returns the current value. Defaults to "steelblue".

**text.fontSize(size)**

If size is provided, sets the font size of the pattern text (in px). If size is not provided returns the current value. Defaults to 14.

**text.hex(hex)**

If true, returns a hexagonal grid, if false, returns a square grid. If not provided, returns current value. Defaults to true.

**text.offsetY(distance)**

If distance is provided, moves the text in the pattern down the specified amount. Text is middle anchored in each tile, but this means the text draws mostly in the upper portion of the tile, is meant to center the text vertically. If distance is not provided, returns the current offset, defaults to 5.

**text.opacity(opacity)**

Sets the opacity of the pattern text. 0 is completely transparent, 1 is completely opaque. If not provided, returns the current opacity value. Defaults to 1.

**text.spacing(spacing)**

If spacing is provided, sets the distance between the centroid of adjacent tiles - does not factor in the bbox of the text. If not provided, returns the current spacing.

**text.stroke(color)**

If a color is provided, sets the stroke color of the pattern. If not provided, returns the current value. Defaults to black.

**text.strokeWidth(width)**

If a width is provided, sets the strokew width to the specified number, in pixels. If not provided, returns the current value. Defaults to 0.

**text.text(string)**

If a string is provided, sets the stroke width to the specified number, in pixels. If not provided, returns the current value. Defaults to α (*\u03B1*).

**text.use()**

Returns a string containing the location of the pattern. Can be used to set the fill of polygons, eg:

`rect.attr("fill",text.use());`


### ln.symbol()

Creates a new pattern with tiled symbols:

`var symbol = ln.symbol();`

**symbol.add()**

Adds the symbol pattern to the DOM. Invoked on creation and with `symbol.use()`. Only need to use this method is to update the pattern in place, (re)adding or updating the pattern in the DOM.

**symbol.angle(angle)**

Takes an angle in degrees and rotates the pattern by that amount. If not provided, returns the current value. Defaults to 0.

**symbol.background(color)**

Takes a color (including "none") to set the background color of the pattern. If not provided, returns the current value. Defaults to "none".

**symbol.center([x,y])**

If a coordinate is provided, centers the symbol at this value. While d3 symbols are centered at [0,0], this is intended for use where [0,0] forms the top left corner of the symbol as opposed to the center. If a coordinate is not provided returns the current centering coordiante, which is [0,0] by default.

**symbol.fill(color)**

Takes a color to set the fill of the pattern's shapes. If not provided returns the current value. Defaults to "steelblue".

**symbol.hex(hex)**

If true, returns a hexagonal grid, if false, returns a square grid. If not provided, returns current value. Defaults to true.

**symbol.opacity(opacity)**

Sets the opacity of the pattern symbol. 0 is completely transparent, 1 is completely opaque. If not provided, returns the current opacity value. Defaults to 1.

**symbol.scale(k)**

If k is provided, sets the scaling factor of the symbol. If not provided, returns the current scale. Defaults to 1.

**symbol.spacing(spacing)**

If spacing is provided, sets the distance between the centroid of adjacent tiles - does not factor in the bbox of the symbol. If not provided, returns the current spacing.

**symbol.stroke(color)**

If a color is provided, sets the stroke color of the pattern. If not provided, returns the current value. Defaults to black.

**symbol.strokeWidth(width)**

If a width is provided, sets the stroke width to the specified number, in pixels. If not provided, returns the current value. Defaults to 0.

**symbol.symbol(symbol)**

If a symbol is provided sets the symbol in used in the pattern. If a symbol is not provided, returns the current pattern, which defaults to `d3.symbol().type(D3.symbolWye).size(100)`. Can take a d3 symbol or a path.

**symbol.use()**

Returns a string containing the location of the pattern. Can be used to set the fill of polygons, eg:

`rect.attr("fill",symbol.use());`


### ln.checker()

Creates a new checkered pattern

`var checker = ln.checker();`

**checker.add()**

Adds the checker pattern to the DOM. Invoked on creation and with `checker.use()`. Only need to use this method is to update the pattern in place, (re)adding or updating the pattern in the DOM.

**checker.angle(angle)**

Takes an angle in degrees and rotates the pattern by that amount. If not provided, returns the current value. Defaults to 45.

**checker.fill([color1,color2])**

If an array of colors is provided, sets the two colors of the tiles. If not provided returns the current value. Defaults to `["steelblue","white"]`. 

If only one color is provided (in an array or not), the pattern will add white as a second color.

**checker.opacity(opacity)**

Sets the opacity of the pattern checker. 0 is completely transparent, 1 is completely opaque. If not provided, returns the current opacity value. Defaults to 1.

**checker.stroke(color)**

If a color is provided, sets the stroke color of the pattern. If not provided, returns the current value. Defaults to black.

**checker.strokeWidth(width)**

If a width is provided, sets the strokew width to the specified number, in pixels. If not provided, returns the current value. Defaults to 0.

**checker.use()**

Returns a string containing the location of the pattern. Can be used to set the fill of polygons, eg:

`rect.attr("fill",checker.use());`

**checker.width(width)**

If width is provided, sets the edge length of each checker tile, in pixels. If not provided, returns the current value. Defaults to 10.

### ln.stripe()

Creates a new striped pattern

`var stripe = ln.stripe();`

**stripe.add()**

Adds the stripe pattern to the DOM. Invoked on creation and with `stripe.use()`. Only need to use this method is to update the pattern in place, (re)adding or updating the pattern in the DOM.

**stripe.angle(angle)**

Takes an angle in degrees and rotates the pattern by that amount. If not provided, returns the current value. Defaults to 45.

**stripe.fill([colors])**

Takes an array of n colors. The number of color determines the number of unique stripes. If not provided, returns the current value. Defaults to `["steelblue","white"]`. 

If only one color is provided (either in an array or not), the pattern will add white as a second color.

**stripe.opacity([opacities])**

Takes an array (or single value) of opacities. Does not need to be the same length as the colors array - opacities will be recycled if there are less opacities than colors. If only one value is provided, sets the opacity of all strokes.

If opacities are not provided, returns the current opacity values, defaults to `[1]`.

**stripe.use()**

Returns a string containing the location of the pattern. Can be used to set the fill of polygons, eg:

`rect.attr("fill",stripe.use());`

**stripe.width([widths])**

Takes an array (or single value) of stripe widths. Does not need to be the same length as the colors array - widths will be recycled if there are less widths than colors. If only one value is provided, sets the width of all strokes. 

If widths are not provided, returns current widths, defaults to `[10]`.


### ln.plaid()

Creates a new plaid pattern

`var plaid = ln.plaid();`

**plaid.add()**

Adds the plaid pattern to the DOM. Invoked on creation and with `plaid.use()`. Only need to use this method is to update the pattern in place, (re)adding or updating the pattern in the DOM.

**plaid.angle(angle)**

Takes an angle in degrees and rotates the pattern by that amount. If not provided, returns the current value. Defaults to 45.

**plaid.fill([[colorsX],[colorsY]])**

Designed to take an array containing two arrays of colors. One array will set the stripes for one the x axis, while the other will set the stripes for the y axis. 

If only one colors array is provided, it will be duplicated for each axis.

If no array is provided, returns the current value. Defaults to `[["crimson","red"],["steelblue","white"]]`.

**plaid.opacity([[opacitiesX],[opacitiesY]])**

Designed to take an array containing two arrays of opacities. One array will set the stripe opacities for one the x axis, while the other will set the stripe opacities for the y axis. 

If only one opacities array is provided, it will be duplicated for each axis.

If a single value is provided it will be used for all stripes.

If no array is provided, returns the current value. Defaults to `[[0.5,0.8],[0.6,0.4]]`


**plaid.use()**

Returns a string containing the location of the pattern. Can be used to set the fill of polygons, eg:

`rect.attr("fill",plaid.use());`

**plaid.width([widths])**

Designed to take an array containing two arrays of widths. One array will set the stripe widths for one the x axis, while the other will set the stripe widths for the y axis. 

If only one opacities array is provided, it will be duplicated for each axis.

If a single value is provided it will be used for all stripes.

If no array is provided, returns the current value. Defaults to `[[10,5],[12,6]]`


### ln.cairo()

Creates a new cairo pentagonal pattern

`var cairo = ln.cairo();`

**cairo.add()**

Adds the cairo pattern to the DOM. Invoked on creation and with `cairo.use()`. Only need to use this method is to update the pattern in place, (re)adding or updating the pattern in the DOM.

**cairo.angle(angle)**

Takes an angle in degrees and rotates the pattern by that amount. If not provided, returns the current value. Defaults to 45.

**cairo.fill([colors])**

Requires an array of four colors. If no array is provided, returns the current values. Defaults to `["#2b8cbe","#a8ddb5","#7bccc4","#ccebc5"]`.

**cairo.stroke(color)**

If a color is provided, sets the stroke color of the pattern. If not provided, returns the current value. Defaults to black.

**cairo.strokeWidth(width)**

If a width is provided, sets the stroke width to the specified number, in pixels. If not provided, returns the current value. Defaults to 1.

**cairo.use()**

Returns a string containing the location of the pattern. Can be used to set the fill of polygons, eg:

`rect.attr("fill",cairo.use());`


### ln.octagon()

Creates a new octagon (and square) pattern

`var octagon = ln.octagon();`


**octagon.add()**

Adds the octagon pattern to the DOM. Invoked on creation and with `octagon.use()`. Only need to use this method is to update the pattern in place, (re)adding or updating the pattern in the DOM.

**octagon.angle(angle)**

Takes an angle in degrees and rotates the pattern by that amount. If not provided, returns the current value. Defaults to 0.

**octagon.fill([colors])**

Requires an array of two colors, first color sets the octagon's fill, the second fills the square. If no array is provided, returns the current values. Defaults to `["steelblue","white"]`.

**octagon.lengh(length)**

Sets width of the octagon. Defaults to 32.

**octagon.stroke(color)**

If a color is provided, sets the stroke color of the pattern. If not provided, returns the current value. Defaults to black.

**octagon.strokeWidth(width)**

If a width is provided, sets the stroke width to the specified number, in pixels. If not provided, returns the current value. Defaults to 1.

**octagon.use()**

Returns a string containing the location of the pattern. Can be used to set the fill of polygons, eg:

`rect.attr("fill",octagon.use());`


### ln.sine()

Creates a new sine wave pattern

`var sine = ln.sine();`


**sine.add()**

Adds the sine pattern to the DOM. Invoked on creation and with `sine.use()`. Only need to use this method is to update the pattern in place, (re)adding or updating the pattern in the DOM.

**sine.amplitude(amplitude)**

If amplitude is provided, sets the amplitude of the sine wave in pixels. If amplitude is not provided, returns the current amplitude. Defaults to 10.

**sine.angle(angle)**

Takes an angle in degrees and rotates the pattern by that amount. If not provided, returns the current value. Defaults to 0.

**sine.period(period)**

If period is provided sets the sine wave period in pixels. If not provided, returns the current period. Defaults to 100.

**sine.samping(interval)**

If interval is provided sets the x axis interval between each point in the pattern's line. Defaults to 1.

**sine.spacing(spacing)**

If spacing is provided, sets the vertical spacing between each wave's tile (not distance between peak to peak vertically). If not provided returns current value. Defaults to 4.

**sine.stroke(color)**

If a color is provided, sets the stroke color of the pattern. If not provided, returns the current value. Defaults to black.

**sine.strokeWidth(width)**

If a width is provided, sets the stroke width to the specified number, in pixels. If not provided, returns the current value. Defaults to 1.

**sine.use()**

Returns a string containing the location of the pattern. Can be used to set the fill of polygons, eg:

`rect.attr("fill",sine.use());`

## Pattern Utilities

### ln.circleSchemeCategory10(S *(optional)*)

Returns an array of 10 different circle patterns.

If S is provided, sets the SVG where the patterns will be used (optional, if not provided, uses first SVG in DOM).

### ln.circles(S *(optional)*)

Used to create an array of customized circle patterns easily. Ideal for threshold scales:
~~~
var circles = ln.circles().spacings([2,4,8,16]);

var scale = d3.scaleThreshold().domain([0,100,200]).range(circles);
~~~

The method that provides the largest array sets the size of the returned array. If some methods provide smaller arrays, then values will recycled. All methods that set pattern properties coerce values to arrays so the use of a single value is possible. For example, to set the fill of all circle patterns created by `ln.circles()`, we can use `ln.circles().fills("yellow");`

**circles.background([colors])**

If colors is provided, sets the spacings between circles for each pattern. If not provided, returns the current background colors array. Defaults to `["none"]`.

**circles.fill([fills])**

If fills is provided, sets the spacings between circles for each pattern. If not provided, returns the current fills array. Defaults to `["black"]`.

**circles.radii([radii])**

If radii is provided, sets the spacings between circles for each pattern. If not provided, returns the current spacing array. Defaults to `[1]`.

**circles.spacings([spacings])**

If spacings is provided, sets the spacings between circles for each pattern. If not provided, returns the current spacing array. Defaults to `[16,8,4,2]`.


### ln.manager(S *(optional)*)**

Creates a stripe manager. A stripe manager can be used to fill shapes based on a combination of single and multiple values. Single values will be colored with a single fill, multiple values will result in a stripe pattern fill.

If S is provided, sets the SVG where the patterns will be used.

**manager.angle(angle)**

If angle is specified, returns stripe patterns with this angle (in degrees). If not specified, returns the current angle. Defaults to 45 degrees.

**manager.datum(datum)**

If datum is an array, creates and returns a stripe pattern url where each stripe corresponds to a value in the array. If the pattern already exists, returns that pattern's url.

If datum is a single value, returns a single color that cooresponds to that value.

**manager.fills([colors])**

Takes an array of colors to be used as stripe colors. Colors are used in the order that they are needed. If no array is provided, returns the current color array. 

Defaults to `d3.schemeCategory20`.

**manager.values()**

Returns key value pairs, useful for creating legends. Contains one pair for each unique value passed to it in `manager.datum()`

**manager.width(width)**

If width is provided, sets the total width of a pattern tile. If a pattern results in two stripes, each will be half this width. If no width is provided, returns the current width.

Defaults to 12.


## Built In Symbols

In addition to easily incorporating d3 symbols, `ln.symbol()` has a couple variations that allow for use of built in relatively common symbols that might be useful in certain circumstances. These symbols are:


**ln.danger()**

A skull and crossbones pattern, inherits all methods of ln.symbol().

**ln.fire()**

A flame pattern, because why not? Inherits all methods of ln.symbol().

**ln.fish()**

A fish pattern, inherits all methods of ln.symbol().

**ln.wetland()**

A wetland/swamp pattern, inherits all methods of ln.symbol().





















