"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlatformController = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const LanguageSystem_1 = require("../../../Core/Common/LanguageSystem");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController");
const CloudGameManagerLauncher_1 = require("../../../Launcher/Platform/CloudGameManagerLauncher");
const CloudGameManager_1 = require("../../Manager/CloudGameManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
class PlatformController extends ControllerBase_1.ControllerBase {
  static Init() {
    this.ControlScreenSaver(false);
    this._Ea();
    this.oXi();
    return this.OnInit();
  }
  static OnClear() {
    this.rXi();
    return true;
  }
  static oXi() {
    InputDistributeController_1.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.MouseMove, this.nXi);
  }
  static rXi() {
    InputDistributeController_1.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.MouseMove, this.nXi);
  }
  static _Ea() {
    if (!Info_1.Info.IsPcPlatform()) {
      ModelManager_1.ModelManager.PlatformModel?.RefreshPlatformByDevice("InitDeviceInfo");
    }
  }
  static ControlScreenSaver(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Platform", 27, "控制屏幕", ["state", e]);
    }
    UE.KismetSystemLibrary.ControlScreensaver(e);
  }
  static SendClientBasicInfo() {
    var e = new Protocol_1.Aki.Protocol.fYn();
    var r = PlatformController.PackageClientBasicInfo();
    e.Z9n = r;
    Net_1.Net.Call(29607, e, () => {});
    if (r && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Platform", 27, "客户端上报一些设备基础信息", ["CPU", r.rHn], ["DeviceId", r.oHn], ["Model", r.nHn], ["NetStatus", r.sHn], ["Platform", r.f7n]);
    }
  }
  static PackageClientBasicInfo() {
    var e = new Protocol_1.Aki.Protocol.Z9n();
    e.sHn = ModelManager_1.ModelManager.PlatformModel.GetNetStatus();
    e.f7n = cpp_1.KuroApplication.IniPlatformName();
    var r = ModelManager_1.ModelManager.KuroSdkModel.GetBasicInfo();
    e.rHn = r?.CPUModelName ?? "";
    e.oHn = r?.DeviceId ?? "";
    e.nHn = r?.ModelName ?? "";
    e.aHn = UE.ThinkingAnalytics.GetDeviceId();
    e.r9n = LanguageSystem_1.LanguageSystem.GetLanguageDefineByCode(LanguageSystem_1.LanguageSystem.PackageLanguage).LanguageType;
    e.kll = ControllerHolder_1.ControllerHolder.KuroSdkController.GetPackageId() ?? "";
    if (CloudGameManager_1.CloudGameManager.IsCloudGame) {
      e.Yu_ = CloudGameManagerLauncher_1.CloudGameManagerLauncher.ServerTag;
    }
    var r = UE.KuroStaticLibrary.GetMacAddress();
    if (!StringUtils_1.StringUtils.IsEmpty(r)) {
      e.hHn = r;
    }
    var r = ModelManager_1.ModelManager.LogReportModel.GetPresetProperties();
    e.ojf = r.system_language;
    e.Kvg = r.os_version;
    e.sjf = r.device_id;
    e.ajf = Number(r.screen_height);
    e.hjf = Number(r.screen_width);
    e.ljf = ModelManager_1.ModelManager.LoginModel.DeviceInfo();
    e._jf = ModelManager_1.ModelManager.LoginModel.DriverDate();
    e.ujf = BaseConfigController_1.BaseConfigController.GetVersionString();
    return e;
  }
}
(exports.PlatformController = PlatformController).nXi = (e, r) => {
  if (r !== 0 && !Info_1.Info.IsInKeyBoard() && !CloudGameManager_1.CloudGameManager.IsCloudGame) {
    Info_1.Info.SwitchInputControllerType(1, "MouseAxisInput");
  }
};
//# sourceMappingURL=PlatformController.js.map