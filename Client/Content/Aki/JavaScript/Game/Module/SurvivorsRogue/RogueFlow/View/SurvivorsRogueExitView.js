"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueExitView = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class SurvivorsRogueExitView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Vho = () => {
      var i = this.OpenParam;
      ControllerHolder_1.ControllerHolder.SurvivorsRogueController.RequestInstSettle(i.IsExternal);
      this.CloseMe();
    };
    this.Hho = () => {
      if (this.OpenParam.IsExternal) {
        ControllerHolder_1.ControllerHolder.SurvivorsRogueController.RequestEnterInstByLevelInfo();
      } else {
        ControllerHolder_1.ControllerHolder.SurvivorsRogueController.LeaveRogueInstance();
      }
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText]];
    this.BtnBindInfo = [[1, this.Vho], [2, this.Hho]];
  }
  OnStart() {
    var i = this.OpenParam;
    this.nOe(i);
  }
  nOe(i) {
    var t = i.IsExternal;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "SurvivorsExitPopup_confirmText", i.Batch, i.MaxBatch);
    var i = this.GetText(3);
    var r = this.GetText(4);
    var e = this.GetText(5);
    if (t) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(i, "SurvivorsExit_ExternalTitle");
      LguiUtil_1.LguiUtil.SetLocalTextNew(r, "SurvivorsExit_ExternalTips");
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, "SurvivorsExit_ExternalBut2");
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(i, "SurvivorsExit_InternalTitle");
      LguiUtil_1.LguiUtil.SetLocalTextNew(r, "SurvivorsExit_InternalTips");
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, "SurvivorsExit_InternalBut2");
    }
  }
}
exports.SurvivorsRogueExitView = SurvivorsRogueExitView;
//# sourceMappingURL=SurvivorsRogueExitView.js.map