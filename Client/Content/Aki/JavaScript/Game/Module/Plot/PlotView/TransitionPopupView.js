"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransitionPopupView = undefined;
const UE = require("ue");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const TransitionPopupById_1 = require("../../../../Core/Define/ConfigQuery/TransitionPopupById");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
class TransitionPopupView extends UiViewBase_1.UiViewBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  OnStart() {
    var e = this.OpenParam;
    var e = TransitionPopupById_1.configTransitionPopupById.GetConfig(e.BoardId);
    var i = this.GetText(0);
    var r = this.GetText(1);
    if (e) {
      if (e.Title) {
        i?.ShowTextNew(e.Title);
      } else {
        i?.SetUIActive(false);
      }
      if (e.ContentText) {
        r?.ShowTextNew(e.ContentText);
      } else {
        r?.SetUIActive(false);
      }
    } else {
      i?.SetUIActive(false);
      r?.SetUIActive(false);
    }
  }
  OnAfterShow() {
    TimerSystem_1.TimerSystem.Delay(() => {
      this.CloseMe();
    }, ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.TransitionPopupTime * CommonDefine_1.MILLIONSECOND_PER_SECOND);
  }
}
exports.TransitionPopupView = TransitionPopupView;
//# sourceMappingURL=TransitionPopupView.js.map