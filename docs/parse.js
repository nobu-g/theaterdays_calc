/* bmsデータをパース */

function parse(bmsText) {

    var bmsData = new Array();

    bmsData = bmsText.split("\n");

    var mainData = new Array();
    // メインデータ部から#を取り除き、mainDataに格納
    for (bmsLine in bmsData) {
        if (bmsLine[0] == '#' && parseInt(bmsLine[1]) != NaN) {
            mainData.push(bmsLine.substring(1))
        }
    }


    

}
