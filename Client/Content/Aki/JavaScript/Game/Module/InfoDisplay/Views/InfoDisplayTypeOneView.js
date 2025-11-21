"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfoDisplayTypeOneView = undefined;
const UE = require("ue");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const InfoDisplayController_1 = require("../InfoDisplayController");
const InfoDisplayAudioPlayer_1 = require("./InfoDisplayAudioPlayer");
class InfoDisplayTypeOneView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.sai = undefined;
    this.Jvt = () => {
      this.CloseMe();
    };
    this._ai = () => {
      var e = ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId();
      var e = ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayPictures(e);
      if (e.length > 0) {
        ModelManager_1.ModelManager.InfoDisplayModel.SetCurrentOpenInformationTexture(e[0]);
        InfoDisplayController_1.InfoDisplayController.OpenInfoDisplayImgView();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITextureTransitionComponent], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIText], [7, UE.UITexture], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UITexture]];
    this.BtnBindInfo = [[0, this._ai], [3, this.Jvt]];
  }
  OnStart() {
    this.sai = new InfoDisplayAudioPlayer_1.InfoDisplayAudioPlayer();
    var e = this.GetItem(8);
    this.sai.Initialize(e.GetOwner());
    this.sai.SetShowTextComponent(this.GetText(6));
    var e = ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId();
    this.Hxt(e);
    this.sai.Refresh(ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayAudio(e));
  }
  Hxt(e) {
    this.uai(e);
    this.l7e(e);
    this.mai(e);
  }
  uai(e) {
    e = ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayPictures(e);
    if (e.length !== 0) {
      e = e[0];
      if (e !== "") {
        const r = this.GetUiTextureTransitionComponent(1);
        ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Texture, (e, i) => {
          if (e.IsValid() && r.IsValid()) {
            r.SetAllStateTexture(e);
            this.GetTexture(10).SetTexture(e);
            this.GetTexture(10).SetSizeFromTexture();
          }
        }, 100, this.MemoryTag);
      }
    }
  }
  l7e(e) {
    var i = ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayTitle(e);
    this.GetText(2).SetText(i);
    var i = ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayDesc(e);
    this.GetText(4).SetText(i);
  }
  mai(e) {
    if (ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayAudio(e) !== "") {
      this.GetItem(8).SetUIActive(true);
      this.GetItem(9).SetUIActive(true);
    } else {
      this.GetItem(8).SetUIActive(false);
      this.GetItem(9).SetUIActive(false);
    }
  }
  OnTick(e) {
    this.sai?.OnTick(e);
  }
  OnBeforeDestroy() {
    this.sai.Destroy();
    var e = ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId();
    InfoDisplayController_1.InfoDisplayController.RequestReadDisplayInfo(e);
  }
  async OnBeforeHideAsync() {
    if (this.OpenParam?.FadeBeforeHide) {
      await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitOpenLoading(0, 3);
    }
  }
}
exports.InfoDisplayTypeOneView = InfoDisplayTypeOneView;
//# sourceMappingURL=InfoDisplayTypeOneView.js.map