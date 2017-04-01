#pragma strict

public var spawnField: Bounds = new Bounds(new Vector3(-5, -1, -5), new Vector3(5, 1, 5));
public var urls: String[];
public var meme: GameObject;

function Start () {
	for (var url : String in urls) {
		var offset: Vector3;
		offset.Set(
			Random.Range(spawnField.min.x, spawnField.max.x),
			Random.Range(spawnField.min.y, spawnField.max.y),
			Random.Range(spawnField.min.z, spawnField.max.z)
		);
		
		var newMeme : GameObject = Instantiate(meme, offset, Quaternion.identity);
		newMeme.transform.Translate(offset);
		newMeme.GetComponent(GimmeAMeme).imageUrl = url;
		newMeme.GetComponent(GimmeAMeme).startTextureDownload();
	}
}

function Update () {

}