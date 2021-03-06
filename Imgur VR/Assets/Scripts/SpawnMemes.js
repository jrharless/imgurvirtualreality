#pragma strict
/**
 * Given a list of memes, spawn new memes at a set distance from the player.
 * As the player moves towards those memes, spawn new ones.
 */
import System.Collections.Generic;
import Mono.Data.Sqlite;
import System.Data;

// Meme object to spawn; should have a GimmeAMeme script
public var meme: GameObject;
// List of memes (currently a file) to choose from
public var memeList: TextAsset;
// Memes are spawned in a ring this far from the player
public var spawnDistance: float = 50.0F;
// Memes aren't spawned if the player doesn't move beyond this point
public var walkDistance: float = 1.0F;

public var progressText: UnityEngine.UI.Text;

// List of memes to work with
private var memeQueue : Queue.< String>;

function Start () {
	loadAndSpawnMemes();
}

private function SetProgressText(msg: String) {
	Debug.Log(msg);
	progressText.text = msg;
}

function loadAndSpawnMemes() {
	var arguments: String = "";
	arguments += GlobalSceneManager.input1 + " ";
	arguments += GlobalSceneManager.input2 + " ";
	arguments += GlobalSceneManager.input3;

	SetProgressText("Generating memes...");
	var form = new WWWForm();
    form.AddField("command", "search");
	form.AddField("arguments", arguments);
	
	var w = new WWW("http://127.0.0.1:5000", form);
	while (!w.isDone) {
		yield WaitForSeconds(0.1);
	}
	UnityEngine.Debug.Log(w.text);

	SetProgressText("Loading memes...");
	memeQueue = new Queue.< String>();
	// Stolen outright: http://answers.unity3d.com/questions/743400/database-sqlite-setup-for-unity.html
	var conn: String; //Path to database.
	var sqlQuery: String;
	var dbconn: IDbConnection;
	var dbcmd: IDbCommand;
	var reader: IDataReader;
	conn = "Data Source=../image_keyword1.sqlite;";
	dbconn = new SqliteConnection(conn) as IDbConnection;
	dbconn.Open(); //Open connection to the database.
	dbcmd = dbconn.CreateCommand();
	sqlQuery = "SELECT image_link FROM images";
	dbcmd.CommandText = sqlQuery;
	reader = dbcmd.ExecuteReader();
	while (reader.Read())
	{
	  var url: String = reader.GetString(0);
	  memeQueue.Enqueue(url);
	}
	reader.Close();
	dbcmd.Dispose();
	dbconn.Close();

	if (memeQueue.Count == 0) {
		SetProgressText("OH GOD PANIC");
		return;
	}

	youreDone();
	var lastPosition: Vector3;
	var distance: float;
	while (memeQueue.Count > 0) {
		// Spawn new memes at distance
		Debug.Log("Spawning new memes");
		var meme: GameObject;
		var offset: Vector3;
		var memeName: String = memeQueue.Dequeue();
		Debug.Log("Spawning: " + memeName);
		
		offset = Random.onUnitSphere * spawnDistance;
		offset.y = Random.Range(-8.0F, 8.0F);
		offset += transform.position;
		meme = Instantiate(this.meme, offset, Quaternion.identity);
		meme.GetComponent(MemeController).imageUrl = memeName;
		meme.GetComponent(MemeController).startTextureDownload();
		// Reset position, wait for distance to pass
		lastPosition = transform.position;
		do {
			distance = Vector3.Distance(transform.position, lastPosition);
			yield WaitForSeconds(0.1);
		} while (distance < walkDistance);
	}
}

private function youreDone() {
	SetProgressText("Done!");
	yield WaitForSeconds(0.5);
	SetProgressText("");
}