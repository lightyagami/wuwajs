"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotPhotoView = undefined;
const UE = require("ue");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
class PlotPhotoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.B7 = undefined;
    this.lyt = () => {
      UiManager_1.UiManager.CloseView("PlotPhotoView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UIButtonComponent], [3, UE.UITexture], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText], [7, UE.UIText], [8, UE.UIText]];
    this.BtnBindInfo = [[2, this.lyt]];
  }
  OnAddEventListener() {}
  OnRemoveEventListener() {}
  OnStart() {
    this.B7 = this.OpenParam;
  }
  OnAfterShow() {
    this.GetSprite(0).SetUIActive(false);
    this.GetSprite(1).SetUIActive(false);
    this.GetText(4).SetUIActive(false);
    this.GetText(6).SetUIActive(false);
    this.GetText(7).SetUIActive(false);
    this.GetText(8).SetUIActive(false);
    this.GetTexture(3).SetUIActive(false);
    this.GetText(5).SetText("test/残鸣初奏");
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e === 1 ? "PlotPhoto_Male" : "PlotPhoto_Female");
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Texture, e => {
      if (e?.IsValid()) {
        this.GetTexture(3).SetTexture(e);
        this.GetTexture(3).SetUIActive(true);
      }
    });
  }
  OnBeforeDestroy() {
    if (this.B7) {
      this.B7();
      this.B7 = undefined;
    }
  }
}
exports.PlotPhotoView = PlotPhotoView;
//# sourceMappingURL=PlotPhotoView.js.map