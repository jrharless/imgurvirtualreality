#pragma strict

public var boxCollider: BoxCollider;

private var activated: boolean = false;

function activate() {
	if (!activated) {
		Debug.Log("Category activated");
		activated = true;
	}
}

function deactivate() {
	if (activated) {
		Debug.Log("Category deactivated");
		activated = false;
	}
}