"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorParkourSettleView = undefined;
const UE = require("ue");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
class MotorParkourSettleView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.nbf = () => {
      ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.RestartInstanceDungeon();
    };
    this.sbf = () => {
      ActivityControllerHolder_1.ActivityControllerHolder.MotorParkourController.IsNeedShowMotorParkourMainView = true;
      ActivityControllerHolder_1.ActivityControllerHolder.MotorParkourController.LeaveInstanceDungeon();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIItem], [11, UE.UIText], [12, UE.UIText], [13, UE.UIText], [14, UE.UIText], [15, UE.UIText], [16, UE.UIText], [17, UE.UIText]];
    this.BtnBindInfo = [[4, this.nbf], [5, this.sbf]];
  }
  OnBeforeShow() {
    var e = this.OpenParam;
    var i = e.LevelData;
    var t = e.IsNewRecord;
    var r = i.GetNewRankList(e.MyScoreTime);
    var o = r.findIndex(e => e.IsOwn) + 1;
    this.GetItem(0).SetUIActive(o === 1);
    this.GetItem(1).SetUIActive(o === 2);
    this.GetItem(2).SetUIActive(o === 3);
    this.GetItem(3).SetUIActive(o > 3);
    this.GetItem(6).SetUIActive(o === 1);
    this.GetItem(7).SetUIActive(o === 2);
    this.GetItem(8).SetUIActive(o === 3);
    for (let e = 0; e < 3; e++) {
      var l = r[e];
      if (l.IsOwn) {
        s = ModelManager_1.ModelManager.FunctionModel.GetPlayerName();
        this.GetText(12 + e * 2)?.SetText(s);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12 + e * 2), l.Name);
      }
      var s = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat5(l.Time * TimeUtil_1.TimeUtil.Millisecond);
      this.GetText(13 + e * 2)?.SetText(s);
    }
    this.GetItem(10)?.SetUIActive(t);
    o = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat5(e.MyScoreTime * TimeUtil_1.TimeUtil.Millisecond);
    this.GetText(9)?.SetText(o);
    t = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat5(i.BestRecordTime * TimeUtil_1.TimeUtil.Millisecond);
    this.GetText(11)?.SetText(t);
  }
}
exports.MotorParkourSettleView = MotorParkourSettleView;
//# sourceMappingURL=MotorParkourSettleView.js.map