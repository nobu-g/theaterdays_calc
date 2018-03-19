// スキル情報を保持
class SkillData {
    constructor(id) {
        this.interval    = $('#' + id + ' input[name="interval"]'   ).val();
        this.probability = $('#' + id + ' input[name="probability"]').val();
        this.duration    = $('#' + id + ' input[name="duration"]'   ).val();
        this.target      = $('#' + id + ' select option:selected'   ).val();
        this.rate        = $('#' + id + ' input[name="rate"]'       ).val();
    }
}

// 設定項目を保持
class Config {
    constructor() {
        this.skill1 = new SkillData('skill1');
        this.skill2 = new SkillData('skill2');
        this.skill3 = new SkillData('skill3');
        this.skill4 = new SkillData('skill4');
        this.skill5 = new SkillData('skill5');
        this.appeal = $('#appeal input').val();
    }
}

// スキルデータと合計アピール値を保存
function storeConfig() {
    localStorage.setItem('config', JSON.stringify(new Config()));
}

function setConfig() {

    const set = function(skill, id) {
        $('#' + id + ' input[name="interval"]'   ).val(skill.interval);
        $('#' + id + ' input[name="probability"]').val(skill.probability);
        $('#' + id + ' input[name="duration"]'   ).val(skill.duration);
        $('#' + id + ' select'                   ).val(skill.target);
        $('#' + id + ' input[name="rate"]'       ).val(skill.rate);
    };

    const jsonText = localStorage.getItem('config');
    if (jsonText != null) {
        const config = JSON.parse(jsonText);
        set(config.skill1, 'skill1');
        set(config.skill2, 'skill2');
        set(config.skill3, 'skill3');
        set(config.skill4, 'skill4');
        set(config.skill5, 'skill5');
        $('#appeal input').val(config.appeal);
    }
}
