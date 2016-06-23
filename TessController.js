function TessController(groups){
	if (Array.isArray(groups)){
		this.inputGroups = groups;
	}
	else{
		this.inputGroups = JSON.parse(groups);
	}

	this.groups = {};
	this.grid = null;

	this.createGroups();
	this.createRelationships();
	this.createGrid();
}

TessController.prototype = {
	draw: function(){
		if (this.grid){
			this.grid.draw();
		}
		else{
			console.log('Error! grid is somehow null?');
		}
	},
	createGroups: function(){
		var self = this;
		this.inputGroups.forEach(function(group){
			var opts = {id:group.id};
			var tiles = [];
			for (var x = 0; x < group.tiles.length; x++){
				var tileObj = new Tile({img:group.tiles[x]});
				tiles.push(tileObj);
			}
			opts.tiles = tiles;
			var gObj = new Group(opts);
			self.groups[group.id] = gObj;
		});
	},
	createRelationships: function(){
		var self = this;
		this.inputGroups.forEach(function(group){
			var groupObj = self.groups[group.id];	
			var leftSet = [];
			for (var x = 0; x < group.leftSet.length; x++){
				leftSet.push(self.groups[group.leftSet[x]]);
			}
			var rightSet = [];
			for (var x = 0; x < group.rightSet.length; x++){
				rightSet.push(self.groups[group.rightSet[x]]);
			}
			var topSet = [];
			for (var x = 0; x < group.topSet.length; x++){
				topSet.push(self.groups[group.topSet[x]]);
			}
			var bottomSet = [];	
			for (var x = 0; x < group.bottomSet.length; x++){
				bottomSet.push(self.groups[group.bottomSet[x]]);
			}
			groupObj.leftSet = leftSet;
			groupObj.rightSet = rightSet;
			groupObj.topSet = topSet;
			groupObj.bottomSet = bottomSet;
		});
	},
	createGrid: function(){
		var groupArr = [];
		for (var group in this.groups){
			groupArr.push(this.groups[group]);
		}
		this.grid = new Grid({groups:groupArr});
	}
};