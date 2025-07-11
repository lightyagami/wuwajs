"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlatformSdkMac = undefined;
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
class ISdkCustomerService extends Json_1.JsonObjBase {
  constructor() {
    super(...arguments);
    this.cuid = "";
    this.isredot = 0;
  }
}
class PlatformSdkMac extends PlatformSdkBase_1.PlatformSdkBase {
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
  }
  OnInit() {
    this.CurrentDid = ue_1.KuroSDKManager.GetBasicInfo().DeviceId;
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() && UE.KuroLauncherLibrary.IsFirstIntoLauncher()) {
      ue_1.KuroSDKManager.PostSplashScreenEndSuccess();
    }
    cpp_1.FCrashSightProxy.SetCustomData("SdkDeviceId", this.CurrentDid);
    cpp_1.FCrashSightProxy.SetCustomData("SdkChannelId", this.GetChannelId());
  }
  BindSpecialEvent() {
    ue_1.KuroSDKManager.Get().CustomerServiceResultDelegate.Clear();
    ue_1.KuroSDKManager.Get().CustomerServiceResultDelegate.Add(this.CustomerServiceResultCallBack);
  }
  OpenCustomerService(e) {
    var r = ModelManager_1.ModelManager.LoginModel;
    var t = ModelManager_1.ModelManager.PlayerInfoModel;
    var o = new KuroSdkData_1.OpenCustomerServiceParamMac();
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
      Log_1.Log.Debug("KuroSdk", 27, "MacCustomerService", ["json", e]);
    }
    ue_1.KuroSDKManager.OpenCustomerService(e);
  }
  GetChannelId() {
    return this.BSe("channelId");
  }
  SetFont() {
    var e = ModelManager_1.ModelManager.KuroSdkModel.GetDeviceFontAsset();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("KuroSdk", 27, "Mac SetFont", ["fontPath", e]);
    }
    ue_1.KuroSDKManager.SetFont(e);
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
  SdkExit() {
    ue_1.KuroSDKManager.ShowExitGameDialog();
  }
}
exports.PlatformSdkMac = PlatformSdkMac;
//# sourceMappingURL=PlatformSdkMac.js.map