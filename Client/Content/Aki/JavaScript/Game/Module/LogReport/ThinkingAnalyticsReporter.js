"use strict";

var _a;
var _b;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThinkingAnalyticsReporter = undefined;
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController");
const ThinkDataLaunchReporter_1 = require("../../../Launcher/ThinkDataReport/ThinkDataLaunchReporter");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
class RealThinkingAnalyticsReporter {
  static Init() {
    if (ThinkDataLaunchReporter_1.ENABLE_THINKING_ANALYTICS) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGetPlayerBasicInfo, RealThinkingAnalyticsReporter.Wvi);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LogOut, RealThinkingAnalyticsReporter.Kvi);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LoginSuccess, RealThinkingAnalyticsReporter.Qvi);
    }
  }
  static Report(e, r) {
    if (ThinkDataLaunchReporter_1.ENABLE_THINKING_ANALYTICS) {
      RealThinkingAnalyticsReporter.h9.Start();
      cpp_1.FThinkingAnalyticsForPuerts.Track(e, r);
      RealThinkingAnalyticsReporter.h9.Stop();
    }
  }
}
(_a = RealThinkingAnalyticsReporter).h9 = Stats_1.Stat.Create("ThinkingAnalyticsReporter.Track");
RealThinkingAnalyticsReporter.Wvi = () => {
  var e = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
  UE.ThinkingAnalytics.Login(e.toString());
};
RealThinkingAnalyticsReporter.Kvi = () => {
  UE.ThinkingAnalytics.Logout();
};
RealThinkingAnalyticsReporter.Qvi = () => {
  if (ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk() && !BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTipWithSkip()) {
    var r = ModelManager_1.ModelManager.LoginModel?.GetServerId();
    let e = undefined;
    var t = BaseConfigController_1.BaseConfigController.GetLoginServerById(r);
    if (t?.TDCfg && (e = t.TDCfg, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Log", 3, "使用LoginServer的数数配置", ["ServerId", r], ["AppID", e.AppID], ["URL", e.URL]);
    }
    if (e) {
      var t = e.URL;
      var a = e.AppID;
      if (UE.ThinkingAnalytics.HasInstanceInitialized(0)) {
        let e = false;
        if (r && UE.ThinkingAnalytics.GetServerUrl(0) !== t) {
          e = true;
        }
        if (e = a && UE.ThinkingAnalytics.GetAppId(0) !== a ? true : e) {
          UE.ThinkingAnalytics.DestroyInstance(0);
        }
      }
      UE.ThinkingAnalytics.InitializeDefaultInsWithURL_Appid(t, a, ThinkDataLaunchReporter_1.EXIT_WAIT_TIME, ThinkDataLaunchReporter_1.MAX_PENDING_LOG, ThinkDataLaunchReporter_1.SEND_HTTP_TIMEOUT, true, ThinkDataLaunchReporter_1.CALIBRATE_INTERVAL, ThinkDataLaunchReporter_1.CALIBRATE_STOP_TIMER);
      UE.ThinkingAnalytics.CalibrateTime((0, puerts_1.toManualReleaseDelegate)(_a.Xvi));
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 9, "数数上报实例已重新创建！");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Login", 9, `未找到 ${r} 对应的数数上报配置`);
    }
  }
};
RealThinkingAnalyticsReporter.Xvi = e => {
  if (!UE.ThinkingAnalytics.HasInstanceTimeCalibrated(e)) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LogReport", 9, "数数上报时间校准失败，可以因为以下问题导致：1.CDN数数上报配置错误；2.网络原因连接不上。");
    }
  }
};
class RealKRAnalyticsReporter {
  static Init() {
    if (ThinkDataLaunchReporter_1.ENABLE_KD_ANALYTICS) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGetPlayerBasicInfo, RealKRAnalyticsReporter.Wvi);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LogOut, RealKRAnalyticsReporter.Kvi);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LoginSuccess, RealKRAnalyticsReporter.Qvi);
    }
  }
  static Report(e, r) {
    if (ThinkDataLaunchReporter_1.ENABLE_KD_ANALYTICS) {
      RealKRAnalyticsReporter.h9.Start();
      cpp_1.FKuroAnalyticsForPuerts.Track(e, r);
      RealKRAnalyticsReporter.h9.Stop();
    }
  }
}
(_b = RealKRAnalyticsReporter).h9 = Stats_1.Stat.Create("KRAnalyticsReporter.Track");
RealKRAnalyticsReporter.Wvi = () => {
  var e = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
  UE.KuroAnalytics.Login(e.toString());
};
RealKRAnalyticsReporter.Kvi = () => {
  UE.KuroAnalytics.Logout();
};
RealKRAnalyticsReporter.Qvi = () => {
  if (ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk() && !BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTipWithSkip()) {
    var r = ModelManager_1.ModelManager.LoginModel?.GetServerId();
    let e = undefined;
    var t = BaseConfigController_1.BaseConfigController.GetLoginServerById(r);
    if (t?.KDCfg && (e = t.KDCfg, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Log", 3, "使用LoginServer的KuroData配置", ["ServerId", r], ["AppID", e.AppID], ["URL", e.URL]);
    }
    if (e) {
      var t = e.URL;
      var a = e.AppID;
      if (UE.KuroAnalytics.HasInstanceInitialized(0)) {
        let e = false;
        if (r && UE.KuroAnalytics.GetServerUrl(0) !== t) {
          e = true;
        }
        if (e = a && UE.KuroAnalytics.GetAppId(0) !== a ? true : e) {
          UE.KuroAnalytics.DestroyInstance(0);
        }
      }
      UE.KuroAnalytics.InitializeDefaultInsWithURL_Appid(t, a, ThinkDataLaunchReporter_1.EXIT_WAIT_TIME, ThinkDataLaunchReporter_1.MAX_PENDING_LOG, ThinkDataLaunchReporter_1.SEND_HTTP_TIMEOUT, true, ThinkDataLaunchReporter_1.CALIBRATE_INTERVAL, ThinkDataLaunchReporter_1.CALIBRATE_STOP_TIMER);
      UE.KuroAnalytics.CalibrateTime((0, puerts_1.toManualReleaseDelegate)(_b.Xvi));
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Login", 9, "KuroData上报实例已重新创建！");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Login", 9, `未找到 ${r} 对应的KuroData上报配置`);
    }
  }
};
RealKRAnalyticsReporter.Xvi = e => {
  if (!UE.KuroAnalytics.HasInstanceTimeCalibrated(e)) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LogReport", 9, "KuroData上报时间校准失败，可以因为以下问题导致：1.CDNKuroData上报配置错误；2.网络原因连接不上。");
    }
  }
};
class ThinkingAnalyticsReporter {
  static Init() {
    if (ThinkDataLaunchReporter_1.ENABLE_THINKING_ANALYTICS) {
      RealThinkingAnalyticsReporter.Init();
      RealKRAnalyticsReporter.Init();
    }
  }
  static Report(e, r) {
    if (ThinkDataLaunchReporter_1.ENABLE_THINKING_ANALYTICS) {
      RealThinkingAnalyticsReporter.Report(e, r);
      RealKRAnalyticsReporter.Report(e, r);
    }
  }
}
exports.ThinkingAnalyticsReporter = ThinkingAnalyticsReporter;
//# sourceMappingURL=ThinkingAnalyticsReporter.js.map