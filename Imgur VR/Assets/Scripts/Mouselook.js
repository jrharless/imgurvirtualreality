#pragma strict

// Mouselook code from answers.unity3d.com/questions/29741/mouse-look-script.html
public var turnSpeed: float = 15.0F;
public var minX: float = -60.0F;
public var maxX: float = 60.0F;
public var minY: float = -60.0F;
public var maxY: float = 60.0F;
private var initialRotation : Quaternion;
private var rotationX : float;
private var rotationY : float;

function Start() {
	initialRotation = transform.localRotation;
}

function Update() {
	rotationX = ClampAngle(rotationX + Input.GetAxis("Mouse X") * turnSpeed, minX, maxX);
	rotationY = ClampAngle(rotationY + Input.GetAxis("Mouse Y") * turnSpeed, minY, maxY);
	var qx : Quaternion = Quaternion.AngleAxis(rotationX, Vector3.up);
	var qy : Quaternion = Quaternion.AngleAxis(rotationY, -Vector3.right);
	
	transform.localRotation = initialRotation * qx * qy;
}

function ClampAngle (angle : float, min : float, max: float) {
     if (angle < -360F)
         angle += 360F;
     if (angle > 360F)
         angle -= 360F;
     return Mathf.Clamp (angle, min, max);
}