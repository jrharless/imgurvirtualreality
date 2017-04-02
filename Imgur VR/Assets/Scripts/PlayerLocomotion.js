#pragma strict
import System.Collections.Generic;
/**
 * Control player's keyboard movement and mouselook.
 * After we get VR running, this will probably be replaced.
 */
public var movementSpeed : float = 2.0F;
public var externalTransform: Transform;

function Start () {

}

function Update () {
	// Convert local point (0, 0, 1) to global space
	// (global point) - (global position) * input * speed
	// translate
	var speed: float = movementSpeed * Time.deltaTime;
	var headingX: Vector3 = Input.GetAxis("Horizontal") * externalTransform.TransformDirection(Vector3.right);
	var headingZ: Vector3 = Input.GetAxis("Vertical") * externalTransform.TransformDirection(Vector3.forward);

	var heading: Vector3 = (headingX + headingZ).normalized * speed;
	transform.position += heading;

	//transform.Translate(Input.GetAxis("Horizontal") * speed, 0.0F, Input.GetAxis("Vertical") * speed);
}