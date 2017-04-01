#pragma strict
import System.Diagnostics;
import Mono.Data.Sqlite;
import System.Data;
import System;

private var server: Process;

function Awake() {
	try {
		server = new Process();
		server.StartInfo.WindowStyle = ProcessWindowStyle.Hidden;
        server.StartInfo.UseShellExecute = false;
        server.StartInfo.FileName = "python";
        server.StartInfo.Arguments = "../server.py";
        server.EnableRaisingEvents = true;
        server.Start();
        UnityEngine.Debug.Log("Server started");
	} catch (e) {
		UnityEngine.Debug.LogError(e);
	}
	
	makePostRequest();
}

function OnApplicationQuit() {
	server.Close();
}

function makePostRequest() {
	var form = new WWWForm();
    form.AddField("command", "search");
	form.AddField("arguments", "jojos bizarre adventure");
	
	var w = new WWW("http://127.0.0.1:5000", form);
	while (!w.isDone) {
		yield WaitForSeconds(0.1);
	}
	UnityEngine.Debug.Log(w.text);
	//makeSqlQuery();
}

function makeSqlQuery() {
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
	  UnityEngine.Debug.Log(url);
	}
	reader.Close();
	dbcmd.Dispose();
	dbconn.Close();
}