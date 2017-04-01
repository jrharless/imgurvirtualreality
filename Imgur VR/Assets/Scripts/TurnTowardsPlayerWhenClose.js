#pragma strict

private var player: GameObject;
public var maxDistance: float = 8.0;
public var turnRatio: float = 0.6;

function Start () {
	player = GameObject.FindWithTag("Player");
}

function Update () {
	transform.LookAt(player.transform);
	transform.Rotate(180.0F, 0.0F, 180.0F);
}