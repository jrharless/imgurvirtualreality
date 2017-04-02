#pragma strict

function rundis(data:int){
	var kids: UnityEngine.UI.Text[] = GetComponentsInChildren.<UnityEngine.UI.Text>() as UnityEngine.UI.Text[];

	Debug.Log(kids[9].text);
	GlobalSceneManager.setsong(kids[9].text);
	
}	
