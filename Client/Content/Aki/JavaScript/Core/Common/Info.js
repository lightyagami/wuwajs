"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Info = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const Platform_1 = require("../../Launcher/Platform/Platform");
const Macro_1 = require("../Preprocessor/Macro");
const InfoDefine_1 = require("./InfoDefine");
const Log_1 = require("./Log");
class Info {
  static get GameInstance() {
    return this.f8;
  }
  static get World() {
    if (this.f8) {
      return this.f8.GetWorld();
    } else {
      return undefined;
    }
  }
  static Initialize(t) {
    this.f8 = t;
    this.Environment = 1;
    this.p8 = UE.KuroStaticLibrary.IsEditor(t);
    this.v8 = cpp_1.KuroApplication.IsBuildShipping();
    this.M8 = cpp_1.KuroApplication.IsBuildTest();
    this.E8 = !this.v8 && !this.M8;
    this.FHu = UE.KuroStaticLibrary.IsLowMemoryDevice();
    this.S8 = this.p8 && UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCVarFloat("r.Kuro.Movie.EnableCGMovieRendering") > 0;
    if (Macro_1.NOT_SHIPPING_ENVIRONMENT && this.p8) {
      this.m6a = UE.KuroRenderingEditorBPPluginBPLibrary.IsSimulateInEditorInProgress();
    } else {
      this.m6a = false;
    }
    this.y8();
    this.uXi(Platform_1.Platform.CloudGamePlatform);
  }
  static get IsPlayInEditor() {
    return this.p8;
  }
  static get IsBuildShipping() {
    return this.v8;
  }
  static get IsBuildTest() {
    return this.M8;
  }
  static get IsBuildDevelopmentOrDebug() {
    return this.E8;
  }
  static IsGameRunning() {
    return this.Environment === 1;
  }
  static IsInCg() {
    return this.S8;
  }
  static SetInCg(t) {
    if (this.S8 !== t) {
      this.S8 = t;
      cpp_1.FEffectSystem.OnIsInEditorTickChange(this.IsInEditorTick());
    }
  }
  static IsInEditorTick() {
    return this.m6a || this.S8;
  }
  static get IsLowMemoryDevice() {
    return this.FHu;
  }
  static get PlatformType() {
    return this.sXi;
  }
  static get InputControllerType() {
    return this.rEa;
  }
  static get InputControllerMainType() {
    return this.oEa;
  }
  static get OperationType() {
    return this.aXi;
  }
  static y8() {
    switch (cpp_1.KuroApplication.IniPlatformName()) {
      case "IOS":
        this.sXi = 1;
        break;
      case "Android":
        this.sXi = 2;
        break;
      case "Windows":
        this.sXi = 3;
        break;
      case "Mac":
        this.sXi = 4;
        break;
      case "Linux":
        this.sXi = 5;
        break;
      case "XboxOne":
        this.sXi = 6;
        break;
      case "PS4":
        this.sXi = 7;
        break;
      case "PS5":
        this.sXi = 8;
        break;
      default:
        this.sXi = 0;
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Platform", 24, "初始化平台类型", ["PlatformType", this.sXi]);
    }
    var t = InfoDefine_1.defaultPlatformAndInputControllerMap.get(this.sXi);
    if (t !== undefined) {
      this.SwitchInputControllerType(t, "InitializePlatformType");
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Platform", 10, "找不到平台默认对应的输入类型", ["PlatformType", this.sXi]);
    }
  }
  static uXi(t) {
    if (Platform_1.Platform.IsCloudGame()) {
      if (t === "Android" || t === "IOS") {
        Info.SwitchInputControllerType(5, "InitCloudGame Mobile");
      } else if (t === "Mac" || t == "Windows") {
        Info.SwitchInputControllerType(1, "InitCloudGame Desktop");
      }
    }
  }
  static SetInputControllerType(t, i) {
    var s;
    if (this.rEa !== t && (t === 1 && this.rEa === 5 && Log_1.Log.CheckError() && Log_1.Log.Error("Platform", 10, "[PlatformDebug]从Touch输入方式切换成了键鼠的输入方式", ["lastInputController", this.rEa], ["inputController", t]), s = this.rEa, this.rEa = t, this.aEa(), Info.Iya?.(s, this.rEa), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Platform", 16, "设置输入方式", ["lastInputController", s], ["InputController", this.rEa], ["Reason", i]);
    }
  }
  static hEa(t) {
    var i;
    var t = InfoDefine_1.showTypeAndInputControllerMap[t];
    if (t !== this.aXi) {
      i = this.aXi;
      this.aXi = t;
      Info.Tya?.(i, t);
    }
  }
  static aEa() {
    var t;
    var i = InfoDefine_1.inputControllerMainTypeMap[this.rEa];
    if (i !== this.oEa) {
      t = this.oEa;
      this.oEa = i;
      Info.Lya?.(t, i);
    }
  }
  static IsPcOrGamepadPlatform() {
    return this.IsPcPlatform() || this.IsGamepadPlatform();
  }
  static IsPcPlatform() {
    return this.sXi === 3 || this.sXi === 4 || this.sXi === 5;
  }
  static IsMobilePlatform() {
    return this.sXi === 1 || this.sXi === 2;
  }
  static IsIosPlatform() {
    return this.sXi === 1;
  }
  static IsGamepadPlatform() {
    return this.sXi === 6 || this.sXi === 7 || this.sXi === 8;
  }
  static IsPs5Platform() {
    return this.sXi === 8;
  }
  static IsMacPlatform() {
    return this.sXi === 4;
  }
  static IsWindowsPlatform() {
    return this.sXi === 3;
  }
  static IsAndroidPlatform() {
    return this.sXi === 2;
  }
  static IsInKeyBoard() {
    return this.InputControllerMainType === 1;
  }
  static IsInTouch() {
    return this.InputControllerMainType === 3;
  }
  static IsInGamepad() {
    return this.InputControllerMainType === 2;
  }
  static IsXboxGamepad() {
    return this.IsInGamepad() && this.InputControllerType === 2;
  }
  static IsPsGamepad() {
    return this.IsInGamepad() && (this.InputControllerType === 3 || this.InputControllerType === 4);
  }
  static IsBackBoneGamepad() {
    return this.IsInGamepad() && this.InputControllerType === 6;
  }
  static IsNsProGamepad() {
    return this.IsInGamepad() && this.InputControllerType === 7;
  }
  static CheckIsBackBoneGamepad(t) {
    return t === 6;
  }
  static CheckIsNsProGamepad(t) {
    return t === 7;
  }
  static CheckIsPsGamepad(t) {
    return t === 3 || t === 4;
  }
  static IsMobileInputModel() {
    return !!Info.IsMobilePlatform() || this.sXi === 3 && !!Platform_1.Platform.IsCloudGame() && (Platform_1.Platform.CloudGamePlatform === "Android" || Platform_1.Platform.CloudGamePlatform === "IOS");
  }
  static IsPcInputModel() {
    return this.sXi === 4 || this.sXi === 5 || this.sXi === 3 && (!Platform_1.Platform.IsCloudGame() || Platform_1.Platform.CloudGamePlatform === "Mac" || Platform_1.Platform.CloudGamePlatform === "Windows");
  }
  static SwitchInputControllerType(t, i) {
    if (t === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Platform", 10, "传入了EInputControllerType.None类型", ["Reason", i]);
      }
    } else if (!this.IsGmLockGamepad && (!this.IsMobileInputModel() || t !== 1) && (!this.IsPcInputModel() || t !== 5)) {
      this.SetInputControllerType(t, i);
      this.hEa(t);
    }
  }
  static SetInputTypeChangeFunc(t) {
    Info.Iya = t;
  }
  static ClearInputTypeChangeFunc() {
    Info.Iya = undefined;
  }
  static SetShowTypeChangeFunc(t) {
    Info.Tya = t;
  }
  static ClearShowTypeChangeFunc() {
    Info.Tya = undefined;
  }
  static SetInputMainTypeChangeFunc(t) {
    Info.Lya = t;
  }
  static ClearInputMainTypeChangeFunc() {
    Info.Lya = undefined;
  }
}
(exports.Info = Info).Version = "1.0.0";
Info.Environment = 0;
Info.EnableForceTick = false;
Info.p8 = true;
Info.v8 = true;
Info.M8 = false;
Info.E8 = false;
Info.S8 = false;
Info.UseFastInputCallback = true;
Info.AxisInputOptimize = true;
Info.m6a = false;
Info.FHu = false;
Info.sXi = 0;
Info.rEa = 0;
Info.oEa = 0;
Info.aXi = 0;
Info.IsGmLockGamepad = false;
Info.Iya = undefined;
Info.Tya = undefined;
Info.Lya = undefined; //# sourceMappingURL=Info.js.map