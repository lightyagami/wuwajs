"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeadIconEnergyBarJiaBeiLiNa = undefined;
const UE = require("ue");
const Time_1 = require("../../../../../Core/Common/Time");
const HeadIconEnergyBarBase_1 = require("./HeadIconEnergyBarBase");
class HeadIconEnergyBarJiaBeiLiNa extends HeadIconEnergyBarBase_1.HeadIconEnergyBarBase {
  constructor() {
    super(...arguments);
    this.rdt = 0;
    this.sB1 = 0;
    this.DP_ = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UISprite], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem]];
  }
  OnStart() {
    super.OnStart();
    this.InitTweenAnim(6);
    this.InitTweenAnim(5);
    this.InitTweenAnim(7);
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
    this.GetItem(2)?.SetAnchorOffsetX((t - 0.5) * 116);
    this.hB1(t >= 1, e);
  }
  aB1() {
    var e;
    if (!!this.PlayIncreaseEffect && !((e = Time_1.Time.NowSeconds) <= this.sB1)) {
      this.sB1 = e + this.Config.EffectCd;
      this.PlayTweenAnim(7);
    }
  }
  hB1(e, t = false) {
    if (this.DP_ !== e || !!t) {
      this.DP_ = e;
      if (this.DP_) {
        this.StopTweenAnim(5);
        this.PlayTweenAnim(6);
      } else {
        this.StopTweenAnim(6);
        this.PlayTweenAnim(5);
      }
    }
  }
}
exports.HeadIconEnergyBarJiaBeiLiNa = HeadIconEnergyBarJiaBeiLiNa;
//# sourceMappingURL=HeadIconEnergyBarJiaBeiLiNa.js.map