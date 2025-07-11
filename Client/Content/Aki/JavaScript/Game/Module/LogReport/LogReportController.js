"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogReportController = undefined;
const cpp_1 = require("cpp");
const ue_1 = require("ue");
const Json_1 = require("../../../Core/Common/Json");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const LogReportDefine_1 = require("./LogReportDefine");
const ThinkingAnalyticsReporter_1 = require("./ThinkingAnalyticsReporter");
class LogReportController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    LogReportController.Fvi = BaseConfigController_1.BaseConfigController.GetVersionString();
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("LogReportTimeCheckPeriod");
    return !!e && (this.Xba = TimerSystem_1.GameplayTimerSystem.Forever(LogReportController.Yba, e * TimeUtil_1.TimeUtil.InverseMillisecond, undefined, undefined, undefined, false), true);
  }
  static OnClear() {
    if (this.Xba) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.Xba);
      this.Xba = undefined;
    }
    return true;
  }
  static LogReport(e) {
    if (e.event_id === "" && Log_1.Log.CheckError()) {
      Log_1.Log.Error("LogReport", 30, "event_id 不能为空", ["logData", e]);
    }
    LogReportController.zba(e);
    ThinkingAnalyticsReporter_1.ThinkingAnalyticsReporter.Report("c" + e.event_id, Json_1.Json.Stringify(e) ?? "");
  }
  static UnitLogReport(e) {
    var o = ModelManager_1.ModelManager.LogReportModel.GetTimerAssemblyLogData(e.event_id);
    if (o) {
      o.SetLogDataToAssembly(e);
    }
  }
  static zba(e) {
    e.client_version = LogReportController.Fvi;
    e.platform = ModelManager_1.ModelManager.LoginModel.Platform;
    if (e instanceof LogReportDefine_1.PlayerCommonLogData) {
      e.player_id = ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString() ?? "0";
      e.client_platform = cpp_1.KuroApplication.IniPlatformName();
      if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
        e.device_id = ue_1.KuroSDKManager.GetBasicInfo().DeviceId;
      }
      e.net_status = Protocol_1.Aki.Protocol.yNs[ModelManager_1.ModelManager.PlatformModel.GetNetStatus()];
      e.world_level = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel?.toString() ?? "0";
      e.player_level = ModelManager_1.ModelManager.FunctionModel.GetPlayerLevel()?.toString() ?? "0";
      e.world_own_id = ModelManager_1.ModelManager.GameModeModel.IsMulti ? ModelManager_1.ModelManager.CreatureModel.GetWorldOwner().toString() : "0";
    }
  }
}
(exports.LogReportController = LogReportController).Fvi = "";
LogReportController.Xba = undefined;
LogReportController.Yba = e => {
  var o;
  var r = [];
  for (const t of ModelManager_1.ModelManager.LogReportModel.GetAllTimerAssemblyLogData()) {
    if (t.SendTimePeriod !== 0 && !(t.SendTimeAccumulate += e, t.SendTimeAccumulate < t.SendTimePeriod)) {
      t.SendTimeAccumulate = 0;
      if (t.CheckIsSend()) {
        r.push(t.AssemblyId);
        o = t.AssemblyLogData;
        LogReportController.zba(o);
        ThinkingAnalyticsReporter_1.ThinkingAnalyticsReporter.Report("c" + o.event_id, Json_1.Json.Stringify(o) ?? "");
        t.AfterSend();
      }
    }
  }
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("LogReport", 37, "已发送集合日志Id", ["AssemblyIdList", r]);
  }
}; //# sourceMappingURL=LogReportController.js.map