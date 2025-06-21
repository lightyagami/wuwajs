"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBattleFloatTips = void 0;
const UE = require("ue"),
  TickSystem_1 = require("../../../../../../Core/Tick/TickSystem"),
  TimeUtil_1 = require("../../../../../Common/TimeUtil"),
  UiTickViewBase_1 = require("../../../../../Ui/Base/UiTickViewBase");
class PhantomArenaBattleFloatTips extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments), this.Cce = -0, this.cJt = "", this.mJt = "", this.dJt = ""
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText]
    ]
  }
  OnTick(t) {
    TickSystem_1.TickSystem.IsPaused || (this.Cce += t / 1e3, this.PYt(), this.SetExtraText(this.mJt, this.dJt, this.cJt))
  }
  PYt() {
    var t = this.Cce,
      i = Math.floor(t % TimeUtil_1.TimeUtil.Hour / TimeUtil_1.TimeUtil.Minute),
      i = (this.mJt = (i < 10 ? "0" : "") + i, Math.floor(t % TimeUtil_1.TimeUtil.Minute)),
      i = (this.dJt = (i < 10 ? "0" : "") + i, Math.floor(100 * (t - Math.floor(t))));
    this.cJt = (i < 10 ? "0" : "") + i
  }
  SetExtraText(t, i, e) {
    this.GetText(1)?.SetText(t + `:${i}:` + e)
  }
}
exports.PhantomArenaBattleFloatTips = PhantomArenaBattleFloatTips;
//# sourceMappingURL=PhantomArenaBattleTimeCountTips.js.map