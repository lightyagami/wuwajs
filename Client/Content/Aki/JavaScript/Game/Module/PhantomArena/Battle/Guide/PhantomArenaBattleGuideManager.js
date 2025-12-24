"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleGuideManager = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const PhantomArenaBattleGuideFactory_1 = require("./PhantomArenaBattleGuideFactory");
class PhantomArenaBattleGuideManager {
  constructor(i) {
    this.Proxy = i;
    this.E1u = undefined;
    this.I1u = undefined;
    this.wBu = false;
  }
  RegisterGuideInterface(i) {
    this.I1u = i;
  }
  RegisterBehaviorTreeGuideData(i) {
    var t = i.EnableOperation.Type;
    this.E1u = PhantomArenaBattleGuideFactory_1.PhantomArenaBattleGuideFactory.GetGuideData(t, i);
    this.wBu = !i.IsTheLast;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "行为引导操作限制", ["Type", t], ["HasNextGuide", this.wBu]);
    }
  }
  CheckCanExecuteAndShowFailTips(i, ...t) {
    return !this.E1u && !this.wBu || (this.E1u || !this.wBu) && this.E1u.Type === i && !!this.E1u.CheckCanExecute(...t) || (this.ShowGuideTips(), false);
  }
  CheckInGuideAndShowTips() {
    return !!this.InGuiding && (this.ShowGuideTips(), true);
  }
  FinishCurrentGuide() {
    if (this.E1u && (Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "行为引导操作限制完成", ["Type", this.E1u.Type], ["HasNextGuide", this.wBu]), this.E1u = undefined, this.I1u)) {
      this.I1u.FinishCurrentGuide();
      this.I1u = undefined;
    }
  }
  TryExitCurrentGuide() {
    if (this.E1u && this.I1u) {
      this.I1u.ExitCurrentGuide();
      this.I1u = undefined;
    }
  }
  TryCacheGuideData(i, ...t) {
    if (this.E1u && this.E1u.Type === i) {
      this.E1u.CacheGuideData(...t);
    }
  }
  TryFinishGuideByType(i, ...t) {
    if (this.E1u && this.E1u.Type === i && this.E1u.CheckCanFinishGuide(...t)) {
      this.FinishCurrentGuide();
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