#pragma strict

public var alphaLevelByDistance: AnimationCurve;

private var player: Transform;
private var text: TextMesh;

function Start () {
	var playerObject = GameObject.FindWithTag("Player");
	player = playerObject.GetComponent(Transform);
	text = GetComponent(TextMesh);
}

function Update () {
	// Set opacity by distance
	var distance: float = Vector3.Distance(transform.position, player.position);
	var alpha: float = alphaLevelByDistance.Evaluate(distance);
	text.color.a = alpha;
}

function SetText(message: String) {
	text.text = message;
}