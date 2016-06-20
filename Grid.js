function Grid(opts){
	this.groups = opts.groups || [];
	this.width = opts.width || 30;
	this.height = opts.height || 30;
	this.midX = this.width/2;
	this.midY = this.height/2;
	this.tiles = []; //TODO not an array of Tiles, change name to GridSquares
	this.leftTip = {x:midX, y:midY};
	this.rightTip = {x:midX, y:midY};
	this.topTip = {x:midX, y:midY};
	this.bottomTip = {x:midX, y:midY};
}

Grid.prototype = {
	draw: function(){
		this.startDraw();

		var leftX = this.leftTip.x;
		var rightX = this.rightTip.x;
		var topY = this.topTip.y;
		var bottomY = this.bottomTip.y;

		while (leftX > 0 && rightX < this.width && topY > 0 && bottomY < this.height){
			//start of draw loop
			this.stepCorners();
			this.drawCorners();
			this.stepDiagonalAboveRight();
			this.stepDiagonalAboveLeft();
			this.stepDiagonalBelowRight();
			this.stepDiagonalBelowLeft();
			//end of draw loop
		}
	},
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
		var gs = this.tiles[this.midY][this.midX];
		gs.setTile(seedTile);
	},
	stepCorners: function(){
		this.leftTip.x = this.leftTip.x-1;
		this.rightTip.x = this.rightTip.x+1;
		this.topTip.y = this.topTip.y-1;
		this.bottomTip.y = this.bottomTip.y+1;
	},
	drawCorners: function(){
		var gs = this.tiles[leftTip.y][leftTip.x];
		var group = gs.getGroup();
		this.stepLeft(group, leftTip.y, leftTip.x);

		gs = this.tiles[rightTip.y][rightTip.x];
		group = gs.getGroup();
		this.stepRight(group, rightTip.y, rightTip.x);

		gs = this.tiles[topTip.y][topTip.x];
		group = gs.getGroup();
		this.stepTop(group, topTip.y, topTip.x);

		gs = this.tiles[bottomTip.y][bottomTip.x];
		group = gs.getGroup();
		this.stepBottom(group, bottomTip.y, bottomTip.x);
	},
	stepDiagonalAboveRight: function(){
		var x = this.rightTip.x;
		var y = this.rightTip.y;
		while (x > this.midX && y >= this.topTip.y){
			x--;
			y--;
			this.intersectAboveRight(x, y);
		}
	},
	stepDiagonalAboveLeft: function(){
		var x = this.leftTip.x;
		var y = this.leftTip.y;
		while (x < this.midX && y >= this.topTip.y){
			x++;
			y--;
			this.intersectAboveLeft(x, y);
		}
	},
	stepDiagonalBelowRight: function(){
		var x = this.rightTip.x;
		var y = this.rightTip.y;
		while (x > this.midX && y <= this.bottomTip.y){
			x--;
			y++;
			this.intersectAboveRight(x, y);
		}
	},
	stepDiagonalBelowLeft: function(){
		var x = this.leftTip.x;
		var y = this.leftTip.y;
		while (x < this.midX && y <= this.bottomTip.y){
			x++;
			y++;
			this.intersectBelowLeft(x, y);
		}
	},
	stepRight: function(group, x, y){
		var newGroup = group.generateRight();
		this.assignTileHelper(x, y);
	},
	stepLeft: function(group, x, y){
		var newGroup = group.generateLeft();
		this.assignTileHelper(x, y);
	},
	stepAbove: function(group, x, y){
		var newGroup = group.generateAbove();
		this.assignTileHelper(x, y);
	},
	stepBelow: function(group, x, y){
		var newGroup = group.generateBelow();
		this.assignTileHelper(x, y);
	},
	intersectAboveRight: function(x, y){
		//get groups from below and left tiles
		var groupBelow = this.tiles[y-1][x].getGroupID();
		var groupLeft = this.tile[y][x-1].getGroupID();
		var groups1 = groupBelow.getTopSet();
		var groups2 = groupLeft.getRightSet();
		//find a group that is allowable for both
		var intersectGroup = this.findIntersectionGroup(groups1, groups2);
		if (intersectGroup){
			this.assignTileHelper(intersectGroup, x, y);
		}
		else{
			//what should we do if there is no eligible group? nothing?
		}
	},
	intersectBelowRight: function(x, y){
		var groupAbove = this.tiles[y+1][x].getGroupID();
		var groupLeft = this.tile[y][x-1].getGroupID();
		var groups1 = groupAbove.getBottomSet();
		var groups2 = groupLeft.getRightSet();
		var intersectGroup = this.findIntersectionGroup(groups1, groups2);
		if (intersectGroup){
			this.assignTileHelper(intersectGroup, x, y);
		}
		else{

		}
	},
	intersectAboveLeft: function(x, y){
		var groupBelow = this.tiles[y-1][x].getGroupID();
		var groupRight = this.tile[y][x+1].getGroupID();
		var group1 = groupBelow.getTopSet();
		var group2 = groupRight.getLeftSet();
		var intersectGroup = this.findIntersectionGroup(groups1, groups2);
		if (intersectGroup){
			this.assignTileHelper(intersectGroup, x, y);
		}
		else{

		}
	},
	intersectBelowLeft: function(x, y){
		var groupAbove = this.tiles[y+1][x].getGroupID();
		var groupRight = this.tile[y][x+1].getGroupID();
		var group1 = groupBelow.getBottomSet();
		var group2 = groupRight.getLeftSet();
		var intersectGroup = this.findIntersectionGroup(groups1, groups2);
		if (intersectGroup){
			this.assignTileHelper(intersectGroup, x, y);
		}
		else{

		}
	},
	assignTileHelper: function(group, x, y){
		//generate and assign tile
		var tile = group.getTile();
		var gs = this.tiles[y][x];
		gs.setTile(tile);
		gs.setGroup(group.getID());
	},
	findIntersectionGroup: function(groups1, groups2){
		//get all groups that are present in both group lists
		var intersection = groups1.filter(function(group) {
			var gid = group.getID();
			var idx = groups2.findIndex(function(group2){
				return group2.getID() == gid;
			});
    		return idx != -1;
		});

		//select one of the results at random
		var rand = tessUtils.getRandomInt(0, intersection.length);
		return intersection[rand];
	}
};