#pragma strict
import System.Collections.Generic;
/**
 * Control player's keyboard movement and mouselook.
 * After we get VR running, this will probably be replaced.
 */
public var movementSpeed : float = 2.0F;

function Start () {

}

function Update () {
	var speed: float = movementSpeed * Time.deltaTime;
	transform.Translate(Input.GetAxis("Horizontal") * speed, 0.0F, Input.GetAxis("Vertical") * speed);
}