function Grid(opts){
	this.groups = opts.groups || [];
	this.width = opts.width || 30;
	this.height = opts.height || 30;
	this.tiles = [];
}

Grid.prototype = {
	initGrid: function(){
		//set up inner array for each row
		for (var y = 0; y < this.height; y++){
			this.tiles[y] = [];
			for (var x = 0; x < this.width; x++){
				this.tiles[y][x] = new GridSquare();
			}
		}
	},
	startDraw: function(){
		//select a random group from all groups, and then a tile
		var rand = tessUtils.getRandomInt(0, this.groups.length);
		var seedGroup = this.groups[rand];
		var seedTile = seedGroup.getTile();

		//assign seed tile to the very middle of the array
		var midX = this.width/2;
		var midY = this.height/2;
		var gs = this.tiles[midY][midX];
		gs.setTile(seedTile);

		//free generation
		this.stepAbove(seedGroup, midX, midY);
		this.stepBelow(seedGroup, midX, midY);
		this.stepLeft(seedGroup, midX, midY);
		this.stepRight(seedGroup, midX, midY);

		//intersection of 2 groups
		this.intersectAboveRight(seedGroup, midX+1, midY+1);
		this.intersectBelowRight(seedGroup, midX+1, midY-1);
		this.intersectAboveLeft(seedGroup, midX-1, midY+1);
		this.intersectBelowLeft(seedGroup, midX-1, midY-1);
	},
	stepRight: function(group, x, y){
		var newGroup = group.generateRight();
		var tile = newGroup.getTile();
		var gs = this.tiles[y][x+1];
		gs.setTile(tile);
		gs.setGroup(newGroup.getID());
	},
	stepLeft: function(group, x, y){
		var newGroup = group.generateLeft();
		var tile = newGroup.getTile();
		var gs = this.tiles[y][x-1];
		gs.setTile(tile);
		gs.setGroup(newGroup.getID());
	},
	stepAbove: function(group, x, y){
		var newGroup = group.generateAbove();
		var tile = newGroup.getTile();
		var gs = this.tiles[y-1][x];
		gs.setTile(tile);
		gs.setGroup(newGroup.getID());
	},
	stepBelow: function(group, x, y){
		var newGroup = group.generateBelow();
		var tile = newGroup.getTile();
		var gs = this.tiles[y+1][x];
		gs.setTile(tile);
		gs.setGroup(newGroup.getID());
	},
	intersectAboveRight: function(group, x, y){
		//get groups from below and left tiles
		var groupBelow = this.tiles[y-1][x].getGroupID();
		var groupLeft = this.tile[y][x-1].getGroupID();
		//find a group that is allowable for both
		var intersectGroup = this.findIntersectionGroup(groupBelow, groupLeft);
		if (intersectGroup){
			this.assignTileHelper(intersectGroup, x, y);
		}
		else{
			//what should we do if there is no eligible group? nothing?
		}
	},
	intersectBelowRight: function(group, x, y){
		var groupAbove = this.tiles[y+1][x].getGroupID();
		var groupLeft = this.tile[y][x-1].getGroupID();
		var intersectGroup = this.findIntersectionGroup(groupAbove, groupLeft);
		if (intersectGroup){
			this.assignTileHelper(intersectGroup, x, y);
		}
		else{

		}
	},
	intersectAboveLeft: function(group, x, y){
		var groupBelow = this.tiles[y-1][x].getGroupID();
		var groupRight = this.tile[y][x+1].getGroupID();
		var intersectGroup = this.findIntersectionGroup(groupBelow, groupRight);
		if (intersectGroup){
			this.assignTileHelper(intersectGroup, x, y);
		}
		else{

		}
	},
	intersectBelowLeft: function(group, x, y){
		var groupAbove = this.tiles[y+1][x].getGroupID();
		var groupRight = this.tile[y][x+1].getGroupID();
		var intersectGroup = this.findIntersectionGroup(groupAbove, groupRight);
		if (intersectGroup){
			this.assignTileHelper(intersectGroup, x, y);
		}
		else{

		}
	},
	assignTileHelper: function(intersectGroup, x, y){
		//generate and assign tile
		var tile = intersectGroup.getTile();
		var gs = this.tiles[y][x];
		gs.setTile(tile);
		gs.setGroup(intersectGroup.getID());
	},
	findIntersectionGroup: function(groups1, groups2){
		//select randomly from the groups in the intersection of 1 and 2
	}

};