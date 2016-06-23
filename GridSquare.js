function GridSquare(){
	this.tile = null;
	this.group = null;
}

GridSquare.prototype = {
	setTile: function(tile){
		this.tile = tile;
	},
	setGroup: function(group){
		this.group = group;
	},
	getGroup: function(){
		return this.group;
	},
	getGroupID: function(){
		return this.group.getID();
	}
};