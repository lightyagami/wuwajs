"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightArchiveTip = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../../../Ui/UiManager");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
const MotorFightLevelDetailView_1 = require("./MotorFightLevelDetailView");
class MotorFightArchiveTip extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.CNe = undefined;
    this.nMg = 0;
    this.sMg = 0;
    this.xMo = () => {
      var i = this.CNe.GetLevelDataById(this.sMg);
      ActivityControllerHolder_1.ActivityControllerHolder.MotorFightController.EnterMotorFightDungeonDirectly(this.sMg, i.RoleId, true);
    };
    this.aMg = () => {
      ActivityControllerHolder_1.ActivityControllerHolder.MotorFightController.RequestSettlement(false);
      var i = this.CNe.GetLevelDataById(this.nMg);
      var i = new MotorFightLevelDetailView_1.MotorFightLevelDetailViewModel(this.CNe, i);
      this.CloseMe();
      UiManager_1.UiManager.OpenView("MotorFightLevelDetailView", i);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText]];
    this.BtnBindInfo = [[0, this.xMo], [1, this.aMg]];
  }
  OnBeforeShow() {
    this.nMg = this.OpenParam;
    this.CNe = ActivityControllerHolder_1.ActivityControllerHolder.MotorFightController.GetMotorFightActivityData();
    var i;
    var t = this.CNe.GetLastSavedLevelData();
    if (t) {
      this.sMg = t.gG_;
      i = this.CNe.GetLevelDataById(this.sMg);
      i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.LevelName);
      this.GetText(2)?.SetText(i);
      i = MathUtils_1.MathUtils.LongToNumber(t.fAs);
      i = TimeUtil_1.TimeUtil.GetTimeDataFormatWithHour(i);
      this.GetText(3)?.SetText(i);
      this.GetText(4)?.SetText(t.SMs.toString());
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("MotorFightActivity", 71, "摩托战斗存档数据不存在");
    }
  }
}
exports.MotorFightArchiveTip = MotorFightArchiveTip;
//# sourceMappingURL=MotorFightArchiveTip.js.map