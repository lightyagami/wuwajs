"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleSkillDotIndicatorItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const BattleUiTweenAnimPlayer_1 = require("./BattleUiTweenAnimPlayer");
class SkillButtonDotIndicator extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Eah = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
  }
  OnStart() {
    this.SkipDestroyActor = true;
    this.Est(1);
    this.Est(2);
    this.SetUiActive(true);
    this.GetItem(0).SetUIActive(false);
  }
  Est(t) {
    this.Eah ||= new BattleUiTweenAnimPlayer_1.BattleUiTweenAnimPlayer();
    this.Eah.InitTweenAnim(t, this.GetItem(t));
  }
  SetDotState(t, e = false) {
    if (e) {
      const s = this.GetItem(0);
      s.SetUIActive(t);
      s.SetAlpha(t ? 1 : 0);
    } else if (this.Eah) {
      const s = this.GetItem(0);
      var e = s.bIsUIActive && s.GetAlpha() === 1;
      var i = !s.bIsUIActive || s.GetAlpha() === 0;
      if ((!t || !e) && (!!t || !i)) {
        if (!s.bIsUIActive) {
          s.SetUIActive(true);
        }
        this.Eah.StopTweenAnim(t ? 2 : 1);
        this.Eah.PlayTweenAnim(t ? 1 : 2);
      }
    }
  }
}
class BattleSkillDotIndicatorItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.uzu = [];
    this.dce = false;
    this.HPt = 0;
    this.CreateByResourceIdAsync(this.C5g(), t);
  }
  C5g() {
    return "UiItem_LuhesSkillPoint";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 96, "BattleSkillDotIndicatorItem Init");
    }
    for (let t = 0; t <= 2; t++) {
      var e = this.GetItem(t);
      var i = new SkillButtonDotIndicator();
      await i.CreateByActorAsync(e.GetOwner());
      this.uzu.push(i);
    }
    this.SetUiActive(this.dce);
    this.SetCount(this.HPt, true);
  }
  get IsComponentActive() {
    return this.dce;
  }
  SetComponentActive(t) {
    if (this.dce !== t) {
      this.SetUiActive(t);
    }
    this.dce = t;
  }
  SetCount(e, i = false) {
    if ((this.HPt !== e || i) && (this.HPt = e, this.GetActive() || i)) {
      for (let t = 0; t < this.uzu.length; t++) {
        this.uzu[t].SetDotState(t < e, i);
      }
    }
  }
  OnBeforeDestroy() {
    this.uzu.length = 0;
  }
}
exports.BattleSkillDotIndicatorItem = BattleSkillDotIndicatorItem;
//# sourceMappingURL=BattleSkillDotIndicatorItem.js.map