// スコアアップ系スキル
class Skill {
    constructor(id) {
        this.interval    = parseInt($('#' + id + ' input[name="interval"]'   ).val());
        this.probability = parseInt($('#' + id + ' input[name="probability"]').val()) / 100;
        this.duration    = parseInt($('#' + id + ' input[name="duration"]'   ).val());
        this.rate        = parseInt($('#' + id + ' input[name="rate"]'       ).val()) / 100;
    }

    // スキル効果による倍率を返す
    effect(second) {
        const mod = second - Math.floor(second / this.interval) * this.interval;
        // スキル発動期間中なら倍率を返す
        if (mod < this.duration) {
            return this.rate;
        } else {
            return 0;
        }
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
                this.scoreUps.push(new Skill('skill' + i));
                break;
            case 'combo':
                this.comboBonuses.push(new Skill('skill' + i));
                break;
            case 'other':
                break;
            default:
                console.log('セレクトボックスのvalueが不正です。');
            }
        }
    }

    // 時刻に応じたスコアアップ倍率を返す
    scoreUp(second) {
        const effects = this.scoreUps.map(skill => skill.effect(second));
        return Math.max.apply(null, effects) + 1;           // 発動しているスキルの中から最も効果の高いものを適用
    }

    // 時刻に応じたコンボアップ倍率を返す
    comboUp(second) {
        const effects = this.scoreUps.map(skill => skill.effect(second));
        return Math.max.apply(null, effects) * 3 + 1;       // 発動しているスキルの中から最も効果の高いものを適用
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
    allNotes.sort(function(n1, n2) {
        if (n1.beat < n2.beat) return -1;
        if (n1.beat > n2.beat) return 1;
        return 0;
    });

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

    /* 実際にシミュレーション */

    let score = 0;                  // これから計算するスコア
    const sizeFactor = [1, 2, 10];  // ノーツ倍率
    // まずは単ノーツのスコアを加算
    for (let i = 0; i < allNotes.length; i++) {
        const note = allNotes[i];               // エイリアス
        const second = note.beat / bpm * 60;    // noteが判定される時間

        const judgeFactor = 1.0;    // 常にPerfect判定を仮定
        // 各種倍率を考慮してスコアを加算
        score += s * sizeFactor[note.size] * judgeFactor * skillEffect.scoreUp(second)
               + c * comboFactor(i + 1) * skillEffect.comboUp(second);
    }
    // 次にロングノーツのスコアを秒区切りで加算
    for (const note of notes) {
        if (note.next != 0) {
            const startTime = note.beat / bpm * 60;
            const endTime = note.next.beat / bpm * 60;
            let ceilTime = Math.ceil(startTime);
            if (ceilTime < endTime) {               // ロングノーツが秒をまたぐとき
                score += (ceilTime - startTime) * 2 * s * skillEffect.scoreUp(startTime);
                while (ceilTime + 1 < endTime) {
                    score += 2 * s * skillEffect.scoreUp(ceilTime);
                    ceilTime ++;
                }
                score += (endTime - ceilTime) * 2 * s * skillEffect.scoreUp(ceilTime);
            } else {                            // 一つの秒区間の中に始点と終点があるとき
                score += (endTime - startTime) * 2 * s * skillEffect.scoreUp(startTime);
            }
        }
    }

    alert(score);
}

// コンボ倍率を返す
function comboFactor(combo) {
    if      ( 1  <= combo && combo < 10 ) return 0.0;
    else if ( 10 <= combo && combo < 30 ) return 1.0;
    else if ( 30 <= combo && combo < 50 ) return 1.3;
    else if ( 50 <= combo && combo < 70 ) return 1.6;
    else if ( 70 <= combo && combo < 100) return 1.8;
    else if (100 <= combo               ) return 2.0;

    return 0;
}
