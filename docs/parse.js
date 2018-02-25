/* bmsデータをパース */
function parse(bmsText) {

    var bmsData = new Array();

    bmsData = bmsText.split("\n");

    var mainData = new Array();
    // メインデータ部から#を取り除き、mainDataに格納
    for (const bmsLine of bmsData) {
        if (bmsLine[0] == '#' && !isNaN(parseInt(bmsLine[1]))) {
            mainData.push(bmsLine.substring(1));
        }
    }


    return "testnotes";


}
