"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LuPaAimUnit = void 0;
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  HudUnitBase_1 = require("../HudUnitBase"),
  CLOSE_ANIM_TIME = 100;
class LuPaAimUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments), this.Lti = !1, this.suu = !1, this.Dxt = !1, this._at = void 0, this.uat = void 0, this.dat = () => {
      this._at = void 0, this.uat.SetResult(), this.uat = void 0
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem]
    ]
  }
  OnStart() {
    this.InitTweenAnim(3), this.InitTweenAnim(4), this.InitTweenAnim(5)
  }
  OnBeforeShow() {
    this.StopTweenAnim(4), this.PlayTweenAnim(3)
  }
  async OnBeforeHideAsync() {
    this.StopTweenAnim(5), this.StopTweenAnim(3), this.PlayTweenAnim(4), this.uat = new CustomPromise_1.CustomPromise, this._at = TimerSystem_1.TimerSystem.Delay(this.dat, CLOSE_ANIM_TIME), await this.uat.Promise
  }
  OnBeforeDestroy() {
    this._at && (TimerSystem_1.TimerSystem.Remove(this._at), this._at = void 0, this.uat.SetResult(), this.uat = void 0)
  }
  SetTargetVisible(t) {
    this.Lti = t, this.SetVisible(t)
  }
  GetTargetVisible() {
    return this.Lti
  }
  SetActive(t) {
    t && !this.Lti || super.SetActive(t)
  }
  SetProgress(t) {
    this.GetSprite(0)?.SetFillAmount(t)
  }
  SetLockState(t) {
    this.Dxt === t && this.suu || (this.Dxt = t, this.GetItem(1).SetUIActive(!t), this.GetItem(2).SetUIActive(t), this.suu || (this.suu = !0), this.IsShowOrShowing && this.PlayTweenAnim(5))
  }
}
exports.LuPaAimUnit = LuPaAimUnit;
//# sourceMappingURL=LuPaAimUnit.js.map