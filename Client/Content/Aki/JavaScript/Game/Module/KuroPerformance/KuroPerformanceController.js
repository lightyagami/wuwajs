"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuroPerformanceController = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Application_1 = require("../../../Core/Application/Application");
const Log_1 = require("../../../Core/Common/Log");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender");
const BOOST_SWITCH = true;
const GAP_TIME = 1000;
const SERVICE_CODE = 79;
class KuroPerformanceController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    var e;
    this.IsEnable = UE.KuroPerformanceBPLibrary.IsPerformanceAdaptiveInitialize();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Performance", 54, "KuroPerformanceController.OnInit", ["IsEnable", this.IsEnable]);
    }
    if (this.IsEnable) {
      e = UE.KuroPerformanceBPLibrary.GetCurrentActivePerformanceAdaptiveModuleName();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Performance", 54, "KuroPerformanceController.OnInit", ["name", e]);
      }
      UE.KuroPerformanceBPLibrary.StartService(SERVICE_CODE);
      e = GameSettingsDeviceRender_1.GameSettingsDeviceRender.FrameRate;
      UE.KuroPerformanceBPLibrary.InitGameConfigFPS(e);
      UE.KuroPerformanceBPLibrary.InitGameConfigSceneTransition(false);
      Application_1.Application.AddApplicationHandler(3, KuroPerformanceController.brh);
      Application_1.Application.AddApplicationHandler(2, KuroPerformanceController.Nje);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SettingFrameRateChanged, this.zfi);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangePerformanceLimitMode, this.Zfi);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportStart, this.bpr);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
      this.qrh = (0, puerts_1.toManualReleaseDelegate)(this.Orh);
    }
    return true;
  }
  static OnClear() {
    if (this.IsEnable) {
      Application_1.Application.RemoveApplicationHandler(3, KuroPerformanceController.brh);
      Application_1.Application.RemoveApplicationHandler(2, KuroPerformanceController.Nje);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SettingFrameRateChanged, this.zfi);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangePerformanceLimitMode, this.Zfi);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportStart, this.bpr);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
      (0, puerts_1.releaseManualReleaseDelegate)(this.Orh);
      UE.KuroPerformanceBPLibrary.StopService(SERVICE_CODE);
    }
    return true;
  }
  static OnTick(e) {
    if (this.IsEnable && (this.HFt += e, this.HFt > GAP_TIME)) {
      this.HFt = 0;
      this.npl();
    }
  }
  static Open(e) {
    var r;
    var o;
    if (BOOST_SWITCH) {
      r = ++this.fLn;
      this.gLn.set(r, e);
      if (!(this.gLn.size > 1)) {
        o = GameSettingsDeviceRender_1.GameSettingsDeviceRender.FrameRate;
        UE.KuroPerformanceBPLibrary.SetTargetFPS(o);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Performance", 28, "KuroPerformanceController.Open", ["Reason", e], ["Handle", r]);
        }
      }
      return r;
    } else {
      return 0;
    }
  }
  static Close(e) {
    var r;
    if (BOOST_SWITCH) {
      if (r = this.gLn.get(e)) {
        this.gLn.delete(e);
        if (!(this.gLn.size > 0)) {
          UE.KuroPerformanceBPLibrary.SetTargetFPS(0);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Performance", 28, "KuroPerformanceController.Close", ["Reason", r], ["Handle", e]);
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Performance", 28, "性能模式句柄不存在", ["Handle", e]);
      }
    }
  }
  static npl() {
    if (this.gLn.size > 0) {
      UE.KuroPerformanceBPLibrary.GetTickedPerformanceReportAndAdvice(this.qrh);
    }
  }
}
exports.KuroPerformanceController = KuroPerformanceController;
(_a = KuroPerformanceController).IsEnable = true;
KuroPerformanceController.HFt = 0;
KuroPerformanceController.fLn = 0;
KuroPerformanceController.gLn = new Map();
KuroPerformanceController.pLn = 0;
KuroPerformanceController.vLn = 0;
KuroPerformanceController.RKo = false;
KuroPerformanceController.qrh = undefined;
KuroPerformanceController.brh = () => {
  var e = UE.KuroPerformanceBPLibrary.SetForeground(true);
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Performance", 54, "ApplicationHasEnteredForeground设置前台", ["result", e]);
  }
};
KuroPerformanceController.Nje = () => {
  var e = UE.KuroPerformanceBPLibrary.SetForeground(false);
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Performance", 54, "ApplicationWillEnterBackground取消设置前台", ["result", e]);
  }
};
KuroPerformanceController.Zpe = e => {
  if (e) {
    _a.pLn = _a.Open("Battle");
  } else {
    _a.Close(_a.pLn);
  }
};
KuroPerformanceController.zfi = e => {
  if (_a.gLn.size > 0) {
    UE.KuroPerformanceBPLibrary.SetTargetFPS(e);
  }
  UE.KuroPerformanceBPLibrary.UpdateGameConfigFPS(e);
};
KuroPerformanceController.Zfi = (e, r) => {
  if (e && !r) {
    _a.vLn = _a.Open("PerformanceLimitMode");
  } else {
    _a.Close(_a.vLn);
  }
};
KuroPerformanceController.bpr = () => {
  var e = UE.KuroPerformanceBPLibrary.UpdateGameConfigSceneTransition(true);
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Performance", 54, "KuroPerformanceController.OnTeleportStart", ["result", e]);
  }
};
KuroPerformanceController.Ilt = () => {
  var e = UE.KuroPerformanceBPLibrary.UpdateGameConfigSceneTransition(false);
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Performance", 54, "KuroPerformanceController.OnTeleportComplete", ["result", e]);
  }
};
KuroPerformanceController.Orh = e => {
  if (_a.RKo && Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Performance", 54, "KuroPerformanceController.report", ["CPULoadStatus", e.CPULoadStatus], ["GPULoadStatus", e.GPULoadStatus], ["TargetFPS", e.TargetFPS], ["CPUPerfIndex", e.CPUPerfIndex], ["CPULoadIndex", e.CPULoadIndex], ["GPUPerfIndex", e.GPUPerfIndex], ["GPULoadIndex", e.GPULoadIndex], ["CPUFrameTime", e.CPUFrameTime], ["GPUFrameTime", e.GPUFrameTime], ["CurTemperature", e.CurTemperature], ["PerformanceAdvice", e.PerformanceAdvice], ["ThermalStatus", e.ThermalStatus], ["ThermalTempBudget", e.ThermalTempBudget]);
  }
}; //# sourceMappingURL=KuroPerformanceController.js.map