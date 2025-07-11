"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiBlurLogic = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const UiLayerType_1 = require("../../Define/UiLayerType");
const UiModel_1 = require("../../UiModel");
class UiBlurLogic {
  static x_r(r) {
    if (r) {
      var i = r.GetOwner().GetComponentByClass(UE.TsUiBlur_C.StaticClass());
      let e = undefined;
      if (i) {
        e = i.OverrideItem === undefined ? r : i.OverrideItem.RootComponent;
        i.ApplyItem = r;
      }
      if (e && i.EnableUiBlur) {
        UE.LGUIBPLibrary.SetGlobalBlurUIItem(e, r.GetWorld());
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Blur", 10, "还原模糊");
        }
        UE.LGUIBPLibrary.ResetGlobalBlurUIItem(r.GetWorld());
      }
    }
  }
  static w_r(e) {
    if (e.ChildPopView) {
      return e.ChildPopView.GetPopViewRootItem();
    } else {
      return e.GetRootItem();
    }
  }
  static SetNormalUiRenderAfterBlur(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Blur", 10, "设置模糊", ["ViewName", e.Info.Name]);
    }
    this.x_r(this.w_r(e));
  }
  static ResumeTopUiRenderAfterBlur() {
    var e = UiModel_1.UiModel.GetTopView(UiLayerType_1.ELayerType.Pop);
    if (e?.IsShowOrShowing || (e = (e = UiModel_1.UiModel.GetTopView(UiLayerType_1.ELayerType.Plot)) || UiModel_1.UiModel.GetTopView(UiLayerType_1.ELayerType.Normal))) {
      this.SetNormalUiRenderAfterBlur(e);
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Blur", 10, "还原模糊");
      }
      UE.LGUIBPLibrary.ResetGlobalBlurUIItem(GlobalData_1.GlobalData.GameInstance.GetWorld());
    }
  }
}
exports.UiBlurLogic = UiBlurLogic;
//# sourceMappingURL=UiBlurLogic.js.map