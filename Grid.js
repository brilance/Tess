function Grid(opts){
	this.groups = opts.groups || [];
	this.width = opts.width || 50;
	this.height = opts.height || 50;
	this.gridSquares = [];
	this.xTip = 0;
	this.yTip = 0;

	this.initGrid();
}

Grid.prototype = {
	draw: function(){
		this.generateTiles();
		this.drawTiles();
	},
	drawTiles: function(){
		for (var y = 0; y < this.height; y++){
			for (var x = 0; x < this.width; x++){
				this.gridSquares[y][x].draw(x,y);
			}
		}
	},
	generateTiles: function(){
		this.startGeneration();

		//upper triangle
		while (this.xTip < this.width-1 && this.yTip < this.height-1){
			this.generateCorners(0);
			this.generateDiagonalDesc();
		}

		this.xTip = 0;
		this.yTip = 0;

		//lower triangle
		while (this.xTip < this.width-1 && this.yTip < this.height-1){
			this.generateCornersBelow(this.width-1);
			this.generateDiagonalAsc();
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
	startGeneration: function(){
		//select a random group from all groups, and then a tile
		var rand = tessUtils.getRandomInt(0, this.groups.length);
		var seedGroup = this.groups[rand];
		var seedTile = seedGroup.getTile();

		//assign seed tile to the upper left corner
		var gs = this.gridSquares[this.yTip][this.xTip];
		gs.setTile(seedTile);
		gs.setGroup(seedGroup);
	},
	generateCorners: function(baseline){
		var gs = this.gridSquares[baseline][this.xTip];
		var group = gs.getGroup();
		this.stepRight(group, this.xTip, baseline);
		this.xTip++;

		gs = this.gridSquares[this.yTip][baseline];
		group = gs.getGroup();
		this.stepBelow(group, baseline, this.yTip);
		this.yTip++;
	},
	generateCornersBelow: function(baseline){
		this.xTip++;
		this.yTip++;

		var gs = this.gridSquares[baseline][this.xTip];
		var group = gs.getGroup();
		this.intersectBelowRight(this.xTip, baseline);
		//this.stepRight(group, this.xTip, baseline);
		
		gs = this.gridSquares[this.yTip][baseline];
		group = gs.getGroup();
		this.intersectBelowRight(baseline, this.yTip);
	},
	generateDiagonalDesc: function(){
		var x = this.xTip;
		var y = this.yTip;
		var num = y-1;

		for (var i = 0; i < num; i++){
			x = x-1;
			y = i+1;
			this.intersectBelowRight(x,y);
		}
	},
	generateDiagonalAsc: function(){
		var y = this.height;
		var num = this.width-1;

		for (var i = this.xTip; i < num; i++){
			y = y-1;
			this.intersectBelowRight(i,y);
		}
	},
	stepRight: function(group, x, y){
		var newGroup = group.generateRight();
		this.assignTileHelper(newGroup, x+1, y);
	},
	stepBelow: function(group, x, y){
		var newGroup = group.generateBelow();
		this.assignTileHelper(newGroup, x, y+1);
	},
	intersectBelowRight: function(x, y){
		var groupAbove = this.gridSquares[y-1][x].getGroup();
		var groupLeft = this.gridSquares[y][x-1].getGroup();
		var groups1 = groupAbove.getBottomSet();
		var groups2 = groupLeft.getRightSet();
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
		var gs = this.gridSquares[y][x];
		gs.setTile(tile);
		gs.setGroup(group);
	},
	findIntersectionGroup: function(groups1, groups2){
		//get all groups that are present in both group lists
		var intersection = groups1.filter(function(group) {
			var gid = group.group.getID();
			var idx = groups2.findIndex(function(group2){
				return group2.group.getID() == gid;
			});
    		return idx != -1;
		});

		//select one of the results at random
		var rand = tessUtils.getRandomInt(0, intersection.length);
		return intersection[rand].group;
	}
};