"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LockPredictedUnit = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const HudUnitBase_1 = require("../HudUnitBase");
const CLOSE_ANIM_TIME = 200;
class LockPredictedUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments);
    this._at = undefined;
    this.uat = undefined;
    this.dat = () => {
      this._at = undefined;
      this.uat.SetResult();
      this.uat = undefined;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  OnStart() {
    this.InitTweenAnim(2);
    this.InitTweenAnim(3);
  }
  OnAfterShow() {
    this.hga();
  }
  async OnBeforeHideAsync() {
    if (!(CLOSE_ANIM_TIME <= 0)) {
      this.Wti();
      this.uat = new CustomPromise_1.CustomPromise();
      this._at = TimerSystem_1.TimerSystem.Delay(this.dat, CLOSE_ANIM_TIME);
      await this.uat.Promise;
    }
  }
  OnBeforeDestroy() {
    if (this._at) {
      TimerSystem_1.TimerSystem.Remove(this._at);
      this._at = undefined;
      this.uat.SetResult();
      this.uat = undefined;
    }
  }
  Activate() {
    this.SetVisible(true, 0);
  }
  Deactivate() {
    this.SetVisible(false, 0);
  }
  hga() {
    this.StopTweenAnim(3);
    this.PlayTweenAnim(2);
  }
  Wti() {
    this.StopTweenAnim(2);
    this.PlayTweenAnim(3);
  }
}
exports.LockPredictedUnit = LockPredictedUnit;
//# sourceMappingURL=LockPredictedUnit.js.map