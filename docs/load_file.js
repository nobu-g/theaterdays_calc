// サーバー上のbmsファイルを読み込む
class LoadTextFile {
    constructor(fileName) {
        let hasLoaded = false;
        let httpObj = this.createXMLHttpRequest(this.displayData);
        if (httpObj)
        {
            alert("in loadTextData before open");
            httpObj.open("GET", fileName, true);
            httpObj.send(null);
        }
    }

    // HTTP通信用
    createXMLHttpRequest(cbFunc)
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
    displayData()
    {
        if ((this.httpObj.readyState == 4) && (this.httpObj.status == 200))
        {
            document.getElementById("text1").innerText = this.httpObj.responseText;
            this.hasLoaded = true;
            alert("loaded");
        }else{
            document.getElementById("text1").innerText = "Loading...";
        }
        alert("hasLoaded");
    }

}





function calc() {
    const loadTextFile = new LoadTextFile("data.txt");

    alert("in calc");
}