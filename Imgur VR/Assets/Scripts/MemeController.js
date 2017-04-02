#pragma strict
/*
 * Load in and display a meme's texture. Spawn and display comments related to this meme.
 */

public var imageUrl: String = "http://orlando-politics.com/wp-content/uploads/2016/03/bernie-sanders.jpg";
public var loadImageOnStartup: boolean = false;
public var commentText: GameObject;
public var comments: String[];

function Start () {
	transform.Rotate(0, Random.Range(0, 360), 0);
    if (loadImageOnStartup) {
    	startTextureDownload();
    }
    GetComponent.<Renderer>().material.color.a = 0;
}

/*
 * Download the texture and set it when you're done.
 */
function startTextureDownload() {
	var download: WWW = new WWW(imageUrl);
	Debug.Log("Checking for texture...");
	while (!download.isDone) {
		yield WaitForSeconds(0.1);
	}
	
	// Slow part of the code, I think because it needs to finish "changing" textures before it
	// can display the next frame. How do we circumvent this?
	var renderer: Renderer = GetComponent.<Renderer>();
   	renderer.material.mainTexture = download.texture;
   	
   	var aspect: float = download.texture.width / download.texture.height;
   	transform.localScale.x *= aspect;
   	
   	// Spawn comments
   	for (var comment: String in comments) {
    	var pos: Vector3 = Random.onUnitSphere * GetComponent(Renderer).bounds.size.magnitude;
    	pos += transform.position;
    	var text: GameObject = Instantiate(commentText, pos, transform.rotation);
    	text.GetComponent.<TextMesh>().text = comment;
    }
   	
   	fade();
}

/*
 * Gradually fade the object in
 */
function fade() {
    while (GetComponent.<Renderer>().material.color.a != 1) {
    	GetComponent.<Renderer>().material.color.a += 0.01;
    	yield;
    }
}