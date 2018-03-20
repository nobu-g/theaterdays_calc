// サーバー上のbmsファイルを読み込む
function loadTextFile(fileName) {
    const xhr = createXMLHttpRequest();
    if (xhr)
    {
        xhr.open('GET', fileName, false);
        xhr.send(null);
    }
}

// HTTP通信用
function createXMLHttpRequest() {
    let xhr = null;
    try {
        xhr = new XMLHttpRequest();
    } catch(e) {
        try {
            xhr = new ActiveXObject('Msxml2.XMLHTTP');
        } catch(e) {
            try {
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            } catch(e) {
                return null;
            }
        }
    }
    if (xhr) {
        xhr.onreadystatechange = function() {
            switch ( xhr.readyState ) {
            case 0:
                // 未初期化状態.
                console.log('uninitialized!');
                break;
            case 1: // データ送信中.
                console.log('loading...');
                break;
            case 2: // 応答待ち.
                console.log('loaded.');
                break;
            case 3: // データ受信中.
                console.log('interactive... ' + xhr.responseText.length + ' bytes.');
                break;
            case 4: // データ受信完了.
                if( xhr.status == 200 || xhr.status == 304 ) {
                    const bmsText = xhr.responseText;
                    const musicData = window.parse(bmsText);
                    window.calc(musicData.notes, musicData.bpm, musicData.level);
                    console.log('COMPLETE!');
                } else {
                    console.log('Failed. HttpStatus: ' + xhr.statusText);
                }
                break;
            }
        };
    }

    return xhr;
}
