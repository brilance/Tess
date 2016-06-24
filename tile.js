function Tile(opts){
	this.img = opts.img;
	//stylesheet to specify absolute positioning
	this.imgTmpl = "<img src='" + this.img + "' style='top:{1}px;left:{2}px;'/>";
	this.width = 10;
	this.height = 10;
}

Tile.prototype = {
	draw: function(ycoord, xcoord){
		/*var tmpl = this.imgTmpl.replace('{1}', ycoord);
		tmpl = tmpl.replace('{2}', xcoord);
		document.write(tmpl);*/
		this.drawTest(ycoord, xcoord);
	},
	drawTest: function(ycoord, xcoord){
		var tmpl = "<div class='tile' style='top:{1}px;left:{2}px;'></div>";
		tmpl = tmpl.replace('{1}', ycoord*this.height);
		tmpl = tmpl.replace('{2}', xcoord*this.width);
		document.write(tmpl);
	}
};