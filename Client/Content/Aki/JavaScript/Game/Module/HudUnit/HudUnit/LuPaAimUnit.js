"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LuPaAimUnit = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const HudUnitBase_1 = require("../HudUnitBase");
const CLOSE_ANIM_TIME = 100;
class LuPaAimUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments);
    this.Lti = false;
    this.d7c = false;
    this.Dxt = false;
    this._at = undefined;
    this.uat = undefined;
    this.dat = () => {
      this._at = undefined;
      this.uat.SetResult();
      this.uat = undefined;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
  }
  OnStart() {
    this.InitTweenAnim(3);
    this.InitTweenAnim(4);
    this.InitTweenAnim(5);
  }
  OnBeforeShow() {
    this.StopTweenAnim(4);
    this.PlayTweenAnim(3);
  }
  async OnBeforeHideAsync() {
    this.StopTweenAnim(5);
    this.StopTweenAnim(3);
    this.PlayTweenAnim(4);
    this.uat = new CustomPromise_1.CustomPromise();
    this._at = TimerSystem_1.TimerSystem.Delay(this.dat, CLOSE_ANIM_TIME);
    await this.uat.Promise;
  }
  OnBeforeDestroy() {
    if (this._at) {
      TimerSystem_1.TimerSystem.Remove(this._at);
      this._at = undefined;
      this.uat.SetResult();
      this.uat = undefined;
    }
  }
  SetTargetVisible(t) {
    this.Lti = t;
    this.SetVisible(t);
  }
  GetTargetVisible() {
    return this.Lti;
  }
  SetActive(t) {
    if (!t || !!this.Lti) {
      super.SetActive(t);
    }
  }
  SetProgress(t) {
    this.GetSprite(0)?.SetFillAmount(t);
  }
  SetLockState(t) {
    if (this.Dxt !== t || !this.d7c) {
      this.Dxt = t;
      this.GetItem(1).SetUIActive(!t);
      this.GetItem(2).SetUIActive(t);
      this.d7c ||= true;
      if (this.IsShowOrShowing) {
        this.PlayTweenAnim(5);
      }
    }
  }
}
exports.LuPaAimUnit = LuPaAimUnit;
//# sourceMappingURL=LuPaAimUnit.js.map