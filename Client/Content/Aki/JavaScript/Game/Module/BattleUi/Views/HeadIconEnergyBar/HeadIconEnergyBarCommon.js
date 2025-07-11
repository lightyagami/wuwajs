"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeadIconEnergyBarCommon = undefined;
const UE = require("ue");
const Time_1 = require("../../../../../Core/Common/Time");
const HeadIconEnergyBarBase_1 = require("./HeadIconEnergyBarBase");
class HeadIconEnergyBarCommon extends HeadIconEnergyBarBase_1.HeadIconEnergyBarBase {
  constructor() {
    super(...arguments);
    this.rdt = 0;
    this.sB1 = 0;
    this.DP_ = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
  }
  OnStart() {
    super.OnStart();
    this.InitTweenAnim(3);
    this.InitTweenAnim(4);
    this.InitTweenAnim(5);
    this.rdt = this.PercentMachine.GetCurPercent();
    this.Gdl(true);
  }
  OnTargetPercentChanged() {
    var e = this.PercentMachine.GetTargetPercent();
    if (e > this.rdt) {
      this.aB1();
    }
    this.rdt = e;
  }
  OnBarPercentChanged() {
    this.Gdl();
  }
  Gdl(e = false) {
    var t = this.PercentMachine.GetCurPercent();
    this.GetSprite(1)?.SetFillAmount(t);
    this.hB1(t >= 1, e);
  }
  aB1() {
    var e = Time_1.Time.NowSeconds;
    if (!(e <= this.sB1)) {
      this.sB1 = e + this.Config.EffectCd;
      this.PlayTweenAnim(5);
    }
  }
  hB1(e, t = false) {
    if (this.DP_ !== e || !!t) {
      this.DP_ = e;
      if (this.DP_) {
        this.StopTweenAnim(4);
        this.PlayTweenAnim(3);
      } else {
        this.StopTweenAnim(3);
        this.PlayTweenAnim(4);
      }
    }
  }
}
exports.HeadIconEnergyBarCommon = HeadIconEnergyBarCommon;
//# sourceMappingURL=HeadIconEnergyBarCommon.js.map