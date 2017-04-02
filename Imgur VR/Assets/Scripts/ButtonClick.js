#pragma strict
//import UnityEngine.UI.Button;
//import GlobalSceneManager;
//public class ClickExample extends MonoBehaviour {
//	public var yourButton: UnityEngine.UI.Button;
//	function Start() {
//		var btn: UnityEngine.UI.Button = yourButton.GetComponent.<UnityEngine.UI.Button>();
//		btn.onClick.AddListener(TaskOnClick);
//	}
//	function TaskOnClick() {
//		Debug.Log("You have clicked the button!");
//		
//	}
//}

function TaskOnClick() {
	GlobalSceneManager.goToMemeSea();
	Debug.Log("You have clicked the button!");
}