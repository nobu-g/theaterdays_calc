// サーバー上のbmsファイルを読み込む
class LoadTextFile {
    constructor(fileName) {
        this.bmsText = "";
        this.hasLoaded = false;
        this.xhr = this.createXMLHttpRequest();
        if (this.xhr)
        {
            alert("in loadTextData before open");
            this.xhr.open("GET", fileName, false);
            this.xhr.send(null);
            // this.xhr.abort();
        }
    }

    // HTTP通信用
    createXMLHttpRequest()
    {
        var xhr = null;
        try{
            xhr = new XMLHttpRequest();
        }catch(e){
            try{
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            }catch(e){
                try{
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                }catch(e){
                    alert("objectnilllllllllllll");
                    return null;
                }
            }
        }
        if (xhr) {
            alert("objectexists");

            xhr.onreadystatechange = function() {
                switch ( xhr.readyState ) {
                case 0:
                    // 未初期化状態.
                    document.getElementById("text1").innerText = 'uninitialized!';
                    break;
                case 1: // データ送信中.
                    document.getElementById("text1").innerText = 'loading...';
                    break;
                case 2: // 応答待ち.
                    document.getElementById("text1").innerText = 'loaded.';
                    break;
                case 3: // データ受信中.
                    document.getElementById("text1").innerText = 'interactive... '+xhr.responseText.length+' bytes.';
                    break;
                case 4: // データ受信完了.
                    if( xhr.status == 200 || xhr.status == 304 ) {
                        var data = xhr.responseText; // responseXML もあり
                        document.getElementById("text1").innerText = 'COMPLETE! :'+data;
                    } else {
                        document.getElementById("text1").innerText = 'Failed. HttpStatus: '+xhr.statusText;
                    }
                    break;
                }
            }
        }
        else
            alert("objectnill");


        return xhr;
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
        return this.httpObj.readyState;
    }
}






function calc() {
    const loadTextFile = new LoadTextFile('data.txt');
    alert("before get");
    // alert("in calc");
    alert(loadTextFile.get());
}
