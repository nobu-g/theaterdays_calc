// サーバー上のbmsファイルを読み込む
class LoadTextFile {
    constructor(fileName) {
        this.bmsText = "";
        this.hasLoaded = false;
        this.httpObj = this.createXMLHttpRequest();
        if (this.httpObj)
        {
            alert("in loadTextData before open");
            this.httpObj.open("GET", fileName, true);
            this.httpObj.send(null);
        }
    }

    // HTTP通信用
    createXMLHttpRequest()
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
                    alert("objectnilllllllllllll");
                    return null;
                }
            }
        }
        if (XMLhttpObject) {
            XMLhttpObject.onreadystatechange = this.displayData;
            alert("objectexists");
        }
        else
            alert("objectnill");


        return XMLhttpObject;
    }

    // XMLHttpRequest のステータスが変わるごとに複数回呼ばれる
    displayData()
    {
        if ((this.httpObj.readyState == 4) && (this.httpObj.status == 200))
        {
            document.getElementById("text1").innerText = this.httpObj.responseText;
            this.bmsText = this.httpObj.responseText
            alert("loaded");
        }else{
            document.getElementById("text1").innerText = "Loading...";
        }
        alert("hasLoaded");
    }


    get()
    {
        return this.httpObj.responseText;
    }
}






function calc() {
    const loadTextFile = new LoadTextFile('data.txt');
    alert("before get");
    // alert("in calc");
    alert(loadTextFile.get());
}
