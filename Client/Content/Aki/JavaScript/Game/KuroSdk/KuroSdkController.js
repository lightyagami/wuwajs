"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuroSdkController = undefined;
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const Application_1 = require("../../Core/Application/Application");
const CustomPromise_1 = require("../../Core/Common/CustomPromise");
const Info_1 = require("../../Core/Common/Info");
const Json_1 = require("../../Core/Common/Json");
const LanguageSystem_1 = require("../../Core/Common/LanguageSystem");
const Log_1 = require("../../Core/Common/Log");
const Protocol_1 = require("../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../Core/Framework/ControllerBase");
const Http_1 = require("../../Core/Http/Http");
const Net_1 = require("../../Core/Net/Net");
const TimerSystem_1 = require("../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../Core/Utils/StringUtils");
const BaseConfigController_1 = require("../../Launcher/BaseConfig/BaseConfigController");
const Platform_1 = require("../../Launcher/Platform/Platform");
const PlatformSdkConfig_1 = require("../../Launcher/Platform/PlatformSdk/PlatformSdkConfig");
const PlatformSdkManagerNew_1 = require("../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const PlatformSdkNew_1 = require("../../Launcher/Platform/PlatformSdk/PlatformSdkNew");
const PlatformSdkReportData_1 = require("../../Launcher/Platform/PlatformSdk/PlatformSdkReportData");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const LocalStorage_1 = require("../Common/LocalStorage");
const LocalStorageDefine_1 = require("../Common/LocalStorageDefine");
const PublicUtil_1 = require("../Common/PublicUtil");
const TimeUtil_1 = require("../Common/TimeUtil");
const GlobalData_1 = require("../GlobalData");
const CloudGameManager_1 = require("../Manager/CloudGameManager");
const ConfigManager_1 = require("../Manager/ConfigManager");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const ConfirmBoxDefine_1 = require("../Module/ConfirmBox/ConfirmBoxDefine");
const LogReportDefine_1 = require("../Module/LogReport/LogReportDefine");
const UiLayer_1 = require("../Ui/UiLayer");
const KuroSdkData_1 = require("./KuroSdkData");
const KuroSdkDefine_1 = require("./KuroSdkDefine");
const PlatformCloudSdkAndroid_1 = require("./PlatformSdk/PlatformCloudSdkAndroid");
const PlatformCloudSdkIos_1 = require("./PlatformSdk/PlatformCloudSdkIos");
const PlatformCloudSdkWeb_1 = require("./PlatformSdk/PlatformCloudSdkWeb");
const PlatformSdkAndroid_1 = require("./PlatformSdk/PlatformSdkAndroid");
const PlatformSdkAndroidGlobal_1 = require("./PlatformSdk/PlatformSdkAndroidGlobal");
const PlatformSdkIos_1 = require("./PlatformSdk/PlatformSdkIos");
const PlatformSdkIosGlobal_1 = require("./PlatformSdk/PlatformSdkIosGlobal");
const PlatformSdkMac_1 = require("./PlatformSdk/PlatformSdkMac");
const PlatformSdkMacGlobal_1 = require("./PlatformSdk/PlatformSdkMacGlobal");
const PlatformSdkWindows_1 = require("./PlatformSdk/PlatformSdkWindows");
const PlatformSdkWindowsGlobal_1 = require("./PlatformSdk/PlatformSdkWindowsGlobal");
const GACHATYPE = 1;
const PAYDELAY = 10000;
const TIMERDELAY = 1000;
const CHECKNOTCEREDDOTGAP = 120000;
class KuroSdkController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    if (KuroSdkController.CanUseSdk()) {
      KuroSdkController._Se();
      KuroSdkController.uSe();
      KuroSdkController.cSe?.Init();
      ControllerHolder_1.ControllerHolder.KuroSdkController.KuroSdkKickBindFunction();
      ControllerHolder_1.ControllerHolder.KuroSdkController.KuroSdkLogoutBindFunction(ControllerHolder_1.ControllerHolder.LoginController.OnLogoutAccount);
      ControllerHolder_1.ControllerHolder.KuroSdkController.KuroSdkLoginBindFunction(ControllerHolder_1.ControllerHolder.LoginController.OnSdkLogin);
    }
    this.mSe();
    this.oSe();
    this.Gpi();
    this.Sul();
    this.zZh();
    KuroSdkController.CXn = (0, puerts_1.toManualReleaseDelegate)(KuroSdkController.gXn);
    UE.KuroStaticAndroidLibrary.AddAndroidScreenChangeDelegate(KuroSdkController.CXn);
    this.JZh();
    return true;
  }
  static CloseWebView(e = "Default") {
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn) {
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().CloseWebView();
    }
    if (this.CanUseSdk() && KuroSdkController.cSe) {
      KuroSdkController.cSe.CloseWebView(e);
    }
  }
  static Sul() {
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn) {
      this.sKe = TimerSystem_1.GameplayTimerSystem.Forever(this.b3a, TIMERDELAY);
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().SetTickInnerState(false);
    }
  }
  static yul() {
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn) {
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().SetTickInnerState(true);
    }
    if (this.sKe) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.sKe);
    }
  }
  static q7e(e) {
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn) {
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().Tick(e);
    }
  }
  static oSe() {
    if (!this.sSe) {
      Application_1.Application.AddApplicationHandler(1, this.A0l);
    }
    this.sSe = true;
  }
  static OnClear() {
    this.dSe();
    this.gAa();
    this.Npi();
    this.CancelCurrentWaitPayItemTimer();
    if (KuroSdkController.CXn) {
      (0, puerts_1.releaseManualReleaseDelegate)(KuroSdkController.gXn);
      KuroSdkController.CXn = undefined;
    }
    this.yul();
    this.ZZh();
    UE.KuroStaticAndroidLibrary.ClearAndroidScreenChangeDelegate();
    return true;
  }
  static gAa() {
    if (this.sSe) {
      Application_1.Application.RemoveApplicationHandler(1, this.A0l);
    }
    this.sSe = false;
  }
  static mSe() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSetLoginServerId, this.CSe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LoginSuccess, this.gSe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLoadingNetDataDone, this.xkt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.FWe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.lqt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SdkRefreshNoticeRedDot, this.b3l);
    if (Platform_1.Platform.IsPs5Platform()) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnQuestStateChange, this.DSe);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnQuestFinishListNotify, this.Gro);
    }
  }
  static dSe() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSetLoginServerId, this.CSe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LoginSuccess, this.gSe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLoadingNetDataDone, this.xkt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.FWe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.lqt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SdkRefreshNoticeRedDot, this.b3l);
    if (Platform_1.Platform.IsPs5Platform()) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnQuestStateChange, this.DSe);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnQuestFinishListNotify, this.Gro);
    }
  }
  static Gpi() {
    Net_1.Net.Register(18208, KuroSdkController._ja);
  }
  static Npi() {
    Net_1.Net.UnRegister(18208);
  }
  static w3l() {
    var e = this.D3l();
    if (!this.B3l && e) {
      this.B3l = TimerSystem_1.GameplayTimerSystem.Forever(this.q3l, CHECKNOTCEREDDOTGAP);
      this.q3l(0);
    }
  }
  static ZZh() {
    if (this.B3l) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.B3l);
      this.B3l = undefined;
    }
  }
  static uSe() {
    if (KuroSdkController.cSe === undefined) {
      if (Platform_1.Platform.IsAndroidPlatform() && !this.GetIfGlobalSdk()) {
        KuroSdkController.cSe = new PlatformSdkAndroid_1.PlatformSdkAndroid();
      } else if (Platform_1.Platform.IsAndroidPlatform() && this.GetIfGlobalSdk()) {
        KuroSdkController.cSe = new PlatformSdkAndroidGlobal_1.PlatformSdkAndroidGlobal();
      } else if (Platform_1.Platform.IsIOSPlatform() && this.GetIfGlobalSdk()) {
        KuroSdkController.cSe = new PlatformSdkIosGlobal_1.PlatformSdkIosGlobal();
      } else if (Platform_1.Platform.IsIOSPlatform() && !this.GetIfGlobalSdk()) {
        KuroSdkController.cSe = new PlatformSdkIos_1.PlatformSdkIos();
      } else if (Platform_1.Platform.IsWindowsPlatform() && !this.GetIfGlobalSdk()) {
        if (Platform_1.Platform.IsCloudGame()) {
          if (CloudGameManager_1.CloudGameManager.IsWebPlatform) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("CloudGame", 58, "云游戏Web SDK初始化");
            }
            KuroSdkController.cSe = new PlatformCloudSdkWeb_1.PlatformCloudSdkWeb();
          } else if (Platform_1.Platform.CloudGamePlatform === "Android") {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("CloudGame", 58, "云游戏Android SDK初始化");
            }
            KuroSdkController.cSe = new PlatformCloudSdkAndroid_1.PlatformCloudSdkAndroid();
          } else if (Platform_1.Platform.CloudGamePlatform === "IOS" || Platform_1.Platform.CloudGamePlatform === "Mac") {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("CloudGame", 58, "云游戏Ios SDK初始化");
            }
            KuroSdkController.cSe = new PlatformCloudSdkIos_1.PlatformCloudSdkIos();
          } else {
            KuroSdkController.cSe = new PlatformSdkWindows_1.PlatformSdkWindows();
          }
        } else {
          KuroSdkController.cSe = new PlatformSdkWindows_1.PlatformSdkWindows();
        }
      } else if (Platform_1.Platform.IsWindowsPlatform() && this.GetIfGlobalSdk()) {
        KuroSdkController.cSe = new PlatformSdkWindowsGlobal_1.PlatformSdkWindowsGlobal();
      } else if (Platform_1.Platform.IsMacPlatform() && !this.GetIfGlobalSdk()) {
        KuroSdkController.cSe = new PlatformSdkMac_1.PlatformSdkMac();
      } else if (Platform_1.Platform.IsMacPlatform() && this.GetIfGlobalSdk()) {
        KuroSdkController.cSe = new PlatformSdkMacGlobal_1.PlatformSdkMacGlobal();
      }
    }
  }
  static GetIfGlobalSdk() {
    return KuroSdkController.fSe || PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn && PlatformSdkConfig_1.PlatformSdkConfig.IsGlobal;
  }
  static GetChannelId() {
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn) {
      return PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetChannelId();
    } else {
      return KuroSdkController.cSe?.GetChannelId() ?? "";
    }
  }
  static GetDeviceDid() {
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn) {
      return PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetDeviceId();
    } else {
      return KuroSdkController.cSe?.GetDeviceDid() ?? "";
    }
  }
  static GetPackageId() {
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn) {
      return PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetPackageId();
    } else {
      return KuroSdkController.cSe?.GetPackageId();
    }
  }
  static CheckIfSdkLogin() {
    return !!KuroSdkController.CanUseSdk() && this.pSe().Uid !== "0";
  }
  static pSe() {
    return UE.KuroSDKManager.GetCurrentLoginInfo();
  }
  static _Se() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 27, "当前sdkarea!!!" + BaseConfigController_1.BaseConfigController.GetPublicValue("SdkArea"));
    }
    KuroSdkController.fSe = PublicUtil_1.PublicUtil.GetIfGlobalSdk();
  }
  static GetAgreement() {
    return KuroSdkController.cSe?.GetAgreement();
  }
  static TestOpenWnd() {
    KuroSdkController.SdkOpenUrlWnd("用户协议", "https://wutheringwaves.kurogame.com/p/agreement_public.html");
  }
  static CanUseSdk() {
    return !PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn && UE.KuroStaticLibrary.IsModuleLoaded("KuroSDK") && BaseConfigController_1.BaseConfigController.GetPublicValue("UseSDK") === KuroSdkDefine_1.USESDK;
  }
  static PostKuroSdkEvent(e) {
    if (KuroSdkController.cSe || PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn) {
      switch (e) {
        case 0:
          KuroSdkController.cSe?.SdkLogin();
          break;
        case 1:
          KuroSdkController.cSe?.SdkKick();
          break;
        case 2:
          this.Lnl();
          break;
        case 3:
          this.Unl();
          break;
        case 4:
          this.Dnl();
          break;
        case 5:
          KuroSdkController.cSe?.SdkExit();
          break;
        case 6:
          KuroSdkController.cSe?.SdkLogout();
          break;
        case 7:
          this.Eul();
          break;
        case 8:
        case 9:
          break;
        case 10:
          this.k3l();
          break;
        case 11:
          this.G3l();
          break;
        case 13:
          this.OpenUserCenter();
          break;
        case 14:
          KuroSdkController.cSe?.ReadProductInfo();
          break;
        case 16:
          this.Iul();
          break;
        case 12:
          KuroSdkController.cSe?.KuroOpenPrivacyClauseWnd();
          break;
        case 15:
          KuroSdkController.cSe?.ShowAgreement();
      }
    } else if (e === 5) {
      this.vSe();
    }
  }
  static Iul() {
    var e;
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn) {
      e = LanguageSystem_1.LanguageSystem.PackageLanguage;
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().NotifyCurrentLanguage(e);
    } else {
      KuroSdkController.cSe?.NotifyLanguage();
    }
  }
  static Eul() {
    KuroSdkController.cSe?.SdkOpenLoginWnd();
  }
  static OpenUserCenter() {
    var e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("KuroSdk", 27, "OpenUserCenter");
    }
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn) {
      if (e = ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig()?.Uid) {
        PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().OpenUserCenter(e, () => {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SdkRefreshAccessToken);
        });
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("KuroSdk", 27, "OpenUserCenter", ["userId", e]);
        }
        PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().OpenUserCenter("test", () => {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SdkRefreshAccessToken);
        });
      }
    } else {
      KuroSdkController.cSe?.OpenUserCenter();
    }
  }
  static vSe() {
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      UE.KismetSystemLibrary.QuitGame(GlobalData_1.GlobalData.World, undefined, 0, false);
    } else if (!KuroSdkController.CanUseSdk()) {
      cpp_1.KuroApplication.ExitWithReason(false, "SDK");
    }
  }
  static SdkPay(...r) {
    if (KuroSdkController.CanUseSdk()) {
      let e = undefined;
      e = r.length > 1 ? (n = r[0], t = r[1], o = r[2], a = r[3], l = r[4], KuroSdkData_1.KuroSdkControllerTool.GetSdkPayProduct(n, t, o, a, l)) : r[0];
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("KuroSdk", 27, "SdkPay", ["SdkPay", e]);
      }
      var t;
      var o;
      var a;
      var l;
      var n = new LogReportDefine_1.StartSdkPayEvent();
      n.s_sdk_pay_order = e.cpOrderId;
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(n);
      ModelManager_1.ModelManager.KuroSdkModel.CurrentPayingOrderId = e.cpOrderId;
      this.cSe?.SdkPay(e);
      ModelManager_1.ModelManager.KuroSdkModel.CurrentPayItemName = e.goodsName;
      this.KuroSdkPaymentBindFunction(this.OnSdkPayEnd);
    }
  }
  static OpenNotice() {
    this.G3l();
  }
  static OpenFeedback() {
    KuroSdkController.cSe?.OpenFeedback();
  }
  static SdkOpenUrlWnd(e, r, t = true, o = true, a = true) {
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn) {
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().OpenWebView(r);
    } else {
      KuroSdkController.cSe?.SdkOpenUrlWnd(e, r, t, o, a);
    }
  }
  static OpenExternalUrl(e) {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().OpenExternalUrl(e);
  }
  static async QueryProductByProductId(e) {
    return !!KuroSdkController.cSe && (ModelManager_1.ModelManager.KuroSdkModel.QueryPromise && (await ModelManager_1.ModelManager.KuroSdkModel.QueryPromise.Promise), this.vhh(), ModelManager_1.ModelManager.KuroSdkModel.QueryPromise = new CustomPromise_1.CustomPromise(), KuroSdkController.cSe.QueryProduct(e, this.ESe()), ModelManager_1.ModelManager.KuroSdkModel.QueryPromise.Promise);
  }
  static ShareByteData(e, r) {
    KuroSdkController.cSe?.ShareByteData(e, r);
  }
  static Share(e, r) {
    KuroSdkController.cSe?.Share(e, r);
  }
  static ShareTexture(e, r) {
    KuroSdkController.cSe?.ShareTexture(e, r);
  }
  static ESe() {
    return "";
  }
  static OpenWebView(e, r, t, o, a = true, l = "Default") {
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn) {
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().OpenWebView(r);
    } else {
      KuroSdkController.cSe?.OpenWebView(e, r, t, o, a, l);
    }
  }
  static KuroSdkLoginBindFunction(e) {
    KuroSdkController.cSe?.KuroSdkLoginBindFunction(e);
  }
  static KuroSdkKickBindFunction() {
    KuroSdkController.cSe?.KuroSdkKickBindFunction();
  }
  static KuroSdkLogoutBindFunction(e) {
    KuroSdkController.cSe?.KuroSdkLogoutBindFunction(e);
  }
  static KuroSdkPaymentBindFunction(e) {
    KuroSdkController.cSe?.KuroSdkPaymentBindFunction(e);
  }
  static SetPostWebViewRedPointState(e) {
    this.SSe = e;
  }
  static GetPostWebViewRedPointState() {
    if (this.D3l()) {
      return ModelManager_1.ModelManager.KuroSdkModel.NoticeRedDotState;
    } else {
      return KuroSdkController.SSe;
    }
  }
  static NeedShowCustomerService() {
    return ControllerHolder_1.ControllerHolder.ChannelController.CheckCustomerServiceOpen();
  }
  static GetCustomerServiceRedPointState() {
    return !!this.cSe && this.cSe.GetCustomerServiceShowState();
  }
  static OpenCustomerService(e) {
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn) {
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().OpenCustomerService();
    } else {
      this.cSe?.ResetCustomServerRedDot();
      this.cSe?.OpenCustomerService(e);
    }
  }
  static GetIfCanQRCodeLogin() {
    return !!KuroSdkController.CanUseSdk() && (KuroSdkController.cSe?.GetIsQRCodeLogin() ?? false);
  }
  static DoQRCodeLogin() {
    if (KuroSdkController.CanUseSdk()) {
      KuroSdkController.cSe?.QRCodeLogin();
    }
  }
  static CheckPhotoPermission() {
    return !KuroSdkController.CanUseSdk() || !KuroSdkController.cSe || KuroSdkController.cSe?.CheckPhotoPermission();
  }
  static RequestPhotoPermission(e) {
    if (KuroSdkController.CanUseSdk()) {
      KuroSdkController.cSe?.RequestPhotoPermission(e);
    }
  }
  static CancelCurrentWaitPayItemTimer(e = true) {
    if (e && (ModelManager_1.ModelManager.KuroSdkModel.CurrentPayItemName = "", Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("KuroSdk", 27, "CancelCurrentWaitPayItemTimer clearPayItem");
    }
    if (this.ySe !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.ySe);
      this.ySe = undefined;
    }
  }
  static CancelQueryProductTimer() {
    if (this.Mhh !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.Mhh);
      this.Mhh = undefined;
    }
  }
  static vhh() {
    this.CancelQueryProductTimer();
    this.Mhh = TimerSystem_1.GameplayTimerSystem.Delay(() => {
      if (ModelManager_1.ModelManager.KuroSdkModel.QueryPromise?.IsPending()) {
        ModelManager_1.ModelManager.KuroSdkModel.QueryPromise.SetResult(false);
      }
      this.Mhh = undefined;
    }, PAYDELAY);
  }
  static StartWaitPayItemTimer() {
    this.CancelCurrentWaitPayItemTimer(false);
    this.ySe = TimerSystem_1.GameplayTimerSystem.Delay(() => {
      var e;
      var r = ModelManager_1.ModelManager.KuroSdkModel.CurrentPayItemName;
      if (!StringUtils_1.StringUtils.IsBlank(r)) {
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(73)).SetTextArgs(r);
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      }
      this.ySe = undefined;
    }, ConfigManager_1.ConfigManager.PayItemConfig.GetWaitPaySuccessTime());
  }
  static RequestServerPlayStationPlayOnlyState() {
    var e = new Protocol_1.Aki.Protocol.Um_();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 27, "RequestServerPlayStationPlayOnlyState");
    }
    Net_1.Net.Call(21733, e, e => {
      ModelManager_1.ModelManager.KuroSdkModel.SetPlayStationPlayOnlyState(e.Oxa);
    });
  }
  static RequestWebSign() {
    var e = new Protocol_1.Aki.Protocol.yv_();
    Net_1.Net.Call(29274, e, e => {
      ModelManager_1.ModelManager.KuroSdkModel.NoticeSign = e?.VE_ ?? "";
      this.q3l(0);
    });
  }
  static async RequestUpdatePlayStationBlockAccount() {
    var e = await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetSdkBlockingUser();
    const t = new Array();
    if (e) {
      e.forEach((e, r) => {
        t.push(r);
      });
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 27, "上报屏蔽列表", ["length", t.length]);
    }
    e = new Protocol_1.Aki.Protocol.mC_();
    e.Srh = t;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 27, "RequestServerPlayStationPlayOnlyState");
    }
    Net_1.Net.Call(29943, e, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("KuroSdk", 27, "RequestUpdatePlayStationBlockAccount");
      }
    });
  }
  static RequestChangeServerPlayStationPlayOnlyState(r) {
    var e = new Protocol_1.Aki.Protocol.Pm_();
    e.Oxa = r;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 27, "RequestChangeServerPlayStationPlayOnlyState", ["state", r]);
    }
    Net_1.Net.Call(16383, e, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21113);
      } else {
        ModelManager_1.ModelManager.KuroSdkModel.SetPlayStationPlayOnlyState(r);
      }
    });
  }
  static uja() {
    return !!ModelManager_1.ModelManager.KuroSdkModel.NeedOpenReviewState;
  }
  static TryOpenReview() {
    if (this.uja()) {
      TimerSystem_1.GameplayTimerSystem.Delay(() => {
        var e = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.LastReviewTime) ?? 0;
        var r = ConfigManager_1.ConfigManager.CommonConfig.GetReviewCd() ?? 0;
        var t = TimeUtil_1.TimeUtil.GetServerTime();
        if (r < t - e) {
          LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.LastReviewTime, t);
          this.cja();
        } else {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("KuroSdk", 27, "TryOpenReview", ["currentTime", t], ["lastReviewTime", e], ["cd", r]);
          }
          ModelManager_1.ModelManager.KuroSdkModel.NeedOpenReviewState = false;
        }
      }, ModelManager_1.ModelManager.KuroSdkModel.ReviewDelay);
    }
  }
  static cja() {
    var e;
    if (ModelManager_1.ModelManager.KuroSdkModel.NeedReviewConfirmBox) {
      (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(222)).SetCloseFunction(() => {
        if (this.cSe) {
          this.cSe.OpenReview(ModelManager_1.ModelManager.KuroSdkModel.CurrentReviewId);
          ModelManager_1.ModelManager.KuroSdkModel.NeedOpenReviewState = false;
        }
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(e);
    } else if (this.cSe) {
      this.cSe.OpenReview(ModelManager_1.ModelManager.KuroSdkModel.CurrentReviewId);
      ModelManager_1.ModelManager.KuroSdkModel.NeedOpenReviewState = false;
    }
  }
  static ClientOpenReview() {
    ModelManager_1.ModelManager.KuroSdkModel.NeedOpenReviewState = true;
    ModelManager_1.ModelManager.KuroSdkModel.ReviewDelay = 1000;
    this.TryOpenReview();
  }
  static SetCursor(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 27, "SetCursor", ["path", e]);
    }
    if (this.cSe) {
      this.cSe.SetCursor(e);
    }
  }
  static Lnl() {
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn) {
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().ReportToServer(1, this.Rnl(KuroSdkData_1.KuroSdkControllerTool.GetRoleInfoData()));
    } else {
      KuroSdkController.cSe?.SdkSelectRole();
    }
  }
  static Unl() {
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn) {
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().ReportToServer(0, this.Rnl(KuroSdkData_1.KuroSdkControllerTool.GetCreateRoleInfoData()));
    } else {
      KuroSdkController.cSe?.SdkCreateRole();
    }
  }
  static Dnl() {
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn) {
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().ReportToServer(2, this.Rnl(KuroSdkData_1.KuroSdkControllerTool.GetRoleInfoData()));
    } else {
      KuroSdkController.cSe?.SdkLevelUpRole();
    }
  }
  static Rnl(e) {
    var r = new PlatformSdkNew_1.ReportRoleData();
    r.roleId = e.RoleId;
    r.roleLevel = e.RoleLevel;
    r.roleName = e.RoleName;
    r.serverId = e.ServerId;
    r.serverName = e.ServerName;
    return r;
  }
  static zZh() {
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn) {
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().BindOnWebViewCloseCallBack(() => {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SdkRefreshNoticeRedDot);
      });
    } else {
      KuroSdkController.cSe?.BindWebViewCloseDelegate(() => {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SdkRefreshNoticeRedDot);
      });
    }
  }
  static D3l() {
    return true;
  }
  static k3l() {
    if (this.D3l()) {
      this.JZh();
    } else {
      KuroSdkController.cSe?.InitializePostWebView();
    }
  }
  static G3l() {
    var e = new LogReportDefine_1.NoticeClickLogEvent();
    ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e);
    var e = this.D3l();
    if (e) {
      this.O3l();
    } else {
      KuroSdkController.cSe?.OpenPostWebView();
    }
  }
  static O3l() {
    this.F3l((e, r) => {
      var t;
      if (e) {
        t = ModelManager_1.ModelManager.KuroSdkModel.GetNoticeUrl(r);
        this.OpenWebView("", t, true, true, true);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("KuroSdk", 27, "OpenPostWebViewOnClient", ["urlIndex", r]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("KuroSdk", 27, "OpenPostWebViewOnClientFail", ["state", e], ["urlIndex", r]);
      }
    }, 0);
  }
  static F3l(o, a = 0) {
    var e;
    if (!ModelManager_1.ModelManager.KuroSdkModel.GetEntryPointData() || a >= ModelManager_1.ModelManager.KuroSdkModel.GetEntryPointData().h5AppUrl.length) {
      o(false, a);
    } else {
      e = ModelManager_1.ModelManager.KuroSdkModel.GetNoticeUrl(a);
      Http_1.Http.Get(e, undefined, (e, r, t) => {
        if (e && r === 200) {
          o(true, a);
        } else {
          this.F3l(o, a + 1);
        }
      });
    }
  }
  static N3l(a, l = 0) {
    var e = ModelManager_1.ModelManager.KuroSdkModel.GetEntryPointUrl();
    Http_1.Http.Get(e, undefined, (e, r, t) => {
      let o = false;
      if (o = e && r === 200 ? o : true) {
        if ((e = l + 1) < 3) {
          this.N3l(a, e);
        } else {
          a(false, r, t);
        }
      } else {
        a(true, r, t);
      }
    });
  }
  static JZh() {
    var e;
    if (!!this.D3l() && (e = ModelManager_1.ModelManager.LoginServerModel.GetCurrentLoginServerId()) !== "" && e !== "0" && !this.V3l) {
      this.V3l = true;
      e = ModelManager_1.ModelManager.KuroSdkModel.GetEntryPointUrl();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("KuroSdk", 27, "TryInitPostWebView", ["url", e]);
      }
      this.N3l((e, r, t) => {
        if (e) {
          t = Json_1.Json.Parse(t);
          ModelManager_1.ModelManager.KuroSdkModel.SetEntryPointData(t);
        } else {
          t = ModelManager_1.ModelManager.KuroSdkModel.GetEntryPointUrl();
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("KuroSdk", 27, "TryInitPostWebView fail", ["state", e], ["code", r], ["url", t]);
          }
        }
        this.V3l = false;
      });
    }
  }
  static j3l(o) {
    var e = ModelManager_1.ModelManager.KuroSdkModel.GetQueryNoticeReadStateUrl();
    Http_1.Http.Get(e, undefined, (e, r, t) => {
      if (e) {
        e = Json_1.Json.Parse(t);
        o(e.data);
      } else {
        o([]);
      }
    });
  }
  static H3l(o, a = 0) {
    var e;
    if (!ModelManager_1.ModelManager.KuroSdkModel.GetEntryPointData() || a >= ModelManager_1.ModelManager.KuroSdkModel.GetEntryPointData().contentUrl.length) {
      o(false, 0, "");
    } else {
      e = ModelManager_1.ModelManager.KuroSdkModel.GetNoticeContentUrl(a);
      Http_1.Http.Get(e, undefined, (e, r, t) => {
        if (e && r === 200) {
          o(e, r, t);
        } else {
          this.H3l(o, a + 1);
        }
      });
    }
  }
  static RecoverSdkData() {
    KuroSdkController.cSe?.RecoverSdkData();
  }
}
exports.KuroSdkController = KuroSdkController;
(_a = KuroSdkController).cSe = undefined;
KuroSdkController.fSe = false;
KuroSdkController.SSe = false;
KuroSdkController.IsKick = false;
KuroSdkController.CXn = undefined;
KuroSdkController.ySe = undefined;
KuroSdkController.Mhh = undefined;
KuroSdkController.sSe = false;
KuroSdkController.sKe = undefined;
KuroSdkController.B3l = undefined;
KuroSdkController.b3a = e => {
  _a.q7e(e * TimeUtil_1.TimeUtil.Millisecond);
};
KuroSdkController.A0l = () => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("KuroSdk", 27, "ApplicationHasReactivatedDelegate");
  }
  ControllerHolder_1.ControllerHolder.PayItemController.RequestSdkCheckout(2);
  var e = new PlatformSdkReportData_1.PlatformReportTerminateGame();
  PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().ReportToThirdParty(e);
};
KuroSdkController.gXn = () => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("KuroSdk", 27, "AndroidScreenChangeCallBack");
  }
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAndroidConfigurationChange);
  var e = UiLayer_1.UiLayer.UiRootItem?.GetRenderCanvas();
  if (e && Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("KuroSdk", 27, "旋转后LguiCanvasViewPort", ["viewPortX", e.GetViewportSize().X], ["viewPortY", e.GetViewportSize().Y]);
  }
};
KuroSdkController.Gro = () => {
  ModelManager_1.ModelManager.KuroSdkModel?.UpdateActivityProgress();
};
KuroSdkController.DSe = (e, r, t) => {
  var o;
  if (!!Platform_1.Platform.IsPs5Platform() && !((o = ModelManager_1.ModelManager.KuroSdkModel?.GetNextProgressActivityQuestId() ?? 0) <= 0) && e === o) {
    ModelManager_1.ModelManager.KuroSdkModel?.UpdateActivityProgress();
  }
};
KuroSdkController.FWe = () => {
  _a.q3l(0);
};
KuroSdkController.xkt = () => {
  _a.RequestServerPlayStationPlayOnlyState();
  _a.RequestUpdatePlayStationBlockAccount();
  _a.RequestWebSign();
};
KuroSdkController.lqt = () => {
  if (_a.cSe) {
    _a.cSe.SetGamePadMode(Info_1.Info.IsInGamepad());
  }
};
KuroSdkController.b3l = () => {
  _a.q3l(0);
};
KuroSdkController.gSe = e => {
  var r = ConfigManager_1.ConfigManager.PayItemConfig.GetCurrentRegionPayConfigList();
  const t = new Array();
  r?.forEach(e => {
    t.push(e.ProductId);
  });
  ControllerHolder_1.ControllerHolder.PayItemController.QueryProductInfoAsync(t);
  _a.w3l();
};
KuroSdkController.CSe = () => {
  if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn || _a.CanUseSdk() && _a.fSe) {
    _a.PostKuroSdkEvent(10);
  }
};
KuroSdkController.OnSdkPayEnd = (e, r) => {
  if (e && ModelManager_1.ModelManager.KuroSdkModel.CurrentPayItemName !== "") {
    _a.StartWaitPayItemTimer();
  }
};
KuroSdkController._ja = e => {
  ModelManager_1.ModelManager.KuroSdkModel.NeedOpenReviewState = true;
  ModelManager_1.ModelManager.KuroSdkModel.ReviewDelay = e.qKn;
  ModelManager_1.ModelManager.KuroSdkModel.CurrentReviewId = e.s5n;
  if (e.h5n !== GACHATYPE) {
    _a.TryOpenReview();
  }
};
KuroSdkController.V3l = false;
KuroSdkController.q3l = e => {
  if (ModelManager_1.ModelManager.GameModeModel?.LoadingPhase === 1 && ModelManager_1.ModelManager.KuroSdkModel.NoticeSign !== "") {
    var r = ModelManager_1.ModelManager.PlayerInfoModel;
    const a = r.GetId() === undefined ? "0" : r.GetId().toString();
    _a.H3l((e, r, t) => {
      if (e) {
        e = Json_1.Json.Parse(t);
        const o = ModelManager_1.ModelManager.KuroSdkModel.FilterCurrentNeedShowNoticeContent(e, a);
        if (o.length > 0) {
          _a.j3l(e => {
            let r = false;
            for (const t of o) {
              if (t.red === 1 && !e.includes(t.id)) {
                r = true;
                break;
              }
            }
            ModelManager_1.ModelManager.KuroSdkModel.NoticeRedDotState = r;
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SdkPostWebViewRedPointRefresh);
          });
        } else {
          ModelManager_1.ModelManager.KuroSdkModel.NoticeRedDotState = false;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SdkPostWebViewRedPointRefresh);
        }
      }
    }, 0);
  }
}; //# sourceMappingURL=KuroSdkController.js.map