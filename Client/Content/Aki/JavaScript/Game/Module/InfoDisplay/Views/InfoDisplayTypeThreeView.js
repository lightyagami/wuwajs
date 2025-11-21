"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfoDisplayTypeThreeView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const InfoDisplayController_1 = require("../InfoDisplayController");
const InfoDisplayAudioPlayer_1 = require("./InfoDisplayAudioPlayer");
class InfoDisplayTypeThreeView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.sai = undefined;
    this.Jvt = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UITexture], [9, UE.UIItem]];
    this.BtnBindInfo = [[4, this.Jvt]];
  }
  OnStart() {
    this.sai = new InfoDisplayAudioPlayer_1.InfoDisplayAudioPlayer();
    var e = this.GetItem(5);
    this.sai.Initialize(e.GetOwner());
    this.sai.SetShowTextComponent(this.GetText(3));
    var e = ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId();
    this.Hxt(e);
    this.sai.Refresh(ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayAudio(e));
  }
  OnBeforeShow() {
    var e = ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId();
    var e = ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayEntryAudio(e);
    if (e !== "") {
      AudioSystem_1.AudioSystem.PostEvent(e);
    }
  }
  OnBeforeHide() {
    var e = ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId();
    var e = ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayExitAudio(e);
    if (e !== "") {
      AudioSystem_1.AudioSystem.PostEvent(e);
    }
  }
  Hxt(e) {
    this.l7e(e);
    this.cai(e);
    this.mai(e);
  }
  mai(e) {
    if (ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayAudio(e) !== "") {
      this.GetItem(5).SetUIActive(true);
      this.GetItem(7).SetUIActive(true);
    } else {
      this.GetItem(5).SetUIActive(false);
      this.GetItem(7).SetUIActive(false);
    }
  }
  l7e(e) {
    var i = ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayTitle(e);
    this.GetText(0).SetText(i);
    var i = ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayDesc(e);
    this.GetText(2).SetText(i);
  }
  cai(e) {
    e = ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayBgStamp(e);
    if (e !== "") {
      this.GetItem(9).SetUIActive(true);
      const i = this.GetTexture(8);
      this.SetTextureByPath(e, i, undefined, () => {
        i.SetSizeFromTexture();
        i.SetUIActive(true);
      });
    } else {
      this.GetItem(9).SetUIActive(false);
    }
  }
  OnBeforeDestroy() {
    this.sai.Destroy();
    var e = ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId();
    InfoDisplayController_1.InfoDisplayController.RequestReadDisplayInfo(e);
  }
  OnTick(e) {
    this.sai?.OnTick(e);
  }
  async OnBeforeHideAsync() {
    if (this.OpenParam?.FadeBeforeHide) {
      await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitOpenLoading(0, 3);
    }
  }
}
exports.InfoDisplayTypeThreeView = InfoDisplayTypeThreeView;
//# sourceMappingURL=InfoDisplayTypeThreeView.js.map