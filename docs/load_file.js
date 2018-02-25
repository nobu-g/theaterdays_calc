// サーバー上のbmsファイルを読み込む
class LoadTextFile {
    constructor(fileName) {
        this.bmsText = "ini";
        this.hasLoaded = false;
        this.xhr = this.createXMLHttpRequest();
        if (this.xhr)
        {
            this.xhr.open("GET", fileName, false);
            this.xhr.send(null);
            // this.xhr.abort();
        }
    }

    // HTTP通信用
    createXMLHttpRequest() {
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
                    return null;
                }
            }
        }
        if (xhr) {
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
                    document.getElementById("text1").innerText = 'interactive... ' + xhr.responseText.length + ' bytes.';
                    break;
                case 4: // データ受信完了.
                    if( xhr.status == 200 || xhr.status == 304 ) {
                        this.bmsText = xhr.responseText; // responseXML もあり
                        this.hasLoaded = true;
                        document.getElementById("text1").innerText = 'COMPLETE!';
                    } else {
                        document.getElementById("text1").innerText = 'Failed. HttpStatus: ' + xhr.statusText;
                    }
                    break;
                }
            };
        }

        return xhr;
    }


    get() {
        if (this.hasLoaded)
            return this.bmsText;
        else
            return "not loaded";
    }
}
