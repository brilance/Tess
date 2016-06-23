function Grid(opts){
	this.groups = opts.groups || [];
	this.width = opts.width || 30;
	this.height = opts.height || 30;
	this.gridSquares = []; //TODO not an array of Tiles, change name to GridSquares
	this.xTip = 0;
	this.yTip = 0;

	this.initGrid();
}

Grid.prototype = {
	draw: function(){
		this.startDraw();

		//upper triangle
		while (this.xTip < this.width && this.yTip < this.height){
			this.drawCorners();
			this.drawDiagonal();
		}

		var temp = this.xTip;
		this.xTip = this.yTip;
		this.yTip = temp;

		//lower triangle
		while (this.xTip < this.width && this.yTip < this.height){
			this.drawCorners();
			this.drawDiagonal();
		}		
	},
	initGrid: function(){
		//set up inner array for each row
		for (var y = 0; y < this.height; y++){
			this.gridSquares[y] = [];
			for (var x = 0; x < this.width; x++){
				this.gridSquares[y][x] = new GridSquare();
			}
		}
	},
	startDraw: function(){
		//select a random group from all groups, and then a tile
		var rand = tessUtils.getRandomInt(0, this.groups.length);
		var seedGroup = this.groups[rand];
		var seedTile = seedGroup.getTile();

		//assign seed tile to the upper left corner
		var gs = this.gridSquares[0][0];
		gs.setTile(seedTile);
		gs.setGroup(seedGroup);
	},
	drawCorners: function(){
		var gs = this.gridSquares[0][this.xTip];
		var group = gs.getGroup();
		this.stepLeft(group, this.xTip, 0);

		gs = this.gridSquares[this.yTip][0];
		group = gs.getGroup();
		this.stepBelow(group, 0, this.yTip);

		this.xTip++;
		this.yTip++;
	},
	drawDiagonal: function(){
		var x = this.xTip;
		var y = this.yTip;
		var num = y-1;

		for (var i = 0; i < num; i++){
			x = x-1;
			y = i+1;
			this.intersectBelowRight(x,y);
		}
	},
	stepRight: function(group, x, y){
		var newGroup = group.generateRight();
		this.assignTileHelper(newGroup, x, y);
	},
	stepLeft: function(group, x, y){
		var newGroup = group.generateLeft();
		this.assignTileHelper(newGroup, x, y);
	},
	stepAbove: function(group, x, y){
		var newGroup = group.generateAbove();
		this.assignTileHelper(newGroup, x, y);
	},
	stepBelow: function(group, x, y){
		var newGroup = group.generateBelow();
		this.assignTileHelper(newGroup, x, y);
	},
	/*intersectAboveRight: function(x, y){
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
	},*/
	intersectBelowRight: function(x, y){
		var groupAbove = this.gridSquares[y+1][x].getGroupID();
		var groupLeft = this.gridSquares[y][x-1].getGroupID();
		var groups1 = groupAbove.getBottomSet();
		var groups2 = groupLeft.getRightSet();
		var intersectGroup = this.findIntersectionGroup(groups1, groups2);
		if (intersectGroup){
			this.assignTileHelper(intersectGroup, x, y);
		}
		else{

		}
	},
	/*intersectAboveLeft: function(x, y){
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
	},*/
	/*intersectBelowLeft: function(x, y){
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
	},*/
	assignTileHelper: function(group, x, y){
		//generate and assign tile
		var tile = group.getTile();
		var gs = this.gridSquares[y][x];
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