"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBattleGuideManager = void 0;
const Log_1 = require("../../../../../Core/Common/Log"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  PhantomArenaBattleGuideFactory_1 = require("./PhantomArenaBattleGuideFactory");
class PhantomArenaBattleGuideManager {
  constructor(t) {
    this.Proxy = t, this.Anu = void 0, this.Pnu = void 0, this.Gmu = !1
  }
  RegisterGuideInterface(t) {
    this.Pnu = t
  }
  RegisterBehaviorTreeGuideData(t) {
    var i = t.EnableOperation.Type;
    this.Anu = PhantomArenaBattleGuideFactory_1.PhantomArenaBattleGuideFactory.GetGuideData(i, t), this.Gmu = !t.IsTheLast, Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "行为引导操作限制", ["Type", i], ["HasNextGuide", this.Gmu])
  }
  CheckCanExecuteAndShowFailTips(t, ...i) {
    return !this.Anu && !this.Gmu || (this.Anu || !this.Gmu) && this.Anu.Type === t && !!this.Anu.CheckCanExecute(...i) || (this.ShowGuideTips(), !1)
  }
  CheckInGuideAndShowTips() {
    return !!this.InGuiding && (this.ShowGuideTips(), !0)
  }
  FinishCurrentGuide() {
    this.Anu && (this.Anu = void 0, this.Pnu) && (this.Pnu.FinishCurrentGuide(), this.Pnu = void 0)
  }
  get InGuiding() {
    return void 0 !== this.Anu || this.Gmu
  }
  ShowGuideTips() {
    this.Anu ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(this.Anu.Tips) : this.Gmu && ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Text_BvBPlayerOperationForbidden_Text")
  }
}
exports.PhantomArenaBattleGuideManager = PhantomArenaBattleGuideManager;
//# sourceMappingURL=PhantomArenaBattleGuideManager.js.map