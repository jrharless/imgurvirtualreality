#pragma strict

/*
 * A global, static manager for transitioning between scenes and passing information between scenes.
 */
public static class GlobalSceneManager {
	public var categoryScene: String = "categories";
	public var tagScene: String = "tags";
	public var memeSeaScene: String = "memesea";

	enum State {Category, Tag, Memesea};
	private var currentState: State = State.Category;
	
	private var currentCategory: String;
	private var currentTag: String;
	
	public function enterCategory(category: String) {
		Debug.Log("Entering category: " + category);
	}
	
	public function enterTag(tag: String) {
		Debug.Log("Entering Tag: " + tag);
	}

	public function goBackAScene() {
		switch (currentState) {
		case State.Category:
			Debug.LogError("Can't go back any further!");
			break;
		case State.Tag:
			Debug.Log("Going back to Category scene");
			break;
		case State.Memesea:
			Debug.Log("Going back to Tag scene");
			break;
		}
		
	}

	public function getCurrentState() {
		return currentState;
	}
}