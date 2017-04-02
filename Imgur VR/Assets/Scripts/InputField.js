#pragma strict
import UI.InputField;
import UI.Text;	
public function onDeselect(data:String) {
	var kids: UnityEngine.UI.Text[] = GetComponentsInChildren.<UnityEngine.UI.Text>() as UnityEngine.UI.Text[];
	//var kids: InputField[] = GetComponentsInChildren(InputField) as InputField[];
	var s1 : String = "";
	var s2 : String = "";
	var s3 : String = "";
	switch (data) {
	case "meme1":
		Debug.Log(kids[3].text);

		if (kids[3].text != "Enter Search"){
			s1 = kids[3].text;
			GlobalSceneManager.setMeme1(s1);
		}

		break;
	case "meme2":
		Debug.Log(kids[5].text);

		if (kids[5].text != "Enter Search"){
			s2 = kids[5].text;
			GlobalSceneManager.setMeme2(s2);
		}

		break;
	case "meme3":
		Debug.Log(kids[7].text);

		if (kids[7].text != "Enter Search"){
			s3 = kids[7].text;
			GlobalSceneManager.setMeme3(s3);
		}

		break;
	}



		
}
