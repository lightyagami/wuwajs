"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhoneMsgTipViewC = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const CLOSE_TIME = 4000;
class PhoneMsgTipViewC extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Fsf = undefined;
    this.j3 = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    this.Fsf = this.OpenParam;
    if (this.Fsf === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhoneSystem", 43, "[PhoneMsgTipViewC] MsgData is undefined");
    }
  }
  OnAfterShow() {
    this.j3 = TimerSystem_1.GameplayTimerSystem.Delay(() => {
      this.j3 = undefined;
      this.uMf();
    }, CLOSE_TIME);
  }
  uMf() {
    UiManager_1.UiManager.CloseAndOpenView("PhoneMsgTipViewC", "PhoneMsgPanelViewSmall", this.Fsf);
  }
  cMf() {
    if (this.j3) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.j3);
      this.j3 = undefined;
    }
  }
  OnBeforeDestroy() {
    if (this.j3) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhoneSystem", 43, "[PhoneMsgTipViewC] Timer is not released");
      }
      this.cMf();
    }
  }
}
exports.PhoneMsgTipViewC = PhoneMsgTipViewC;
//# sourceMappingURL=PhoneMsgTipViewC.js.map