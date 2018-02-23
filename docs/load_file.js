// サーバー上のbmsファイルを読み込む
function loadTextFile(fileName)
{
	httpObj = createXMLHttpRequest(displayData);
	if (httpObj)
	{
		httpObj.open("GET", fileName, true);
        alert("in loadTextData after open");
		httpObj.send(null);
	}
}

// HTTP通信用
function createXMLHttpRequest(cbFunc)
{
	var XMLhttpObject = null;
	try{
		XMLhttpObject = new XMLHttpRequest();
	}catch(e){
		try{
			XMLhttpObject = new ActiveXObject("Msxml2.XMLHTTP");
		}catch(e){
			try{
				XMLhttpObject = new ActiveXObject("Microsoft.XMLHTTP");
			}catch(e){
				return null;
			}
		}
	}
	if (XMLhttpObject) XMLhttpObject.onreadystatechange = cbFunc;
	return XMLhttpObject;
}

// XMLHttpRequest のステータスが変わるごとに複数回呼ばれる
function displayData()
{
	if ((httpObj.readyState == 4) && (httpObj.status == 200))
	{
		document.getElementById("text1").innerText = httpObj.responseText;
        alert("in displayData");
	}else{
		document.getElementById("text1").innerText = "Loading...";
	}
}
