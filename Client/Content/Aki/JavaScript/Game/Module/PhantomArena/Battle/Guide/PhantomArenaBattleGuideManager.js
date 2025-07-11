"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleGuideManager = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const PhantomArenaBattleGuideFactory_1 = require("./PhantomArenaBattleGuideFactory");
class PhantomArenaBattleGuideManager {
  constructor(t) {
    this.Proxy = t;
    this.F_u = undefined;
    this.N_u = undefined;
    this.HDu = false;
  }
  RegisterGuideInterface(t) {
    this.N_u = t;
  }
  RegisterBehaviorTreeGuideData(t) {
    var i = t.EnableOperation.Type;
    this.F_u = PhantomArenaBattleGuideFactory_1.PhantomArenaBattleGuideFactory.GetGuideData(i, t);
    this.HDu = !t.IsTheLast;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "行为引导操作限制", ["Type", i], ["HasNextGuide", this.HDu]);
    }
  }
  CheckCanExecuteAndShowFailTips(t, ...i) {
    return !this.F_u && !this.HDu || (this.F_u || !this.HDu) && this.F_u.Type === t && !!this.F_u.CheckCanExecute(...i) || (this.ShowGuideTips(), false);
  }
  CheckInGuideAndShowTips() {
    return !!this.InGuiding && (this.ShowGuideTips(), true);
  }
  FinishCurrentGuide() {
    if (this.F_u && (this.F_u = undefined, this.N_u)) {
      this.N_u.FinishCurrentGuide();
      this.N_u = undefined;
    }
  }
  get InGuiding() {
    return this.F_u !== undefined || this.HDu;
  }
  ShowGuideTips() {
    if (this.F_u) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(this.F_u.Tips);
    } else if (this.HDu) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Text_BvBPlayerOperationForbidden_Text");
    }
  }
}
exports.PhantomArenaBattleGuideManager = PhantomArenaBattleGuideManager;
//# sourceMappingURL=PhantomArenaBattleGuideManager.js.map