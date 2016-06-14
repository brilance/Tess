function Group(opts){
	this.id = opts.id;
	this.tiles = opts.tiles || []; //array of Tile objects

	this.leftSet = opts.leftSet || []; //struct of Group objects with percentages
	this.rightSet = opts.rightSet || [];
	this.topSet = opts.topSet || [];
	this.bottomSet = opts.bottomSet || [];
}

Group.prototype = {
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
		switch(where){
			case 'left':
				this.leftSet.append({'group':group, 'percentage': percentage});
				break;
			case 'right':
				this.rightSet.append({'group':group, 'percentage': percentage});
				break;
			case 'top':
				this.topSet.append({'group':group, 'percentage': percentage});
				break;
			case 'bottom':
				this.bottomSet.append({'group':group, 'percentage': percentage});
				break;
		}
	},
	getRandomTile: function(){
		var idx = this.getRandomInt(0, this.tiles.length);
		return this.tiles[idx];
	},
	getRandomInt: function(min, max) { 
  		return Math.floor(Math.random() * (max - min)) + min;
	},
	selectGroup: function(where){
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
		var idx = this.getRandomInt(0, seedArray.length);
		return seedArray[idx];
	}
};