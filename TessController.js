function TessController(groups){
	if (groups.isArray){
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
		this.inputGroups.forEach(function(group){
			var opts = {id:group.id};
			var tiles = [];
			for (var x = 0; x < group.tiles.length; x++){
				var tileObj = new Tile({img:group.tiles[x]});
				tiles.append(tileObj);
			}
			opts.tiles = tiles;
			var gObj = new Group(opts);
			this.groups[group.id] = gObj;
		});
	},
	createRelationships: function(){
		this.inputGroups.forEach(function(group){
			var groupObj = this.groups[group.id];	
			var leftSet = [];
			for (var x = 0; x < group.leftSet.length; x++){
				leftSet.append(this.groups[group.leftSet[x]]);
			}
			var rightSet = [];
			for (var x = 0; x < group.rightSet.length; x++){
				rightSet.append(this.groups[group.rightSet[x]]);
			}
			var topSet = [];
			for (var x = 0; x < group.topSet.length; x++){
				topSet.append(this.groups[group.topSet[x]]);
			}
			var bottomSet = [];	
			for (var x = 0; x < group.bottomSet.length; x++){
				bottomSet.append(this.groups[group.bottomSet[x]]);
			}
			groupObj.leftSet = leftSet;
			groupObj.rightSet = rightSet;
			groupObj.topSet = topSet;
			groupObj.bottomSet = bottomSet;
		});
	},
	createGrid: function(){
		this.grid = new Grid(this.groups);
	}
};