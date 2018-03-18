
function simulate(notes, BPM, level) {

    let allNotes = new Array();     // ロング終端も含めた全ノーツ配列
    for (const note of notes) {
        allNotes.push(note);
        if (note.next != 0) {
            allNotes.push(note.next);
        }
    }

    const notesNum = allNotes.length;       // 総ノーツ数(最大コンボ数と一致)
    let weightedNotesNum = 0;               // 重み付きノーツ数
    for (const note of allNotes) {
        switch (note.size) {
        case 0: weightedNotesNum += 1;  break;
        case 1: weightedNotesNum += 2;  break;
        case 2: weightedNotesNum += 10; break;
        }
    }
    for (const note of notes) {
        if (note.next != 0) {
            const second = (note.next.beat - note.beat) / BPM * 60;
            weightedNotesNum += second * 2;     // ロングノーツは1秒あたり重み2として加算
        }
    }

    const appeal = parseInt(document.getElementById('appeal').value);   // 合計アピール値
    const basicScore = appeal * (33 + level) / 20;          // 基準スコア
    // 以下の2つの値によりスコアが計算される
    const s = basicScore * 0.7 / weightedNotesNum;          // 小タップノーツの基本スコア
    const c = basicScore * 0.3 / (2 * notesNum - 66);       // コンボボーナス基本値
    

    // 実際にシミュレーション
    for (const note of notes) {
        const second = note.beat / BPM * 60;
    }
}
