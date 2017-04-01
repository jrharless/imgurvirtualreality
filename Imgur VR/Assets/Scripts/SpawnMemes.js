#pragma strict
/**
 * Given a list of memes, spawn new memes at a set distance from the player.
 * As the player moves towards those memes, spawn new ones.
 */
import System.Collections.Generic;

// Meme object to spawn; should have a GimmeAMeme script
public var meme: GameObject;
// List of memes (currently a file) to choose from
public var memeList: TextAsset;
// Number of memes to spawn
public var minMemes: int = 2;
public var maxMemes: int = 6;
// Memes are spawned in a ring this far from the player
public var spawnDistance: float = 50.0F;
// Memes aren't spawned if the player doesn't move beyond this point
public var walkDistance: float = 5.0F;

private var memeQueue : Queue.< String>;

function Start () {
	memeQueue = new Queue.< String>();

	var urls = memeList.text.Split("\n"[0]);
	for (var url: String in urls) {
		memeQueue.Enqueue(url);
	}
	
//	for (var url : String in urls) {
//		var offset: Vector3;
//		offset.Set(
//			Random.Range(spawnField.min.x, spawnField.max.x),
//			Random.Range(spawnField.min.y, spawnField.max.y),
//			Random.Range(spawnField.min.z, spawnField.max.z)
//		);
//		
//		var newMeme : GameObject = Instantiate(meme, offset, Quaternion.identity);
//		newMeme.transform.Translate(offset);
//		newMeme.GetComponent(GimmeAMeme).imageUrl = url;
//		newMeme.GetComponent(GimmeAMeme).startTextureDownload();
//	}
	
	spawnNewMemesAsNeeded();
}

function Update () {

}

/**
 * Spawn memes as a coroutine
 */
function spawnNewMemesAsNeeded() {
	var lastPosition: Vector3;
	var distance: float;
	while (true) {
		// Spawn new memes at distance
		Debug.Log("Spawning new memes");
		var memesToSpawn: int = Random.Range(minMemes, maxMemes);
		if (memesToSpawn > memeQueue.Count) {
			Debug.Log("Meme queue empty");
			break;
		}
		
		for (var i=0; i<memesToSpawn; i++) {
			var meme: GameObject;
			var offset: Vector3;
			var memeName: String = memeQueue.Dequeue();
			Debug.Log("Spawning: " + memeName);
			
			offset = Random.onUnitSphere * spawnDistance;
			offset.y = Random.Range(-8.0F, 8.0F);
			offset += transform.position;
			meme = Instantiate(this.meme, offset, Quaternion.identity);
			meme.GetComponent(GimmeAMeme).imageUrl = memeName;
			meme.GetComponent(GimmeAMeme).startTextureDownload();
		}
		// Reset position, wait for distance to pass
		lastPosition = transform.position;
		do {
			distance = Vector3.Distance(transform.position, lastPosition);
			yield WaitForSeconds(0.1);
		} while (distance < walkDistance);
	}
}