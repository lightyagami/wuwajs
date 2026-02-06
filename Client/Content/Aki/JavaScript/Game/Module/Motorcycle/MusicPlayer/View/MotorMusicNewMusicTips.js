"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorMusicNewMusicTips = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class MotorMusicNewMusicTips extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.gCf = [];
    this._at = undefined;
    this.CCf = () => {
      this.CloseMe();
      this._at = undefined;
    };
    this.eTt = () => {
      this.CloseMe();
      UiManager_1.UiManager.OpenView("PhonographNewMusicView", {
        UnlockMusicList: this.gCf
      });
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.eTt]];
  }
  async OnBeforeStartAsync() {
    this.gCf = this.OpenParam;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "MotorMusicTips07", this.gCf.length);
    this._at = TimerSystem_1.TimerSystem.Delay(this.CCf, ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetMusicUnlockTipTime());
  }
  OnBeforeDestroy() {
    this.jm();
  }
  jm() {
    if (this._at) {
      TimerSystem_1.TimerSystem.Remove(this._at);
      this._at = undefined;
    }
  }
}
exports.MotorMusicNewMusicTips = MotorMusicNewMusicTips;
//# sourceMappingURL=MotorMusicNewMusicTips.js.map