/**
 * @class CylinderShape
 * @param radius {Number} radius of the cylinder
 * @param half_height {Number} half height of the cylinder
 * @constructor
 */
Goblin.CylinderShape = function( radius, half_height ) {
	/**
	 * radius of the cylinder
	 *
	 * @proptery radius
	 * @type {Number}
	 */
	this.radius = radius;

	/**
	 * half height of the cylinder
	 *
	 * @proptery half_height
	 * @type {Number}
	 */
	this.half_height = half_height;
};

Goblin.CylinderShape.prototype.getBoundingRadius = function() {
	return Math.max( this.radius, this.half_height );
};

Goblin.CylinderShape.prototype.getInertiaTensor = function( mass ) {
	var element = 0.0833 * mass * ( 3 * this.radius * this.radius + ( this.half_height + this.half_height ) * ( this.half_height + this.half_height ) );

	return mat3.createFrom(
		element, 0, 0,
		0, 0.5 * mass * this.radius * this.radius, 0,
		0, 0, element
	);
};

/**
 * Given `direction`, find the point in this body which is the most extreme in that direction.
 * This support point is calculated in world coordinates and stored in the second parameter `support_point`
 *
 * @method findSupportPoint
 * @param direction {vec3} direction to use in finding the support point
 * @param support_point {vec3} vec3 variable which will contain the supporting point after calling this method
 */
Goblin.CylinderShape.prototype.findSupportPoint = function( direction, support_point ) {
	/*
	 support_point = [

	 ]
	 */

	// Calculate the support point in the local frame
	if ( direction[1] < 0 ) {
		support_point[1] = -this.half_height;
	} else {
		support_point[1] = this.half_height;
	}

	if ( direction[0] === 0 && direction[2] === 0 ) {
		support_point[0] = support_point[2] = 0;
	} else {
		var sigma = Math.sqrt( direction[0] * direction[0] + direction[2] * direction[2] ),
			r_s = this.radius / sigma;
		support_point[0] = r_s * direction[0];
		support_point[2] = r_s * direction[2];
	}
};