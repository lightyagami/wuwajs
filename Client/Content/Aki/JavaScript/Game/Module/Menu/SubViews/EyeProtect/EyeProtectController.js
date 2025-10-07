"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EyeProtectController = exports.EYEPROTECT_ALL_DA_PATH = exports.EYEPROTECT_WEAK_DA_PATH = exports.EYEPROTECT_STRONG_DA_PATH = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const GameSettingsDefine_1 = require("../../../../GameSettings/GameSettingsDefine");
const GameSettingsManager_1 = require("../../../../GameSettings/GameSettingsManager");
const GameSettingsUtils_1 = require("../../../../GameSettings/GameSettingsUtils");
const GlobalData_1 = require("../../../../GlobalData");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiControllerBase_1 = require("../../../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const EyeProtectViewModel_1 = require("./EyeProtectViewModel");
exports.EYEPROTECT_STRONG_DA_PATH = "/Game/Aki/Render/Data/BlueLightFilter/DA/DA_BlueLightFilter_ParameterA.DA_BlueLightFilter_ParameterA";
exports.EYEPROTECT_WEAK_DA_PATH = "/Game/Aki/Render/Data/BlueLightFilter/DA/DA_BlueLightFilter_ParameterB.DA_BlueLightFilter_ParameterB";
exports.EYEPROTECT_ALL_DA_PATH = "/Game/Aki/Render/Data/BlueLightFilter/ScreenBlueLightFilterSystemDataAsset.ScreenBlueLightFilterSystemDataAsset";
class EyeProtectController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {}
  static OnUnRegisterNetEvent() {}
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharOnRoleDead, this.Jze);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LogOut, this.bBu);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharOnRoleDead, this.Jze);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LogOut, this.bBu);
  }
  static async BuildViewModelAndOpen(e) {
    return (await UiManager_1.UiManager.OpenViewAsync("EyeProtectView", e)) !== undefined;
  }
  static async OpenEyeProtectView() {
    return await this.zFd().BuildComponentAndOpen();
  }
  static async CloseEyeProtectView() {
    await ControllerHolder_1.ControllerHolder.FilterSettingController.CloseViewAndReturnWorld();
  }
  static zFd() {
    return new EyeProtectViewModel_1.EyeProtectViewModel();
  }
  static ApplyEyeProtectSetting() {
    var e = GameSettingsManager_1.GameSettingsManager.GetCurrentValueSafely(GameSettingsDefine_1.EFunction.EyeProtectionMode);
    GameSettingsUtils_1.GameSettingsUtils.ApplyEyeProtectionMode(e);
  }
  static SwitchFilter(e) {
    if (e) {
      e = GameSettingsManager_1.GameSettingsManager.GetCurrentValueSafely(GameSettingsDefine_1.EFunction.ImageDisplayMode);
      GameSettingsUtils_1.GameSettingsUtils.ApplyImageDisplayMode(e);
    } else {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.BlueLightFilter.Disable 1");
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Tonemapper.BrightnessAndTextureDisable 1");
    }
  }
}
exports.EyeProtectController = EyeProtectController;
(_a = EyeProtectController).bBu = () => {
  _a.SwitchFilter(false);
};
EyeProtectController.Jze = e => {
  if (UiManager_1.UiManager.IsViewOpen("EyeProtectView")) {
    UiManager_1.UiManager.CloseView("EyeProtectView");
  }
}; //# sourceMappingURL=EyeProtectController.js.map