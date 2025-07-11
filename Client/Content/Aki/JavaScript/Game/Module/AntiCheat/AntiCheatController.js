"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AntiCheatController = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const ThirdPartySdkManager_1 = require("../../Manager/ThirdPartySdkManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const Heartbeat_1 = require("../Login/Heartbeat");
const LogReportController_1 = require("../LogReport/LogReportController");
const AntiCheatModel_1 = require("./AntiCheatModel");
const HEARTBEAT_EXCEPTION_FACTOR = 0.5;
const HEARTBEAT_REPORT_INTERVAL = TimeUtil_1.TimeUtil.Hour;
class AntiCheatController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return !(this.yxl = false);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangePlayerInfoId, AntiCheatController.Aje);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SendHeartbeat, AntiCheatController.Pje);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangePlayerInfoId, AntiCheatController.Aje);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SendHeartbeat, AntiCheatController.Pje);
  }
  static xje() {
    var e;
    if (Info_1.Info.IsIosPlatform()) {
      e = AntiCheatModel_1.AntiCheatModel.GetBundleData();
      LogReportController_1.LogReportController.LogReport(e);
    }
  }
}
exports.AntiCheatController = AntiCheatController;
(_a = AntiCheatController).Bje = 0;
AntiCheatController.bje = 0;
AntiCheatController.yxl = false;
AntiCheatController.Aje = () => {
  var e = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
  ThirdPartySdkManager_1.ThirdPartySdkManager.SetUserInfoForTpSafe(e.toString(), e);
  AntiCheatController.xje();
};
AntiCheatController.Pje = () => {
  var e = TimeUtil_1.TimeUtil.GetServerTimeStamp();
  if ((e - AntiCheatController.bje) * 0.001 >= HEARTBEAT_REPORT_INTERVAL) {
    if (ModelManager_1.ModelManager.AntiCheatModel.HasHeartbeatException()) {
      if ((t = ModelManager_1.ModelManager.AntiCheatModel.GetHeartbeatData()) !== undefined) {
        LogReportController_1.LogReportController.LogReport(t);
      } else if (!_a.yxl && ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() && (t = ModelManager_1.ModelManager.LoginModel.GetSdkLoginConfig()?.Uid) !== undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Temp", 21, "Data undefined", ["id", t]);
        }
        _a.yxl = true;
      }
      ModelManager_1.ModelManager.AntiCheatModel.ResetHeartbeatException();
    }
    AntiCheatController.bje = e;
  }
  var t = e - AntiCheatController.Bje;
  var r = Heartbeat_1.Heartbeat.GetHeartbeatInterval();
  var r = HEARTBEAT_EXCEPTION_FACTOR * r;
  if (AntiCheatController.Bje > 0 && t <= r && (ModelManager_1.ModelManager.AntiCheatModel.HitHeartbeatException(), Log_1.Log.CheckDebug())) {
    Log_1.Log.Debug("Net", 21, "心跳过快");
  }
  AntiCheatController.Bje = e;
}; //# sourceMappingURL=AntiCheatController.js.map