function GridSquare(opts){
	this.tile = opts.tile || null;
	this.group = opts.group || null;
}

GridSquare.prototype = {
	setTile: function(tile){
		this.tile = tile;
	},
	setGroup: function(group){
		this.group = group;
	},
	getGroupID: function(){
		return this.group.getID();
	}
};