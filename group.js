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
	addLeft: function(group){
		this.add('left', group);
	},
	addRight: function(group){
		this.add('right', group);
	},
	addAbove: function(group){
		this.add('top', group);
	},
	addBelow: function(group){
		this.add('bottom', group);
	},
	add: function(where, group){
		var obj = {'group':group, 'percentage': group.percentage, 'gid':group.id};
		switch(where){
			case 'left':
				this.leftSet.push(obj);
				break;
			case 'right':
				this.rightSet.push(obj);
				break;
			case 'top':
				this.topSet.push(obj);
				break;
			case 'bottom':
				this.bottomSet.push(obj);
				break;
		}
	},
	getTile: function(){
		var idx = tessUtils.getRandomInt(0, this.tiles.length);
		return this.tiles[idx];
	},
	generateLeft: function(){
		return this.generateGroup('left');
	},
	generateRight: function(){
		return this.generateGroup('right');
	},
	generateAbove: function(){
		return this.generateGroup('top');
	},
	generateBelow: function(){
		return this.generateGroup('bottom');
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
		for (var i = 0; i < set.length; i++){
			var group = set[i];
			var perc = group.percentage;
			for (var x = 0; x < perc; x++){
				//the higher the percentage, the more entries for this group will be included
				seedArray.push(group.group); 
			}
		}
		var idx = tessUtils.getRandomInt(0, seedArray.length);
		return seedArray[idx];
	}
};