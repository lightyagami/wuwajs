"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleSkillExtraEffectItem = undefined;
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class BattleSkillExtraEffectItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.TargetVisible = false;
    this.ExtraEffectDuration = 0;
    this.EffectType = 0;
  }
  SetEffectType(t) {
    this.EffectType = t;
  }
  GetEffectType() {
    return this.EffectType;
  }
  Init(t) {}
  SetComponentActive(t) {
    this.TargetVisible = t;
    if (!this.InAsyncLoading()) {
      this.SetActive(t);
    }
  }
  Refresh(t) {
    this.ExtraEffectDuration = t;
    if (!this.InAsyncLoading()) {
      this.OnRefresh();
    }
  }
  OnRefresh() {}
  OnStart() {
    if (this.TargetVisible) {
      this.Show();
    }
  }
  OnBeforeShow() {
    this.OnRefresh();
  }
  Stop() {}
}
exports.BattleSkillExtraEffectItem = BattleSkillExtraEffectItem;
//# sourceMappingURL=BattleSkillExtraEffectItem.js.map