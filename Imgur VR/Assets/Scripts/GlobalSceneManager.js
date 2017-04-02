#pragma strict


/*
 * A global, static manager for transitioning between scenes and passing information between scenes.
 */
public static class GlobalSceneManager  {
	public var memeSeaScene: String = "memesea";
	public var input1 : String;
	public var input2 : String;
	public var input3: String;
	public var song: String;

	public function setsong(s0ng: String){
		song = s0ng;
		Debug.Log(song);
	}

	//Set inputstrings
	public function setMeme1(s1: String){
		input1 =s1;
		Debug.Log(input1);

	}
	public function setMeme2(s1: String){
		input2 =s1;
		Debug.Log(input2);

	}
	public function setMeme3(s1: String){
		input3 =s1;
		Debug.Log(input3);
	}

	public function goToMemeSea(){
		
		Debug.Log("Go To Next Screen");
		UnityEngine.SceneManagement.SceneManager.LoadScene(memeSeaScene);
	}

}