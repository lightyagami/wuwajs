"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FunctionOpenView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender");
class FunctionOpenView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.I5t = () => {
      var e = ModelManager_1.ModelManager.FunctionModel.PopNewOpenFunctionList();
      if (e) {
        this.W9t(e);
      } else {
        this.CloseMe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIItem]];
    this.BtnBindInfo = [[3, this.I5t]];
  }
  OnStart() {
    if (ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot()) {
      this.RootItem.SetUIActive(false);
    }
    var e = ModelManager_1.ModelManager.FunctionModel.PopNewOpenFunctionList();
    this.nOe(e);
  }
  OnAfterShow() {
    this.UiViewSequence.PlaySequence("Show", true);
  }
  W9t(e) {
    this.UiViewSequence.PlaySequence("Show", true);
    this.nOe(e);
  }
  nOe(e) {
    var i = this.GetTexture(0);
    this.SetTextureByPath(e.Icon, i);
    this.GetText(1).ShowTextNew(e.Title);
    this.GetText(2).ShowTextNew(e.Desc);
  }
  OnBeforeShow() {
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.TemporaryDisableFrameGeneration("FunctionOpenView");
  }
  OnAfterHide() {
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.CancelTemporaryDisableFrameGeneration("FunctionOpenView");
  }
}
exports.FunctionOpenView = FunctionOpenView;
//# sourceMappingURL=FunctionOpenView.js.map