"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginController = undefined;
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Info_1 = require("../../../Core/Common/Info");
const Json_1 = require("../../../Core/Common/Json");
const LanguageSystem_1 = require("../../../Core/Common/LanguageSystem");
const Log_1 = require("../../../Core/Common/Log");
const LogAnalyzer_1 = require("../../../Core/Common/LogAnalyzer");
const Stats_1 = require("../../../Core/Common/Stats");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const NetDefine_1 = require("../../../Core/Define/Net/NetDefine");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Http_1 = require("../../../Core/Http/Http");
const Net_1 = require("../../../Core/Net/Net");
const NetInfo_1 = require("../../../Core/Net/NetInfo");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController");
const VideoResUpdate_1 = require("../../../Launcher/DiffPatch/Update/VideoResUpdate");
const HotPatchKuroSdk_1 = require("../../../Launcher/HotPatchKuroSdk/HotPatchKuroSdk");
const LauncherSdk_1 = require("../../../Launcher/HotPatchKuroSdk/LauncherSdk");
const HotPatchLogReport_1 = require("../../../Launcher/HotPatchLogReport");
const LauncherNetworkDetectionController_1 = require("../../../Launcher/NetworkDetection/LauncherNetworkDetectionController");
const CloudGameManagerLauncher_1 = require("../../../Launcher/Platform/CloudGameManagerLauncher");
const Platform_1 = require("../../../Launcher/Platform/Platform");
const PlatformSdkConfig_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkConfig");
const PlatformSdkManagerNew_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const PlatformSdkReportData_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkReportData");
const PlatformSdkServer_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkServer");
const PreDownloadManager_1 = require("../../../Launcher/PreDownload/PreDownloadManager");
const HotFixManager_1 = require("../../../Launcher/Ui/HotFix/HotFixManager");
const HotFixSceneManager_1 = require("../../../Launcher/Ui/HotFix/HotFixSceneManager");
const HotFixSubPackageDefine_1 = require("../../../Launcher/Ui/HotFix/HotFixSubPackageDefine");
const AppUtil_1 = require("../../../Launcher/Update/AppUtil");
const LanguageUpdateManager_1 = require("../../../Launcher/Update/LanguageUpdateManager");
const ResourceUpdateManager_1 = require("../../../Launcher/Update/ResourceDiffUpdate/ResourceUpdateManager");
const LauncherSerialize_1 = require("../../../Launcher/Util/LauncherSerialize");
const LauncherStorageLib_1 = require("../../../Launcher/Util/LauncherStorageLib");
const CameraController_1 = require("../../Camera/CameraController");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const PublicUtil_1 = require("../../Common/PublicUtil");
const TimeUtil_1 = require("../../Common/TimeUtil");
const CrashCollectionController_1 = require("../../CrashCollection/CrashCollectionController");
const GameSettingsManager_1 = require("../../GameSettings/GameSettingsManager");
const GlobalData_1 = require("../../GlobalData");
const KuroPushController_1 = require("../../KuroPushSdk/KuroPushController");
const KuroSdkReport_1 = require("../../KuroSdk/KuroSdkReport");
const CloudGameManager_1 = require("../../Manager/CloudGameManager");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const ThirdPartySdkManager_1 = require("../../Manager/ThirdPartySdkManager");
const RenderUtil_1 = require("../../Render/Utils/RenderUtil");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiLayer_1 = require("../../Ui/UiLayer");
const UiManager_1 = require("../../Ui/UiManager");
const CombatLog_1 = require("../../Utils/CombatLog");
const BlackScreenController_1 = require("../BlackScreen/BlackScreenController");
const UiBlueprintFunctionLibrary_1 = require("../BpBridge/UiBlueprintFunctionLibrary");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const CursorController_1 = require("../Cursor/CursorController");
const LogReportController_1 = require("../LogReport/LogReportController");
const LogReportDefine_1 = require("../LogReport/LogReportDefine");
const MarqueeController_1 = require("../Marquee/MarqueeController");
const MarqueeModel_1 = require("../Marquee/MarqueeModel");
const PlatformController_1 = require("../Platform/PlatformController");
const ReconnectDefine_1 = require("../ReConnect/ReconnectDefine");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const SdkViewData_1 = require("../SdkUI/SdkViewData");
const UiLoginSceneManager_1 = require("../UiComponent/UiLoginSceneManager");
const LoginDefine_1 = require("./Data/LoginDefine");
const Heartbeat_1 = require("./Heartbeat");
const HeartbeatDefine_1 = require("./HeartbeatDefine");
const LoginModel_1 = require("./LoginModel");
const LoginServerController_1 = require("./LoginServerController");
const LoginUdpDelay_1 = require("./LoginUdpDelay");
const VERIFY_CONFIG_VERSION_INTERVAL = 90000;
const TRY_BACK_TO_GAME_INTERVAL = 3000;
const RENWE_ACCESS_TOKEN_INTERVAL = 600000;
const RPT_INTERVAL = 600000;
const RENWE_ACCESS_TOKEN_CD = 600;
const FOREVERTIME = 86313600;
const HTTP_PREFIX_STRING = "http://";
const LOGINURL_TIMEOUT = 6;
const LOGINURL_POLLING_COUNT = 3;
class HttpResult extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments);
    this.code = 0;
    this.token = "";
    this.host = "";
    this.hosts = undefined;
    this.port = 0;
    this.tcpPort = 0;
    this.tcpRatio = 0;
    this.userData = 0;
    this.errMessage = "";
    this.sex = 0;
    this.banTimeStamp = 0;
    this.banReason = 0;
    this.clientWaitingMode = 0;
    this.clientWaitingTime = 0;
    this.clientAutoInInterval = 0;
  }
}
class RptInfo extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments);
    this.Pid = "";
    this.Bid = "";
    this.Uid = "";
    this.PlayerId = "";
    this.Mac = "";
    this.Plat = "";
    this.Extra = "";
    this.IpLocal = "";
    this.IpServer = "";
    this.Cpu = "";
    this.Motherboard = "";
    this.Gpu = "";
    this.DeviceId = "";
    this.DiskNo = "";
    this.SysUUID = "";
  }
}
class RptExtra extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments);
    this.FailedTime = "";
    this.LocalError = "";
    this.RemoteError = "";
    this.HttpCode = "";
  }
}
class ResultData {
  constructor() {
    this.ImageUrl = "";
  }
}
class Result extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
  }
}
class HttpConnectResultData {
  constructor() {
    this.Success = false;
    this.HttpResult = undefined;
  }
}
const PSN_TICK_INTERVAL = 1000;
const HEALTH_TIP_INTERVAL = 1000;
class LoginController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    var e = new Array();
    e.push(111);
    e.push(103);
    e.push(1650);
    e.push(101);
    e.push(105);
    e.push(107);
    e.push(24619);
    Net_1.Net.InitCanTimerOutMessage(e);
    AudioSystem_1.AudioSystem.SetState("platform", cpp_1.KuroApplication.IniPlatformName());
    AudioSystem_1.AudioSystem.SetRtpcValue("time_local", TimeUtil_1.TimeUtil.GetHoursFloat());
    this.vMi();
    LogAnalyzer_1.LogAnalyzer.SetP4Version(LauncherStorageLib_1.LauncherStorageLib.GetDeviceSaved(LauncherStorageLib_1.ELauncherStorageDeviceKey.PatchP4Version));
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 3, "ConfigVersion", ["PublicJsonVersion", ModelManager_1.ModelManager.LoginModel.PublicJsonVersion], ["PublicMiscVersion", ModelManager_1.ModelManager.LoginModel.PublicMiscVersion], ["PublicUniverseEditorVersion", ModelManager_1.ModelManager.LoginModel.PublicUniverseEditorVersion]);
    }
    return true;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UiManagerInit, LoginController.MMi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ExitGamePush, LoginController.EMi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGetPlayerBasicInfo, LoginController.Wvi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, LoginController.FWe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SdkLoginResult, LoginController.k5a);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SdkRefreshAccessToken, LoginController.bnl);
    if (Platform_1.Platform.IsPs5Platform()) {
      this.Vza = TimerSystem_1.GameplayTimerSystem.Forever(LoginController.Hza, PSN_TICK_INTERVAL);
    }
    this.rhh = TimerSystem_1.GameplayTimerSystem.Forever(LoginController.ohh, HEALTH_TIP_INTERVAL);
    this.QLc = TimerSystem_1.GameplayTimerSystem.Forever(LoginController.Ibc, RPT_INTERVAL, 1, undefined, undefined, false);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UiManagerInit, LoginController.MMi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ExitGamePush, LoginController.EMi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnGetPlayerBasicInfo, LoginController.Wvi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, LoginController.FWe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SdkLoginResult, LoginController.k5a);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SdkRefreshAccessToken, LoginController.bnl);
    this.coa();
    if (Platform_1.Platform.IsPs5Platform() && this.Vza) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.Vza);
      this.Vza = undefined;
    }
    if (this.rhh) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.rhh);
      this.rhh = undefined;
    }
    if (this.QLc) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.QLc);
      this.QLc = undefined;
    }
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(110, LoginController.SMi);
    Net_1.Net.Register(115, LoginController.pla);
    Net_1.Net.Register(24509, LoginController.Y3a);
    Net_1.Net.Register(24972, LoginController.Ta1);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(110);
    Net_1.Net.UnRegister(115);
    Net_1.Net.UnRegister(24509);
    Net_1.Net.UnRegister(24972);
  }
  static yMi(o) {
    Heartbeat_1.Heartbeat.StopHeartBeat(HeartbeatDefine_1.EStopHeartbeat.LogoutNotify);
    Net_1.Net.Disconnect(0);
    ModelManager_1.ModelManager.LoginModel.SetLoginStatus(LoginDefine_1.ELoginStatus.Init);
    if (o.Cvs === Protocol_1.Aki.Protocol.Q4n.Proto_ErrSexChangeLogout) {
      ControllerHolder_1.ControllerHolder.ReConnectController.Logout(ReconnectDefine_1.ELogoutReason.LogoutNotify);
    } else if (o.Cvs === Protocol_1.Aki.Protocol.Q4n.Proto_HadBan || o.Cvs === Protocol_1.Aki.Protocol.Q4n.Proto_ErrLoginDeviceBan || o.Cvs === Protocol_1.Aki.Protocol.Q4n.Proto_ErrLoginIpBan) {
      var r = o.Cvs;
      var n = o.$xs.x9n;
      var t = o.$xs.xSs;
      var t = MathUtils_1.MathUtils.LongToNumber(t) - TimeUtil_1.TimeUtil.GetServerTime();
      var i = t >= FOREVERTIME;
      let e = 161;
      if (r === Protocol_1.Aki.Protocol.Q4n.Proto_ErrLoginDeviceBan) {
        e = 193;
      } else if (r === Protocol_1.Aki.Protocol.Q4n.Proto_ErrLoginIpBan) {
        e = 192;
      }
      if (i) {
        e = 194;
      }
      i = ConfigManager_1.ConfigManager.ReportConfig?.GetBanInfoByTypeAndReason(2, n);
      n = TimeUtil_1.TimeUtil.GetCountDownDataFormat2(t);
      t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(e);
      if (r === Protocol_1.Aki.Protocol.Q4n.Proto_ErrLoginIpBan) {
        t.SetTextArgs(n.CountDownText ?? "");
      } else {
        r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.BanDescribe);
        t.SetTextArgs(r, n.CountDownText ?? "");
      }
      t.FunctionMap.set(1, () => {
        ControllerHolder_1.ControllerHolder.ReConnectController.Logout(ReconnectDefine_1.ELogoutReason.LogoutNotify);
      });
      t.FunctionMap.set(2, () => {
        ControllerHolder_1.ControllerHolder.KuroSdkController.OpenCustomerService(0);
      });
      if (CloudGameManager_1.CloudGameManager.IsCloudGame) {
        CloudGameManager_1.CloudGameManager.ExitGame(t.GetContentText());
      } else {
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
      }
    } else {
      i = ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(o.Cvs);
      let e = 10;
      if (o.Cvs === Protocol_1.Aki.Protocol.Q4n.Proto_ErrCheckClientVersionNeedUpdate) {
        e = 185;
      }
      r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(e);
      r.SetTextArgs(i);
      r.FunctionMap.set(1, () => {
        ControllerHolder_1.ControllerHolder.ReConnectController.Logout(ReconnectDefine_1.ELogoutReason.LogoutNotify);
      });
      if (CloudGameManager_1.CloudGameManager.IsCloudGame) {
        CloudGameManager_1.CloudGameManager.ExitGame(r.GetContentText());
      } else {
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(r);
      }
    }
    ModelManager_1.ModelManager.LoginModel.LogoutNotify = undefined;
  }
  static qO_() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 16, "LoginProcedure-OpenLoginView-加载进入登录的镜头");
    }
    UiLoginSceneManager_1.UiLoginSceneManager.LoadSequenceAsync("LevelSequence_Back", () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 16, "LoginProcedure-OpenLoginView-播放镜头结束，显示登录UI");
      }
      Stats_1.Stat.CreateInstantStat("LoginProcedure_LoginView_CameraAnim_Zoom_Out:End");
      LoginController.IMi();
      RenderUtil_1.RenderUtil.EndPSOSyncMode();
    }, false, () => {
      CameraController_1.CameraController.EnterCameraMode(2, 0.1);
      RenderUtil_1.RenderUtil.BeginPSOSyncMode();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 16, "LoginProcedure-OpenLoginView-播放进入登录的镜头(拉远)");
      }
      Stats_1.Stat.CreateInstantStat("LoginProcedure_LoginView_CameraAnim_Zoom_Out:Start");
      this.Jag();
      LoginController.OpenSdkLoginView();
      LoginServerController_1.LoginServerController.PingAllRegion();
    });
  }
  static OpenLoginView() {
    if (!ModelManager_1.ModelManager.KuroSdkModel.ReportedInitState) {
      KuroSdkReport_1.KuroSdkReport.Report(new KuroSdkReport_1.SdkReportGameInitFinish(undefined));
      ModelManager_1.ModelManager.KuroSdkModel.ReportedInitState = true;
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 16, "LoginProcedure-OpenLoginView-更换PlayerController，初始化登录场景");
    }
    ModelManager_1.ModelManager.LoginModel.SetLoginStatus(LoginDefine_1.ELoginStatus.Init);
    var e = UE.GameplayStatics.GetPlayerController(GlobalData_1.GlobalData.World, 0).GetViewTarget();
    var o = e.D_K2_GetActorLocation();
    var r = e.K2_GetActorRotation();
    var n = e.CameraComponent.FieldOfView;
    if (e !== undefined && n !== undefined && (e = CameraController_1.CameraController.WidgetCamera.DisplayComponent.CineCamera) !== undefined) {
      e.CameraComponent.SetFieldOfView(n);
      e.D_K2_SetActorLocationAndRotation(o, r, false, undefined, true);
      e.GetCineCameraComponent().SetFilmbackPresetByName("16:9 DSLR");
    }
    UE.GameplayStatics.GetGameMode(GlobalData_1.GlobalData.World).ChangePlayerController(UE.BP_StartupPlayerController_C.StaticClass());
    CursorController_1.CursorController.InitMouseByMousePos();
    HotFixSceneManager_1.HotFixSceneManager.SetViewTarget(GlobalData_1.GlobalData.World);
    UiLoginSceneManager_1.UiLoginSceneManager.InitCinematicTick();
    UiLoginSceneManager_1.UiLoginSceneManager.InitRoleObservers(() => {
      LoginController.qO_();
    });
  }
  static CreateCharacterViewToLoginView() {
    if (UiManager_1.UiManager.IsViewOpen("CreateCharacterView")) {
      UiManager_1.UiManager.CloseView("CreateCharacterView");
    }
    BlackScreenController_1.BlackScreenController.AddBlackScreenAsync("Start", "CreateCharacterViewToLoginView").then(() => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 16, "CreateCharacterViewToLoginView - 播放镜头结束，显示登录UI");
      }
      LoginController.IMi();
      BlackScreenController_1.BlackScreenController.RemoveBlackScreen("Close", "CreateCharacterViewToLoginView");
    });
  }
  static TMi() {
    var o = ModelManager_1.ModelManager.LoginModel.TryGetRealServerPort();
    var r = ModelManager_1.ModelManager.LoginModel.SetRpcHttp(LoginController.LMi, 13000);
    if (this.IsSdkLoginMode()) {
      var n = ModelManager_1.ModelManager.LoginServerModel.GetLoginServersByClientRegion();
      if (!n || n.length === 0) {
        n = BaseConfigController_1.BaseConfigController.GetPackageConfigOrDefault(LoginModel_1.STREAM);
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Login", 10, "LoginServers获取失败, 检查CDN是否正常", ["stream", n]);
        }
        return "";
      }
      n = LoginController.w9c();
      if (StringUtils_1.StringUtils.IsEmpty(n)) {
        t = BaseConfigController_1.BaseConfigController.GetPackageConfigOrDefault(LoginModel_1.STREAM);
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Login", 10, "sdkIp获取失败, 检查CDN是否正常", ["stream", t]);
        }
        return "";
      }
      ModelManager_1.ModelManager.LoginModel.SetServerName(ModelManager_1.ModelManager.LoginServerModel.GetCurrentSelectServerName());
      ModelManager_1.ModelManager.LoginModel.SetServerId(ModelManager_1.ModelManager.LoginServerModel.GetCurrentLoginServerId() ?? "0");
      var t = ModelManager_1.ModelManager.LoginModel.GetLoginUid();
      var i = ModelManager_1.ModelManager.LoginModel.GetLoginUserNameWithUriEncode();
      var a = ModelManager_1.ModelManager.LoginModel.GetLoginToken();
      let e = "0";
      if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
        e = UE.KuroSDKManager.GetBasicInfo()?.DeviceId;
      }
      const _ = n.startsWith("http") ? n : `http://${n}:${o}`;
      n = UE.KuroStaticLibrary.HashStringWithSHA1(a);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 16, "LoginProcedure-Http-SDK环境", ["uId", t], ["userName", i], ["token", n], ["userData", r], ["deviceId", e]);
      }
      return `${_}/api/login?loginType=1&userId=${t}&userName=${i}&token=${a}&userData=${r}&deviceId=${e}&loginTraceId=${ModelManager_1.ModelManager.LoginModel.LoginTraceId}`;
    }
    n = ModelManager_1.ModelManager.LoginModel.GetAccount();
    t = ModelManager_1.ModelManager.LoginModel.GetServerIp();
    i = encodeURIComponent(n);
    if (!this.IsSdkLoginMode()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 16, "LoginProcedure-Http-非SDK环境");
      }
      if (ModelManager_1.ModelManager.LoginModel.IsCopyAccount) {
        a = ModelManager_1.ModelManager.LoginModel.GetSourcePlayerAccount() ?? "";
        const _ = t.startsWith("http") ? t : `http://${t}:${o}`;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Login", 16, "LoginProcedure-Http-非SDK环境-IsCopyAccount");
        }
        return `${_}/api/CopyUserLogin?loginType=0&userId=${i}&userName=${i}&token=1&userData=${r}&loginTraceId=${ModelManager_1.ModelManager.LoginModel.LoginTraceId}&sourceAccount=${a}`;
      }
      const _ = t.startsWith("http") ? t : `http://${t}:${o}`;
      return `${_}/api/login?loginType=0&userId=${i}&userName=${i}&token=1&userData=${r}&loginTraceId=${ModelManager_1.ModelManager.LoginModel.LoginTraceId}`;
    }
    const _ = t.startsWith("http") ? t : `http://${t}:${o}`;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 16, "LoginProcedure-Http-非SDK环境-非正式环境", ["serverIp", t], ["serverPort", o], ["userData", r]);
    }
    return `${_}/api/login?loginType=0&userId=${i}&userName=${i}&token=1&userData=${r}&loginTraceId=${ModelManager_1.ModelManager.LoginModel.LoginTraceId}`;
  }
  static DMi() {
    var e = LoginController.w9c();
    var o = ModelManager_1.ModelManager.LoginModel.SetRpcHttp(LoginController.LMi, 13000);
    var r = ModelManager_1.ModelManager.LoginModel.GetLoginUid();
    var n = ModelManager_1.ModelManager.LoginModel.GetLoginUserNameWithUriEncode();
    var t = ModelManager_1.ModelManager.LoginModel.GetLoginToken();
    var i = UE.KuroStaticLibrary.HashStringWithSHA1(t);
    let a = "0";
    a = PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn ? PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetDeviceId() : UE.KuroSDKManager.GetBasicInfo()?.DeviceId ?? "0";
    e = e.startsWith("http") ? e : `http://${e}:5500`;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 16, "LoginProcedure-Http-GlobalSDK环境", ["uId", r], ["userName", n], ["token", i], ["userData", o], ["deviceId", a]);
    }
    return `${e}/api/login?loginType=1&userId=${r}&userName=${n}&token=${t}&userData=${o}&deviceId=${a}&loginTraceId=${ModelManager_1.ModelManager.LoginModel.LoginTraceId}`;
  }
  static async GetSubPackageHttp() {
    var e = this.BuildSubPackageHttp();
    var e = await Http_1.Http.GetAsync(e, undefined, LOGINURL_TIMEOUT);
    if (Http_1.Http.IsConnectionInvalid(e)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Login", 5, "Game阶段获取分包Http-连接服务器失败");
      }
    } else if (e = LauncherSerialize_1.LauncherJson.Parse(e.Data)) {
      this.GameSubPackageHttpData = new HotFixSubPackageDefine_1.SubPackageHttpData();
      this.GameSubPackageHttpData.UserId = e.userId;
      this.GameSubPackageHttpData.Sex = e.sex;
      this.GameSubPackageHttpData.NeedConfirmQuestIdSet = e.needConfirmQuestIdSet;
      this.GameSubPackageHttpData.FinishQuestIdSet = e.finishQuestIdSet;
      this.GameSubPackageHttpData.CurrentBlockIdSet = e.currentBlockIdSet;
      this.GameSubPackageHttpData.Positions = e.positions;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 5, "Game阶段获取分包Http-成功", ["GamePackageHttpData", this.GameSubPackageHttpData]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Login", 5, "Game阶段获取分包Http-反序列化失败");
    }
  }
  static BuildSubPackageHttp() {
    var e = this.IsGlobalSdkLoginMode() ? "5500" : ModelManager_1.ModelManager.LoginModel.TryGetRealServerPort();
    var o = ModelManager_1.ModelManager.LoginModel.GetLoginUid();
    if (this.IsSdkLoginMode()) {
      var r = ModelManager_1.ModelManager.LoginModel.GetLoginToken();
      var n = UE.KuroStaticLibrary.HashStringWithSHA1(r);
      var t = UE.KuroSDKManager.GetBasicInfo()?.DeviceId;
      const a = LoginController.w9c();
      var i = ModelManager_1.ModelManager.LoginModel.GetLoginUserNameWithUriEncode();
      const _ = a.startsWith("http") ? a : `http://${a}:${e}`;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 5, "BuildSubPackageHttp-Game-SDK环境", ["uId", o], ["userName", i], ["token", n], ["deviceId", t]);
      }
      return `${_}/api/getResourcePackageInfo?loginType=1&userId=${o}&userName=${i}&token=${r}&deviceId=${t}&loginTraceId=${ModelManager_1.ModelManager.LoginModel.LoginTraceId}`;
    }
    n = ModelManager_1.ModelManager.LoginModel.GetAccount();
    const a = ModelManager_1.ModelManager.LoginModel.GetServerIp();
    o = encodeURIComponent(n);
    const _ = a.startsWith("http") ? a : `http://${a}:${e}`;
    i = `${_}/api/getResourcePackageInfo?loginType=0&userId=${n}&userName=${o}&token=1&loginTraceId=${ModelManager_1.ModelManager.LoginModel.LoginTraceId}`;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Login", 5, "BuildSubPackageHttp-Game-非SDK环境", ["httpString", i]);
    }
    return i;
  }
  static w9c() {
    let e = ModelManager_1.ModelManager.LoginServerModel.GetCurrentSelectServerIp();
    var o = ModelManager_1.ModelManager.LoginServerModel.GetCurrentServerLoginUrlByIndex(LoginController.L9c);
    return e = StringUtils_1.StringUtils.IsEmpty(o) ? e : o;
  }
  static IsSdkLoginMode() {
    return ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() || PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn;
  }
  static IsGlobalSdkLoginMode() {
    return ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() && ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk() || PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn && PlatformSdkConfig_1.PlatformSdkConfig.IsGlobal;
  }
  static vla(e) {
    var o;
    var r;
    if (ModelManager_1.ModelManager.LoginModel.HasBackToGameData()) {
      o = ModelManager_1.ModelManager.LoginModel.CheckBackToGameFailCount();
      r = ModelManager_1.ModelManager.LoginModel.BackToGameFailCount();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 3, "[BackToGame] 重进游戏信息", ["Result", e], ["allowBackToGame", o], ["backToGameFailCount", r]);
      }
      if (!e) {
        ModelManager_1.ModelManager.LoginModel.SetLoginStatus(LoginDefine_1.ELoginStatus.Init);
        if (o) {
          TimerSystem_1.GameplayTimerSystem.Delay(() => {
            this.IMi();
          }, TRY_BACK_TO_GAME_INTERVAL);
        } else {
          ModelManager_1.ModelManager.LoginModel.GetBackToGameData().LoadingWidget.RemoveFromParent();
          ModelManager_1.ModelManager.LoginModel.RemoveBackToGameData();
          this.IMi();
        }
      }
    }
  }
  static async ConnectServer(e, o, r) {
    var n = new HttpConnectResultData();
    var t = Json_1.Json.Parse(o);
    if ((n.HttpResult = t) === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Login", 8, "LoginProcedure-Http-服务器返回http结果反序列化失败!", ["result", o], ["httpCode", e]);
      }
      LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.LoginHttpRet, Protocol_1.Aki.Protocol.Q4n.Proto_HttpResultUndefine);
      this.vla(false);
      n.Success = false;
    } else {
      var o = ModelManager_1.ModelManager.LoginModel.CleanRpcHttp(t.userData);
      var i = UE.KuroStaticLibrary.HashStringWithSHA1(t.token);
      var a = new Array();
      if (t.hosts) {
        for (const _ of t.hosts) {
          if (_ !== undefined && _ !== "" && _.length > 0) {
            a.push(_);
          }
        }
      } else {
        a.push(t.host);
      }
      LauncherNetworkDetectionController_1.LauncherNetworkDetectionController.SetGateWayCheckInfo({
        Hosts: a
      }, ModelManager_1.ModelManager.LoginModel?.GetSdkLoginConfig()?.Uid ?? "");
      if (o) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Login", 16, "LoginProcedure-Http-登录http请求返回", ["Token", i], ["Hosts", a.join()], ["Port", t.port], ["TCPPort", t.tcpPort], ["TCPRatio", t.tcpRatio], ["Code", t.code], ["rpcId", t.userData], ["errMessage", t.errMessage], ["hasRpc", o], ["httpCode", e]);
        }
        if (LoginController.RMi(t)) {
          n.Success = true;
          if (UiManager_1.UiManager.IsViewOpen("LoginQueueTipsView")) {
            await UiManager_1.UiManager.CloseViewAsync("LoginQueueTipsView");
          }
          if (t.sex !== undefined) {
            ModelManager_1.ModelManager.LoginModel.SetPlayerSex(t.sex);
          }
          ModelManager_1.ModelManager.LoginModel.SetLoginStatus(LoginDefine_1.ELoginStatus.LoginHttpRet);
          LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.LoginHttpRet);
          NetInfo_1.NetInfo.TcpPort = t.tcpPort;
          NetInfo_1.NetInfo.UdpPort = t.port;
          NetInfo_1.NetInfo.Token = t.token;
          NetInfo_1.NetInfo.TcpRatio = t.tcpRatio;
          NetInfo_1.NetInfo.DeviceId = KuroPushController_1.KuroPushController.GetClientId();
          LoginController.UMi(t.token, a, t.port, r).then(e => {
            LoginController.DisConnect(e);
            this.vla(e);
            if (e) {
              LoginController.moa();
            }
          }, LoginController.AMi);
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Login", 16, "http请求返回状态错误", ["Token", i], ["Hosts", a.join()], ["Port", t.port], ["TCPPort", t.tcpPort], ["TCPRatio", t.tcpRatio], ["Code", t.code], ["rpcId", t.userData], ["errMessage", t.errMessage], ["hasRpc", o], ["httpCode", e]);
          }
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Login", 16, "http请求返回状态错误", ["Token", i], ["Hosts", a.join()], ["Port", t.port], ["TCPPort", t.tcpPort], ["TCPRatio", t.tcpRatio], ["Code", t.code], ["rpcId", t.userData], ["errMessage", t.errMessage], ["hasRpc", o], ["httpCode", e]);
          }
          ModelManager_1.ModelManager.LoginModel.SetLoginStatus(LoginDefine_1.ELoginStatus.Init);
          LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.LoginHttpRet, t.code);
          this.vla(false);
          n.Success = false;
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Login", 8, "LoginProcedure-Http-http请求返回超时", ["Token", i], ["Hosts", a.join()], ["Port", t.port], ["TCPPort", t.tcpPort], ["TCPRatio", t.tcpRatio], ["Code", t.code], ["rpcId", t.userData], ["errMessage", t.errMessage], ["httpCode", e]);
        }
        LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.LoginHttpRet, Protocol_1.Aki.Protocol.Q4n.Proto_HttpTimeout);
        this.vla(false);
        n.Success = false;
      }
    }
    return n;
  }
  static RMi(e) {
    var o = e.code;
    return o === Protocol_1.Aki.Protocol.Q4n.KRs || (o === Protocol_1.Aki.Protocol.Q4n.Proto_ErrLoginDeviceBan || o === Protocol_1.Aki.Protocol.Q4n.Proto_ErrLoginIpBan || o === Protocol_1.Aki.Protocol.Q4n.Proto_HadBan ? this.Dta(e.code, e.banTimeStamp, e.banReason) : o !== Protocol_1.Aki.Protocol.Q4n.Proto_NoHealthyGateway && (ModelManager_1.ModelManager.LoginModel.AddLoginFailCount(), o === Protocol_1.Aki.Protocol.Q4n.Proto_ServerMaintenance || o === Protocol_1.Aki.Protocol.Q4n.Proto_ServerNotOpen || o === Protocol_1.Aki.Protocol.Q4n.Proto_NotInUserIdWhiteList ? this.GetAndShowStopServerNotice() : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenLoginStatusCodeTipView(o)), false);
  }
  static Dta(e, o, r) {
    o = MathUtils_1.MathUtils.LongToNumber(o) - TimeUtil_1.TimeUtil.GetServerTime();
    r = ConfigManager_1.ConfigManager.ReportConfig?.GetBanInfoByTypeAndReason(2, r);
    let n = 161;
    if (e === Protocol_1.Aki.Protocol.Q4n.Proto_ErrLoginDeviceBan) {
      n = 193;
    } else if (e === Protocol_1.Aki.Protocol.Q4n.Proto_ErrLoginIpBan) {
      n = 192;
    }
    if (o >= FOREVERTIME) {
      n = 194;
    }
    var o = TimeUtil_1.TimeUtil.GetCountDownDataFormat2(o);
    var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(n);
    if (e === Protocol_1.Aki.Protocol.Q4n.Proto_ErrLoginIpBan) {
      t.SetTextArgs(o.CountDownText ?? "");
    } else {
      e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r.BanDescribe);
      t.SetTextArgs(e, o.CountDownText ?? "");
    }
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
  }
  static async UMi(n, t, i, e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 16, "LoginProcedure-连接网关", ["token", n], ["host", t.join()], ["port", i], ["isSmokeTest", e], ["LoginTraceId", NetInfo_1.NetInfo.LoginTraceId]);
    }
    let a = false;
    let _ = undefined;
    e: for (let r = 0; r < 3; ++r) {
      for (let o = 0; o < t.length; ++o) {
        let e = false;
        if ((_ = t[o]).startsWith(HTTP_PREFIX_STRING)) {
          e = true;
          _ = _.substring(HTTP_PREFIX_STRING.length);
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Login", 16, "LoginProcedure-连接网关", ["index", o], ["host", _], ["hasHttp", e]);
        }
        var g = r === 2 && o === t.length - 1;
        if (a = await LoginController.PMi(n, _, i, g)) {
          break e;
        }
      }
    }
    if (!a) {
      return a;
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 16, "LoginProcedure-请求密钥");
    }
    if (!(a = await LoginController.xMi())) {
      return a;
    }
    if (ModelManager_1.ModelManager.QuestResourceModel.IsSeparateVideo) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("QuestResource", 38, "清理任务数据");
      }
      ModelManager_1.ModelManager.QuestResourceModel.ClearCheckQuests();
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 16, "LoginProcedure-LoginRequest");
    }
    if (!(a = await LoginController.wMi(n))) {
      return a;
    }
    if (ModelManager_1.ModelManager.LoginModel.GetHasCharacter()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 16, "LoginProcedure-已有角色, 跳过创角");
      }
      ModelManager_1.ModelManager.LoginModel.SetLoginStatus(LoginDefine_1.ELoginStatus.EnterGameReq);
      if (!(a = await LoginController.HandleLoginGame(e, true))) {
        return a;
      }
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 16, "LoginProcedure-请求创角");
      }
      if (e) {
        var o = await LoginController.CreateCharacterRequest();
        if (!(a = await LoginController.HandleLoginGame(e, o === Protocol_1.Aki.Protocol.Q4n.KRs))) {
          return a;
        }
      } else {
        if (LoginController.IsLoginViewOpen()) {
          LoginController.ExitLoginView();
        }
        UiManager_1.UiManager.OpenView("CreateCharacterView");
        if (CloudGameManagerLauncher_1.CloudGameManagerLauncher.IsPreLaunch) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("GameMode", 16, "CloudGame 请求创角");
          }
          GameSettingsManager_1.GameSettingsManager.ApplyCloudGameResolution();
          UE.KuroCloudGameWrapper.SendDataToPipeBinary("HotPatchEnterGame");
        }
      }
    }
    return true;
  }
  static DisConnect(e) {
    if (e) {
      HotPatchLogReport_1.HotPatchLogReport.ReportLogin(HotPatchLogReport_1.LoginLogEventDefine.EnterGame, "enter_game_success");
    } else {
      Net_1.Net.Disconnect(2);
      ModelManager_1.ModelManager.LoginModel.SetLoginStatus(LoginDefine_1.ELoginStatus.Init);
      HotPatchLogReport_1.HotPatchLogReport.ReportLogin(HotPatchLogReport_1.LoginLogEventDefine.EnterGame, "enter_game_failed");
    }
  }
  static async HandleLoginGame(r, n) {
    return new Promise(o => {
      LoginController.EnterGame(e => {
        if (r) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Login", 10, "冒烟测试登录流程", ["登录结果", n], ["EnterGame结果", e]);
          }
          if (!e && !LoginController.IsLoginViewOpen()) {
            LoginController.IMi();
          }
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Login", 10, "正常登录流程", ["登录结果", n], ["EnterGame结果", e]);
          }
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.LoginRequestResult, e);
        }
        o(e);
      });
    });
  }
  static async PMi(e, o, r, n) {
    ModelManager_1.ModelManager.LoginModel.SetLoginStatus(LoginDefine_1.ELoginStatus.ConvGate);
    LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.ConvGate);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 8, "LoginProcedure-登录网关", ["host", o], ["port", r], ["LoginTraceId", ModelManager_1.ModelManager.LoginModel.LoginTraceId]);
    }
    var t = await Net_1.Net.ConnectAsync(o, r, 3000, 1);
    if (t !== 0) {
      if (n) {
        ModelManager_1.ModelManager.LoginModel.AddLoginFailCount();
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenConfirmBoxByTextId("ConnectGateWayFail");
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 30, "LoginProcedure-登录网关失败！", ["result", t], ["token", e], ["host", o], ["port", r]);
      }
      LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.ConvRet, Protocol_1.Aki.Protocol.Q4n.Proto_ConvGateTimeout);
      return false;
    } else {
      ModelManager_1.ModelManager.LoginModel.SetReconnectInfo(e, o, r);
      ModelManager_1.ModelManager.LoginModel.SetLoginStatus(LoginDefine_1.ELoginStatus.ConvRet);
      LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.ConvRet);
      return true;
    }
  }
  static BMi() {
    var e;
    if (UE.KuroStaticLibrary.IsModuleLoaded("KuroTDM")) {
      if (BaseConfigController_1.BaseConfigController.GetPublicValue("SdkArea") !== "CN") {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Login", 27, "海外sdk不使用tdm");
        }
        return "";
      } else if ((e = UE.TDMStaticLibrary.GetDeviceInfo()).includes("Error")) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Login", 27, "TDMStaticLibrary获取设备信息失败", ["tdm", e]);
        }
        return "";
      } else {
        return e;
      }
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 27, "TDMStaticLibrary模块未加载");
      }
      return "";
    }
  }
  static async wMi(e) {
    Stats_1.Stat.CreateInstantStat("LoginProcedure.LoginRequest:Start");
    ModelManager_1.ModelManager.LoginModel.SetLoginStatus(LoginDefine_1.ELoginStatus.LoginReq);
    var o = new Protocol_1.Aki.Protocol.fss();
    o.X9n = ModelManager_1.ModelManager.LoginModel.GetLoginUid();
    o.$9n = e;
    this.vMi();
    o.Y9n = UE.KuroLauncherLibrary.GetAppVersion();
    o.J9n = ModelManager_1.ModelManager.LoginModel.LauncherVersion;
    o.z9n = ModelManager_1.ModelManager.LoginModel.ResourceVersion;
    o.Z9n = PlatformController_1.PlatformController.PackageClientBasicInfo();
    o.e7n = new Protocol_1.Aki.Protocol.e7n();
    o.e7n.t7n = NetDefine_1.CONFIG_MD5_VALUE;
    o.e7n.i7n = NetDefine_1.CONFIG_VERSION;
    o.e7n.r7n = NetDefine_1.PROTO_MD5_VALUE;
    o.e7n.o7n = NetDefine_1.PROTO_SEED_MD5_VALUE;
    o.e7n.n7n = NetDefine_1.PROTO_VERSION;
    var r = BaseConfigController_1.BaseConfigController.GetPackageConfigOrDefault("Stream");
    o.e7n.s7n = r;
    o.n$s = await KuroPushController_1.KuroPushController.GetPushNotiPermissionEnableState();
    o.lea = KuroPushController_1.KuroPushController.GetClientId();
    o.a7n = ModelManager_1.ModelManager.LoginModel.LoginTraceId ?? "";
    o.h7n = new Protocol_1.Aki.Protocol.h7n();
    o.pQ_ = Number(BaseConfigController_1.BaseConfigController.GetConfigVersion("FsmVersion"));
    o.l31 = 1;
    if (ResourceUpdateManager_1.ResourceDiffUpdaterManager.IsGrayBoxHit()) {
      r = UE.KuroLauncherLibrary.IsSeparateVideo();
      o.l31 = r ? VideoResUpdate_1.VideoResUpdate.VideoDownloadState : 1;
      if (ResourceUpdateManager_1.ResourceDiffUpdaterManager.IsAllOptionalResourceDownloaded()) {
        o.TDm = Protocol_1.Aki.Protocol.ADm.Proto_BStateComplete;
      } else {
        o.TDm = Protocol_1.Aki.Protocol.ADm.Proto_BStateSimple;
      }
      if (o.l31 !== 1 || o.TDm !== Protocol_1.Aki.Protocol.ADm.Proto_BStateComplete) {
        r = 2;
        r = (i = HotFixManager_1.HotFixManager.LaunchSubPackageHttpData?.Sex) === 1 ? 1 : i === 0 ? 0 : 2;
        o.UVf = ControllerHolder_1.ControllerHolder.ResourceManagerController.GetDownloadedQuestListBeforeLogin(r);
      }
    } else {
      o.l31 = 1;
      o.TDm = Protocol_1.Aki.Protocol.ADm.Proto_BStateAll;
    }
    let n = false;
    let t = false;
    if (Info_1.Info.PlatformType === 2) {
      n = UE.KuroStaticAndroidLibrary.GetDeviceIsRooted();
      t = UE.KuroStaticAndroidLibrary.GetDeviceIsEmulator();
    } else if (Info_1.Info.PlatformType === 1) {
      n = UE.KuroStaticiOSLibrary.GetDeviceJailbroken();
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 27, "获取ACE信息", ["ifRoot", n], ["ifSimulator", t]);
    }
    o.h7n.l7n = n;
    o.h7n._7n = t;
    var i = this.BMi();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 27, "设备信息", ["tdm", i]);
    }
    o.h7n.u7n = i;
    if (LoginController.bMi()) {
      this.vMi();
      o.c7n = Protocol_1.Aki.Protocol.c7n.create();
      o.c7n.m7n = ModelManager_1.ModelManager.LoginModel.PublicJsonVersion;
      o.c7n.d7n = ModelManager_1.ModelManager.LoginModel.PublicMiscVersion;
      o.c7n.C7n = ModelManager_1.ModelManager.LoginModel.PublicUniverseEditorVersion;
    }
    let a = "";
    let _ = "";
    let g = "";
    let l = 0;
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn && (a = PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetUserId(), (r = await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetSdkOnlineId([a])) && (_ = r.get(a) ?? ""), i = await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetSdkAccountId([a]), (g = i ? i.get(a) ?? "" : g) !== "" && (r = await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestrictedAsync(g), l = r === 1 ? 1 : 0), ModelManager_1.ModelManager.PlayerInfoModel.InitThirdPartyId(a, _, g), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Login", 27, "登录PSN信息", ["psnUserId", a], ["psnOnlineId", _], ["psnAccountId", g]);
    }
    o.Jxa = a;
    o.Qxa = _;
    o.ywa = g;
    o.$4l = l;
    o.z3a = BaseConfigController_1.BaseConfigController.GetPackageClientFightConfig();
    o.L5u = UE.KuroStaticLibrary.IsLowMemoryDevice();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 16, "LoginProcedure-LoginRequest-请求登录", ["account", o.X9n], ["token", o.$9n], ["AppVersion", o.Y9n], ["LauncherVersion", o.J9n], ["ResourceVersion", o.z9n], ["ClientBasicInfo", o.Z9n], ["ConfigMd5", NetDefine_1.CONFIG_MD5_VALUE], ["ConfigVersion", NetDefine_1.CONFIG_VERSION], ["ProtoMd5", NetDefine_1.PROTO_MD5_VALUE], ["ProtoSeedMd5", NetDefine_1.PROTO_SEED_MD5_VALUE], ["ProtoVersion", NetDefine_1.PROTO_VERSION], ["pQ_", o.pQ_], ["IsLowMemoryPlatform", o.L5u], ["LoginTraceId", ModelManager_1.ModelManager.LoginModel.LoginTraceId]);
    }
    i = await LoginController.qMi(o);
    if (i?.Cvs === Protocol_1.Aki.Protocol.Q4n.Proto_ServerFullLoadGate) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 16, "LoginProcedure-LoginRequest-ServerFullLoadGate");
      }
      if (await LoginController.GMi(i.K9n, i.Q9n, i.Oxs)) {
        return LoginController.wMi(e);
      } else {
        ModelManager_1.ModelManager.LoginModel.SetLoginStatus(LoginDefine_1.ELoginStatus.Init);
        return false;
      }
    } else if (ModelManager_1.ModelManager.LoginModel.IsLoginStatus(LoginDefine_1.ELoginStatus.LoginRet)) {
      if (UiManager_1.UiManager.IsViewOpen("LoginQueueTipsView")) {
        await UiManager_1.UiManager.CloseViewAsync("LoginQueueTipsView");
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.LoginSuccess, o.X9n);
      Heartbeat_1.Heartbeat.BeginHeartBeat(HeartbeatDefine_1.EBeginHeartbeat.GetLoginResponse);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 16, "LoginProcedure-LoginRequest-登录成功");
      }
      Stats_1.Stat.CreateInstantStat("LoginProcedure.LoginRequest:End");
      return true;
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Login", 8, "请求登录失败", ["account", o.X9n], ["token", o.$9n]);
      }
      return false;
    }
  }
  static async xMi() {
    ModelManager_1.ModelManager.LoginModel.SetLoginStatus(LoginDefine_1.ELoginStatus.ProtoKeyReq);
    LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.ProtoKeyReq);
    var e = new Protocol_1.Aki.Protocol.Tss();
    e.wVn = true;
    e.g7n = ModelManager_1.ModelManager.LoginModel.LoginTraceId ?? "";
    Net_1.Net.ChangeState1();
    var e = await Net_1.Net.CallAsync(111, e, 3000);
    if (e) {
      Net_1.Net.SetDynamicProtoKey(e.h5n, e.Z4n);
      ModelManager_1.ModelManager.LoginModel.SetLoginStatus(LoginDefine_1.ELoginStatus.ProtoKeyRet);
      LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.ProtoKeyRet);
      return true;
    } else {
      LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.ProtoKeyRet, Protocol_1.Aki.Protocol.Q4n.Proto_ProtoKeyTimeout);
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenConfirmBoxByTextIdNew("Text_HttpTimeout_Text");
      return false;
    }
  }
  static async qMi(e, o = 0) {
    var r = ModelManager_1.ModelManager.LoginModel.GetLoginStatus();
    if (r !== LoginDefine_1.ELoginStatus.Init && r !== LoginDefine_1.ELoginStatus.LoginRet) {
      LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.LoginReq);
      r = await Net_1.Net.CallAsync(103, e, 13000);
      if (r) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Login", 16, "LoginProcedure-LoginRequest-Response", ["Code", r.Cvs]);
        }
        ModelManager_1.ModelManager.LoginModel.Platform = r.f7n;
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Login", 9, "当前登录的游戏服务器节点：", ["response.Platform", r.f7n]);
        }
        if (r.Cvs === Protocol_1.Aki.Protocol.Q4n.Proto_LoginRetry) {
          LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.LoginRet, r.Cvs);
          if (o >= 5) {
            return r;
          } else {
            return await LoginController.qMi(e, o + 1);
          }
        } else {
          if (r.Cvs === Protocol_1.Aki.Protocol.Q4n.Proto_AppVersionNotMatch || r.Cvs === Protocol_1.Aki.Protocol.Q4n.Proto_LauncherVersionIsTooLow || r.Cvs === Protocol_1.Aki.Protocol.Q4n.Proto_ResourceVersionIsTooLow) {
            ModelManager_1.ModelManager.LoginModel.SetLoginStatus(LoginDefine_1.ELoginStatus.Init);
            (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(54)).FunctionMap.set(1, LoginController.NMi);
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
            LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.LoginRet, r.Cvs);
          } else {
            o = r.Cvs === Protocol_1.Aki.Protocol.Q4n.Proto_HaveNoCharacter;
            ModelManager_1.ModelManager.LoginModel.SetHasCharacter(!o);
            ModelManager_1.ModelManager.LoginModel.SetIsNewAccount(o);
            if (o || r.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs) {
              TimeUtil_1.TimeUtil.SetServerTimeStamp(r.Rws);
              TimeUtil_1.TimeUtil.LogTimeZoneOffset();
              e = Number(MathUtils_1.MathUtils.LongToBigInt(r.Rws));
              cpp_1.FuncOpenLibrary.SetFirstTimestamp(e / 1000);
              ModelManager_1.ModelManager.LoginModel.LoginTimeStamp = e / 1000;
              ModelManager_1.ModelManager.LoginModel.SetLoginStatus(LoginDefine_1.ELoginStatus.LoginRet);
              LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.LoginRet);
              ModelManager_1.ModelManager.LoginModel.SetReconnectToken(r.p7n);
            } else {
              LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.LoginRet, r.Cvs);
              if (r.Cvs !== Protocol_1.Aki.Protocol.Q4n.Proto_ServerFullLoadGate) {
                ModelManager_1.ModelManager.LoginModel.AddLoginFailCount();
                ModelManager_1.ModelManager.LoginModel.SetLoginStatus(LoginDefine_1.ELoginStatus.Init);
                ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(r.Cvs, 104);
              }
            }
          }
          return r;
        }
      }
      LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.LoginRet, Protocol_1.Aki.Protocol.Q4n.Proto_LoginReqTimeout);
    }
  }
  static async CreateCharacterRequest() {
    ModelManager_1.ModelManager.LoginModel.SetLoginStatus(LoginDefine_1.ELoginStatus.CreateReq);
    var e = ModelManager_1.ModelManager.LoginModel.GetPlayerSex();
    var o = ModelManager_1.ModelManager.LoginModel.GetPlayerName();
    var r = new Protocol_1.Aki.Protocol.Css();
    r.v7n = e;
    r.H8n = o;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 8, "请求创角", ["Sex", r.v7n], ["Name", r.H8n]);
    }
    LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.CreateReq);
    var e = await Net_1.Net.CallAsync(101, r, 13000);
    if (e) {
      if ((o = e?.Cvs) === Protocol_1.Aki.Protocol.Q4n.Proto_ContainsDirtyWord || o === Protocol_1.Aki.Protocol.Q4n.Proto_ErrRoleInvalidNameLength) {
        LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.CreateRet, o);
      } else if (o !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ModelManager_1.ModelManager.LoginModel.AddLoginFailCount();
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 102);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Login", 8, "请求创角失败", ["Sex", r.v7n], ["Name", r.H8n]);
        }
        LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.CreateRet, o);
      } else {
        ModelManager_1.ModelManager.LoginModel.SetCreatePlayerTime(e.aws);
        ModelManager_1.ModelManager.LoginModel.SetCreatePlayerId(e.W5n);
        this.Ibc();
        ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(3);
        (r = new Map()).set("101104", "");
        KuroSdkReport_1.KuroSdkReport.Report(new KuroSdkReport_1.SdkReportCreateRole(r));
        ModelManager_1.ModelManager.LoginModel.SetLoginStatus(LoginDefine_1.ELoginStatus.CreateRet);
        LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.CreateRet);
        ModelManager_1.ModelManager.LoginModel.SetLoginStatus(LoginDefine_1.ELoginStatus.EnterGameReq);
      }
      return o;
    } else {
      e = Protocol_1.Aki.Protocol.Q4n.Proto_CreateCharacterReqTimeout;
      if (!ModelManager_1.ModelManager.LoginModel?.IsLoginStatus(LoginDefine_1.ELoginStatus.Init)) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("CreateCharacterTimeoutTip");
        LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.CreateRet, e);
        LoginController.DisConnect(false);
        LoginController.OMi();
      }
      return e;
    }
  }
  static SetIfFirstTimeLogin() {
    ModelManager_1.ModelManager.LoginModel.SetTodayFirstTimeLogin(LoginController.kMi());
    ModelManager_1.ModelManager.LoginModel.SetLastLoginTime(TimeUtil_1.TimeUtil.GetServerTime());
  }
  static kMi() {
    var e;
    var o;
    var r = ModelManager_1.ModelManager.LoginModel.GetLastLoginTime();
    return TimeUtil_1.TimeUtil.GetServerTime() - r >= TimeUtil_1.TimeUtil.OneDaySeconds || !r || (e = TimeUtil_1.TimeUtil.GetServerTime(), o = new Date().setHours(4, 0, 0, 0) / 1000, Log_1.Log.CheckInfo() && Log_1.Log.Info("Login", 27, "当前时间", ["time", e]), Log_1.Log.CheckInfo() && Log_1.Log.Info("Login", 27, "之前时间", ["time", r]), Log_1.Log.CheckInfo() && Log_1.Log.Info("Login", 27, "当天4点时间戳", ["time", o]), o <= e && r < o);
  }
  static FMi(n) {
    if (this.IsSdkLoginMode()) {
      if (LoginController.wfa()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Login", 27, "LoginProcedure-RequestEnterGame-SdkAccountChangeNeedExitFlag");
        }
        return;
      }
      var e = ConfigManager_1.ConfigManager.LoginConfig.GetDefaultSingleMapId();
      if (e) {
        ModelManager_1.ModelManager.LoginModel.SetSingleMapId(e);
      }
      if (Info_1.Info.PlatformType !== 3 && BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTipWithSkip()) {
        ModelManager_1.ModelManager.LoginModel.SetSingleMapId(891);
      }
      var e = ConfigManager_1.ConfigManager.LoginConfig.GetDefaultMultiMapId();
      if (e) {
        ModelManager_1.ModelManager.LoginModel.SetMultiMapId(e);
      }
    }
    e = new Protocol_1.Aki.Protocol.pss();
    e.M7n = ModelManager_1.ModelManager.LoginModel.GetSingleMapId();
    e.S7n = ModelManager_1.ModelManager.LoginModel.GetMultiMapId();
    e.E7n = ModelManager_1.ModelManager.LoginModel.BornMode;
    e.l8n = ModelManager_1.ModelManager.LoginModel.BornLocation;
    ModelManager_1.ModelManager.LoadingModel.SetIsLoginToWorld(true);
    LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.EnterGameReq);
    Net_1.Net.ChangeStateEnterGame();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 16, "LoginProcedure-EnterGame-Call", ["enterGameRequest", e]);
    }
    Net_1.Net.Call(105, e, (e, o) => {
      var r;
      if (e) {
        if (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs) {
          n(true);
        } else {
          LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.EnterGameRet, e.Cvs);
          if (e.Cvs !== Protocol_1.Aki.Protocol.Q4n.Proto_ServerFullLoadGame) {
            ModelManager_1.ModelManager.LoginModel.AddLoginFailCount();
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 106);
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Login", 8, "请求进入游戏失败");
            }
            ModelManager_1.ModelManager.LoginModel.SetLoginStatus(LoginDefine_1.ELoginStatus.Init);
            n(false);
          } else {
            LoginController.GMi(e.K9n, e.Q9n, e.Oxs).then(e => {
              if (e) {
                LoginController.FMi(n);
              } else {
                ModelManager_1.ModelManager.LoginModel.SetLoginStatus(LoginDefine_1.ELoginStatus.Init);
                n(false);
              }
            });
          }
        }
      } else {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Login", 8, "请求进入游戏失败, 超时");
        }
        LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.EnterGameRet, Protocol_1.Aki.Protocol.Q4n.Proto_EnterGameTimeout);
        ModelManager_1.ModelManager.LoginModel.SetLoginStatus(LoginDefine_1.ELoginStatus.Init);
        e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(33);
        r = ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(Protocol_1.Aki.Protocol.Q4n.Proto_LoginTimeout);
        e.SetTextArgs(r);
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
        UiManager_1.UiManager.CloseView("NetWorkMaskView");
        n(false);
      }
    }, 13000);
  }
  static async GMi(e, o, r) {
    if (!UiManager_1.UiManager.IsViewOpen("LoginQueueTipsView")) {
      (n = new LoginDefine_1.LoginQueueConfig()).K9n = e;
      n.Q9n = o;
      await UiManager_1.UiManager.OpenViewAsync("LoginQueueTipsView", n);
    }
    ModelManager_1.ModelManager.LoginModel.CreateAutoLoginPromise();
    ModelManager_1.ModelManager.LoginModel.AutoLoginTimerId = TimerSystem_1.GameplayTimerSystem.Delay(() => {
      ModelManager_1.ModelManager.LoginModel.FinishAutoLoginPromise(true);
      ModelManager_1.ModelManager.LoginModel.AutoLoginTimerId = undefined;
    }, Math.max(r, TimeUtil_1.TimeUtil.InverseMillisecond));
    var n;
    var e = await ModelManager_1.ModelManager.LoginModel.WaitAutoLoginPromise();
    if (!e) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 8, "玩家取消了登录排队, 不再排队");
      }
    }
    ModelManager_1.ModelManager.LoginModel.ClearAutoLoginTimerId();
    ModelManager_1.ModelManager.LoginModel.ClearAutoLoginPromise();
    return e;
  }
  static EnterGame(o) {
    Stats_1.Stat.CreateInstantStat("LoginProcedure.RequestEnterGame:Start");
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 16, "LoginProcedure-EnterGame-进入游戏");
    }
    if (ModelManager_1.ModelManager.LoginModel.IsLoginStatus(LoginDefine_1.ELoginStatus.EnterGameReq)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 16, "LoginProcedure-EnterGame-请求进入游戏");
      }
      this.FMi(e => {
        if (e) {
          if (UiManager_1.UiManager.IsViewOpen("LoginQueueTipsView")) {
            UiManager_1.UiManager.CloseViewAsync("LoginQueueTipsView").then(() => {
              ModelManager_1.ModelManager.LoginModel.CleanLoginFailCount(LoginDefine_1.ECleanFailCountWay.LoginSuccess);
              ModelManager_1.ModelManager.LoginModel.SetLoginStatus(LoginDefine_1.ELoginStatus.EnterGameRet);
              LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.EnterGameRet);
              ModelManager_1.ModelManager.LoginModel.LoginTraceId = undefined;
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.EnterGameSuccess);
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("Login", 16, "LoginProcedure-EnterGame-进入游戏成功");
              }
              ModelManager_1.ModelManager.CreatureModel.SetGameplayTagHash(UE.GASBPLibrary.GetNetworkGameplayTagNodeIndexHash());
              Stats_1.Stat.CreateInstantStat("LoginProcedure.EnterGame:End");
              o(true);
            });
          } else {
            ModelManager_1.ModelManager.LoginModel.CleanLoginFailCount(LoginDefine_1.ECleanFailCountWay.LoginSuccess);
            ModelManager_1.ModelManager.LoginModel.SetLoginStatus(LoginDefine_1.ELoginStatus.EnterGameRet);
            LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.EnterGameRet);
            ModelManager_1.ModelManager.LoginModel.LoginTraceId = undefined;
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.EnterGameSuccess);
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Login", 16, "LoginProcedure-EnterGame-进入游戏成功");
            }
            ModelManager_1.ModelManager.CreatureModel.SetGameplayTagHash(UE.GASBPLibrary.GetNetworkGameplayTagNodeIndexHash());
            Stats_1.Stat.CreateInstantStat("LoginProcedure.RequestEnterGame:End");
            o(true);
          }
          this.Ibc();
        } else {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Login", 16, "LoginProcedure-EnterGame-进入游戏失败");
          }
          o(false);
        }
      });
      LoginUdpDelay_1.LoginUdpDelay.Start();
    } else {
      o(false);
    }
  }
  static CheckCanReConnect() {
    if (LoginController.IsLoginViewOpen()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Login", 30, "不能重连 LoginViewOpen");
      }
      ModelManager_1.ModelManager.LoginModel.SetLoginStatus(LoginDefine_1.ELoginStatus.Init);
      return false;
    } else {
      return !LoginController.OMi() || (Log_1.Log.CheckError() && Log_1.Log.Error("Login", 30, "不能重连 CreateCharacterViewOpen"), ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("ConnectGateWayFail"), ModelManager_1.ModelManager.LoginModel.SetLoginStatus(LoginDefine_1.ELoginStatus.Init), false);
    }
  }
  static OMi() {
    return !!UiManager_1.UiManager.IsViewShow("CreateCharacterView") && (UiManager_1.UiManager.CloseView("NetWorkMaskView"), LoginController.CreateCharacterViewToLoginView(), true);
  }
  static cPa(e, o = false, r) {
    if (e === "PsnAuthFail") {
      const n = new ConfirmBoxDefine_1.ConfirmBoxDataNew(209);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(n);
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Login", 16, "[PlatformSdkNew] OnSdkServerFail PsnAuthFail", ["msg", e]);
      }
    } else if (e === "HttpFail") {
      const n = new ConfirmBoxDefine_1.ConfirmBoxDataNew(214);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(n);
      if (r) {
        n.SetCloseFunction(r);
      }
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Login", 16, "[PlatformSdkNew] OnSdkServerFail BadHttp", ["msg", e]);
      }
    } else if (o) {
      const n = new ConfirmBoxDefine_1.ConfirmBoxDataNew(42);
      n.SetTextArgs(e);
      n.SetCloseFunction(() => {
        ControllerHolder_1.ControllerHolder.ReConnectController.Logout(ReconnectDefine_1.ELogoutReason.SdkRenewAccessTokenFailed);
        var e = new PlatformSdkReportData_1.PlatformReportSdkOfflineSucc();
        PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().ReportToThirdParty(e);
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(n);
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Login", 16, "[PlatformSdkNew] OnSdkServerFail needReLogin", ["msg", e]);
      }
    } else {
      const n = new ConfirmBoxDefine_1.ConfirmBoxDataNew(42);
      n.SetTextArgs(e);
      if (r) {
        n.SetCloseFunction(r);
      }
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Login", 16, "[PlatformSdkNew] OnSdkServerFail MsgTip", ["msg", e]);
      }
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(n);
    }
  }
  static async SdkLoginNew() {
    ModelManager_1.ModelManager.LoginModel.SetSdkLoginState(2);
    var e = new CustomPromise_1.CustomPromise();
    this.xml(1, e);
    var e = await e.Promise;
    if (e && (e = new CustomPromise_1.CustomPromise(), this.Pml(e), await e.Promise)) {
      return 0;
    } else {
      return -1;
    }
  }
  static Pml(t) {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().Login((e, o, r, n) => {
      if (r) {
        UiManager_1.UiManager.OpenView("SdkLoginView");
        t.SetResult(false);
      } else if (n) {
        this.OnSdkLoginResult(n.code, n.cuid, n.username);
        t.SetResult(true);
      } else {
        ModelManager_1.ModelManager.LoginModel.SetSdkLoginState(0);
        this.cPa(e, o);
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Login", 16, "LoginProcedure-SdkLoginNew-SDK登录失败", ["msg", e]);
        }
        t.SetResult(false);
      }
    });
  }
  static xml(n, t) {
    var e = PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk();
    if (PlatformSdkServer_1.PlatformSdkServer.IsConnected) {
      t.SetResult(true);
    } else {
      e.ConnectToServer((e, o, r) => {
        if (r) {
          t.SetResult(true);
        } else if (n === 1) {
          PlatformSdkServer_1.PlatformSdkServer.SwitchUrl();
          this.xml(n + 1, t);
        } else {
          ModelManager_1.ModelManager.LoginModel.SetSdkLoginState(0);
          this.cPa(e, o, () => {
            this.SdkLoginNew();
          });
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Login", 16, "LoginProcedure-ConnectToSdkServer-SDK服务器初始化失败");
          }
          t.SetResult(false);
        }
      });
    }
  }
  static OnSdkLoginResult(e, o, r) {
    ModelManager_1.ModelManager.LoginModel.SetSdkLoginInfo(e, o, r);
    this.Mll();
    this.mPa();
  }
  static async Mll() {
    var e;
    var o;
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn) {
      e = new SdkViewData_1.SdkEnterTipsViewData();
      o = PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetUserId();
      o = (await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetSdkOnlineId([o])).get(o) ?? "";
      e.Text = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("SdkLoginSuccess"), o);
      UiManager_1.UiManager.OpenView("SdkEnterTipsView", e);
    }
  }
  static mPa() {
    const n = ModelManager_1.ModelManager.LoginModel.GetSdkLoginInfo();
    if (n) {
      PlatformSdkServer_1.PlatformSdkServer.GetAccessToken(n.LoginCode, (e, o, r) => {
        if (!r || o) {
          ModelManager_1.ModelManager.LoginModel.SetSdkLoginState(0);
          this.cPa(e, o, () => {
            this.SdkLoginNew();
          });
        } else {
          e = {
            LoginCode: LoginDefine_1.ESdkLoginCode.LoginSuccess,
            Uid: n.Uid,
            UserName: n.UserName,
            Token: r.access_token
          };
          ModelManager_1.ModelManager.LoginModel.SdkAccessToken = r.access_token;
          PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().RefreshAccessToken(r.access_token);
          this.OnSdkLogin(e);
          this.JAa();
        }
      });
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Login", 16, "LoginProcedure-GetAccessToken-SDK获取Token失败, sdkLoginInfo为空");
    }
  }
  static JAa() {
    if (!ModelManager_1.ModelManager.LoginModel.SdkAccessTokenCountingState) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("KuroSdk", 43, "开始续签定时器");
      }
      ModelManager_1.ModelManager.LoginModel.SdkAccessTokenRunTime = 0;
      ModelManager_1.ModelManager.LoginModel.SdkAccessTokenCountingState = true;
    }
  }
  static OpenSdkLoginView() {
    var e;
    if (!ModelManager_1.ModelManager.LoginModel.HasBackToGameData()) {
      if (LauncherSdk_1.LauncherSdk.Get().CacheLoginData !== undefined) {
        e = LauncherSdk_1.LauncherSdk.Get().CacheLoginData;
        this.OnSdkLogin(e);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Login", 16, "LoginProcedure-OpenSdkLoginView-Launcher登录缓存");
        }
        LauncherSdk_1.LauncherSdk.Get().ClearCacheLoginData();
      } else {
        if (ControllerHolder_1.ControllerHolder.KuroSdkController.CheckIfSdkLogin()) {
          ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(6);
        }
        if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
          if (UE.KuroLauncherLibrary.IsFirstIntoLauncher()) {
            Stats_1.Stat.CreateInstantStat("LoginProcedure.SdkLogin:Start");
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Login", 16, "LoginProcedure-SdkLogin-首次登录");
            }
            LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.SdkViewOpen);
            ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(0);
          } else {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Login", 16, "LoginProcedure-SdkLogin-非首次登录");
            }
            ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(7);
          }
        }
      }
    }
  }
  static GetAndShowStopServerNotice() {
    var e = ModelManager_1.ModelManager.LoginServerModel.GetCurrentLoginServerId();
    var e = PublicUtil_1.PublicUtil.GetLoginNoticeUrl2(PublicUtil_1.PublicUtil.GetGameId(), LanguageSystem_1.LanguageSystem.PackageLanguage, e) ?? "";
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 27, "获取登录公告", ["http", e]);
    }
    Http_1.Http.Get(e, undefined, this.HMi);
  }
  static jMi() {
    var e = new LoginModel_1.LoginNotice();
    e.Title = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("DefaultLoginTitle") ?? "";
    e.content = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("DefaultLoginNotice") ?? "";
    this.WMi(e);
  }
  static WMi(e) {
    if (e) {
      ModelManager_1.ModelManager.LoginModel.LoginNotice = e;
      (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(42)).SetTitle(ModelManager_1.ModelManager.LoginModel.LoginNotice.Title);
      e.SetTextArgs(ModelManager_1.ModelManager.LoginModel.LoginNotice.content);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    }
  }
  static IMi() {
    Stats_1.Stat.CreateInstantStat("LoginProcedure.EnterLoginView");
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Login", 27, "进入登录界面");
    }
    if (ModelManager_1.ModelManager.LoginModel.HasBackToGameData()) {
      if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn) {
        this.SdkLoginNew();
      } else {
        if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
          this.N5a();
        }
        this.F5a();
      }
    } else if (!this.IsLoginViewOpen()) {
      if (this.IsSdkLoginMode()) {
        ControllerHolder_1.ControllerHolder.KuroSdkController.CloseWebView();
        UiManager_1.UiManager.OpenView("LoginView");
      } else if (!this.KMi()) {
        UiManager_1.UiManager.OpenView("LoginDebugView");
      }
    }
  }
  static F5a() {
    var e = this.IsSdkLoginMode();
    var o = ModelManager_1.ModelManager.LoginModel.GetBackToGameData();
    if (o === undefined || o.BackToGameLoginData === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Login", 27, "LoginToCacheServer", ["cacheSaveData", o]);
      }
    } else {
      ModelManager_1.ModelManager.LoginServerModel.SelectCurrentSelectServerByServerId(o.BackToGameLoginData.SelectServerIp, o.BackToGameLoginData.SelectServerId);
      LoginController.GetHttp(!e);
    }
  }
  static N5a() {
    var e = ModelManager_1.ModelManager.LoginModel.GetBackToGameData();
    var o = e?.BackToGameLoginData;
    if (e === undefined || o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Login", 27, "RecoverSdkLoginData", ["cacheSaveData", e]);
      }
    } else {
      ModelManager_1.ModelManager.LoginModel.SetSdkLoginConfig(o.Uid, o.UserName, o.Token);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 27, "RecoverSdkLoginData", ["loginData", o]);
      }
      ControllerHolder_1.ControllerHolder.KuroSdkController.RecoverSdkData();
    }
  }
  static KMi() {
    var e;
    var o;
    var r;
    return !!GlobalData_1.GlobalData.IsPlayInEditor && !!(e = PublicUtil_1.PublicUtil.TestLoadEditorConfigData())?.EditorStartConfig?.IsReLoadArchive && (o = e.EditorStartConfig.ArchiveAccount, r = e.EditorStartConfig.DungeonId, e.EditorStartConfig.IsReLoadArchive = false, PublicUtil_1.PublicUtil.TestSaveEditorConfigData(e), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Login", 42, "GM读取存档快速登录", ["账号:", o], ["副本ID:", r]), ModelManager_1.ModelManager.LoginModel.SetSingleMapId(r), ModelManager_1.ModelManager.LoginModel.SetAccount(o), LoginController.GetHttp(true), true);
  }
  static IsLoginViewOpen() {
    return UiManager_1.UiManager.IsViewShow("LoginView") || UiManager_1.UiManager.IsViewShow("LoginDebugView");
  }
  static ExitLoginView() {
    if (UiManager_1.UiManager.IsViewShow("LoginDebugView")) {
      UiManager_1.UiManager.CloseView("LoginDebugView");
    }
    if (UiManager_1.UiManager.IsViewShow("LoginView")) {
      UiManager_1.UiManager.CloseView("LoginView");
    }
  }
  static Jag() {
    if (CloudGameManager_1.CloudGameManager.IsCloudGame) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("CloudGame", 58, "云游戏设置LoginTraceId", ["trace", CloudGameManager_1.CloudGameManager.CloudGameTraceId]);
      }
      ModelManager_1.ModelManager.LoginModel.LoginTraceId = CloudGameManager_1.CloudGameManager.CloudGameTraceId;
    } else if (LauncherSdk_1.LauncherSdk.Get().LauncherTraceId !== undefined && LauncherSdk_1.LauncherSdk.Get().LauncherTraceId !== "") {
      ModelManager_1.ModelManager.LoginModel.LoginTraceId = LauncherSdk_1.LauncherSdk.Get().LauncherTraceId;
      LauncherSdk_1.LauncherSdk.Get().LauncherTraceId = "";
    } else {
      ModelManager_1.ModelManager.LoginModel.LoginTraceId = UE.KismetGuidLibrary.NewGuid().ToString();
    }
  }
  static LogLoginProcessLink(e, o = Protocol_1.Aki.Protocol.Q4n.KRs) {
    var r = ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig();
    var n = new LogReportDefine_1.LoginProcessLink();
    n.s_trace_id = ModelManager_1.ModelManager.LoginModel.LoginTraceId ?? "";
    n.s_user_id = r?.Uid ?? "";
    n.s_user_name = r?.UserName ?? ModelManager_1.ModelManager.LoginModel.GetAccount();
    n.s_login_step = LoginDefine_1.ELoginStatus[e];
    n.s_app_version = UE.KuroLauncherLibrary.GetAppVersion();
    n.s_launcher_version = LocalStorage_1.LocalStorage.GetDeviceSaved(LocalStorageDefine_1.ELocalStorageDeviceKey.LauncherPatchVersion, n.s_app_version);
    n.s_resource_version = LocalStorage_1.LocalStorage.GetDeviceSaved(LocalStorageDefine_1.ELocalStorageDeviceKey.PatchVersion, n.s_app_version);
    n.s_client_version = BaseConfigController_1.BaseConfigController.GetVersionString();
    n.i_error_code = o;
    n.s_cpu_info = ModelManager_1.ModelManager.LoginModel.CpuInfo();
    n.s_device_info = ModelManager_1.ModelManager.LoginModel.DeviceInfo();
    n.s_driver_date = ModelManager_1.ModelManager.LoginModel.DriverDate();
    if (HotPatchKuroSdk_1.HotPatchKuroSdk.CanUseSdk()) {
      n.s_device_id = UE.KuroSDKManager.GetBasicInfo().DeviceId;
    }
    if (Platform_1.Platform.IsAndroidPlatform() && UE.KuroStaticAndroidLibrary.IsHarmonyOS()) {
      n.s_os = "HarmonyOS";
      n.s_os_version = UE.KuroStaticAndroidLibrary.GetHarmonyOSVersion();
    } else {
      n.s_os = cpp_1.KuroApplication.IniPlatformName();
      n.s_os_version = UE.KuroStaticLibrary.GetOSVersion();
    }
    n.s_command_line = cpp_1.KuroApplication.GetCommandLine();
    LogReportController_1.LogReportController.LogReport(n);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Login", 8, "上报登录埋点", ["loginStep", LoginDefine_1.ELoginStatus[e]], ["code", o]);
    }
  }
  static DevLoginWithEditorConfig() {
    PublicUtil_1.PublicUtil.SetIsSilentLogin(true);
    UiBlueprintFunctionLibrary_1.default.SetTempLocation(UiBlueprintFunctionLibrary_1.default.TestSceneLoadBornLocation());
    UiBlueprintFunctionLibrary_1.default.TestSceneLogin("AkiWorld_WP");
  }
  static DoPreLogin() {
    this.Vpc();
    var e = UE.KuroLauncherLibrary.GameSavedDir() + "Logs/Tmp";
    var o = UE.KuroStaticLibrary.FindFilesSorted(e, "*");
    var r = o.Num();
    for (let e = 0; e < r; e++) {
      var n = o.Get(e);
      this.KLc.push(n);
    }
    if (this.KLc.length > 0) {
      this.XLc();
    }
    this.Ibc();
  }
  static wFd() {
    return AppUtil_1.AppUtil.IsPioneerApp() || cpp_1.KuroApplication.GetAppReleaseType().toLowerCase() === "prerelease";
  }
  static LFd() {
    return this.wFd() || BaseConfigController_1.BaseConfigController.GetRptIsOpen();
  }
  static PFd(e) {
    if (this.AFd !== "") {
      return [this.AFd, false];
    }
    let o = false;
    let r = "";
    var n = BaseConfigController_1.BaseConfigController.GetCdnUrl();
    if (n) {
      for (const a of n) {
        var t = a.url;
        if (t.includes("qcloud")) {
          r = t;
          break;
        }
      }
    }
    if (r === "" && (r = e ? "https://cdn-qcloud-hw-mc.aki-game.net/prod/client/" : "https://cdn-qcloud-cn-mc.aki-game.com/prod/client/", o = true, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Game", 30, "UseDefaultPrefix");
    }
    var n = BaseConfigController_1.BaseConfigController.GetPublicValue("UrlPath");
    var e = cpp_1.KuroApplication.IniPlatformNameIncludeEditor();
    var i = UE.KuroLauncherLibrary.GetAppVersion();
    this.AFd = r + n + "/" + e + "/" + i + "/ManifestLang_base.txt";
    return [this.AFd, o];
  }
  static YLc(_, e, g, l) {
    const L = (e, o, r, n, t) => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Game", 30, "Aliyun", ["result", e], ["localErrorCode", o], ["remoteErrorCode", r], ["httpResponseCode", n], ["connectedSuccess", t]);
      }
      var i = UE.KuroLauncherLibrary.GameSavedDir() + "Logs/Tmp";
      let a = ModelManager_1.ModelManager.LoginModel.CurrentIdStr;
      if (o === 0) {
        a = e;
        ModelManager_1.ModelManager.LoginModel.CurrentIdStr = e;
        if (l) {
          this.vM1(i + "/" + g);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Game", 30, "RptFailed", ["localErrorCode", o], ["remoteErrorCode", r], ["httpResponseCode", n], ["connectedSuccess", t], ["result", e]);
        }
        if (!l && this.zLc + this.KLc.length < 100) {
          if (!UE.BlueprintPathsLibrary.DirectoryExists(i)) {
            UE.KuroLauncherLibrary.MakeDirectory(i);
          }
          t = i + "/" + g;
          (e = new RptExtra()).FailedTime = Math.floor(TimeUtil_1.TimeUtil.GetServerTimeStamp()).toString();
          e.LocalError = o.toString();
          e.RemoteError = r.toString();
          e.HttpCode = n.toString();
          i = Json_1.Json.Stringify(e);
          o = UE.KuroStaticLibrary.Base64Encode(_) + "," + UE.KuroStaticLibrary.Base64Encode(i);
          UE.KuroStaticLibrary.WriteStringToFile(o, t, true, false);
          this.zLc++;
        }
      }
      this.IO_(a);
      (0, puerts_1.releaseManualReleaseDelegate)(L);
    };
    UE.KuroHttp.PostRpt1(_, e, PublicUtil_1.PublicUtil.GetIfGlobalSdk(), (0, puerts_1.toManualReleaseDelegate)(L), 10);
    if (this.wFd()) {
      this.DFd(_, e);
    }
  }
  static DFd(a, _) {
    const [g, e] = this.PFd(PublicUtil_1.PublicUtil.GetIfGlobalSdk());
    const l = (e, o, r, n, t) => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Game", 30, "Aliyun2", ["localErrorCode", o], ["httpResponseCode", n], ["connectedSuccess", t]);
      }
      let i = false;
      if (o !== 0 || !e.startsWith("qp8oXSMa9nL5uwQRdnGwhNMI4v5AYvrTjSQNz47VTOMjItmZabw6otU77sZmFb")) {
        i = true;
      }
      if (i = n !== 200 ? true : i) {
        TimerSystem_1.GameplayTimerSystem.Delay(() => {
          UE.KuroHttp.PostRpt2(g, a, _, (0, puerts_1.toManualReleaseDelegate)(l), 10);
        }, 1200000, undefined, undefined, false);
      }
      (0, puerts_1.releaseManualReleaseDelegate)(l);
    };
    if (e) {
      TimerSystem_1.GameplayTimerSystem.Delay(() => {
        UE.KuroHttp.PostRpt2(g, a, _, (0, puerts_1.toManualReleaseDelegate)(l), 10);
      }, 1200000, undefined, undefined, false);
    } else {
      UE.KuroHttp.PostRpt2(g, a, _, (0, puerts_1.toManualReleaseDelegate)(l), 10);
    }
  }
  static XLc() {
    var o = this.KLc.shift();
    if (o) {
      var r = UE.KuroLauncherLibrary.GameSavedDir() + "Logs/Tmp";
      var n = (0, puerts_1.$ref)("");
      var r = r + "/" + o;
      UE.KuroStaticLibrary.LoadFileToString(n, r);
      var n = (0, puerts_1.$unref)(n)?.split(",");
      var t = n[0];
      var i = UE.KuroStaticLibrary.Base64Decode(t);
      if (i === "") {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Game", 30, "Aliyun", ["path", o], ["rawData", t], ["base64Data", i]);
        }
        this.vM1(r);
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Game", 30, "Aliyun", ["path", o], ["rawData", t], ["base64Data", i]);
        }
        let e = "";
        e = n.length > 1 ? UE.KuroStaticLibrary.Base64Decode(n[1]) : ((r = new RptExtra()).FailedTime = o.split(".")[0], Json_1.Json.Stringify(r));
        this.YLc(i, e, o, true);
      }
    }
  }
  static vM1(e) {
    if (UE.KuroStaticLibrary.DeleteFile(e)) {
      this.zLc--;
    }
    this.XLc();
  }
  static Jd1(e, o, r) {
    if (e < r && o < r) {
      return [e, o];
    }
    var n = Math.max(e, o);
    let t = 2;
    while (n / t >= r) {
      t *= 2;
    }
    return [Math.floor(e / t), Math.floor(o / t)];
  }
  static IO_(n) {
    if (this.xRc !== n) {
      const t = (e, o, r) => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Game", 30, "Aliyun", ["success", e], ["code", o], ["result", r]);
        }
        this.lJl(r, n);
        (0, puerts_1.releaseManualReleaseDelegate)(t);
      };
      var e = UE.NewMap(UE.BuiltinString, UE.BuiltinString);
      e.Add("Action", "CreateWmBaseImage");
      e.Add("WmType", "PureAppInvisible");
      e.Add("WmInfoSize", "32");
      e.Add("Scale", "2");
      var o = UiLayer_1.UiLayer.UiRootItem ? Math.floor(UiLayer_1.UiLayer.UiRootItem.GetWidth()) : 1024;
      var r = UiLayer_1.UiLayer.UiRootItem ? Math.floor(UiLayer_1.UiLayer.UiRootItem.GetHeight()) : 1024;
      var [o, r] = this.Jd1(o, r, 10000);
      e.Add("Width", o.toString());
      e.Add("Height", r.toString());
      e.Add("Opacity", "7");
      e.Add("WmInfoUint", n);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Game", 30, "SetPlayerId", ["width", o], ["height", r], ["idString", n]);
      }
      UE.KuroHttp.PostAli(e, (0, puerts_1.toManualReleaseDelegate)(t), 10);
    }
  }
  static lJl(e, n) {
    e = Json_1.Json.Parse(e);
    if (e && e.Data) {
      e = e.Data.ImageUrl;
      if (e) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Game", 30, "Aliyun", ["imageUrl", e]);
        }
        if (this.kh1) {
          this.kh1.Cancel();
          this.kh1 = undefined;
        }
        var o = ModelManager_1.ModelManager.LoginModel.GetWaterMarkPath();
        if (UE.BlueprintPathsLibrary.FileExists(o)) {
          UE.KuroLauncherLibrary.DeleteFile(o);
        }
        let r = new UE.DownloaderProxy();
        const i = (e, o) => {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Game", 30, "Aliyun", ["state", e], ["httpState", o], ["savedSize", r?.GetSavedSize()]);
          }
          (0, puerts_1.releaseManualReleaseDelegate)(i);
          r = undefined;
          this.kh1 = undefined;
          this.xRc = n;
          if (!UiManager_1.UiManager.IsClear) {
            if (UiManager_1.UiManager.IsViewOpen("MView")) {
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MReady);
            } else {
              UiManager_1.UiManager.OpenView("MView");
            }
            if (!UiManager_1.UiManager.IsViewOpen("BcView") && BaseConfigController_1.BaseConfigController.GetRptIsOpen()) {
              UiManager_1.UiManager.OpenView("BcView");
            }
          }
        };
        r.SetCompleteCallback((0, puerts_1.toManualReleaseDelegate)(i));
        var t = ".tmp" + this.Oh1;
        r.Start(e, o, t, BigInt(0), -1, true, false, "", 100, true);
        this.kh1 = r;
        this.Oh1++;
      }
    }
  }
  static bbc() {
    if (Info_1.Info.IsAndroidPlatform()) {
      var e = UE.KuroStaticAndroidLibrary.GetCustomChannel();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Game", 30, "GetId", ["info", e]);
      }
      var e = e.split("|");
      if (e.length > 1) {
        return [e[1], ""];
      }
    }
    if (Info_1.Info.IsWindowsPlatform() && !cpp_1.KuroApplication.IsWithEditor()) {
      return this.Lbc();
    } else {
      return ["", ""];
    }
  }
  static Lbc() {
    let e = "";
    let o = "";
    var r;
    var n;
    var t = UE.KismetSystemLibrary.GetProjectContentDirectory() + "Aki/Cursor/CursorData";
    if (UE.BlueprintPathsLibrary.FileExists(t)) {
      r = (0, puerts_1.$ref)(undefined);
      if (UE.KuroStaticLibrary.LoadFileToArray(t, r)) {
        t = UE.KuroStaticLibrary.ArrayToBuffer(r);
        if ((r = new Uint8Array(t)).length > 16 && (t = r.slice(16)).length > 0) {
          o = UE.KuroStaticLibrary.Base64EncodeBinary(t.buffer);
        }
        r = (t = new DataView(r.buffer)).getUint32(0, true);
        n = t.getBigUint64(4, true);
        t = t.getUint32(12, true);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Game", 30, "Aliyun", ["v0", r], ["v1", n], ["v2", t]);
        }
        return [e = t !== 3 ? t.toString() : e, o];
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Game", 30, "GetId LoadFileToArray failed");
        }
        return ["Load Failed", ""];
      }
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Game", 30, "GetId file not exist");
      }
      return ["Not Exist", ""];
    }
  }
  static vMi() {
    var e = ModelManager_1.ModelManager.LoginModel;
    e.PublicJsonVersion = Number(BaseConfigController_1.BaseConfigController.GetConfigVersion("PublicJsonVersion"));
    e.PublicMiscVersion = Number(BaseConfigController_1.BaseConfigController.GetConfigVersion("MiscVersion"));
    e.PublicUniverseEditorVersion = Number(BaseConfigController_1.BaseConfigController.GetConfigVersion("UniverseEditorVersion"));
    var o = UE.KuroLauncherLibrary.GetAppVersion();
    e.LauncherVersion = LocalStorage_1.LocalStorage.GetDeviceSaved(LocalStorageDefine_1.ELocalStorageDeviceKey.LauncherPatchVersion, o);
    e.LauncherVersion = e.LauncherVersion?.length ? e.LauncherVersion : o;
    e.ResourceVersion = LocalStorage_1.LocalStorage.GetDeviceSaved(LocalStorageDefine_1.ELocalStorageDeviceKey.PatchVersion, o);
    e.ResourceVersion = e.ResourceVersion?.length ? e.ResourceVersion : o;
  }
  static bMi() {
    return !GlobalData_1.GlobalData.IsPlayInEditor;
  }
  static moa() {
    var e;
    if (this.bMi()) {
      if ((e = ModelManager_1.ModelManager.LoginModel).VerifyConfigVersionHandle) {
        TimerSystem_1.GameplayTimerSystem.Remove(e.VerifyConfigVersionHandle);
        e.VerifyConfigVersionHandle = undefined;
      }
      e.VerifyConfigVersionHandle = TimerSystem_1.GameplayTimerSystem.Forever(LoginController.doa, VERIFY_CONFIG_VERSION_INTERVAL);
    }
  }
  static coa() {
    var e;
    if (this.bMi() && (e = ModelManager_1.ModelManager.LoginModel).VerifyConfigVersionHandle) {
      TimerSystem_1.GameplayTimerSystem.Remove(e.VerifyConfigVersionHandle);
      e.VerifyConfigVersionHandle = undefined;
    }
  }
  static wfa() {
    var e;
    var o = ModelManager_1.ModelManager.LoginModel.CheckLoginToGameServerSdkConfigIfSame();
    if (o) {
      (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(38)).SetCloseFunction(() => {
        ControllerHolder_1.ControllerHolder.ReConnectController.Logout(ReconnectDefine_1.ELogoutReason.SdkLogoutAccount);
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(e);
    }
    return o;
  }
  static Vpc() {
    var e = PreDownloadManager_1.PreDownloadManager.Get();
    e.CheckEnabledWithTick();
    if (!e.IsPreDownloadEnabled()) {
      ModelManager_1.ModelManager.PreDownloadModel.AddEnableCheck();
    }
  }
}
exports.LoginController = LoginController;
(_a = LoginController).Vza = undefined;
LoginController.rhh = undefined;
LoginController.L9c = 0;
LoginController.SMi = e => {
  cpp_1.FuncOpenLibrary.SetFirstTimestamp(0);
  ModelManager_1.ModelManager.LoginModel.LoginTimeStamp = 0;
  if (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs) {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Login", 8, "收到登出通知, 但没有登出原因!");
    }
  } else if (UiManager_1.UiManager.IsInited) {
    LoginController.yMi(e);
  } else {
    ModelManager_1.ModelManager.LoginModel.LogoutNotify = e;
  }
};
LoginController.pla = e => {
  ControllerHolder_1.ControllerHolder.ReConnectController.CreateBackToGameData(2);
  ControllerHolder_1.ControllerHolder.ReConnectController.TryBackToGame();
};
LoginController.Y3a = e => {
  CombatLog_1.CombatLog.Error("Buff", 0, "客户端和服务端战斗配置不一致，请更到对应服务器ChangeList", ["ChangeList", e.AUs]);
};
LoginController.Ta1 = e => {
  if (ModelManager_1.ModelManager.QuestResourceModel.IsSeparateVideo) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("QuestResource", 38, "添加资源检查");
    }
    ModelManager_1.ModelManager.QuestResourceModel.FillCheckQuests(e.a2s);
  }
  if (ResourceUpdateManager_1.ResourceDiffUpdaterManager.IsGrayBoxHit()) {
    ModelManager_1.ModelManager.ResourceManagerModel.FillLoginInfo(e.a2s, e.$Rs);
  }
};
LoginController.Wvi = () => {
  ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(2);
};
LoginController.Hza = () => {
  if (UiManager_1.UiManager.IsInited && (!Platform_1.Platform.IsPs5Platform() || PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().IsPlatformNetworkReachable() || UiManager_1.UiManager.IsViewOpen("PlayStationNetWorkMaskView") || UiManager_1.UiManager.OpenView("PlayStationNetWorkMaskView"), ModelManager_1.ModelManager.LoginModel.SdkAccessTokenCountingState) && (ModelManager_1.ModelManager.LoginModel.SdkAccessTokenRunTime += PSN_TICK_INTERVAL, ModelManager_1.ModelManager.LoginModel.SdkAccessTokenRunTime >= RENWE_ACCESS_TOKEN_INTERVAL)) {
    _a.WQ_();
  }
};
LoginController.ohh = () => {
  var e = ModelManager_1.ModelManager.LoginModel;
  var o = e.LoginTimeStamp;
  if (!(o <= 0) && !((e = e.HealthTipTime) <= 0)) {
    if (e <= (e = TimeUtil_1.TimeUtil.GetServerTime()) - o) {
      if (ModelManager_1.ModelManager.MarqueeModel.PeekMarqueeData()) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Marquee", 43, "跑马灯被占用，健康提示跑马灯被延后");
        }
      } else {
        TimerSystem_1.GameplayTimerSystem.Remove(_a.rhh);
        _a.rhh = undefined;
        (o = new MarqueeModel_1.MarqueeData()).Id = "HealthTip";
        o.BeginTime = e;
        o.EndTime = e + 60;
        o.ScrollInterval = 20;
        o.ScrollTimes = 2;
        o.LocalTextKey = "HealthyTips_text";
        o.UseLocalTextKey = true;
        o.IsClientMarquee = true;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Marquee", 43, "添加健康提示跑马灯");
        }
        MarqueeController_1.MarqueeController.AddClientMarqueeData(o);
      }
    }
  }
};
LoginController.MMi = () => {
  if (ModelManager_1.ModelManager.LoginModel.GetAutoOpenLoginView()) {
    ModelManager_1.ModelManager.LoginModel.SetAutoOpenLoginView(false);
    LoginController.OpenLoginView();
  }
  if (ModelManager_1.ModelManager.LoginModel.LogoutNotify) {
    LoginController.yMi(ModelManager_1.ModelManager.LoginModel.LogoutNotify);
  }
  if (ModelManager_1.ModelManager.ReConnectModel.DisconnectedFunction) {
    ModelManager_1.ModelManager.ReConnectModel.DisconnectedFunction();
    ModelManager_1.ModelManager.ReConnectModel.DisconnectedFunction = undefined;
  }
};
LoginController.EMi = () => {
  Net_1.Net.Send(114, Protocol_1.Aki.Protocol.Dss.create());
  LanguageUpdateManager_1.LanguageUpdateManager.StopAllDownload();
};
LoginController.GetHttp = (e = false, o = true) => {
  LoginController.L9c = 0;
  LoginController.GetHttpAsync(e, o);
};
LoginController.GetHttpAsync = async (e = false, o = true) => {
  ModelManager_1.ModelManager.LoginModel.FixLoginFailInfo();
  if (!ModelManager_1.ModelManager.LoginModel.IsThisTimeCanLogin()) {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("LoginFailTooManyTimes");
    return false;
  }
  if (!ModelManager_1.ModelManager.LoginModel.IsLoginStatus(LoginDefine_1.ELoginStatus.Init)) {
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Login", 8, "正在登录中, 请勿重复操作！");
    }
    return false;
  }
  Heartbeat_1.Heartbeat.StopHeartBeat(HeartbeatDefine_1.EStopHeartbeat.BeforeGetToken);
  ModelManager_1.ModelManager.LoginModel.SetLoginStatus(LoginDefine_1.ELoginStatus.LoginHttp);
  if (o) {
    _a.Jag();
  }
  let r = "";
  try {
    r = _a.IsGlobalSdkLoginMode() ? LoginController.DMi() : LoginController.TMi();
  } catch (e) {
    if (e instanceof Error) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.ErrorWithStack("Login", 16, "LoginProcedure-Http-登录Http请求 异常。", e, ["error", e.message]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Login", 16, "LoginProcedure-Http-登录Http请求 异常。", ["error", e]);
    }
  }
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Login", 16, "LoginProcedure-Http-登录Http请求 Debug", ["http", r]);
  }
  LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.LoginHttp);
  CrashCollectionController_1.CrashCollectionController.RecordHttpInfo(r);
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Login", 16, "LoginProcedure-Http-登录Http请求");
  }
  ModelManager_1.ModelManager.LoginModel.CacheCurrentSdkLoginConfig();
  var n = await Http_1.Http.GetAsync(r, undefined, LOGINURL_TIMEOUT);
  if (Http_1.Http.IsConnectionInvalid(n)) {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Login", 21, "LoginProcedure-Http-连接服务器失败!", ["httpCode", n.Code], ["index", LoginController.L9c]);
    }
    var t = ModelManager_1.ModelManager.LoginServerModel.GetCurrentServerLoginUrl();
    LoginController.L9c += 1;
    var i = LoginController.L9c;
    if (t && t.length > i && i < LOGINURL_POLLING_COUNT) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 21, "LoginProcedure-Http-切换服务器", ["index", LoginController.L9c]);
      }
      ModelManager_1.ModelManager.LoginModel.SetLoginStatus(LoginDefine_1.ELoginStatus.Init);
      return await LoginController.GetHttpAsync(e, o);
    }
  }
  t = await LoginController.ConnectServer(n.Code, n.Data, e);
  i = t.Success;
  n = t.HttpResult;
  if (!i && n && n.code === Protocol_1.Aki.Protocol.Q4n.Proto_NoHealthyGateway && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Login", 43, "LoginProcedure-Http-重连Http请求", ["http", r], ["clientWaitingMode", n.clientWaitingMode], ["clientWaitingTime", n.clientWaitingTime], ["clientAutoInInterval", n.clientAutoInInterval]), await LoginController.GMi(n.clientWaitingMode, n.clientWaitingTime, n.clientAutoInInterval))) {
    return LoginController.GetHttpAsync(e, o);
  }
  return true;
};
LoginController.GameSubPackageHttpData = undefined;
LoginController.LMi = () => {
  ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenConfirmBoxByTextId("HttpTimeout");
  ModelManager_1.ModelManager.LoginModel.AddLoginFailCount();
  ModelManager_1.ModelManager.LoginModel.SetLoginStatus(LoginDefine_1.ELoginStatus.Init);
  LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.LoginHttpRet, Protocol_1.Aki.Protocol.Q4n.Proto_HttpTimeout);
};
LoginController.AMi = e => {
  if (e instanceof Error) {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.ErrorWithStack("Login", 8, "登录异常发生异常", e, ["error", e.message]);
    }
  } else if (Log_1.Log.CheckError()) {
    Log_1.Log.Error("Login", 8, "登录异常发生异常", ["error", e ?? undefined]);
  }
};
LoginController.OnSdkLogin = e => {
  ControllerHolder_1.ControllerHolder.LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.SDKLoginAfter);
  if (e.LoginCode >= LoginDefine_1.ESdkLoginCode.LoginSuccess) {
    ModelManager_1.ModelManager.LoginModel.SetSdkLoginState(1);
    HotPatchLogReport_1.HotPatchLogReport.ReportLogin(HotPatchLogReport_1.LoginLogEventDefine.SdkLogin, "sdk_login_success");
    ModelManager_1.ModelManager.LoginModel.SetSdkLoginConfig(e.Uid, e.UserName, e.Token);
    ThirdPartySdkManager_1.ThirdPartySdkManager.SetUserInfo(e.Uid);
    LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.SdkLoginSuccecc);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 16, "LoginProcedure-OnSdkLogin-SDK登录成功");
    }
    HotFixManager_1.HotFixManager.SaveHotFixSdkLoginState(true);
    LoginController.wfa();
    ControllerHolder_1.ControllerHolder.LoginServerController.TryGetServerPlayerInfo();
  } else {
    ModelManager_1.ModelManager.LoginModel.SetSdkLoginState(0);
    HotPatchLogReport_1.HotPatchLogReport.ReportLogin(HotPatchLogReport_1.LoginLogEventDefine.SdkLogin, "sdk_login_failed");
    LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.SdkLoginFail);
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Login", 16, "LoginProcedure-OnSdkLogin-SDK登录失败");
    }
  }
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SdkLoginResult);
};
LoginController.QQ_ = 0;
LoginController.WQ_ = () => {
  var e = new Date().getTime() * TimeUtil_1.TimeUtil.Millisecond;
  if (_a.QQ_ !== 0 && e - _a.QQ_ < RENWE_ACCESS_TOKEN_CD) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 43, "续签过于频繁");
    }
  } else {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 43, "触发续签定时器", ["Last", _a.QQ_], ["now", e]);
    }
    ModelManager_1.ModelManager.LoginModel.SdkAccessTokenRunTime = 0;
    _a.QQ_ = e;
    _a.zAa();
  }
};
LoginController.zAa = () => {
  var e = ModelManager_1.ModelManager.LoginModel.SdkAccessToken;
  if (e === "") {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 43, "续签失败，token为空");
    }
  } else {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 43, "发起续签");
    }
    PlatformSdkServer_1.PlatformSdkServer.RenewAccessToken(e, (e, o, r) => {
      if (!r) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Login", 16, "PlatformSdkServer.RenewAccessToken fail", ["msg", e], ["needReLogin", o]);
        }
        if (o) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("KuroSdk", 43, "移除续签定时器");
          }
          ModelManager_1.ModelManager.LoginModel.SdkAccessTokenCountingState = false;
          ModelManager_1.ModelManager.LoginModel.SdkAccessToken = "";
          _a.cPa(e, o);
        }
      }
    });
  }
};
LoginController.OnLogoutAccount = () => {
  var e = ModelManager_1.ModelManager.LoginModel.IsSdkLoggedIn();
  ModelManager_1.ModelManager.LoginModel.SetSdkLoginState(0);
  if (ModelManager_1.ModelManager.LoginModel.GetLoginStatus() >= LoginDefine_1.ELoginStatus.CreateRet && e) {
    ControllerHolder_1.ControllerHolder.ReConnectController.Logout(ReconnectDefine_1.ELogoutReason.SdkLogoutAccount);
  } else {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SdkLoginResult);
    HotPatchLogReport_1.HotPatchLogReport.ReportLogin(HotPatchLogReport_1.LoginLogEventDefine.SdkLogin, "sdk_login_logout");
  }
};
LoginController.NMi = () => {
  ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(5);
};
LoginController.HMi = (e, o, r) => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Login", 8, "获取登录公告返回", ["data", r]);
  }
  if (o === 200 && (o = Json_1.Json.Parse(r))) {
    (r = new LoginModel_1.LoginNotice()).Phrase(o);
    if (!!PublicUtil_1.PublicUtil.IsInIpWhiteList(r.WhiteLists) && !((o = new Date().getTime() * TimeUtil_1.TimeUtil.Millisecond) < r.BeginTime) && !(o > r.EndTime)) {
      LoginController.WMi(r);
    }
  } else {
    _a.jMi();
  }
};
LoginController.xRc = "";
LoginController.KLc = [];
LoginController.zLc = 0;
LoginController.Oh1 = 0;
LoginController.kh1 = undefined;
LoginController.QLc = undefined;
LoginController.AFd = "";
LoginController.Ibc = () => {
  if (_a.LFd()) {
    let e = ModelManager_1.ModelManager.LoginModel.CurrentIdStr;
    if ((e = e === "" ? _a.bbc()[0] : e) === "") {
      e = BaseConfigController_1.BaseConfigController.GetPackageConfigOrDefault("BuildId", "");
    }
    ModelManager_1.ModelManager.LoginModel.CurrentIdStr = e;
    var o = new RptInfo();
    [o.Pid, o.Extra] = _a.bbc();
    o.Bid = BaseConfigController_1.BaseConfigController.GetPackageConfigOrDefault("BuildId", "");
    var r = ModelManager_1.ModelManager.LoginModel;
    o.Uid = r.GetLoginUid();
    o.PlayerId = ModelManager_1.ModelManager.PlayerInfoModel?.GetId()?.toString() ?? "";
    o.Mac = UE.KuroStaticLibrary.GetMacAddress();
    o.Plat = cpp_1.KuroApplication.IniPlatformNameIncludeEditor();
    o.IpLocal = PublicUtil_1.PublicUtil.GetLocalHost();
    o.IpServer = LoginController.w9c() ?? "NoIpServer";
    o.Cpu = UE.KuroStaticLibrary.GetDeviceCPU();
    var r = UE.KuroStaticLibrary.GetProcessorId();
    if (r !== "") {
      o.Cpu += `-${r})`;
    }
    o.Motherboard = Info_1.Info.IsWindowsPlatform() ? UE.KuroStaticLibrary.GetBaseBoardInfo() : cpp_1.FCrashSightProxy.GetSdkDeviceId();
    o.Gpu = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRHIDeviceName();
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      o.DeviceId = UE.KuroSDKManager.GetBasicInfo()?.DeviceId ?? "";
    } else {
      o.DeviceId = UE.KuroStaticLibrary.GetVendorInfo();
    }
    if (Info_1.Info.IsWindowsPlatform()) {
      o.DiskNo = UE.KuroStaticLibrary.GetDiskSerialNo();
      o.SysUUID = UE.KuroStaticLibrary.GetSysUUID();
    }
    var r = Json_1.Json.Stringify(o);
    var o = Math.floor(TimeUtil_1.TimeUtil.GetServerTimeStamp());
    _a.YLc(r, "{}", o + ".txt", false);
  }
};
LoginController.doa = () => {
  var e = ModelManager_1.ModelManager.LoginModel;
  var o = Protocol_1.Aki.Protocol.Roa.create();
  o.Y9n = UE.KuroLauncherLibrary.GetAppVersion();
  o.J9n = e.LauncherVersion;
  o.z9n = e.ResourceVersion;
  Net_1.Net.Send(116, o);
};
LoginController.FWe = () => {
  LoginController.wfa();
};
LoginController.k5a = () => {
  if (ModelManager_1.ModelManager.LoginModel.HasBackToGameData() && PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Login", 8, "新sdk登录成功，并且有返回登录界面信息，直接进入游戏");
    }
    _a.F5a();
    _a.Ibc();
  }
  if (ModelManager_1.ModelManager.LoginModel.IsSdkLogout()) {
    _a.GameSubPackageHttpData = undefined;
  }
};
LoginController.bnl = () => {
  _a.zAa();
}; //# sourceMappingURL=LoginController.js.map