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
const IPopViewWithCustomUiBlurItem_1 = require("./IPopViewWithCustomUiBlurItem");
class UiBlurLogic {
  static x_r(i) {
    if (i) {
      var r = i.GetOwner().GetComponentByClass(UE.TsUiBlur_C.StaticClass());
      let e = undefined;
      if (r) {
        e = r.OverrideItem === undefined ? i : r.OverrideItem.RootComponent;
        r.ApplyItem = i;
      }
      if (e && r.EnableUiBlur) {
        UE.LGUIBPLibrary.SetGlobalBlurUIItem(e, i.GetWorld());
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Blur", 10, "还原模糊");
        }
        UE.LGUIBPLibrary.ResetGlobalBlurUIItem(i.GetWorld());
      }
    }
  }
  static w_r(e) {
    if (e.IsCsViewProxy) {
      return e.GetCsRootItem();
    } else if ((0, IPopViewWithCustomUiBlurItem_1.isPopViewWithCustomUiBlurItem)(e)) {
      return e.GetOverrideRootItem();
    } else if (e.ChildPopView) {
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