﻿#pragma strict

public var imageUrl: String = "http://orlando-politics.com/wp-content/uploads/2016/03/bernie-sanders.jpg";
public var loadImageOnStartup: boolean = false;

function Start () {
    if (loadImageOnStartup) {
    	startTextureDownload();
    }
    GetComponent.<Renderer>().material.color.a = 0;
}

function Update () {
	
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
	var renderer: Renderer = GetComponent.<Renderer>();
   	renderer.material.mainTexture = download.texture;
   	
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