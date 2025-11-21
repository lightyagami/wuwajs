"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleSkillExtraEffectRhythmItem = undefined;
const UE = require("ue");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const BattleSkillExtraEffectItem_1 = require("./BattleSkillExtraEffectItem");
const BattleUiNiagaraItem_1 = require("./BattleUiNiagaraItem");
class BattleSkillExtraEffectRhythmItem extends BattleSkillExtraEffectItem_1.BattleSkillExtraEffectItem {
  constructor() {
    super(...arguments);
    this.Gca = undefined;
  }
  Init(t) {
    this.CreateByResourceIdAsync("UiItem_FightBtnRhythm", t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UINiagara]];
  }
  OnStart() {
    this.Gca = new BattleUiNiagaraItem_1.BattleUiNiagaraItem(this.GetUiNiagara(0));
    if (this.ExtraEffectDuration > 0) {
      this.Gca.Duration = this.ExtraEffectDuration * TimeUtil_1.TimeUtil.InverseMillisecond;
    }
    super.OnStart();
  }
  OnRefresh() {
    this.Gca?.Play();
  }
  Stop() {
    this.Gca?.Stop();
  }
}
exports.BattleSkillExtraEffectRhythmItem = BattleSkillExtraEffectRhythmItem;
//# sourceMappingURL=BattleSkillExtraEffectRhythmItem.js.map