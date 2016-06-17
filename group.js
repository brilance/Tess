function Group(opts){
	this.id = opts.id;
	this.tiles = opts.tiles || []; //array of Tile objects

	this.leftSet = opts.leftSet || []; //struct of Group objects with percentages
	this.rightSet = opts.rightSet || [];
	this.topSet = opts.topSet || [];
	this.bottomSet = opts.bottomSet || [];
}

Group.prototype = {
	getID: function(){
		return this.id;
	},
	getLeftSet: function(){
		return this.leftSet;
	},
	getRightSet: function(){
		return this.rightSet;
	},
	getTopSet: function(){
		return this.topSet;
	},
	getBottomSet: function(){
		return this.bottomSet;
	},
	draw: function(){
		var tile = this.getRandomTile();
		tile.draw();
	},
	addLeft: function(group, percentage){
		this.add('left', group, percentage);
	},
	addRight: function(group, percentage){
		this.add('right', group, percentage);
	},
	addAbove: function(group, percentage){
		this.add('top', group, percentage);
	},
	addBelow: function(group, percentage){
		this.add('bottom', group, percentage);
	},
	add: function(where, group, percentage){
		var gid = group.id;
		var obj = {'group':group, 'percentage': percentage, 'gid':gid};
		switch(where){
			case 'left':
				this.leftSet.append(obj);
				break;
			case 'right':
				this.rightSet.append(obj);
				break;
			case 'top':
				this.topSet.append(obj);
				break;
			case 'bottom':
				this.bottomSet.append(obj);
				break;
		}
	},
	getTile: function(){
		var idx = tessUtils.getRandomInt(0, this.tiles.length);
		return this.tiles[idx];
	},
	generateLeft: function(){
		this.generateGroup('left');
	},
	generateRight: function(){
		this.generateGroup('right');
	},
	generateAbove: function(){
		this.generateGroup('top');
	},
	generateBelow: function(){
		this.generateGroup('bottom');
	},
	generateGroup: function(where){
		//select a group randomly, within defined probabilities
		var set = null;

		switch(where){
			case 'left':
				set = this.leftSet;
				break;
			case 'right':
				set = this.rightSet;
				break;
			case 'top':
				set = this.topSet;
				break;
			case 'bottom':
				set = this.bottomSet;
				break;
		}

		var seedArray = [];
		for (var group in set){
			var perc = group.percentage;
			for (var x = 0; x < perc; x++){
				//the higher the percentage, the more entries for this group will be included
				seedArray.append(group.group); 
			}
		}
		var idx = tessUtils.getRandomInt(0, seedArray.length);
		return seedArray[idx];
	}
};