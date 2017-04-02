#pragma strict

private var player: GameObject;

function Start () {
	player = GameObject.FindWithTag("Player");
}

function Update () {
	transform.LookAt(player.transform);
	transform.Rotate(0.0F, 0.0F, 180.0F);
	transform.rotation.eulerAngles.x = 180.0F;
}