/**
 * Populate the scene-graph with nodes,
 * calling methods form the scene-graph and node modules.
 * 
 * Texture files have to exist in the "textures" sub-directory.
 * 
 * @namespace cog1
 * @module createScene
 */
define(["exports", "scenegraph", "animation"], //
	function (exports, scenegraph, animation) {
		"use strict";

		/**
		 * 	Call methods form the scene-graph (tree) module to create the scene.
		 *
		 */
		function init() {
			const cube = scenegraph.createNodeWithModel("cube", "cube", { scale: 300 });
			cube.rotateTo([0.8, 0.3, 0]);
			scenegraph.setLights(0.4, 2, [100, 200, 400], 4.0, 10);
		}

		// Public API.
		exports.init = init;
	});
