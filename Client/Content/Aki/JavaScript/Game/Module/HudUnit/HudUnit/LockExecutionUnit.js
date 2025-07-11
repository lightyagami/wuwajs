"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LockExecutionUnit = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const HudUnitBase_1 = require("../HudUnitBase");
const CLOSE_ANIM_TIME = 200;
class LockExecutionUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments);
    this._at = undefined;
    this.Wti = false;
    this.uat = undefined;
    this.dat = () => {
      this._at = undefined;
      this.uat.SetResult();
      this.uat = undefined;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [2, UE.UIItem], [1, UE.UIItem]];
  }
  OnStart() {
    this.RootItem.SetAnchorAlign(2, 2);
    this.InitTweenAnim(0);
    this.InitTweenAnim(1);
    this.InitTweenAnim(2);
  }
  TryShow() {
    if (!this.IsShowOrShowing) {
      this.Show();
    }
  }
  OnAfterShow() {
    this.StopTweenAnim(2);
    this.PlayTweenAnim(0);
    this.PlayTweenAnim(1);
  }
  TryHide(t) {
    this.Wti = t;
    if (!this.IsHideOrHiding) {
      this.Hide();
    }
  }
  async OnBeforeHideAsync() {
    this.StopTweenAnim(0);
    this.StopTweenAnim(1);
    if (this.Wti) {
      if (this.uat) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Battle", 17, "重复调用隐藏");
        }
        this.uat.SetResult();
      }
      this.uat = new CustomPromise_1.CustomPromise();
      this._at = TimerSystem_1.TimerSystem.Delay(this.dat, CLOSE_ANIM_TIME);
      this.PlayTweenAnim(2);
      await this.uat.Promise;
    }
  }
  OnBeforeDestroy() {
    if (this._at) {
      TimerSystem_1.TimerSystem.Remove(this._at);
      this._at = undefined;
      this.uat.SetResult();
    }
  }
}
exports.LockExecutionUnit = LockExecutionUnit;
//# sourceMappingURL=LockExecutionUnit.js.map