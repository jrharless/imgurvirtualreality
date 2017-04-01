#pragma strict
private var browsingCategory: boolean = false;
private var activeCategory: Category = null;

function Start () {
	getActiveCategory();
}

function Update () {
	if (Input.GetButtonDown("Fire1") && activeCategory !== null) {
		Debug.Log("Zooming in...");
	}
}

function getActiveCategory() {
	while (true) {
		var fwd: Vector3 = transform.TransformDirection(Vector3.forward);
		var data: RaycastHit;
		if (Physics.Raycast(transform.position, fwd, data)) {
			var category: Category = data.collider.gameObject.GetComponent(Category);
			if (category !== null) {
				activeCategory = category;
				category.activate();
			}
		} else {
			var cats: Category[] = FindObjectsOfType(Category) as Category[];
			for (var cat: Category in cats) {
				cat.deactivate();
			}
			activeCategory = null;
		}
		yield WaitForSeconds(0.1);
	}
}