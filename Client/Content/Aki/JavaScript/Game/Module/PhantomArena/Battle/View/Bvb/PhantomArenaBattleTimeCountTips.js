"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleFloatTips = undefined;
const UE = require("ue");
const TickSystem_1 = require("../../../../../../Core/Tick/TickSystem");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
const UiTickViewBase_1 = require("../../../../../Ui/Base/UiTickViewBase");
const Time_1 = require("../../../../../../Core/Common/Time");
class PhantomArenaBattleFloatTips extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.Cce = -0;
    this.cJt = "";
    this.mJt = "";
    this.dJt = "";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  OnTick(i) {
    if (!TickSystem_1.TickSystem.IsPaused) {
      this.Cce += i * Time_1.Time.TimeDilation / 1000;
      this.PYt();
      this.SetExtraText(this.mJt, this.dJt, this.cJt);
    }
  }
  PYt() {
    var i = this.Cce;
    var e = Math.floor(i % TimeUtil_1.TimeUtil.Hour / TimeUtil_1.TimeUtil.Minute);
    this.mJt = (e < 10 ? "0" : "") + e;
    var e = Math.floor(i % TimeUtil_1.TimeUtil.Minute);
    this.dJt = (e < 10 ? "0" : "") + e;
    var e = Math.floor((i - Math.floor(i)) * 100);
    this.cJt = (e < 10 ? "0" : "") + e;
  }
  SetExtraText(i, e, t) {
    this.GetText(1)?.SetText(`${i}:${e}:${t}`);
  }
}
exports.PhantomArenaBattleFloatTips = PhantomArenaBattleFloatTips;
//# sourceMappingURL=PhantomArenaBattleTimeCountTips.js.map