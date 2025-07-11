"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DurabilityHeadState = undefined;
const UE = require("ue");
const HeadStateViewBase_1 = require("./HeadStateViewBase");
class DurabilityHeadState extends HeadStateViewBase_1.HeadStateViewBase {
  constructor() {
    super(...arguments);
    this.pnt = -0;
    this.Qlt = t => {
      this.Xlt(true);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UISprite]];
  }
  GetResourceId() {
    return "UiItem_DestructionState_Prefab";
  }
  ActiveBattleHeadState(t) {
    super.ActiveBattleHeadState(t);
    if (t.OriginalHp) {
      this.CurrentBarPercent = t.OriginalHp / this.GetMaxHp();
    }
    this.Xlt(true);
  }
  OnStart() {
    this.pnt = this.GetSprite(2).GetParentAsUIItem().GetWidth();
  }
  BindCallback() {
    super.BindCallback();
    this.HeadStateData.BindOnSceneItemDurabilityChange(this.Qlt);
  }
  Xlt(t = false) {
    var e = this.GetHp();
    var i = e / this.GetMaxHp();
    this.Cst(i);
    if (t) {
      this.PlayBarAnimation(i);
    } else {
      this.StopBarLerpAnimation();
    }
    this.HeadStateData?.SetOriginalHp(e);
  }
  Cst(t) {
    this.GetSprite(0).SetFillAmount(t);
  }
  OnBeginBarAnimation(t) {
    this.ast(t);
  }
  StopBarLerpAnimation() {
    super.StopBarLerpAnimation();
    this.GetSprite(1).SetUIActive(false);
  }
  OnLerpBarBufferPercent(t) {
    this.ast(t);
  }
  ast(t) {
    var e = this.GetSprite(1);
    e.SetFillAmount(t);
    if (!e.IsUIActiveSelf()) {
      e.SetUIActive(true);
    }
    var e = this.GetSprite(2);
    e.SetStretchLeft(this.pnt * this.CurrentBarPercent - 2);
    e.SetStretchRight(this.pnt * (1 - t) - 2);
  }
  GetMaxHp() {
    return this.HeadStateData.GetMaxDurable();
  }
  GetHp() {
    return this.HeadStateData.GetDurable();
  }
}
exports.DurabilityHeadState = DurabilityHeadState;
//# sourceMappingURL=DurabilityHeadState.js.map