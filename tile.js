function Tile(opts){
	this.id = opts.id;
	this.img = opts.img;
	//stylesheet to specify absolute positioning
	this.imgTmpl = "<img src='" + this.img + "' style='top:{1}px;left:{2}px;'/>";
}

Tile.prototype = {
	draw: function(document, ycoord, xcoord){
		var tmpl = this.imgTmpl.replace('{1}', ycoord);
		tmpl = tmpl.replace('{2}', xcoord);
		document.write(this.imgTmpl);
	}
};