"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingRewardLimitTimeButton = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../../../../Core/Timer/TimerSystem");
const TimeUtil_1 = require("../../../../../../../Common/TimeUtil");
const ModelManager_1 = require("../../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../../../../Ui/UiManager");
const CHECKGAP = 1000;
class FishingRewardLimitTimeButton extends UiPanelBase_1.UiPanelBase {
  constructor(i) {
    super();
    this.Data = i;
    this.Ntl = false;
    this.Ftl = "{0}";
    this.TTn = undefined;
    this.Vtl = () => {
      var i = this.Data.GetLimitTimeEndTime();
      if (i - TimeUtil_1.TimeUtil.GetServerTime() <= 0) {
        this.RefreshActive();
      } else {
        i = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(i, this.Ftl);
        this.GetText(1).SetText(i);
      }
    };
    this.UFe = () => {
      if (this.Ntl) {
        UiManager_1.UiManager.OpenView("FishingTimeLimitView");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.UFe]];
  }
  OnBeforeHide() {
    this.jm();
  }
  RefreshActive() {
    this.Ntl = this.Data.IsLimitTimeRewardOn();
    this.SetActive(this.Ntl);
    if (this.Ntl) {
      this.Vtl();
      this.BNe();
      this.P3e();
    } else {
      this.jm();
    }
  }
  BNe() {
    this.GetItem(2).SetUIActive(this.Data.GetTimeLimitRedDotState());
  }
  P3e() {
    this.jm();
    this.TTn = TimerSystem_1.GameplayTimerSystem.Forever(this.Vtl, CHECKGAP, undefined, undefined, undefined, false);
  }
  jm() {
    if (this.TTn !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TTn);
      this.TTn = undefined;
    }
  }
}
exports.FishingRewardLimitTimeButton = FishingRewardLimitTimeButton;
//# sourceMappingURL=FishingRewardLimitTimeButton.js.map