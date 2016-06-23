function Tile(opts){
	this.img = opts.img;
	//stylesheet to specify absolute positioning
	this.imgTmpl = "<img src='" + this.img + "' style='top:{1}px;left:{2}px;'/>";
	this.width = 10;
	this.height = 10;
}

Tile.prototype = {
	draw: function(document, ycoord, xcoord){
		var tmpl = this.imgTmpl.replace('{1}', ycoord);
		tmpl = tmpl.replace('{2}', xcoord);
		document.write(tmpl);
	},
	drawTest: function(document, ycoord, xcoord){
		var tmpl = "<div class='tile' style='top:{1}px;left:{2}px;'></div>";
		tmpl = this.imgTmpl.replace('{1}', ycoord);
		tmpl = tmpl.replace('{2}', xcoord);
		document.write(tmpl);
	}
};