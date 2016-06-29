function Tile(opts){
	this.className = opts.className;
	//stylesheet to specify absolute positioning
	this.tmpl = "<div class='tile {3}' style='top:{1}px;left:{2}px;'></div>";
	this.width = 2;
	this.height = 2;
}

Tile.prototype = {
	draw: function(ycoord, xcoord){
		var tmpl = this.tmpl.replace('{1}', ycoord*this.height);
		tmpl = tmpl.replace('{2}', xcoord*this.width);
		tmpl = tmpl.replace('{3}', this.className);
		$("#canvas").append($(tmpl));
	}
};