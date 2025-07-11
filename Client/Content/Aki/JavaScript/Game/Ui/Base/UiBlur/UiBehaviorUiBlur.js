"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiBehaviourUiBlur = undefined;
const UE = require("ue");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiLayerType_1 = require("../../Define/UiLayerType");
const UiManager_1 = require("../../UiManager");
const UiBlurLogic_1 = require("./UiBlurLogic");
class UiBehaviourUiBlur {
  constructor() {
    this.A_r = undefined;
    this.CurrentView = undefined;
    this.fXn = false;
  }
  OnAfterUiStart() {
    if ((this.A_r & UiLayerType_1.UIBLUR_TYPE) != 0) {
      this.fXn = true;
      UiBlurLogic_1.UiBlurLogic.SetNormalUiRenderAfterBlur(this.CurrentView);
      UiBehaviourUiBlur.Gah.add(this.CurrentView.GetViewId());
      this.kah();
    }
  }
  OnAfterUiShow() {
    if (this.fXn) {
      UiBlurLogic_1.UiBlurLogic.SetNormalUiRenderAfterBlur(this.CurrentView);
    }
  }
  kah() {
    var e;
    if (this.fXn && (e = Array.from(UiBehaviourUiBlur.Gah).pop()) && (e = UiManager_1.UiManager.GetView(e))) {
      if (ConfigManager_1.ConfigManager.UiViewConfig.GetUiShowConfig(e.Info.Name).PartialBlur) {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.kuro.LGUIBlurTexture.save 1");
      } else {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.kuro.LGUIBlurTexture.save 0");
      }
    }
  }
  ChangeNeedBlurState(e) {
    this.fXn = e;
  }
  SetCurrentLayer(e) {
    this.A_r = e;
  }
  SetViewInfo(e) {
    this.CurrentView = e;
  }
  OnBeforeDestroy() {
    UiBehaviourUiBlur.Gah.delete(this.CurrentView.GetViewId());
    this.kah();
    if (this.fXn && this.A_r === UiLayerType_1.ELayerType.Pop) {
      UiBlurLogic_1.UiBlurLogic.ResumeTopUiRenderAfterBlur();
    }
  }
}
(exports.UiBehaviourUiBlur = UiBehaviourUiBlur).Gah = new Set();
//# sourceMappingURL=UiBehaviorUiBlur.js.map