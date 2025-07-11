"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReConnectController = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const Application_1 = require("../../../Core/Application/Application");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Info_1 = require("../../../Core/Common/Info");
const LanguageSystem_1 = require("../../../Core/Common/LanguageSystem");
const Log_1 = require("../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController");
const LauncherProcedure_1 = require("../../../Launcher/LauncherProcedure");
const NetworkDefine_1 = require("../../../Launcher/NetworkDefine");
const HotFixSceneManager_1 = require("../../../Launcher/Ui/HotFix/HotFixSceneManager");
const AppUtil_1 = require("../../../Launcher/Update/AppUtil");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../Common/TimeUtil");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const ThirdPartySdkManager_1 = require("../../Manager/ThirdPartySdkManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const LoadingController_1 = require("../Loading/LoadingController");
const BackToGameDefine_1 = require("../Login/BackToGameDefine");
const Heartbeat_1 = require("../Login/Heartbeat");
const HeartbeatDefine_1 = require("../Login/HeartbeatDefine");
const LoginController_1 = require("../Login/LoginController");
const LogReportController_1 = require("../LogReport/LogReportController");
const LogReportDefine_1 = require("../LogReport/LogReportDefine");
const ReconnectDefine_1 = require("./ReconnectDefine");
const ReConnectModel_1 = require("./ReConnectModel");
const ONE_THOUSAND = 1000;
const TWO_THOUSAND = 2000;
const RECONNECT_TIME_OUT = 20000;
class ReconnectResult {
  constructor(e, o, n = undefined, t = false) {
    this.Result = 0;
    this.Step = ReconnectDefine_1.EReconnectProcessStep.Max;
    this.ErrorCode = undefined;
    this.IsPermittedSilentLogin = false;
    this.Result = e;
    this.Step = o;
    this.ErrorCode = n;
    this.IsPermittedSilentLogin = t;
  }
}
function reportReconnectProcess(e, o = Protocol_1.Aki.Protocol.Q4n.KRs) {
  var n = ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig();
  var t = new LogReportDefine_1.ReconvProcessLink();
  t.s_trace_id = ModelManager_1.ModelManager.ReConnectModel.ReconvTraceId;
  t.s_player_id = ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString() ?? "0";
  t.s_user_id = n?.Uid ?? "";
  t.s_user_name = n?.UserName ?? ModelManager_1.ModelManager.LoginModel.GetAccount();
  t.s_reconv_step = ReconnectDefine_1.EReconnectProcessStep[e];
  t.s_app_version = UE.KuroLauncherLibrary.GetAppVersion();
  t.s_launcher_version = LocalStorage_1.LocalStorage.GetDeviceSaved(LocalStorageDefine_1.ELocalStorageDeviceKey.LauncherPatchVersion, t.s_app_version);
  t.s_resource_version = LocalStorage_1.LocalStorage.GetDeviceSaved(LocalStorageDefine_1.ELocalStorageDeviceKey.PatchVersion, t.s_app_version);
  t.s_client_version = BaseConfigController_1.BaseConfigController.GetVersionString();
  t.i_error_code = o;
  LogReportController_1.LogReportController.LogReport(t);
}
class ReConnectController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    Heartbeat_1.Heartbeat.SetMaxTimeOutHandler(ReConnectController.JQs);
    Net_1.Net.SetAddRequestMaskHandle(ReConnectController.lso);
    Net_1.Net.SetRemoveRequestMaskHandle(ReConnectController._so);
    Net_1.Net.SetNetworkErrorHandle(ReConnectController.uso);
    if (Info_1.Info.IsMobilePlatform()) {
      Application_1.Application.AddApplicationHandler(1, ReConnectController.Oje);
    }
    return true;
  }
  static OnClear() {
    if (Info_1.Info.IsMobilePlatform()) {
      Application_1.Application.RemoveApplicationHandler(1, ReConnectController.Oje);
    }
    return true;
  }
  static OnAddEvents() {
    var e = ModelManager_1.ModelManager.ReConnectModel;
    e.LastNetworkType = AppUtil_1.AppUtil.GetNetworkConnectionType();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Reconnect", 30, "Reconnect OnNetworkChange listen");
    }
    e.NetworkListener.NetworkChangeDelegate.Add(ReConnectController.cso);
  }
  static OnRemoveEvents() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Reconnect", 30, "Reconnect OnNetworkChange unlisten");
    }
    ModelManager_1.ModelManager.ReConnectModel.NetworkListener.NetworkChangeDelegate.Remove(ReConnectController.cso);
  }
  static GmBackToLoginView(e, o) {
    ReConnectController.mso(e, o);
  }
  static dso(e) {
    if (ModelManager_1.ModelManager.ReConnectModel.GetReConnectStatus() !== 0) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Reconnect", 8, "正在尝试重连中, 请勿重复!", ["调用函数", e]);
      }
      return false;
    } else {
      return !!Net_1.Net.IsServerConnected() && !(ModelManager_1.ModelManager.LoginModel.HasReconnectInfo() ? !LoginController_1.LoginController.CheckCanReConnect() && (Log_1.Log.CheckWarn() && Log_1.Log.Warn("Reconnect", 30, "当前还在登录界面, 不触发重连", ["调用函数", e]), 1) : (Log_1.Log.CheckError() && Log_1.Log.Error("Reconnect", 8, "没有重连信息！", ["调用函数", e]), 1));
    }
  }
  static CreateBackToGameData(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Reconnect", 3, "[BackToGame] 创建BackToGameData数据(开始)", ["EBackToGameType", e]);
    }
    if (ModelManager_1.ModelManager.LoginModel.GetBackToGameData()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Reconnect", 3, "[BackToGame] 重复创建BackToGameData", ["BackToGameType", e]);
      }
    } else {
      var o = new BackToGameDefine_1.BackToGameData();
      o.BackToGameType = e;
      o.LoadingTexturePath = ModelManager_1.ModelManager.LoadingModel.GetLoadingTexturePath();
      o.Progress = 0.01;
      o.LoadingTitle = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(ModelManager_1.ModelManager.LoadingModel.GetLoadingTitle());
      o.LoadingTips = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(ModelManager_1.ModelManager.LoadingModel.GetLoadingTips());
      var e = new BackToGameDefine_1.BackToGameLoginData();
      e.Uid = ModelManager_1.ModelManager.LoginModel.GetLoginUid();
      e.UserName = ModelManager_1.ModelManager.LoginModel.GetLoginUserName();
      e.Token = ModelManager_1.ModelManager.LoginModel.GetLoginToken();
      e.SelectServerId = ModelManager_1.ModelManager.LoginServerModel.GetCurrentLoginServerId();
      e.SelectServerIp = ModelManager_1.ModelManager.LoginServerModel.GetCurrentSelectServerIp();
      o.BackToGameLoginData = e;
      if (ModelManager_1.ModelManager.LoginModel.SaveBackToGameData(o)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Reconnect", 3, "[BackToGame] 创建BackToGameData数据(结束)", ["Uid", e.Uid], ["UserName", e.UserName], ["SelectServerId", e.Token], ["SelectServerId", e.SelectServerId], ["SelectServerIp", e.SelectServerIp]);
        }
        return o;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Reconnect", 3, "[BackToGame] 保存BackToGameData到C++失败", ["Reason", "CreateBackToGameData"]);
      }
    }
  }
  static TryBackToGame() {
    var e = ModelManager_1.ModelManager.LoginModel.GetBackToGameData();
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Reconnect", 8, "[BackToGame] backToGameData无效");
      }
      return false;
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Reconnect", 8, "[BackToGame] 返回登录界面并重新进游戏", ["BackToGameType", e.BackToGameType]);
    }
    if (!GlobalData_1.GlobalData.GameInstance?.IsValid() || !GlobalData_1.GlobalData.GameInstance.GetWorld()?.IsValid()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Reconnect", 8, "[BackToGame] 返回登录界面并重新进游戏失败，因为world无效", ["BackToGameType", e.BackToGameType]);
      }
      ModelManager_1.ModelManager.LoginModel.RemoveBackToGameData();
      return false;
    }
    var o = UE.UMGManager.CreateWidget(GlobalData_1.GlobalData.GameInstance.GetWorld(), UE.WBP_UILoading_C.StaticClass());
    if (!o?.IsValid()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Reconnect", 3, "[BackToGame] 创建WBP_UILoading失败");
      }
      return false;
    }
    o.AddToViewport();
    if (!o.IsInViewport()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Reconnect", 3, "[BackToGame] WBP_UILoading的IsInViewport为false");
      }
      return false;
    }
    var n = (e.LoadingWidget = o).Title.Font;
    var t = LanguageSystem_1.LanguageSystem.GetLanguageDefineByCode(LanguageSystem_1.LanguageSystem.PackageLanguage);
    var t = FNameUtil_1.FNameUtil.GetDynamicFName(t.LanguageCode);
    n.TypefaceFontName = t;
    o.Tips.Font.TypefaceFontName = t;
    o.ProgressText.Font.TypefaceFontName = t;
    o.Title.SetText(e.LoadingTitle);
    o.Tips.SetText(e.LoadingTips);
    o.SetProgress(e.Progress, o.FirstProgressRatio, true);
    n = ResourceSystem_1.ResourceSystem.Load(e.LoadingTexturePath, UE.Texture2D);
    o.Image_Background?.SetBrushFromTexture(n);
    UE.KuroStaticLibrary.SynchronizeProperties(o.Title);
    UE.KuroStaticLibrary.SynchronizeProperties(o.Tips);
    UE.KuroStaticLibrary.SynchronizeProperties(o.ProgressText);
    if (!ModelManager_1.ModelManager.LoginModel.SaveBackToGameData(e, true)) {
      UE.KuroStaticLibrary.DestroyObject(o);
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Reconnect", 3, "[BackToGame] 保存BackToGameData到C++失败", ["Reason", "TryBackToGame"]);
      }
      return false;
    }
    AudioSystem_1.AudioSystem.SetState("reconnect_auto_login", "in_auto_login");
    ModelManager_1.ModelManager.ReConnectModel.CancelShowMaskTimer();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BackLoginView);
    Net_1.Net.Disconnect(0);
    Heartbeat_1.Heartbeat.StopHeartBeat(HeartbeatDefine_1.EStopHeartbeat.BackLoginAndEnterGame);
    t = ReConnectController.Cso;
    if (UiManager_1.UiManager.IsViewShow("NetWorkMaskView")) {
      UiManager_1.UiManager.CloseView("NetWorkMaskView", t);
    } else {
      t();
    }
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.FEstimation.Enable 0");
    return true;
  }
  static qGi() {
    var e = ModelManager_1.ModelManager.LoginModel.HasBackToGameData() ? 203 : 38;
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(e);
    e.SetCloseFunction(() => {
      if (ModelManager_1.ModelManager.LoginModel.HasBackToGameData()) {
        ReConnectController.TryBackToGame();
      } else {
        ReConnectController.Cso();
      }
    });
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(e);
  }
  static async gso(e) {
    Net_1.Net.StartReconnecting();
    ModelManager_1.ModelManager.ReConnectModel.SetCurIncId();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Reconnect", 8, "重连中...", ["重连状态", ModelManager_1.ModelManager.ReConnectModel.GetReConnectStatus()], ["当前尝试次数", ModelManager_1.ModelManager.ReConnectModel.GetReConnectCount()], ["当前第几次流程", ModelManager_1.ModelManager.ReConnectModel.GetTryCount() + 1], ["距离上次重连时间", (e / 1000).toFixed(2)]);
    }
    var e = await ReConnectController.fso();
    if (e.Result !== 0 || (e = await ReConnectController.xMi()).Result !== 0) {
      return e;
    } else {
      return await ReConnectController.pso();
    }
  }
  static async fso() {
    var e = ModelManager_1.ModelManager.LoginModel.GetReconnectHost();
    var o = ModelManager_1.ModelManager.LoginModel.GetReconnectPort();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Reconnect", 8, "重连流程, 尝试连接网关");
    }
    reportReconnectProcess(ReconnectDefine_1.EReconnectProcessStep.ConvGate);
    var e = await Net_1.Net.ConnectAsync(e, o, 3000, 1);
    var o = ReconnectDefine_1.EReconnectProcessStep.ConvRet;
    if (ModelManager_1.ModelManager.ReConnectModel.IsReConnectIdSame()) {
      if (e !== 0) {
        reportReconnectProcess(o, Protocol_1.Aki.Protocol.Q4n.Proto_ConvGateTimeout);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Reconnect", 8, "重连流程, 连接网关失败");
        }
        return new ReconnectResult(1, o);
      } else {
        reportReconnectProcess(o);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Reconnect", 8, "重连流程, 连接网关成功");
        }
        return new ReconnectResult(0, o);
      }
    } else {
      return new ReconnectResult(2, o);
    }
  }
  static async xMi() {
    reportReconnectProcess(ReconnectDefine_1.EReconnectProcessStep.ProtoKeyReq);
    var e = new Protocol_1.Aki.Protocol.Tss();
    e.wVn = false;
    e.g7n = ModelManager_1.ModelManager.ReConnectModel.ReconvTraceId;
    Net_1.Net.ChangeState1();
    var e = await Net_1.Net.CallAsync(111, e, 3000);
    var o = ReconnectDefine_1.EReconnectProcessStep.ProtoKeyRet;
    if (ModelManager_1.ModelManager.ReConnectModel.IsReConnectIdSame()) {
      if (e) {
        reportReconnectProcess(o);
        Net_1.Net.SetDynamicProtoKey(e.h5n, e.Z4n);
        return new ReconnectResult(0, o);
      } else {
        reportReconnectProcess(o, Protocol_1.Aki.Protocol.Q4n.Proto_ProtoKeyTimeout);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Reconnect", 21, "重连流程, 获取ProtoKey失败!");
        }
        return new ReconnectResult(1, o);
      }
    } else {
      return new ReconnectResult(2, o);
    }
  }
  static async pso() {
    var e = Net_1.Net.GetDownStreamSeqNo();
    var o = ModelManager_1.ModelManager.LoginModel.GetReconnectToken();
    var n = new Protocol_1.Aki.Protocol.Sss();
    n.W5n = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    n.pHn = e;
    n.p7n = o;
    n.vHn = ModelManager_1.ModelManager.ReConnectModel.ReconvTraceId;
    cpp_1.FuncOpenLibrary.SetFirstTimestamp(0);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Reconnect", 8, "重连流程, 发起登录", ["下行包", e], ["token", o]);
    }
    Net_1.Net.ChangeStateEnterGame();
    reportReconnectProcess(ReconnectDefine_1.EReconnectProcessStep.ReconvReq);
    var e = await Net_1.Net.CallAsync(107, n, RECONNECT_TIME_OUT);
    var o = ReconnectDefine_1.EReconnectProcessStep.ReconvRet;
    if (!ModelManager_1.ModelManager.ReConnectModel.IsReConnectIdSame()) {
      return new ReconnectResult(2, o);
    }
    if (!e) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Reconnect", 8, "重连流程, Reconnect超时!");
      }
      reportReconnectProcess(o, Protocol_1.Aki.Protocol.Q4n.Proto_ReReconvReqTimeout);
      return new ReconnectResult(1, o);
    }
    if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 108, undefined, false);
      reportReconnectProcess(o, e.Q4n);
      return new ReconnectResult(1, o, e.Q4n, e.Fxs);
    }
    reportReconnectProcess(ReconnectDefine_1.EReconnectProcessStep.ReconvRet);
    Net_1.Net.ReconnectSuccessAndReSend(e.Nxs);
    TimeUtil_1.TimeUtil.SetServerTimeStamp(e.Rws);
    n = Number(MathUtils_1.MathUtils.LongToBigInt(e.Rws));
    cpp_1.FuncOpenLibrary.SetFirstTimestamp(n / 1000);
    return new ReconnectResult(0, o);
  }
}
exports.ReConnectController = ReConnectController;
(_a = ReConnectController).lso = e => {
  ModelManager_1.ModelManager.ReConnectModel.AddRpc(e);
  ReConnectController.vso();
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.NetWorkMaskRpcAdd, e);
};
ReConnectController._so = e => {
  ModelManager_1.ModelManager.ReConnectModel.DelRpc(e);
  if (ModelManager_1.ModelManager.ReConnectModel.IsRpcEmpty()) {
    UiManager_1.UiManager.CloseView("NetWorkMaskView");
  }
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.NetWorkMaskRpcRemove, e);
};
ReConnectController.Logout = e => {
  var o = ModelManager_1.ModelManager.ReConnectModel.GetReConnectStatus() !== 0;
  if (o) {
    reportReconnectProcess(ReconnectDefine_1.EReconnectProcessStep.ReconvCancel);
  }
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Reconnect", 8, "调用登出", ["原因", ReconnectDefine_1.ELogoutReason[e]], ["是否正在重连", o]);
  }
  ReConnectModel_1.ReConnectModel.AddReConnectIncId();
  ReConnectController.mso(ReconnectDefine_1.EBackLoginViewReason.Logout);
};
ReConnectController.JQs = () => {
  if (Net_1.Net.IsServerConnected()) {
    ReConnectController.TryReConnect(false, "Heartbeat max time out");
  } else if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Reconnect", 30, "未完成连接，但是触发心跳超时最大次数");
  }
};
ReConnectController.TryReConnect = (e, o) => {
  if (ReConnectController.dso(o)) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Reconnect", 8, "尝试重连", ["调用函数", o], ["是否静默重连", e]);
    }
    (o = ModelManager_1.ModelManager.ReConnectModel).SetReconnectDoing();
    Heartbeat_1.Heartbeat.StopHeartBeat(HeartbeatDefine_1.EStopHeartbeat.ReconnectStart);
    if (e) {
      o.StartShowMaskTimer(ReConnectController.vso);
    } else {
      ReConnectController.vso();
    }
    Net_1.Net.Disconnect(1);
    o.ReconvTraceId = UE.KismetGuidLibrary.NewGuid().ToString();
    ReConnectController.gso(0).then(ReConnectController.Mso, ReConnectController.Eso);
  }
};
ReConnectController.uso = () => {
  ReConnectController.TryReConnect(false, "Net.OnNetworkError");
};
ReConnectController.cso = e => {
  var o = ModelManager_1.ModelManager.ReConnectModel;
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Reconnect", 30, "OnNetworkTypeChange called", ["new type", e]);
  }
  if (e !== o.LastNetworkType) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Reconnect", 30, "OnNetworkTypeChange fire", ["old type", o.LastNetworkType]);
    }
    if ((o.LastNetworkType = e) === NetworkDefine_1.ENetworkType.WiFi || e === NetworkDefine_1.ENetworkType.Cell) {
      ReConnectController.TryReConnect(true, "OnNetworkTypeChange");
    }
  }
};
ReConnectController.Oje = () => {
  var e = Date.now();
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Reconnect", 30, "Application Reactivated", ["nowMs", e], ["lastMs", Net_1.Net.LastReceiveTimeMs]);
  }
  if (e - Net_1.Net.LastReceiveTimeMs > ModelManager_1.ModelManager.ReConnectModel.ServerChannelCloseTimeMs) {
    ReConnectController.TryReConnect(true, "Application Reactivated and channel closed");
  } else {
    Heartbeat_1.Heartbeat.SendHeartbeatImmediately();
  }
};
ReConnectController.mso = (e, o = false) => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Reconnect", 8, "返回登录界面", ["原因", e], ["是否重连失败触发", o]);
  }
  ModelManager_1.ModelManager.ReConnectModel.CancelShowMaskTimer();
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BackLoginView);
  Net_1.Net.Disconnect(0);
  Heartbeat_1.Heartbeat.StopHeartBeat(HeartbeatDefine_1.EStopHeartbeat.BackLoginView);
  e = o ? ReConnectController.Sso : ReConnectController.Cso;
  if (UiManager_1.UiManager.IsViewShow("NetWorkMaskView")) {
    UiManager_1.UiManager.CloseView("NetWorkMaskView", e);
  } else {
    e();
  }
};
ReConnectController.Cso = () => {
  const e = async () => {
    cpp_1.FuncOpenLibrary.SetFirstTimestamp(0);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DoLeaveLevel);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ClearSceneBegin);
    await GlobalData_1.GlobalData.ClearSceneDone?.Promise;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.LogOut);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ExitGamePush);
    ThirdPartySdkManager_1.ThirdPartySdkManager.Logout();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ReconnectClearData);
    UE.KuroLauncherLibrary.LogoutToLauncher();
    UE.KuroPrepareStatementLib.CloseAllConnection();
    HotFixSceneManager_1.HotFixSceneManager.StopHotPatchBgm();
    LauncherProcedure_1.LauncherProcedure.Destroy();
    UE.GameplayStatics.OpenLevel(GlobalData_1.GlobalData.World, ReconnectDefine_1.reconnectMapName);
  };
  if (ModelManager_1.ModelManager.LoginModel.HasBackToGameData()) {
    e();
  } else {
    LoadingController_1.LoadingController.OpenLoadingView(undefined, () => {
      LoadingController_1.LoadingController.CloseLoadingView().then(e);
    });
  }
};
ReConnectController.Sso = () => {
  if (UiManager_1.UiManager.IsInited) {
    ReConnectController.qGi();
  } else {
    ModelManager_1.ModelManager.ReConnectModel.DisconnectedFunction = () => {
      ReConnectController.qGi();
    };
  }
};
ReConnectController.vso = () => {
  if (UiManager_1.UiManager.IsInited && !UiManager_1.UiManager.IsViewOpen("NetWorkMaskView")) {
    UiManager_1.UiManager.OpenView("NetWorkMaskView");
  }
};
ReConnectController.Eso = e => {
  if (ModelManager_1.ModelManager.ReConnectModel) {
    ModelManager_1.ModelManager.ReConnectModel.ClearReconnectData();
  }
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Reconnect", 8, "由于其他原因, 重连流程中断");
  }
  ReConnectController.TryReConnect(false, "ReconnectController.ForceBreakReconnectHandle");
};
ReConnectController.Mso = e => {
  switch (e.Result) {
    case 0:
      ReConnectController.yso();
      break;
    case 1:
      ReConnectController.Iso(e.Step, e.ErrorCode, e.IsPermittedSilentLogin);
      break;
    case 2:
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Reconnect", 8, "由于用户登出, 重连流程不再执行");
      }
  }
};
ReConnectController.yso = () => {
  ModelManager_1.ModelManager.ReConnectModel.CancelShowMaskTimer();
  if (ModelManager_1.ModelManager.ReConnectModel.IsRpcEmpty() && UiManager_1.UiManager.IsViewOpen("NetWorkMaskView")) {
    UiManager_1.UiManager.CloseView("NetWorkMaskView");
  }
  reportReconnectProcess(ReconnectDefine_1.EReconnectProcessStep.ReconvSuccess);
  var e = ModelManager_1.ModelManager.LoginModel.GetReconnectToken();
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Reconnect", 8, "重连流程, 重登成功!", ["重连后下行包:", Net_1.Net.GetDownStreamSeqNo()], ["重连后token", e]);
  }
  ModelManager_1.ModelManager.ReConnectModel.ClearReconnectData();
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ReConnectSuccess);
  Heartbeat_1.Heartbeat.BeginHeartBeat(HeartbeatDefine_1.EBeginHeartbeat.ReConnectSuccess);
};
ReConnectController.Iso = (e, o = undefined, n = false) => {
  Net_1.Net.Disconnect(1);
  ModelManager_1.ModelManager.ReConnectModel.ResetReconnectStatus();
  if (e === ReconnectDefine_1.EReconnectProcessStep.ReconvRet && o !== undefined) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Reconnect", 8, "重连流程, 服务器拒绝，尝试重新进游戏", ["ErrorCode", o]);
    }
    reportReconnectProcess(ReconnectDefine_1.EReconnectProcessStep.ReconvFail);
    if (n) {
      ReConnectController.CreateBackToGameData(1);
    }
    ReConnectController.mso(ReconnectDefine_1.EBackLoginViewReason.ReconnectError, true);
  } else if (ModelManager_1.ModelManager.ReConnectModel.IsReConnectMaxCount()) {
    ModelManager_1.ModelManager.ReConnectModel.AddTryCount();
    ModelManager_1.ModelManager.ReConnectModel.ReSetReConnectCount();
    if (ModelManager_1.ModelManager.ReConnectModel.IsTryMaxCount()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Reconnect", 8, "已达最大重连流程次数,不再尝试重连!");
      }
      ReConnectController.mso(ReconnectDefine_1.EBackLoginViewReason.ReconnectMax, true);
      reportReconnectProcess(ReconnectDefine_1.EReconnectProcessStep.ReconvFail);
    } else {
      ReConnectController.gso(0).then(ReConnectController.Mso, ReConnectController.Eso);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ReConnectFail);
    }
  } else {
    e = ModelManager_1.ModelManager.ReConnectModel.AddReConnectCount();
    const t = Math.pow(2, e) * ONE_THOUSAND + (Math.random() * TWO_THOUSAND - ONE_THOUSAND);
    TimerSystem_1.GameplayTimerSystem.Delay(() => {
      if (ModelManager_1.ModelManager.ReConnectModel.IsReConnectIdSame()) {
        ReConnectController.gso(t).then(ReConnectController.Mso, ReConnectController.Eso);
      }
    }, t);
    Net_1.Net.StartReconnecting();
  }
}; //# sourceMappingURL=ReConnectController.js.map