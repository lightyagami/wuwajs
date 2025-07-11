"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressTaskTitlePanel = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem");
const TimeUtil_1 = require("../../../../../../Common/TimeUtil");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
class ActivityRegressTaskTitlePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.TDe = undefined;
    this.Afa = () => {
      var e = this.GetText(1);
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, "RecallActivity_Task_Daily_Countdown", ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetNextRefreshTime());
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem]];
  }
  OnBeforeDestroy() {
    this.Lfa();
  }
  RefreshByData(e) {
    var i = e.TaskType !== 0;
    this.GetItem(2).SetUIActive(i);
    this.GetItem(3).SetUIActive(!i);
    var i = this.GetText(0);
    var t = e.TaskType === 0 ? "RecallActivity_Task_Resident" : "RecallActivity_Task_Daily";
    LguiUtil_1.LguiUtil.SetLocalTextNew(i, t);
    var i = this.GetText(1);
    var t = e.TaskType === 1;
    i.SetUIActive(t);
    if (t) {
      this.Lfa();
      this.TDe = TimerSystem_1.RealTimeTimerSystem.Forever(this.Afa, TimeUtil_1.TimeUtil.InverseMillisecond);
      this.Afa();
    }
  }
  Lfa() {
    if (this.TDe) {
      TimerSystem_1.RealTimeTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
}
exports.ActivityRegressTaskTitlePanel = ActivityRegressTaskTitlePanel;
//# sourceMappingURL=ActivityRegressTaskTitlePanel.js.map