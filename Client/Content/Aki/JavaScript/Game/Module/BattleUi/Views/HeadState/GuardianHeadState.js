"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuardianHeadState = undefined;
const UE = require("ue");
const HeadStateViewBase_1 = require("./HeadStateViewBase");
class GuardianHeadState extends HeadStateViewBase_1.HeadStateViewBase {
  constructor() {
    super(...arguments);
    this.pnt = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UISprite]];
  }
  ActiveBattleHeadState(e) {
    super.ActiveBattleHeadState(e);
    this.RefreshHp();
    this.Hlt();
  }
  OnStart() {
    this.pnt = this.GetSprite(2).GetParentAsUIItem().GetWidth();
  }
  GetResourceId() {
    return "UiItem_GuardianState_Prefab";
  }
  OnHealthChanged() {
    this.RefreshHp(true);
  }
  RefreshHp(e = false) {
    var [t, s] = this.GetHpAndMaxHp();
    var t = t / s;
    this.Cst(t);
    if (e) {
      this.PlayBarAnimation(t);
    } else {
      this.StopBarLerpAnimation();
    }
  }
  Cst(e) {
    this.GetSprite(0).SetFillAmount(e);
  }
  OnBeginBarAnimation(e) {
    this.ast(e);
  }
  StopBarLerpAnimation() {
    super.StopBarLerpAnimation();
    this.GetSprite(1).SetUIActive(false);
  }
  OnLerpBarBufferPercent(e) {
    this.ast(e);
  }
  ast(e) {
    var t = this.GetSprite(1);
    t.SetFillAmount(e);
    if (!t.IsUIActiveSelf()) {
      t.SetUIActive(true);
    }
    var t = this.GetSprite(2);
    t.SetStretchLeft(this.pnt * this.CurrentBarPercent - 2);
    t.SetStretchRight(this.pnt * (1 - e) - 2);
  }
  Hlt() {
    var e = this.GetHpColor();
    if (e) {
      e = UE.Color.FromHex(e);
      this.GetSprite(0)?.SetColor(e);
    }
  }
  RefreshOnCampChanged() {
    this.Hlt();
  }
}
exports.GuardianHeadState = GuardianHeadState;
//# sourceMappingURL=GuardianHeadState.js.map