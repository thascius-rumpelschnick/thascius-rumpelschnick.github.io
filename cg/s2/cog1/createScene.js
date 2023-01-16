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
			// BEGIN exercise Scenegraph

			// Set parent-child relationships for scene-graph nodes.
			const sun = scenegraph.createNodeWithModel("sun", "sphere", { recursionDepth: 2 }, null, true);
			animation.assign(sun, "rotate", { rotationSpeed: [0, 0.01, 0] });

			const earth = scenegraph.createNodeWithModel("earth", "sphere", { recursionDepth: 2, scale: 100 }, sun);
			earth.translate([1000, 0, 0]);
			animation.assign(earth, "rotate", { rotationSpeed: [0, 0.03, 0] });

			const moon = scenegraph.createNodeWithModel("moon", "sphere", { recursionDepth: 2, scale: 50 }, earth);
			moon.translate([250, 0, 0]);
			animation.assign(moon, "rotate", { rotationSpeed: [0, 0.01, 0] });

			// END exercise Scenegraph		
		}

		// Public API.
		exports.init = init;
	});
