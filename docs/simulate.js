// スコアアップスキル
class ScoreUp {
    constructor(id) {
        this.interval    = parseInt($('#' + id + ' input[name="interval"]'   ).val());
        this.probability = parseInt($('#' + id + ' input[name="probability"]').val()) / 100;
        this.duration    = parseInt($('#' + id + ' input[name="duration"]'   ).val());
        this.rate        = parseInt($('#' + id + ' input[name="rate"]'       ).val()) / 100;
    }
}

// コンボボーナススキル
class ComboBonus {
    constructor(id) {
        this.interval    = parseInt($('#' + id + ' input[name="interval"]'   ).val());
        this.probability = parseInt($('#' + id + ' input[name="probability"]').val()) / 100;
        this.duration    = parseInt($('#' + id + ' input[name="duration"]'   ).val());
        this.rate        = parseInt($('#' + id + ' input[name="rate"]'       ).val()) / 100;
    }
}

// スコア上昇系スキルの効果を扱う
class SkillEffect {
    constructor() {
        this.scoreUps = new Array();
        this.comboBonuses = new Array();

        for (let i = 1; i <= 5; i++) {
            switch ($('#skill' + i + ' select option:selected').val()) {
            case '':
                alert('スキル' + i + 'は無視されます。');
                break;
            case 'score1':
            case 'score2':
                this.scoreUps.push(new ScoreUp('skill' + i));
                break;
            case 'combo':
                this.comboBonuses.push(new ComboBonus('skill' + i));
                break;
            case 'other':
                break;
            default:
                console.log('セレクトボックスのvalueが不正です。');
            }
        }

    }
}

function simulate(notes, bpm, level) {

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
            const second = (note.next.beat - note.beat) / bpm * 60;
            weightedNotesNum += second * 2;     // ロングノーツは1秒あたり重み2として加算
        }
    }

    const appeal = parseInt($('#appeal input').val());      // 合計アピール値
    const basicScore = appeal * (33 + level) / 20;          // 基準スコア
    // 以下の2つの値によりスコアが計算される
    const s = basicScore * 0.7 / weightedNotesNum;          // 小タップノーツの基本スコア
    const c = basicScore * 0.3 / (2 * notesNum - 66);       // コンボボーナス基本値

    // スキル
    const skillEffect = new SkillEffect();
    // 実際にシミュレーション
    for (const note of notes) {
        const second = note.beat / bpm * 60;
    }
}
