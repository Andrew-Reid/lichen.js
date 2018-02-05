# lichen.js
Patterning Utility for SVG &amp; D3

## Patterns

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

**circle.stroke(color)**

If a color is provided, sets the stroke color of the pattern. If not provided, returns the current value. Defaults to black.

**circle.use()**

Returns a string containing the location of the pattern. Can be used to set the fill of polygons, eg:

`rect.attr("fill",circle.use());`

**circle.strokeWidth(width)**

If a width is provided, sets the strokew width to the specified number, in pixels. If not provided, returns the current value. Defaults to 0.

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

**square.stroke(color)**

If a color is provided, sets the stroke color of the pattern. If not provided, returns the current value. Defaults to black.

**square.use()**

Returns a string containing the location of the pattern. Can be used to set the fill of polygons, eg:

`rect.attr("fill",square.use());`

**square.strokeWidth(width)**

If a width is provided, sets the strokew width to the specified number, in pixels. If not provided, returns the current value. Defaults to 0.

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

**hexagon.stroke(color)**

If a color is provided, sets the stroke color of the pattern. If not provided, returns the current value. Defaults to black.

**hexagon.use()**

Returns a string containing the location of the pattern. Can be used to set the fill of polygons, eg:

`rect.attr("fill",hexagon.use());`

**hexagon.strokeWidth(width)**

If a width is provided, sets the strokew width to the specified number, in pixels. If not provided, returns the current value. Defaults to 0.

