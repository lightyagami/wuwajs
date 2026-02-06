"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginOfficialView = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const BaseConfigController_1 = require("../../../../Launcher/BaseConfig/BaseConfigController");
const VideoResUpdate_1 = require("../../../../Launcher/DiffPatch/Update/VideoResUpdate");
const HotPatchLogReport_1 = require("../../../../Launcher/HotPatchLogReport");
const CloudGameManagerLauncher_1 = require("../../../../Launcher/Platform/CloudGameManagerLauncher");
const Platform_1 = require("../../../../Launcher/Platform/Platform");
const PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const HotFixManager_1 = require("../../../../Launcher/Ui/HotFix/HotFixManager");
const PakKeyUpdate_1 = require("../../../../Launcher/Update/PakKeyUpdate");
const ResourceUpdateManager_1 = require("../../../../Launcher/Update/ResourceDiffUpdate/ResourceUpdateManager");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../GlobalData");
const KuroSdkReport_1 = require("../../../KuroSdk/KuroSdkReport");
const CloudGameManager_1 = require("../../../Manager/CloudGameManager");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ThirdPartySdkManager_1 = require("../../../Manager/ThirdPartySdkManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiInteractLogReport_1 = require("../../../Ui/LogReport/UiInteractLogReport");
const UiLayer_1 = require("../../../Ui/UiLayer");
const UiManager_1 = require("../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const PreDownloadButton_1 = require("../../MobilePredownload/PreDownloadButton");
const SubPackageDefine_1 = require("../../SubPackage/SubPackageDefine");
const UiLoginSceneManager_1 = require("../../UiComponent/UiLoginSceneManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoginDefine_1 = require("../Data/LoginDefine");
const LoginAgeTipView_1 = require("./LoginAgeTipView");
class LoginOfficialView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.VEi = false;
    this.Ws1 = undefined;
    this.jeu = false;
    this.CNm = () => {
      this.RefreshDownLoadState();
    };
    this.ATf = false;
    this.OnClickQRCodeLoginBtn = () => {
      if (ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfCanQRCodeLogin()) {
        ControllerHolder_1.ControllerHolder.KuroSdkController.DoQRCodeLogin();
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 16, "扫码登录未开启");
      }
    };
    this.HEi = () => {
      this.qMi(true);
    };
    this.jEi = () => {
      var e;
      if (ModelManager_1.ModelManager.LoginModel.IsLoginStatus(LoginDefine_1.ELoginStatus.Init)) {
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(44)).FunctionMap.set(2, this.WEi);
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
        KuroSdkReport_1.KuroSdkReport.Report(new KuroSdkReport_1.SdkReportChangeAccount(undefined));
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 8, "正在登录中, 无法退出！");
      }
    };
    this.KEi = () => {
      UiManager_1.UiManager.OpenView("ToolWindowView");
    };
    this.QEi = () => {
      let o = false;
      if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
        var r = ControllerHolder_1.ControllerHolder.KuroSdkController.GetAgreement();
        for (let e = 0; e < r.length; e++) {
          if (r[e].link.includes("agreement_public")) {
            var i = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("UserTitle");
            var i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i);
            ControllerHolder_1.ControllerHolder.KuroSdkController.SdkOpenUrlWnd(i, r[e].link, true, false);
            o = true;
            break;
          }
        }
      }
      if (!o) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Login", 10, "打开用户协议");
        }
        UiManager_1.UiManager.OpenView("LoginAgeTipView", LoginAgeTipView_1.ELoginShowType.UserAgreement);
        UiLayer_1.UiLayer.SetShowNormalMaskLayer(true);
      }
    };
    this.XEi = () => {
      let o = false;
      if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
        var r = ControllerHolder_1.ControllerHolder.KuroSdkController.GetAgreement();
        for (let e = 0; e < r.length; e++) {
          if (r[e].link.includes("personal_privacy")) {
            var i = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("PrivacyTitle");
            var i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i);
            ControllerHolder_1.ControllerHolder.KuroSdkController.SdkOpenUrlWnd(i, r[e].link, true, false);
            o = true;
            break;
          }
        }
      }
      if (!o) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Login", 10, "打开隐私政策");
        }
        UiManager_1.UiManager.OpenView("LoginAgeTipView", LoginAgeTipView_1.ELoginShowType.PrivacyAgreement);
        UiLayer_1.UiLayer.SetShowNormalMaskLayer(true);
      }
    };
    this.$Ei = () => {
      let o = false;
      if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
        var r = ControllerHolder_1.ControllerHolder.KuroSdkController.GetAgreement();
        for (let e = 0; e < r.length; e++) {
          if (r[e].link.includes("child_privacy")) {
            var i = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("ChildPrivacyTitle");
            var i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i);
            ControllerHolder_1.ControllerHolder.KuroSdkController.SdkOpenUrlWnd(i, r[e].link, true, false);
            o = true;
            break;
          }
        }
      }
      if (!o) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Login", 10, "打开儿童隐私政策");
        }
        UiManager_1.UiManager.OpenView("LoginAgeTipView", LoginAgeTipView_1.ELoginShowType.ChildPrivacyAgreement);
        UiLayer_1.UiLayer.SetShowNormalMaskLayer(true);
      }
    };
    this.YEi = () => {
      ControllerHolder_1.ControllerHolder.KuroSdkController.OpenNotice();
    };
    this.JEi = () => {
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowExitGameConfirmBox();
    };
    this.zEi = () => {
      UiManager_1.UiManager.OpenView("LoginServerView");
    };
    this.ZEi = () => {
      this.eSi();
    };
    this.Ckt = e => {
      var o;
      if (e) {
        this.CloseMe();
        if ((e = ModelManager_1.ModelManager.LoginModel.GetPlayerSex()) === undefined) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Login", 10, "性别获取为空,账号走的直接登录,性别设置异常");
          }
        } else {
          Stats_1.Stat.CreateInstantStat("LoginProcedure.LoginPromise:Start");
          ModelManager_1.ModelManager.LoginModel.CreateLoginPromise();
          o = ConfigManager_1.ConfigManager.CreateCharacterConfig.GetInitialRoles();
          UiLoginSceneManager_1.UiLoginSceneManager.PlayRoleMontage(o[e], 18);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Login", 10, "登录请求成功");
          }
          UiLoginSceneManager_1.UiLoginSceneManager.LoadSequenceAsync(this.GetLoginSequenceName(e), () => {
            Stats_1.Stat.CreateInstantStat("LoginProcedure.LoginPromise:End");
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Login", 10, "登录请求成功,进入游戏");
            }
            ModelManager_1.ModelManager.LoginModel.FinishLoginPromise();
            ControllerHolder_1.ControllerHolder.BlackScreenController.AddBlackScreen("None", "LoginFinish");
          });
        }
      }
    };
    this.tSi = () => {
      if (ModelManager_1.ModelManager.LoginModel.IsSdkLoggedIn()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Login", 16, "LoginProcedure-SdkLogin-登录成功");
        }
        Stats_1.Stat.CreateInstantStat("LoginProcedure.SdkLogin:End");
        this.iSi(true);
        if (!Platform_1.Platform.IsWindowsPlatform()) {
          UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.DepthOfFieldQuality 1");
        }
        this.Krc();
        if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() && !this.fSi()) {
          this.KOf().then(() => {
            if (ResourceUpdateManager_1.ResourceDiffUpdaterManager.IsGrayBoxHit() && !ModelManager_1.ModelManager.SubPackageDownLoadModel.IsKeyPackageDownLoadingFinish()) {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("Login", 5, "SdkLogin登录成功-需要下载核心包，自动开始下载");
              }
              ControllerHolder_1.ControllerHolder.SubPackageController.AutoDownLoadKeySubPackage();
              this.RefreshDownLoadState();
            } else {
              this.XOf();
            }
          });
        } else {
          this.XOf();
        }
      } else {
        this.iSi(false);
        ModelManager_1.ModelManager.LoginModel.PlayStationGameAutoLoginId = "-1";
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Login", 16, "LoginProcedure-SdkLogin-登录失败, 重新打开SDK登录界面");
        }
      }
    };
    this.nSi = () => {
      this.sSi();
    };
    this.$Oe = e => {
      if (e === "LoginServerView") {
        if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
          this._Dg();
          this.KOf().then(() => {
            if (ResourceUpdateManager_1.ResourceDiffUpdaterManager.IsGrayBoxHit() && !ModelManager_1.ModelManager.SubPackageDownLoadModel.IsKeyPackageDownLoadingFinish()) {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("Login", 5, "SdkLogin-选服后 -需要下载核心包，自动开始下载");
              }
              ControllerHolder_1.ControllerHolder.SubPackageController.AutoDownLoadKeySubPackage();
              this.RefreshDownLoadState();
            } else {
              this.XOf();
            }
          });
        } else {
          this.XOf();
        }
      }
    };
    this.V5a = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 5, "PS5 PlaySession 直接启动 - 模拟点击登录按钮 事件触发");
      }
      this.qMi(false);
    };
    this.aSi = () => {};
    this.WEi = () => {
      ThirdPartySdkManager_1.ThirdPartySdkManager.Logout();
      if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
        this.iSi(false);
        this.UiViewSequence.PlaySequence("Show");
        UiLayer_1.UiLayer.SetShowNormalMaskLayer(false);
        ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(6);
      } else {
        UiManager_1.UiManager.CloseView("LoginView", e => {
          if (e) {
            UiManager_1.UiManager.OpenView("LoginDebugView");
          }
        });
      }
    };
    this.hSi = e => {
      this.VEi = e === 1;
    };
    this.lSi = () => {
      UiManager_1.UiManager.OpenView("LoginAgeTipView", LoginAgeTipView_1.ELoginShowType.AgeTip);
      UiLayer_1.UiLayer.SetShowNormalMaskLayer(true);
    };
    this.Veu = () => {
      this.Ws1?.Refresh(this.jeu);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIExtendToggle], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent], [8, UE.UIButtonComponent], [9, UE.UIText], [10, UE.UIText], [11, UE.UIButtonComponent], [12, UE.UIButtonComponent], [13, UE.UIItem], [14, UE.UIButtonComponent], [15, UE.UIText], [16, UE.UIItem], [17, UE.UITexture], [18, UE.UIItem], [19, UE.UIItem], [20, UE.UIButtonComponent], [22, UE.UIItem], [23, UE.UISprite], [24, UE.UIText], [25, UE.UIText], [26, UE.UIText]];
    this.BtnBindInfo = [[0, this.HEi], [1, this.jEi], [2, this.KEi], [3, this.HEi], [4, this.lSi], [5, this.hSi], [6, this.QEi], [7, this.XEi], [8, this.$Ei], [11, this.YEi], [12, this.JEi], [14, this.zEi], [20, this.OnClickQRCodeLoginBtn]];
  }
  async OnBeforeStartAsync() {
    this.Ws1 = new PreDownloadButton_1.PreDownloadButtonItemA();
    await this.Ws1.CreateThenShowByActorAsync(this.GetItem(19).GetOwner());
  }
  OnStart() {
    ControllerHolder_1.ControllerHolder.ResourceManagerController.ChangeHttpTickFrequency();
    ControllerHolder_1.ControllerHolder.LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.LoginViewOpen);
    ModelManager_1.ModelManager.LoginModel.FixLoginFailInfo();
    this.GetButton(14).RootUIComp.SetUIActive(false);
    this.iSi(false);
    this._Si();
    this.uSi();
    var e = Info_1.Info.IsPcOrGamepadPlatform();
    this.GetButton(12).RootUIComp.SetUIActive(e);
    this.GetItem(13).SetUIActive(false);
    this.eSi();
    this.cSi();
    this.mSi();
    this.dSi();
    this.CSi();
    this.gSi();
    this.Pfa();
    this.xfa();
    this.RefreshQRCodeLoginBtn();
    this.RefreshDownLoadState();
    this.Ws1?.Refresh();
    if (!UiManager_1.UiManager.IsViewShow("LoginOfficialStatusView")) {
      UiManager_1.UiManager.OpenView("LoginOfficialStatusView");
    }
  }
  OnBeforeDestroy() {
    ControllerHolder_1.ControllerHolder.ResourceManagerController.RestoreHttpTickFrequency();
  }
  Pfa() {
    var e;
    if (CloudGameManager_1.CloudGameManager.IsCloudGame) {
      this.GetButton(12).RootUIComp.SetUIActive(false);
    } else if (ControllerHolder_1.ControllerHolder.LoginController.IsSdkLoginMode()) {
      e = PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn ? PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetProductId() : UE.KuroSDKManager.GetPackageId();
      e = !ConfigManager_1.ConfigManager.LoginConfig.GetLoginViewNoExitButtonPackageIdList().includes(e);
      this.GetButton(12).RootUIComp.SetUIActive(e);
    } else {
      this.GetButton(12).RootUIComp.SetUIActive(true);
    }
  }
  xfa(e = false) {
    var o;
    var r;
    if (CloudGameManager_1.CloudGameManager.IsCloudGame) {
      this.GetButton(1).RootUIComp.SetUIActive(false);
    } else if (ControllerHolder_1.ControllerHolder.LoginController.IsSdkLoginMode()) {
      o = PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn ? PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetProductId() : UE.KuroSDKManager.GetPackageId();
      r = ConfigManager_1.ConfigManager.LoginConfig.GetLoginViewNoAccountButtonPackageIdList();
      e = e && !r.includes(o);
      this.GetButton(1).RootUIComp.SetUIActive(e);
    } else {
      this.GetButton(1).RootUIComp.SetUIActive(true);
    }
  }
  RefreshQRCodeLoginBtn(e = false) {
    var o;
    var r;
    var i;
    if (!CloudGameManager_1.CloudGameManager.IsCloudGame && ControllerHolder_1.ControllerHolder.LoginController.IsSdkLoginMode()) {
      o = Info_1.Info.IsMobilePlatform();
      r = ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk();
      i = ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfCanQRCodeLogin();
      e = e && o && !r && i;
      this.GetButton(20).RootUIComp.SetUIActive(e);
    } else {
      this.GetButton(20).RootUIComp.SetUIActive(false);
    }
  }
  RefreshDownLoadState() {
    var e;
    if (ResourceUpdateManager_1.ResourceDiffUpdaterManager.IsGrayBoxHit()) {
      e = !ModelManager_1.ModelManager.SubPackageDownLoadModel.IsKeyPackageDownLoadingFinish();
      this.ATf = e && this.jeu;
      this.GetItem(22).SetUIActive(this.ATf);
      this.GetItem(18).SetUIActive(!this.ATf);
      this.GetButton(0).RootUIComp.SetUIActive(!this.ATf);
      this.GetButton(4).RootUIComp.SetUIActive(!ControllerHolder_1.ControllerHolder.LoginController.IsGlobalSdkLoginMode() && !this.ATf);
      this.GetButton(2).SetSelfInteractive(!this.ATf);
      this.GetButton(1).SetSelfInteractive(!this.ATf);
      if (this.ATf) {
        this.GetButton(2).RootUIComp.SetAlpha(0.5);
        this.GetButton(1).RootUIComp.SetAlpha(0.5);
      }
      this.GetButton(14).RootUIComp.SetUIActive(ControllerHolder_1.ControllerHolder.LoginController.IsGlobalSdkLoginMode() && !this.ATf);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 5, "SdkLogin-刷新下载状态", ["this.NeedTickDownLoad", this.ATf]);
      }
      if (!this.ATf) {
        this.XOf();
      }
    }
  }
  OnTick(e) {
    var o;
    var r;
    if (this.ATf) {
      r = ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageCurrentHaveDownLoadSpace(SubPackageDefine_1.KEY_SUBPACKAGE_ID);
      o = ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageCurrentTotalSpace(SubPackageDefine_1.KEY_SUBPACKAGE_ID);
      r = Number(r) / Number(o);
      this.GetSprite(23).SetFillAmount(r);
      this.GetText(25).SetText(ModelManager_1.ModelManager.SubPackageDownLoadModel.ByteConverter(ModelManager_1.ModelManager.SubPackageDownLoadModel.GetSubPackageDownLoadSpeed()) + "/s");
      this.GetText(26).SetText(ModelManager_1.ModelManager.SubPackageDownLoadModel.GetKeyPackageDownLoadingFileName());
      this.GetText(24).SetText(Math.floor(r * 100) + "%");
    }
  }
  _Si() {
    this.VEi = true;
    this.GetExtendToggle(5).SetToggleState(this.VEi ? 1 : 0, false);
  }
  uSi() {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(10), "ClickEnterGame");
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LoginRequestResult, this.Ckt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SdkPostWebViewRedPointRefresh, this.ZEi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SdkLoginResult, this.tSi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGetLoginPlayerInfo, this.aSi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnConfirmServerItem, this.nSi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Oe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlayStationJoinSessionEvent, this.V5a);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPreDownloadAvailableUpdate, this.Veu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshSubPackageDownLoadByPriority, this.CNm);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LoginRequestResult, this.Ckt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SdkPostWebViewRedPointRefresh, this.ZEi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SdkLoginResult, this.tSi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnGetLoginPlayerInfo, this.aSi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnConfirmServerItem, this.nSi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Oe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlayStationJoinSessionEvent, this.V5a);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPreDownloadAvailableUpdate, this.Veu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshSubPackageDownLoadByPriority, this.CNm);
  }
  OnBeforeShow() {
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 16, "LoginProcedure-SdkLogin-界面打开检测sdk状态设置表现");
      }
      this.tSi();
    }
  }
  OnAfterShow() {
    this.wml();
    if (CloudGameManager_1.CloudGameManager.IsCloudGame && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Login", 16, "LoginProcedure-SdkLoginNew-云游戏登录"), CloudGameManagerLauncher_1.CloudGameManagerLauncher.IsPreLaunch)) {
      ControllerHolder_1.ControllerHolder.LoginController.OnSdkLogin(CloudGameManager_1.CloudGameManager.GetCloudGameLoginInfo());
      this.qMi(false);
    }
    this.Ws1?.RefreshDot();
  }
  async wml() {
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 16, "LoginProcedure-SdkLoginNew-SDK登录");
      }
      if (ModelManager_1.ModelManager.LoginModel.PlayStationGameAutoLoginId === "-1") {
        await ControllerHolder_1.ControllerHolder.LoginController.SdkLoginNew();
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Login", 5, "PS5 PlaySession 直接启动 - 模拟点击登录按钮1");
        }
        if ((await ControllerHolder_1.ControllerHolder.LoginController.SdkLoginNew()) === 0) {
          this.qMi(false);
        }
      }
    }
  }
  qMi(e) {
    if (this.VEi) {
      if (ModelManager_1.ModelManager.LoginModel.IsSdkLoggingIn()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Login", 16, "LoginProcedure-点击登录按钮-重复点击SDK登录");
        }
      } else {
        if (ModelManager_1.ModelManager.LoginModel.IsSdkLogout()) {
          if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
            ControllerHolder_1.ControllerHolder.LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.SDKLoginBefore);
            ControllerHolder_1.ControllerHolder.LoginController.OpenSdkLoginView();
            return;
          }
          if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn) {
            ControllerHolder_1.ControllerHolder.LoginController.LogLoginProcessLink(LoginDefine_1.ELoginStatus.SDKLoginBefore);
            ControllerHolder_1.ControllerHolder.LoginController.SdkLoginNew();
            return;
          }
        }
        if (ModelManager_1.ModelManager.LoginModel.IsLoginStatus(LoginDefine_1.ELoginStatus.Init)) {
          Stats_1.Stat.CreateInstantStat("LoginProcedure.ClickLoginButton");
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Login", 16, "LoginProcedure-点击登录按钮");
          }
          if (e) {
            UiInteractLogReport_1.UiInteractLogReport.ReportSpaceKeyInteract(1);
          }
          PakKeyUpdate_1.PakKeyUpdate.CheckPakKey(() => {
            if (VideoResUpdate_1.VideoResUpdate.GetIsSeparateVideo()) {
              PakKeyUpdate_1.PakKeyUpdate.CheckVideoPakKey(() => {
                KuroSdkReport_1.KuroSdkReport.Report(new KuroSdkReport_1.SdkReportClickEnterGame(undefined));
                HotPatchLogReport_1.HotPatchLogReport.ReportLogin(HotPatchLogReport_1.LoginLogEventDefine.EnterGame, "enter_game_start");
                ControllerHolder_1.ControllerHolder.LoginController.GetHttp(false, false);
              }, () => {
                var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(33);
                var o = ConfigManager_1.ConfigManager.TextConfig.GetTextById("NoNetwork");
                e.SetTextArgs(o);
                ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
              }).catch(e => {});
            } else {
              KuroSdkReport_1.KuroSdkReport.Report(new KuroSdkReport_1.SdkReportClickEnterGame(undefined));
              HotPatchLogReport_1.HotPatchLogReport.ReportLogin(HotPatchLogReport_1.LoginLogEventDefine.EnterGame, "enter_game_start");
              ControllerHolder_1.ControllerHolder.LoginController.GetHttp(false, false);
            }
          }, () => {
            var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(33);
            var o = ConfigManager_1.ConfigManager.TextConfig.GetTextById("NoNetwork");
            e.SetTextArgs(o);
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
          }).catch(e => {});
        } else if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Login", 16, "LoginProcedure-点击登录按钮-重复点击");
        }
      }
    } else {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("AgreementTips");
    }
  }
  async KOf() {
    if (ResourceUpdateManager_1.ResourceDiffUpdaterManager.IsGrayBoxHit()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 5, "SdkLogin登录成功-获取HTTP");
      }
      await ControllerHolder_1.ControllerHolder.LoginController.GetSubPackageHttp();
      HotFixManager_1.HotFixManager.LaunchSubPackageHttpData = ControllerHolder_1.ControllerHolder.LoginController.GameSubPackageHttpData;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 5, "SdkLogin登录成功-创建下载器");
      }
      await ModelManager_1.ModelManager.SubPackageDownLoadModel.InitGameCoreUpdater();
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 5, "SdkLogin登录成功-分包灰度未命中");
    }
  }
  Krc() {
    if (this.IsShow) {
      this.UiViewSequence.PlaySequence("Show");
    }
    ControllerHolder_1.ControllerHolder.KuroSdkController.ShowExternalLogin();
    if (ControllerHolder_1.ControllerHolder.LoginController.IsGlobalSdkLoginMode()) {
      ModelManager_1.ModelManager.LoginServerModel.InitSuggestData(ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig()?.Uid ?? "", e => {
        ModelManager_1.ModelManager.LoginModel.SetServerName(e.name);
        ModelManager_1.ModelManager.LoginModel.SetServerId(e.id);
      });
      if (this.fSi()) {
        UiManager_1.UiManager.OpenView("LoginServerView");
        ModelManager_1.ModelManager.LoginModel.PlayStationGameAutoLoginId = "-1";
      }
      this.GetButton(14).RootUIComp.SetUIActive(true);
      this.sSi();
      if (ModelManager_1.ModelManager.LoginModel.PlayStationGameAutoLoginId !== "-1") {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Login", 5, "PS5 PlaySession 直接启动 - 模拟点击登录按钮2");
        }
        this.qMi(false);
      }
    } else {
      this.GetButton(14).RootUIComp.SetUIActive(false);
    }
  }
  XOf() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 5, "SdkLogin登录成功-最后刷新登录成功表现");
    }
    this.GetItem(22).SetUIActive(false);
    this.GetItem(18).SetUIActive(true);
    this.GetButton(4).RootUIComp.SetUIActive(!ControllerHolder_1.ControllerHolder.LoginController.IsGlobalSdkLoginMode());
    this.GetButton(0).RootUIComp.SetUIActive(true);
    this.GetButton(2).SetSelfInteractive(true);
    this.GetButton(1).SetSelfInteractive(true);
    this.GetButton(2).RootUIComp.SetAlpha(1);
    this.GetButton(1).RootUIComp.SetAlpha(1);
    this.GetButton(14).RootUIComp.SetUIActive(ControllerHolder_1.ControllerHolder.LoginController.IsGlobalSdkLoginMode());
  }
  _Dg() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Login", 5, "LoginOfficialView-DisableDownLoadAbout");
    }
    this.GetItem(18).SetUIActive(false);
    this.GetButton(0).RootUIComp.SetUIActive(false);
    this.GetButton(2).SetSelfInteractive(false);
    this.GetButton(1).SetSelfInteractive(false);
    this.GetButton(14).RootUIComp.SetUIActive(false);
  }
  fSi() {
    var e = ModelManager_1.ModelManager.LoginServerModel;
    var o = ModelManager_1.ModelManager.LoginModel;
    return !!ControllerHolder_1.ControllerHolder.LoginController.IsGlobalSdkLoginMode() && !!e.IsFirstLogin(o.GetSdkLoginConfig()?.Uid ?? "");
  }
  GetLoginSequenceName(e) {
    if (e === LoginDefine_1.ELoginSex.Boy) {
      return "LevelSequence_LoginMale";
    } else {
      return "LevelSequence_LoginFemale";
    }
  }
  mSi() {
    this.GetButton(8).RootUIComp.SetUIActive(!ControllerHolder_1.ControllerHolder.LoginController.IsGlobalSdkLoginMode());
  }
  cSi() {
    this.GetButton(4).RootUIComp.SetUIActive(!ControllerHolder_1.ControllerHolder.LoginController.IsGlobalSdkLoginMode());
  }
  dSi() {
    this.GetItem(16).SetUIActive(!ControllerHolder_1.ControllerHolder.LoginController.IsGlobalSdkLoginMode());
  }
  CSi() {
    this.GetText(9).SetText(BaseConfigController_1.BaseConfigController.GetVersionString());
  }
  gSi() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetLogoPathByLanguage("LoginLogo");
    this.SetTextureByPath(e, this.GetTexture(17));
  }
  sSi() {
    var e = ModelManager_1.ModelManager.LoginServerModel.GetCurrentSelectServerName();
    this.GetText(15).SetText(e);
  }
  eSi() {}
  pSi() {
    this.GetButton(11).RootUIComp.SetUIActive(ControllerHolder_1.ControllerHolder.LoginController.IsSdkLoginMode() && ModelManager_1.ModelManager.LoginModel.IsSdkLoggedIn());
  }
  iSi(e) {
    var o = this.GetButton(2);
    var r = this.GetButton(3);
    var i = BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTip() || BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTipWithSkip();
    if (ControllerHolder_1.ControllerHolder.LoginController.IsSdkLoginMode()) {
      o.RootUIComp.SetUIActive(e && !CloudGameManager_1.CloudGameManager.IsCloudGame && !i);
      r.RootUIComp.SetUIActive(!e);
      if (!e) {
        this.GetItem(18).SetUIActive(e);
      }
    } else {
      o.RootUIComp.SetUIActive(!CloudGameManager_1.CloudGameManager.IsCloudGame && !i);
      r.RootUIComp.SetUIActive(false);
    }
    if (!e && ControllerHolder_1.ControllerHolder.LoginController.IsGlobalSdkLoginMode()) {
      this.GetButton(14).RootUIComp.SetUIActive(false);
    }
    this.xfa(e);
    this.RefreshQRCodeLoginBtn(e);
    this.pSi();
    this.Ws1?.Refresh(e);
    this.jeu = e;
  }
}
exports.LoginOfficialView = LoginOfficialView;
//# sourceMappingURL=LoginOfficialView.js.map