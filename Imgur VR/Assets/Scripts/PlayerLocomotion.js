#pragma strict
/**
 * Control player's keyboard movement and mouselook.
 * After we get VR running, this will probably be replaced.
 */
public var movementSpeed : float = 2.0F;
public var turnSpeed: float = 15.0F;

// Mouselook code from answers.unity3d.com/questions/29741/mouse-look-script.html
private var initialRotation : Quaternion;
var rotationX : float;
var rotationY : float;

function Start () {
	initialRotation = transform.localRotation;
}

function Update () {
	transform.Translate(0.0F, 0.0F, Input.GetAxis("Vertical") * movementSpeed * Time.deltaTime);
	
	rotationX += ClampAngle(Input.GetAxis("Mouse X") * turnSpeed, -360, 360);
	rotationY += ClampAngle(Input.GetAxis("Mouse Y") * turnSpeed, -180, 180);
	var qx : Quaternion = Quaternion.AngleAxis(rotationX, Vector3.up);
	var qy : Quaternion = Quaternion.AngleAxis(rotationY, -Vector3.right);
	
	transform.localRotation = initialRotation * qx * qy;
}

function ClampAngle (angle : float, min : float, max: float)
{
     if (angle < -360F)
         angle += 360F;
     if (angle > 360F)
         angle -= 360F;
     return Mathf.Clamp (angle, min, max);
}