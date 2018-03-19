// ノーツ情報
class Note {
    constructor(beat, size, next) {
        this.beat = beat;
        this.size = size;   // 0: 通常ノーツ, 1: 大ノーツ, 2: 特大ノーツ
        this.next = next;
    }
}

// 楽曲情報
class MusicData {
    constructor(notes, bpm, level) {
        this.notes = notes;
        this.bpm = bpm;
        this.level = level;
    }
}

class ProcessedBmsLine {
    constructor(bar, body) {
        this.bar = bar;
        this.body = body;
    }
}

/* bmsデータをパース */
function parse(bmsText) {

    let mainData = new Array();
    let notes = new Array();
    let bpm;
    let level;

    let bmsData = new Array();
    bmsData = bmsText.split('\n');

    // メインデータ部から#を取り除き、mainDataに格納。BPM, levelを読み取り
    for (const bmsLine of bmsData) {
        if (bmsLine[0] == '#') {
            if (!isNaN(parseInt(bmsLine[1]))) {
                mainData.push(bmsLine.substring(1));
            } else if (bmsLine.substr(1, 3) == 'BPM') {
                bpm = parseInt(bmsLine.substring(5));
            } else if (bmsLine.substr(1, 9) == 'PLAYLEVEL') {
                level = parseInt(bmsLine.substring(11));
            }
        }
    }

    const availableChannels = [11, 12, 13, 14, 15, 18, 19];
    let processedMainData = new Array();
    for (const data of mainData) {
        const bar = parseInt(data.substring(0, 3));
        const channel = parseInt(data.substring(3, 5));
        const bodyString = data.substring(6);
        let body = new Array();
        for (let i = 0; i < bodyString.length / 2; i++) {
            body.push(bodyString.substring(i*2, i*2 + 2));
        }

        if (availableChannels.indexOf(channel) >= 0) {
            processedMainData.push(new ProcessedBmsLine(bar, body));
        }
    }

    let longNotes1 = new Array();
    let longNotes2 = new Array();
    for (const data of processedMainData) {
        const unitBeat = 4.0 / data.body.length;
        for (let i = 0; i < data.body.length; i++) {
            const beat = data.bar * 4.0 + unitBeat * i;
            switch (data.body[i]) {
            case '00':                                        break;
            case '01':      notes.push(new Note(beat, 0, 0)); break;
            case '02':      notes.push(new Note(beat, 0, 0)); break;
            case '03': longNotes1.push(new Note(beat, 0, 0)); break;
            case '04':                                        break;
            case '05': longNotes1.push(new Note(beat, 0, 0)); break;
            case '06': longNotes1.push(new Note(beat, 0, 0)); break;
            case '07': longNotes2.push(new Note(beat, 0, 0)); break;
            case '08':                                        break;
            case '09': longNotes2.push(new Note(beat, 0, 0)); break;
            case '0A': longNotes2.push(new Note(beat, 0, 0)); break;
            case '0B':      notes.push(new Note(beat, 1, 0)); break;
            case '0C': longNotes1.push(new Note(beat, 1, 0)); break;
            case '0D': longNotes1.push(new Note(beat, 1, 0)); break;
            case '0E': longNotes2.push(new Note(beat, 1, 0)); break;
            case '0F': longNotes2.push(new Note(beat, 1, 0)); break;
            case '0G':      notes.push(new Note(beat, 2, 0)); break;
            default: console.log('サポート外のノーツオブジェクト: ' + data.body[i]);
            }
        }
    }

    if (longNotes1.length % 2 == 1 || longNotes2.length % 2 == 1) {
        console.log('ロング開始ノーツと終了ノーツの数が一致しません');
        return new MusicData(notes, bpm, level);
    }

    // beatでソート
    longNotes1.sort(function(n1, n2) {
        if (n1.beat < n2.beat) return -1;
        if (n1.beat > n2.beat) return 1;
        return 0;
    });
    longNotes2.sort(function(n1, n2) {
        if (n1.beat < n2.beat) return -1;
        if (n1.beat > n2.beat) return 1;
        return 0;
    });

    for (let i = 0; i < longNotes1.length / 2; i++) {
        longNotes1[i * 2].next = longNotes1[i * 2 + 1];
        notes.push(longNotes1[i * 2]);
    }
    for (let i = 0; i < longNotes2.length / 2; i++) {
        longNotes2[i * 2].next = longNotes2[i * 2 + 1];
        notes.push(longNotes2[i * 2]);
    }

    notes.sort(function(n1, n2) {
        if (n1.beat < n2.beat) return -1;
        if (n1.beat > n2.beat) return 1;
        return 0;
    });

    // 最初のノーツが4拍目からスタートするように
    const beatDiff = notes[0].beat - 4;
    for (const note of notes) {
        note.beat -= beatDiff;
        if (note.next != 0) {
            note.next.beat -= beatDiff;
        }
    }

    return new MusicData(notes, bpm, level);
}
