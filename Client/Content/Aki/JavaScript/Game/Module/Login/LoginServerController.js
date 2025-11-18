"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginServerController = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Json_1 = require("../../../Core/Common/Json");
const Log_1 = require("../../../Core/Common/Log");
const Http_1 = require("../../../Core/Http/Http");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../Common/PublicUtil");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const LoginServerModel_1 = require("./LoginServerModel");
const ICMP_TIME_OUT = 2;
class LoginServerController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, LoginServerController.yEi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGetPlayerBasicInfo, LoginServerController.IEi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayerLevelChanged, LoginServerController.TEi);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, LoginServerController.yEi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnGetPlayerBasicInfo, LoginServerController.IEi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayerLevelChanged, LoginServerController.TEi);
  }
  static OnInit() {
    LoginServerController.IcmpPingCallBack = (0, puerts_1.toManualReleaseDelegate)(LoginServerController.D3t);
    return true;
  }
  static PingAllRegion() {
    var e;
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() && ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk()) {
      (e = ModelManager_1.ModelManager.LoginServerModel.GetLoginServersByClientRegion()).forEach(e => {
        ModelManager_1.ModelManager.LoginServerModel.AddRegionPingValue(e, LoginServerModel_1.DEFAULTPING);
      });
      e.forEach(e => {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("KuroSdk", 27, "尝试ping", ["ipAddress", e.PingUrl]);
        }
        UE.KuroStaticLibrary.IcmpPing(e.PingUrl, ICMP_TIME_OUT, LoginServerController.IcmpPingCallBack);
      });
    }
  }
  static TryGetServerPlayerInfo() {
    var e = ModelManager_1.ModelManager.LoginServerModel;
    var r = ModelManager_1.ModelManager.LoginModel;
    if (ControllerHolder_1.ControllerHolder.LoginController.IsGlobalSdkLoginMode()) {
      LoginServerController.GetLoginPlayerInfo(1, r.GetSdkLoginConfig()?.Uid ?? "", r.GetSdkLoginConfig()?.UserName ?? "", r.GetSdkLoginConfig()?.Token ?? "", e.GetCurrentArea());
    }
  }
  static GetLoginPlayerInfo(e, r, o, n, t) {
    if (r !== "" && n !== "") {
      e = PublicUtil_1.PublicUtil.GetGARUrl(e, r, o, n, t);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("KuroSdk", 27, "获得GetLoginPlayerInfo", ["url", e]);
      }
      if (e) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Login", 8, "获得登录玩家数据", ["http", e]);
        }
        Http_1.Http.Get(e, undefined, this.LEi);
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("KuroSdk", 27, "没有GetLoginPlayerInfo");
      }
    }
  }
  static OnClear() {
    if (LoginServerController.IcmpPingCallBack) {
      (0, puerts_1.releaseManualReleaseDelegate)(LoginServerController.D3t);
      LoginServerController.IcmpPingCallBack = undefined;
    }
    return true;
  }
}
(exports.LoginServerController = LoginServerController).IcmpPingCallBack = undefined;
LoginServerController.yEi = () => {
  if (ModelManager_1.ModelManager.LoginServerModel.CurrentSelectServerData) {
    ModelManager_1.ModelManager.LoginServerModel.SaveFirstLogin(ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig()?.Uid ?? "", ModelManager_1.ModelManager.LoginServerModel.CurrentSelectServerData);
  }
};
LoginServerController.IEi = () => {
  if (ModelManager_1.ModelManager.LoginServerModel.CurrentSelectServerData) {
    ModelManager_1.ModelManager.LoginServerModel.SaveLocalRegionLevel(ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig()?.Uid ?? "", ModelManager_1.ModelManager.LoginServerModel.CurrentSelectServerData.Region, ModelManager_1.ModelManager.FunctionModel.GetPlayerLevel());
  }
};
LoginServerController.TEi = (e, r, o, n, t, l, i) => {
  if (ModelManager_1.ModelManager.LoginServerModel.CurrentSelectServerData) {
    ModelManager_1.ModelManager.LoginServerModel.SaveLocalRegionLevel(ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig()?.Uid ?? "", ModelManager_1.ModelManager.LoginServerModel.CurrentSelectServerData.Region, r);
  }
};
LoginServerController.D3t = (e, r) => {
  if (ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk()) {
    ModelManager_1.ModelManager.LoginServerModel.RefreshIpPing(e, r);
  }
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("KuroSdk", 27, "IcmpCallBack", ["ipAddress", e], ["time", r]);
  }
};
LoginServerController.LEi = (e, r, o) => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Login", 27, "获取SetLoginPlayerInfoData", ["data", o]);
  }
  if (r === 200 && (r = Json_1.Json.Parse(o))) {
    if (r.Code !== 0) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Login", 27, "SetLoginPlayerInfoData Code失败", ["Code id", r.Code]);
      }
    } else if (r.SdkLoginCode !== 0) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Login", 27, "SetLoginPlayerInfoData SdkLoginCode失败", ["SdkLoginCode id", r.SdkLoginCode]);
      }
    } else {
      ModelManager_1.ModelManager.LoginServerModel.SetPlayerLoginInfo(r.UserId, r);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGetLoginPlayerInfo);
    }
  }
}; //# sourceMappingURL=LoginServerController.js.map