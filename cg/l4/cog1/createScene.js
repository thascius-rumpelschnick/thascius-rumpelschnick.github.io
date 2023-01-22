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
			var cube = scenegraph.createNodeWithModel("cube", "cube", { scale: 180 });
			cube.rotateTo([0.5, 0.3, 0]);
			// scenegraph.createPointLightNode("light", "diamond");
			scenegraph.setLights(0.5, 0.6, [220, 380, 300], 4.0, 10);
		}

		// Public API.
		exports.init = init;
	});
