"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlatformSdkIos = exports.ISdkCustomerService = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const ue_1 = require("ue");
const Json_1 = require("../../../Core/Common/Json");
const Log_1 = require("../../../Core/Common/Log");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const KuroSdkData_1 = require("../KuroSdkData");
const PlatformSdkBase_1 = require("./PlatformSdkBase");
const MAXREVIEWTIME = 3;
class ISdkCustomerService extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments);
    this.cuid = "";
    this.isredot = 0;
  }
}
exports.ISdkCustomerService = ISdkCustomerService;
class PlatformSdkIos extends PlatformSdkBase_1.PlatformSdkBase {
  constructor() {
    super(...arguments);
    this.wSe = new Map();
    this.CustomerServiceResultCallBack = e => {
      var r = Json_1.Json.Parse(e);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("KuroSdk", 27, "当前客服红点数量", ["num", e]);
      }
      if (r) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("KuroSdk", 27, "当前客服红点数量", ["num", r.isredot]);
        }
        this.CurrentCustomerShowState = r.isredot > 0;
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SdkCustomerRedPointRefresh);
    };
    this.AnnounceRedPointCallBack = e => {
      if (e.includes("showRed") && (e.includes("1") || e.includes("YES"))) {
        ControllerHolder_1.ControllerHolder.KuroSdkController.SetPostWebViewRedPointState(true);
      } else {
        ControllerHolder_1.ControllerHolder.KuroSdkController.SetPostWebViewRedPointState(false);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SdkPostWebViewRedPointRefresh);
    };
  }
  OnInit() {
    this.CurrentDid = ue_1.KuroSDKManager.GetBasicInfo().DeviceId;
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() && UE.KuroLauncherLibrary.IsFirstIntoLauncher()) {
      ue_1.KuroSDKManager.PostSplashScreenEndSuccess();
    }
    cpp_1.FCrashSightProxy.SetCustomData("SdkDeviceId", this.CurrentDid);
    cpp_1.FCrashSightProxy.SetCustomData("Sdkidfv", this.YSe());
    cpp_1.FCrashSightProxy.SetCustomData("SdkJyId", this.GetJyDid());
    cpp_1.FCrashSightProxy.SetCustomData("SdkChannelId", this.GetChannelId());
  }
  BindSpecialEvent() {
    ue_1.KuroSDKManager.Get().AnnounceRedPointDelegate.Clear();
    ue_1.KuroSDKManager.Get().AnnounceRedPointDelegate.Add(this.AnnounceRedPointCallBack);
    ue_1.KuroSDKManager.Get().CustomerServiceResultDelegate.Clear();
    ue_1.KuroSDKManager.Get().CustomerServiceResultDelegate.Add(this.CustomerServiceResultCallBack);
  }
  OpenCustomerService(e) {
    var r = ModelManager_1.ModelManager.LoginModel;
    var t = ModelManager_1.ModelManager.PlayerInfoModel;
    var o = new KuroSdkData_1.OpenCustomerServiceParamIos();
    o.islogin = r.IsSdkLoggedIn() ? 1 : 0;
    o.from = e;
    o.RoleId = this.GetCustomServerRoleId();
    o.RoleName = t.GetAccountName();
    o.ServerId = r.GetServerId();
    o.ServerName = r.GetServerName();
    o.RoleLevel = t.GetPlayerLevel();
    o.ExtendsInfo = this.GetCustomServerExtendsInfo();
    var e = Json_1.Json.Stringify(o);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 27, "IosCustomerService", ["json", e]);
    }
    ue_1.KuroSDKManager.OpenCustomerService(e);
  }
  GetChannelId() {
    return this.BSe("channelId");
  }
  Share(e, r) {
    e = Json_1.Json.Stringify(e);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 27, "Share", ["json", e], ["imagePath", r]);
    }
    UE.KuroSDKStaticLibrary.Share(r, e);
  }
  ShareTexture(e, r) {
    e = Json_1.Json.Stringify(e);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 27, "Share", ["json", e], ["imagePath", r]);
    }
    UE.KuroSDKStaticLibrary.Share(r, e);
  }
  OnGetSharePlatform(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("KuroSdk", 27, "OnGetSharePlatform", ["OnGetSharePlatform", e]);
    }
    var r = Json_1.Json.Parse(e);
    if (r.KRMAINLAND_SDK_EVENT_KEY_RESULT === 0) {
      r = Json_1.Json.Parse(r.KRMAINLAND_SDK_EVENT_KEY_DATA);
      const t = new Array();
      r?.forEach(e => {
        var r = new PlatformSdkBase_1.SharePlatformSt();
        r.IconUrl = e.iconUrl;
        r.PlatformId = e.platform.toString();
        t.push(r);
      });
      this.GetSharePlatformCallBackList.forEach(e => {
        e(t);
      });
      this.GetSharePlatformCallBackList = [];
    }
    super.OnGetSharePlatform(e);
  }
  SetFont() {
    var e = ModelManager_1.ModelManager.KuroSdkModel.GetDeviceFontAsset();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("KuroSdk", 27, "SetFont", ["fontPath", e]);
    }
    ue_1.KuroSDKManager.SetFont(e);
  }
  OnShareResult(e, r, t) {
    var o = r.replace(/[\n\s]/g, "");
    var n = Json_1.Json.Parse(o);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("KuroSdk", 27, "OnShareResult", ["code", e], ["platform", r], ["finalMsg", o], ["shareResult", n]);
    }
    if (n?.KRMAINLAND_SDK_EVENT_KEY_RESULT) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnShareResult, true);
    } else {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnShareResult, false);
    }
  }
  YSe() {
    return this.BSe("idfv");
  }
  GetJyDid() {
    return this.BSe("jyDeviceId");
  }
  BSe(e) {
    if (this.wSe.size === 0) {
      var r = ue_1.KuroSDKManager.GetSdkParams("").split(",");
      var t = r.length;
      for (let e = 0; e < t; e++) {
        var o = r[e].split("=");
        if (o.length === 2) {
          this.wSe.set(o[0], o[1]);
        }
      }
    }
    e = this.wSe.get(e);
    if (e && !StringUtils_1.StringUtils.IsEmpty(e)) {
      return e;
    } else {
      return "";
    }
  }
  OpenExternalUrl(e) {
    UE.KuroSDKManager.OpenDefaultWebView(e);
  }
  CurrentPlatformYearReviewTime() {
    return MAXREVIEWTIME;
  }
  KuroBindExternalLoginResult() {
    UE.KuroSDKManager.Get().ExternalLoginCallBack.Clear();
    UE.KuroSDKManager.Get().ExternalLoginCallBack.Add(e => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("KuroSdk", 27, "ShowExternalLoginUI", ["result", e]);
      }
      if (e) {
        this.ExternalLoginState = true;
        this.QueryExternalAchievement();
      }
      this.ExternalLoginState = e;
    });
  }
  BindExternalEvent() {
    this.KuroBindExternalLoginResult();
    this.KuroBindExternalAchievementWriteResult();
    this.KuroBindExternalAchievementQueryResult();
  }
  UnlockSdkTrophy(e) {
    this.UpdateExternalAchievementProgress(e.toString(), 100);
  }
  UpdateExternalAchievementProgress(e, r) {
    var t;
    if (!!this.ExternalLoginState && !((this.AchievementMap.get(e) ? this.AchievementMap.get(e).Progress : 0) >= 100)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("KuroSdk", 27, "UpdateExternalAchievementProgress", ["achievementName", e]);
      }
      (t = new KuroSdkData_1.AchievementContentData()).AchievementId = e;
      t.Progress = r;
      (e = new KuroSdkData_1.AchievementData()).Achievements = new Array();
      e.Achievements.push(t);
      r = Json_1.Json.Stringify(e);
      ue_1.KuroSDKManager.WriteExternalAchievements(r);
    }
  }
}
exports.PlatformSdkIos = PlatformSdkIos;
//# sourceMappingURL=PlatformSdkIos.js.map