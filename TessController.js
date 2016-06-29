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
				var tileObj = new Tile({className:group.tiles[x]});
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

			for (var x = 0; x < group.leftSet.length; x++){
				var gItem = group.leftSet[x];
				var obj = self.groups[gItem.id];
				obj.percentage = gItem.percentage;
				groupObj.addLeft(obj);
			}
			var rightSet = [];
			for (var x = 0; x < group.rightSet.length; x++){
				gItem = group.rightSet[x];
				obj = self.groups[gItem.id];
				obj.percentage = gItem.percentage;
				groupObj.addRight(obj);
			}
			var topSet = [];
			for (var x = 0; x < group.topSet.length; x++){
				gItem = group.topSet[x];
				obj = self.groups[gItem.id];
				obj.percentage = gItem.percentage;
				groupObj.addAbove(obj);
			}
			var bottomSet = [];	
			for (var x = 0; x < group.bottomSet.length; x++){
				gItem = group.bottomSet[x];
				obj = self.groups[gItem.id];
				obj.percentage = gItem.percentage;
				groupObj.addBelow(obj);
			}
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