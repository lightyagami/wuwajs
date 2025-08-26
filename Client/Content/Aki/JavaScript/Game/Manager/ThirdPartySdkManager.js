"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThirdPartySdkManager = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const Protocol_1 = require("../../Core/Define/Net/Protocol");
const Net_1 = require("../../Core/Net/Net");
const TimerSystem_1 = require("../../Core/Timer/TimerSystem");
const BaseConfigController_1 = require("../../Launcher/BaseConfig/BaseConfigController");
const Platform_1 = require("../../Launcher/Platform/Platform");
const ACE_DATA_TRANSFER_INTERVAL_PC = 100;
const ACE_DATA_TRANSFER_INTERVAL_MOBILE = 4000;
class ThirdPartySdkManager {
  static Init() {
    var r = BaseConfigController_1.BaseConfigController.GetPackageConfigOrDefault("Stream");
    var e = BaseConfigController_1.BaseConfigController.GetPackageConfigOrDefault("Changelist", "");
    cpp_1.FCrashSightProxy.SetBranchInfo(r, e);
    var r = UE.KuroLauncherLibrary.GetAppChangeList();
    cpp_1.FCrashSightProxy.SetCustomData("AppChangelist", r);
    var e = UE.KuroStaticLibrary.IsModuleLoaded("TpSafe");
    if (e) {
      if (ThirdPartySdkManager.BBe !== undefined) {
        TimerSystem_1.GameplayTimerSystem.Remove(ThirdPartySdkManager.BBe);
        ThirdPartySdkManager.BBe = undefined;
      }
      ThirdPartySdkManager.InitDataTransferTimerForTpSafe();
      Net_1.Net.Register(22515, ThirdPartySdkManager.bBe);
    }
    if (Platform_1.Platform.IsAndroidPlatform()) {
      r = UE.KuroAudioStatics.IsAndroidApiUsingOpenSL();
      cpp_1.FCrashSightProxy.SetCustomData("AudioAPI", r ? "OpenSL" : "AAudio");
    }
    this.rPn();
  }
  static rPn() {
    var r = UE.KuroLauncherLibrary.GameSavedDir() + "crashes/trigger";
    if (UE.BlueprintPathsLibrary.FileExists(r)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Login", 21, "崩溃测试！");
      }
      cpp_1.FCrashSightProxy.Test();
    }
  }
  static SetUserInfo(r) {
    if (r !== "") {
      ThirdPartySdkManager.qBe(r);
    }
  }
  static qBe(r) {
    cpp_1.FCrashSightProxy.SetUserId(r);
  }
  static SetUserInfoForTpSafe(r, e) {
    var a;
    cpp_1.FCrashSightProxy.SetCustomData("PlayerId", e.toString());
    if (UE.KuroStaticLibrary.IsModuleLoaded("TpSafe")) {
      a = ThirdPartySdkManager.GBe();
      cpp_1.FTpSafeProxy.SetUserInfo(a, 0, r, e);
    }
  }
  static InitDataTransferTimerForTpSafe() {
    let r = ACE_DATA_TRANSFER_INTERVAL_MOBILE;
    if (Platform_1.Platform.IsWindowsPlatform()) {
      r = ACE_DATA_TRANSFER_INTERVAL_PC;
    }
    ThirdPartySdkManager.BBe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      ThirdPartySdkManager.NBe();
    }, r);
  }
  static NBe() {
    var r;
    var e;
    if (Net_1.Net.IsServerConnected() && (r = cpp_1.FTpSafeProxy.GetAntiData()).byteLength > 0) {
      (e = Protocol_1.Aki.Protocol.e$n.create()).v6n = new Uint8Array(r);
      Net_1.Net.Send(23429, e);
    }
  }
  static GBe() {
    if (Platform_1.Platform.IsWindowsPlatform()) {
      return 601;
    } else {
      return 99;
    }
  }
  static Logout() {
    cpp_1.FTpSafeProxy.Logout();
  }
  static Clear() {
    if (ThirdPartySdkManager.BBe !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(ThirdPartySdkManager.BBe);
      ThirdPartySdkManager.BBe = undefined;
    }
  }
}
(exports.ThirdPartySdkManager = ThirdPartySdkManager).BBe = undefined;
ThirdPartySdkManager.bBe = r => {
  cpp_1.FTpSafeProxy.RecvAntiData(r.v6n);
}; //# sourceMappingURL=ThirdPartySdkManager.js.map