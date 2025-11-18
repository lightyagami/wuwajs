"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CloudGameManager = undefined;
const ue_1 = require("ue");
const CustomPromise_1 = require("../../Core/Common/CustomPromise");
const Info_1 = require("../../Core/Common/Info");
const Json_1 = require("../../Core/Common/Json");
const Log_1 = require("../../Core/Common/Log");
const ResourceSystem_1 = require("../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../Core/Utils/StringUtils");
const CloudGameManagerLauncher_1 = require("../../Launcher/Platform/CloudGameManagerLauncher");
const Platform_1 = require("../../Launcher/Platform/Platform");
const CloudGameDefine_1 = require("../CloudGame/CloudGameDefine");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const GlobalData_1 = require("../GlobalData");
const ResetTimeController_1 = require("../World/Controller/ResetTimeController");
const ControllerHolder_1 = require("./ControllerHolder");
class CloudGameManager {
  static get IsCloudGame() {
    return Platform_1.Platform.IsCloudGame();
  }
  static get IsWebPlatform() {
    return CloudGameManager.nF1;
  }
  static get CloudGameTraceId() {
    return CloudGameManager.FLc?.TraceId ?? StringUtils_1.EMPTY_STRING;
  }
  static set CloudUserInfo(e) {
    CloudGameManager.FLc = e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CloudGame", 16, "设置云游戏userInfo", ["userInfo", e]);
    }
  }
  static get CloudUserInfo() {
    return CloudGameManager.FLc;
  }
  static GetCloudGameLoginInfo() {
    return CloudGameManager.FLc.LoginInfo;
  }
  static get CloudGamePadInfo() {
    return CloudGameManager.ju_;
  }
  static get CloudGameDpi() {
    return CloudGameManager.Hu_;
  }
  static get DeviceScreenWidth() {
    return CloudGameManager.Wu_;
  }
  static get DeviceScreenHeight() {
    return CloudGameManager.Qu_;
  }
  static get ScreenWidth() {
    return CloudGameManager.OD_;
  }
  static get ScreenHeight() {
    return CloudGameManager.GD_;
  }
  static Init() {
    var e = ue_1.KismetSystemLibrary.GetCommandLine();
    this.NLc = e.includes(CloudGameManagerLauncher_1.CLOUD_GAME_REBOOT_CMD);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CloudGame", 16, "云游戏初始化", ["IsReboot", this.NLc]);
    }
    if (CloudGameManager.IsCloudGame) {
      ue_1.PerfSightHelper.PostEvent(601, "1");
      e = new ue_1.KuroCloudGameWrapper();
      (CloudGameManager.KuroCloudGameWrapper = e).CloudGameOnReceiveDataDelegate.Bind(CloudGameManager.bBn);
      e.CloudGameOnReceiveDataWithKeyDelegate.Bind(CloudGameManager.qBn);
      e.CloudGameOnChangeResolutionDelegate.Bind(CloudGameManager.Ku_);
      CloudGameManager.BindFunction("OnGamePadDeviceChange", CloudGameManager.OnGamePadDeviceChange);
      if (CloudGameManagerLauncher_1.CloudGameManagerLauncher.IsPreLaunch) {
        CloudGameManager.BindFunction("OnCloudGameLoginPreLaunch", CloudGameManager.OnUserLoginPreLaunch);
        CloudGameManager.BindFunction("SetIsWebPlatform", CloudGameManager.OnSetWebPlatform);
      } else {
        this.ParseCommandLine();
        CloudGameManager.BindFunction("OnCloudGameLogin", CloudGameManager.OnUserLogin);
      }
      this.$u_();
    }
  }
  static VLc(e) {
    if ((Platform_1.Platform.CloudGamePlatform = e) === "Android" || e === "IOS") {
      Info_1.Info.SwitchInputControllerType(5, "InitCloudGame Mobile");
    } else if (e === "Mac" || e === "Windows") {
      Info_1.Info.SwitchInputControllerType(1, "InitCloudGame Desktop");
    }
    CloudGameManager.TryRequestGamePadDevice();
  }
  static $u_() {
    ue_1.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "wp.Runtime.OverrideMultipleRuntimeGridNames Grid_Near&Grid_Middle&Grid_Middle_Far&Grid_Far&Grid_SuperFar&Grid_SSuperFar&Grid_HLOD_Small&Grid_HLOD_Middle&Grid_HLOD&Grid_HLOD_Volume_Small&Grid_HLOD_Volume_Middle&Grid_HLOD_Volume&GridRuntime_Landscape&GridRuntime_LandscapeHLOD&Grid_Water&Grid_Impostor&Grid_ExtremeFarFoliage&Grid_Foliage_Normal&Grid_ISM_Near&Grid_ISM_Middle&Grid_ISM_Far&Grid_ISM_SuperFar&Grid_Foliage_Near&Grid_Foliage_Grass&Grid_Foliage_Middle&Grid_Foliage_Far&Grid_Foliage_SuperFar&Grid_ReverseMiddle&Grid_ReverseFar&Grid_ReverseSuperFar&Grid_SSuperFarReverse&Grid_EnclosedSpaceNear&Grid_EnclosedSpaceMiddle&Grid_EnclosedSpaceFar&Grid_EnclosedSpaceSuperFar&Grid_EnclosedSpaceSSuperFar&Grid_AudioNear&Grid_AudioMiddle&Grid_AudioFar&Grid_AudioSuperFar&Grid_PcgWater&Grid_Light_Middle&Grid_Light_Far&Grid_HighResLandscape&Grid_MSuperFar&HLOD0_200m_300m&HLOD0_300m_500m&HLOD1_400m_800m&HLOD0_500m_1000m&HLOD0_500m_1500m&HLOD1_600m_1200m&HLOD1_800m_2500m&HLOD1_800m_4000m");
    ue_1.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "wp.Runtime.OverrideMultipleRuntimeGridLoadingRangeValues 60&85&200&180&650&2600&100&140&170&100&190&250&440&3500&610&450&1300&274&60&83&100&150&40&80&100&100&196&260&430&860&2600&50&80&130&650&860&40&80&252&86&440&120&156&300&1300&260&430&690&860&1300&1040&2160&3460");
  }
  static BindFunction(e, a) {
    CloudGameManager.GBn.set(e, a);
  }
  static UnBindFunction(e) {
    CloudGameManager.GBn.delete(e);
  }
  static SendData(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CloudGame", 16, "SendData", ["data", e]);
    }
    ue_1.KuroCloudGameWrapper.SendDataToPipeBinary(e);
  }
  static SendDataByKey(e, a) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CloudGame", 16, "SendDataByKey", ["key", e], ["data", a]);
    }
    ue_1.KuroCloudGameWrapper.SendDataToPipeBinaryWithKey(e, a);
  }
  static TryRequestGamePadDevice() {
    if (CloudGameManager.IsCloudGame) {
      CloudGameManager.SendData("RequestGamePadDevice");
    }
  }
  static ExitGame(e) {
    e = {
      Content: e
    };
    e = Json_1.Json.Encode(e);
    CloudGameManager.SendDataByKey("ExitGame", e);
  }
  static ParseCommandLine() {
    var e = ue_1.KismetSystemLibrary.GetCommandLine();
    var a = CloudGameDefine_1.cloudGameDeviceRegex.exec(e);
    if (a) {
      CloudGameManager.Xu_ = a[1];
    }
    var a = CloudGameDefine_1.cloudGameDpiRegex.exec(e);
    if (a) {
      CloudGameManager.Hu_ = Number(a[1]);
    }
    var a = CloudGameDefine_1.cloudGameDeviceScreenResolution.exec(e);
    if (a) {
      CloudGameManager.Wu_ = Number(a[1]);
      CloudGameManager.Qu_ = Number(a[2]);
    }
    var a = CloudGameDefine_1.cloudGameScreenResolution.exec(e);
    if (a) {
      CloudGameManager.OD_ = Number(a[1]);
      CloudGameManager.GD_ = Number(a[2]);
    }
    var a = CloudGameDefine_1.cloudGameIsWeb.exec(e);
    if (a && (Log_1.Log.CheckInfo() && Log_1.Log.Info("CloudGame", 16, "isWebMatch", ["value", a[1]]), a[1] != "%d")) {
      CloudGameManager.nF1 = a[1] == "1";
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CloudGame", 16, "初始化云游戏平台类型", ["-CloudGame", CloudGameManager.IsCloudGame], ["-Device", CloudGameManager.Xu_], ["-Dpi", CloudGameManager.Hu_], ["-DeviceScreenWidth", CloudGameManager.Wu_], ["-DeviceScreenHeight", CloudGameManager.Qu_], ["-IsWeb", CloudGameManager.nF1]);
    }
  }
  static jLc() {
    if (this.HLc === undefined) {
      this.HLc = new CustomPromise_1.CustomPromise();
    }
    ue_1.KuroStaticLibrary.SaveStringToFile("OnWaitingForUser", this.$Lc);
    ResourceSystem_1.ResourceSystem.SetLoadModeInGame(GlobalData_1.GlobalData.World, "GameProcedure.OnStart");
    CloudGameManager.SendData("RequestLoginPreLaunch");
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CloudGame", 16, "OnWaitingForUser save file", ["WaitingForDbFlagFilePath", this.$Lc]);
    }
  }
  static async WaitForUser() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CloudGame", 16, "WaitForUser");
    }
    if (!this.NLc) {
      if (this.HLc === undefined) {
        this.HLc = new CustomPromise_1.CustomPromise();
        this.jLc();
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("CloudGame", 16, "WaitForUser Waiting……");
      }
      return this.HLc.Promise;
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CloudGame", 16, "WaitForUser skip cause reboot");
    }
  }
  static GetCloudGameSafeZone() {
    if (!CloudGameManager.IsCloudGame) {
      return CloudGameDefine_1.defaultDeviceMargin;
    }
    let e = CloudGameDefine_1.defaultDeviceMargin;
    if ((e = CloudGameDefine_1.deviceMarginMap.has(CloudGameManager.Xu_) ? CloudGameDefine_1.deviceMarginMap.get(CloudGameManager.Xu_) : e) === undefined || e.length < 4) {
      return CloudGameDefine_1.defaultDeviceMargin;
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("CloudGame", 16, "设置UiSafeZone", ["left", e[0]], ["top", e[2]], ["right", e[1]], ["bottom", e[3]]);
      }
      return e;
    }
  }
}
exports.CloudGameManager = CloudGameManager;
(_a = CloudGameManager).KuroCloudGameWrapper = undefined;
CloudGameManager.GBn = new Map();
CloudGameManager.FLc = undefined;
CloudGameManager.ju_ = undefined;
CloudGameManager.Xu_ = StringUtils_1.EMPTY_STRING;
CloudGameManager.Hu_ = CloudGameDefine_1.CLOUD_GAME_DEFAULT_DPI;
CloudGameManager.NLc = false;
CloudGameManager.nF1 = false;
CloudGameManager.HLc = undefined;
CloudGameManager.$Lc = ue_1.KismetSystemLibrary.ConvertToAbsolutePath(ue_1.KuroLauncherLibrary.GameSavedDir() + "waiting_for_db.txt");
CloudGameManager.Eh1 = ue_1.KismetSystemLibrary.ConvertToAbsolutePath(ue_1.KuroLauncherLibrary.GameSavedDir() + "SaveDownloadDone.json");
CloudGameManager.Wu_ = CloudGameDefine_1.CLOUD_GAME_DEFAULT_SCREEN_WIDTH;
CloudGameManager.Qu_ = CloudGameDefine_1.CLOUD_GAME_DEFAULT_SCREEN_HEIGHT;
CloudGameManager.OD_ = CloudGameDefine_1.CLOUD_GAME_DEFAULT_SCREEN_WIDTH;
CloudGameManager.GD_ = CloudGameDefine_1.CLOUD_GAME_DEFAULT_SCREEN_HEIGHT;
CloudGameManager.sRr = undefined;
CloudGameManager.bBn = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("CloudGame", 16, "OnReceiveData:", ["key", e]);
  }
  var a = CloudGameManager.GBn.get(e);
  if (a) {
    a(e);
  } else if (Log_1.Log.CheckError()) {
    Log_1.Log.Error("CloudGame", 16, "OnReceiveData: 函数未绑定", ["key", e]);
  }
};
CloudGameManager.qBn = (e, a) => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("CloudGame", 16, "OnReceiveDataWithKey:", ["key", e], ["data", a]);
  }
  var r = CloudGameManager.GBn.get(e);
  if (r) {
    r(a);
  } else if (Log_1.Log.CheckError()) {
    Log_1.Log.Error("CloudGame", 16, "OnReceiveDataWithKey: 函数未绑定", ["key", e], ["data", a]);
  }
};
CloudGameManager.Ku_ = (e, a) => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("CloudGame", 16, "OnResolutionChange:", ["width", e], ["height", a]);
  }
  ue_1.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.SetRes " + e + "x" + a + "w");
};
CloudGameManager.OnGamePadDeviceChange = e => {
  var e = Json_1.Json.Decode(e);
  var a = e.IsConnectPad === 1;
  _a.ju_ = a ? e : undefined;
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ControllerConnectChange, a, e.ProductId, e.VendorId);
};
CloudGameManager.OnUserLogin = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("CloudGame", 16, "OnUserLogin", ["loginInfoJson", e]);
  }
  var e = Json_1.Json.Decode(e);
  if (e === undefined) {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("CloudGame", 16, "OnUserLogin error, userInfo parse fail");
    }
  } else {
    e = {
      LoginInfo: {
        LoginCode: e.LoginCode,
        Uid: e.Uid,
        UserName: e.UserName,
        Token: e.Token
      },
      TraceId: "",
      Platform: Platform_1.Platform.CloudGamePlatform,
      Fps: 0,
      Dpi: 0,
      DeviceResolution: {
        Width: 0,
        Height: 0
      },
      ScreenResolution: {
        Width: 0,
        Height: 0
      },
      ServerTag: "",
      Device: ""
    };
    CloudGameManager.CloudUserInfo = e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("CloudGame", 16, "OnUserLogin", ["CloudUserInfo", e]);
    }
    _a.VLc(Platform_1.Platform.CloudGamePlatform);
    ControllerHolder_1.ControllerHolder.LoginController.OnSdkLogin(CloudGameManager.GetCloudGameLoginInfo());
  }
};
CloudGameManager.OnSetWebPlatform = e => {
  CloudGameManager.nF1 = e == "1";
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("CloudGame", 16, "OnSetWebPlatform", ["IsWeb", e]);
  }
};
CloudGameManager.OnUserLoginPreLaunch = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("CloudGame", 16, "OnUserLoginPreLaunch 1", ["loginInfoJson", e]);
  }
  if (CloudGameManager.HLc === undefined) {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("CloudGame", 16, "OnUserLoginPreLaunch error, not waiting");
    }
  } else {
    e = Json_1.Json.Decode(e);
    if (e === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("CloudGame", 16, "OnUserLoginPreLaunch error, userInfo parse fail");
      }
    } else {
      CloudGameManager.CloudUserInfo = e;
      _a.VLc(e.Platform);
      CloudGameManager.Xu_ = e.Device;
      CloudGameManager.Hu_ = e.Dpi;
      CloudGameManager.Wu_ = e.DeviceResolution.Width;
      CloudGameManager.Qu_ = e.DeviceResolution.Height;
      CloudGameManager.OD_ = e.ScreenResolution.Width;
      CloudGameManager.GD_ = e.ScreenResolution.Height;
      e = ue_1.GameUserSettings.GetGameUserSettings();
      e.SetScreenResolution(new ue_1.IntPoint(CloudGameManager.ScreenWidth, CloudGameManager.ScreenHeight));
      e.ApplySettings(true);
      if (ue_1.BlueprintPathsLibrary.FileExists(CloudGameManager.$Lc)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("CloudGame", 16, "OnUserLoginPreLaunch delete file", ["WaitingForDbFlagFilePath", CloudGameManager.$Lc]);
        }
        ue_1.KuroLauncherLibrary.DeleteFile(CloudGameManager.$Lc);
      }
      ResetTimeController_1.ResetTimeController.ResetTime();
      ResourceSystem_1.ResourceSystem.SetLoadModeInLoading(GlobalData_1.GlobalData.World, "GameProcedure.OnStart");
      let a = 0;
      CloudGameManager.sRr = TimerSystem_1.GameplayTimerSystem.Forever(() => {
        a++;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("CloudGame", 16, "OnUserLoginPreLaunch Wait DB replaced", ["tryTimes", a]);
        }
        var e = ue_1.BlueprintPathsLibrary.FileExists(CloudGameManager.Eh1);
        if ((e || a >= 10) && (CloudGameManager.sRr && (TimerSystem_1.GameplayTimerSystem.Remove(CloudGameManager.sRr), CloudGameManager.sRr = undefined), CloudGameManager.HLc?.SetResult(), CloudGameManager.HLc = undefined, Log_1.Log.CheckInfo())) {
          Log_1.Log.Info("CloudGame", 16, "OnUserLoginPreLaunch Done", ["replaced", e], ["tryTimes", a]);
        }
      }, 500);
    }
  }
}; //# sourceMappingURL=CloudGameManager.js.map