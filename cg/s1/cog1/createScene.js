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
			const shoulder = scenegraph.createNodeWithModel("shoulder", "sphere", { recursionDepth: 2, scale: 80 });
			const upperArm = scenegraph.createNodeWithModel("upperArm", "cube", { scale: 50 }, shoulder);
			upperArm.scale([3, .05, .05]);
			upperArm.translate([96, -248, 0]);
			upperArm.rotate([0, 0, -1.2]);

			const elbow = scenegraph.createNodeWithModel("elbow", "sphere", { recursionDepth: 2, scale: 60 }, shoulder);
			elbow.translate([180, -464, 0]);

			const lowerArm = scenegraph.createNodeWithModel("lowerArm", "cube", { scale: 35 }, elbow);
			lowerArm.scale([5, 0, 0]);
			lowerArm.translate([246, -4, 0]);

			const wrist = scenegraph.createNodeWithModel("wrist", "sphere", { recursionDepth: 2, scale: 50 }, elbow);
			wrist.translate([474, -4, 0]);
			wrist.rotate([0.8, 0.3, 0]);

			const hand = scenegraph.createNodeWithModel("hand", "cube", { scale: 40 }, wrist);
			hand.scale([0.7, 1.4, -0.7]);
			hand.translate([110, 0, 0]);
			hand.rotate([0, 0, -1.57]);

			// END exercise Scenegraph		
		}

		// Public API.
		exports.init = init;
	});
