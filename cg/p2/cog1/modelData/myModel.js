/**
 * Empty object for groups in scenegraph.
 * 
 * @namespace cog1.data
 * @module empty
 */
 define(["exports", "data"], function(exports, data) {
	"use strict";

	/**
	 * Create an instance of the model defined in this module.
	 * 
	 * @parameter object with fields:
	 * @returns instance of this model.
	 */
	exports.create = function(parameter) {
		if(parameter) {
			var scale = parameter.scale;
		}

		// Set default values if parameter is undefined.
		if(scale == undefined){
			scale = 200;
		}
		
		// Instance of the model to be returned.
		var instance = {};

		instance.vertices = [
			[0, 0, 0], // 0
			[1, 0, 0],
			[1, 0, 1],
			[0, 0, 1],

			[0, 2, 0], // 4
			[1, 2, 0],
			[1, 2, 1],
			[0, 2, 1],

			[1, 0, 0], // 8
			[3, 0, 0],
			[3, 0, 1],
			[1, 0, 1],

			[1, 1, 0], // 12
			[3, 1, 0],
			[3, 1, 1],
			[1, 1, 1],

			[0, 2, 0], // 16
			[1, 2, 0],
			[1, 2, 1],
			[0, 2, 1],
			[0.5, 3.5, 0.5],

			[1, 1, 0], // 21
			[3, 1, 0],
			[3, 1, 1],
			[1, 1, 1],
			[1, 1.5, 0.5],
			[3, 1.5, 0.5],

			[3, 0, 0], // 27
			[3.5, 0, 0.5],
			[3, 0, 1], 

			[3, 1, 0], // 30
			[3.5, 1, 0.5],
			[3, 1, 1]
		];

		instance.polygonVertices = [
			[0, 1, 2, 3],
			[4, 5, 6, 7],
			[0, 1, 5, 4],
			[0, 4, 7, 3],
			[2, 3, 7, 6],
			[1, 2, 6, 5],

			[8, 9, 10, 11],
			[12, 13, 14, 15],
			[8, 9, 13, 12],
			[10, 11, 15, 14],
			[8, 11, 15, 12],
			[9, 10, 14, 13],

			[16, 17, 18, 19],
			[16, 20, 17, 20],
			[17, 20, 18, 20],
			[18, 20, 19, 20],
			[19, 20, 16, 20],

			[21, 22, 23, 24],
			[21, 25, 26, 22],
			[23, 26, 25, 24],

			[27, 28, 29],
			[32, 31, 30],
			[31, 28],
			[31, 26]
		];	

		instance.polygonColors = [
			0, 1, 2, 3, 4, 5, 
			0, 1, 2, 3, 4, 5, 
			0, 1, 2, 3, 4,
			0, 1, 2, 3,
			0, 1, 2, 3
		];
		
		data.applyScale.call(instance, scale);

		return instance;		
	};
});