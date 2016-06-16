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
				this.tiles[y][x] = null;
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
		this.tiles[midY][midX] = seedTile;

		//free generation
		this.stepAbove(seedGroup, midX, midY);
		this.stepBelow(seedGroup, midX, midY);
		this.stepLeft(seedGroup, midX, midY);
		this.stepRight(seedGroup, midX, midY);

		//intersection of 2 groups
		this.intersectAboveRight(seedGroup, midX, midY);
		this.intersectBelowRight(seedGroup, midX, midY);
		this.intersectAboveLeft(seedGroup, midX, midY);
		this.intersectBelowLeft(seedGroup, midX, midY);
	},
	stepRight: function(group, x, y){
		var newGroup = group.generateRight();
		var tile = newGroup.getTile();
		this.tiles[y][x+1] = tile;
	},
	stepLeft: function(group, x, y){
		var newGroup = group.generateLeft();
		var tile = newGroup.getTile();
		this.tiles[y][x-1] = tile;
	},
	stepAbove: function(group, x, y){
		var newGroup = group.generateAbove();
		var tile = newGroup.getTile();
		this.tiles[y-1][x] = tile;
	},
	stepBelow: function(group, x, y){
		var newGroup = group.generateBelow();
		var tile = newGroup.getTile();
		this.tiles[y+1][x] = tile;
	},
	intersectAboveRight: function(group, x, y){
		//get groups from below and left tiles
		//find a group that is allowable for both
		//generate and assign tile
	},
	intersectBelowRight: function(group, x, y){
		//get groups from above and left tiles
		//find a group that is allowable for both
		//generate and assign tile
	},
	intersectAboveLeft: function(group, x, y){
		//get groups from below and right tiles
		//find a group that is allowable for both
		//generate and assign tile
	},
	intersectBelowLeft: function(group, x, y){
		//get groups from above and right tiles
		//find a group that is allowable for both
		//generate and assign tile
	},
	findIntersectionGroup: function(groups1, groups2){
		//select randomly from the groups in the intersection of 1 and 2
	}

};