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
    this.E1u = undefined;
    this.I1u = undefined;
    this.wBu = false;
  }
  RegisterGuideInterface(t) {
    this.I1u = t;
  }
  RegisterBehaviorTreeGuideData(t) {
    var i = t.EnableOperation.Type;
    this.E1u = PhantomArenaBattleGuideFactory_1.PhantomArenaBattleGuideFactory.GetGuideData(i, t);
    this.wBu = !t.IsTheLast;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "行为引导操作限制", ["Type", i], ["HasNextGuide", this.wBu]);
    }
  }
  CheckCanExecuteAndShowFailTips(t, ...i) {
    return !this.E1u && !this.wBu || (this.E1u || !this.wBu) && this.E1u.Type === t && !!this.E1u.CheckCanExecute(...i) || (this.ShowGuideTips(), false);
  }
  CheckInGuideAndShowTips() {
    return !!this.InGuiding && (this.ShowGuideTips(), true);
  }
  FinishCurrentGuide() {
    if (this.E1u && (this.E1u = undefined, this.I1u)) {
      this.I1u.FinishCurrentGuide();
      this.I1u = undefined;
    }
  }
  get InGuiding() {
    return this.E1u !== undefined || this.wBu;
  }
  ShowGuideTips() {
    if (this.E1u) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(this.E1u.Tips);
    } else if (this.wBu) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Text_BvBPlayerOperationForbidden_Text");
    }
  }
}
exports.PhantomArenaBattleGuideManager = PhantomArenaBattleGuideManager;
//# sourceMappingURL=PhantomArenaBattleGuideManager.js.map