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
public var minMemes: int = 6;
public var maxMemes: int = 12;
// Memes are spawned in a ring this far from the player
public var spawnDistance: float = 15.0F;
public var spawnDistanceVariance: float = 0.5F;
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
			Debug.Log("Spawning: " + memeQueue.Dequeue());
		}
		// Reset position, wait for distance to pass
		lastPosition = transform.position;
		do {
			distance = Vector3.Distance(transform.position, lastPosition);
			Debug.Log(distance);
			yield WaitForSeconds(0.1);
		} while (distance < walkDistance);
	}
}