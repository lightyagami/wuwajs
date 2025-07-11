"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuroAutoCoolController = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const GameSettingsDeviceRender_1 = require("../../../Game/GameSettings/GameSettingsDeviceRender");
const GameSettingsManager_1 = require("../../../Game/GameSettings/GameSettingsManager");
const GameSettingsUtils_1 = require("../../../Game/GameSettings/GameSettingsUtils");
const GlobalData_1 = require("../../../Game/GlobalData");
const Platform_1 = require("../../../Launcher/Platform/Platform");
const GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine");
const KuroPerformanceController_1 = require("../KuroPerformance/KuroPerformanceController");
class KuroAutoCoolController extends ControllerBase_1.ControllerBase {
  static SetMaxFrameRate(e) {
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "t.MaxFPS " + e);
  }
  static GetCurrentValue(e) {
    return GameSettingsManager_1.GameSettingsManager.GetCurrentValue(e);
  }
  static ApplyNiagaraQuality(e) {
    var t = GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsIosAndAndroidHighDevice();
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.DisableDistortion " + (e > 0 && t ? 0 : 1));
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "fx.Niagara.QualityLevel " + (e > 0 ? 1 : 0));
  }
  static ApplyMobileResolution(e) {
    let t = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetMobileResolutionByIndex(e);
    e = UE.KismetSystemLibrary.GetConsoleVariableFloatValue("r.SecondaryScreenPercentage.GameViewport");
    if (GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetDefaultScreenResolution().Y < 750 && e < 70) {
      t = Math.min(t * 1.5, 100);
    }
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.ScreenPercentage " + t);
  }
  static ReduceImageQualityAndFrameRate() {
    let e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetMaxFps();
    let t = this.GetCurrentValue(GameSettingsDefine_1.EFunction.MOBILERESOLUTION);
    let i = this.GetCurrentValue(GameSettingsDefine_1.EFunction.NIAGARAQUALITY);
    let r = this.GetCurrentValue(GameSettingsDefine_1.EFunction.VOLUMELIGHT);
    let o = this.GetCurrentValue(GameSettingsDefine_1.EFunction.IMAGEDETAIL);
    let s = this.GetCurrentValue(GameSettingsDefine_1.EFunction.SHADOWQUALITY);
    let a = this.GetCurrentValue(GameSettingsDefine_1.EFunction.NPCDENSITY);
    if (this.RKo && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Render", 68, "自动降温触发前", ["CurrentFps", e], ["Resolution", t], ["Niagara", i], ["ImageDetail", o], ["VolumeLight", r], ["Shadow", s], ["NpcDensity", a]);
    }
    if (e > 55) {
      this.cZa = true;
      this.SetMaxFrameRate(55);
      e = 55;
      if (i && i > this.nMl) {
        this.ApplyNiagaraQuality(this.nMl);
        i = this.nMl;
      }
      if (t && t > this.sMl) {
        this.ApplyMobileResolution(this.sMl);
        t = this.sMl;
      }
    } else if (e > 50 && e <= 55) {
      this.cZa = true;
      this.SetMaxFrameRate(50);
      e = 50;
      if (r && r > this.aMl) {
        GameSettingsUtils_1.GameSettingsUtils.ApplyVolumeLight(this.aMl);
        r = this.aMl;
      }
      if (o && o > this.lMl) {
        GameSettingsUtils_1.GameSettingsUtils.ApplyImageDetail(this.lMl);
        o = this.lMl;
      }
    } else if (e > 45 && e <= 50) {
      this.cZa = true;
      this.SetMaxFrameRate(45);
      e = 45;
      if (a && a > this.hMl) {
        GameSettingsUtils_1.GameSettingsUtils.ApplyNpcDensity(this.hMl);
        a = this.hMl;
      }
    } else if (e > 40 && e <= 45 && (this.cZa = true, this.SetMaxFrameRate(40), e = 40, s) && s > this._Ml) {
      GameSettingsUtils_1.GameSettingsUtils.ApplyShadowQuality(this._Ml);
      s = this._Ml;
    }
    if (this.RKo && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Render", 68, "自动降温触发后", ["CurrentFps", e], ["Resolution", t], ["Niagara", i], ["ImageDetail", o], ["VolumeLight", r], ["NpcDensity", a], ["Shadow", s]);
    }
  }
  static RestoreImageQualityAndFrameRate() {
    this.cZa = false;
    let e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetMaxFps();
    var t = this.GetCurrentValue(GameSettingsDefine_1.EFunction.MOBILERESOLUTION);
    var i = this.GetCurrentValue(GameSettingsDefine_1.EFunction.NIAGARAQUALITY);
    var r = this.GetCurrentValue(GameSettingsDefine_1.EFunction.VOLUMELIGHT);
    var o = this.GetCurrentValue(GameSettingsDefine_1.EFunction.IMAGEDETAIL);
    var s = this.GetCurrentValue(GameSettingsDefine_1.EFunction.SHADOWQUALITY);
    var a = this.GetCurrentValue(GameSettingsDefine_1.EFunction.NPCDENSITY);
    if (this.RKo && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Render", 68, "自动降温恢复前", ["CurrentFps", e]);
    }
    if (e >= 55 && e < 60) {
      this.SetMaxFrameRate(60);
      e = 60;
      if (i && i > this.nMl) {
        this.ApplyNiagaraQuality(i);
      }
      if (t && t > this.sMl) {
        this.ApplyMobileResolution(t);
      }
    } else if (e >= 50 && e < 55) {
      this.SetMaxFrameRate(55);
      e = 55;
      if (r && r > this.aMl) {
        GameSettingsUtils_1.GameSettingsUtils.ApplyVolumeLight(r);
      }
      if (o && o > this.lMl) {
        GameSettingsUtils_1.GameSettingsUtils.ApplyImageDetail(o);
      }
    } else if (e >= 45 && e < 50) {
      this.SetMaxFrameRate(50);
      e = 50;
      if (a && a > this.hMl) {
        GameSettingsUtils_1.GameSettingsUtils.ApplyNpcDensity(a);
      }
    } else if (e >= 40 && e < 45 && (this.SetMaxFrameRate(45), e = 45, s) && s > this._Ml) {
      GameSettingsUtils_1.GameSettingsUtils.ApplyShadowQuality(s);
    }
    if (this.RKo && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Render", 68, "自动降温恢复后", ["CurrentFps", e], ["Resolution", t], ["Niagara", i], ["ImageDetail", o], ["VolumeLight", r], ["NpcDensity", a], ["Shadow", s]);
    }
  }
  static ltl() {
    var e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCpuTemperature();
    if (this.RKo && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Render", 68, "当前CPU温度", ["CpuTemperature", e]);
    }
    this.$Xr = 0;
    if (this.cZa && e < this.a_l) {
      this.RestoreImageQualityAndFrameRate();
    } else if (e >= this.a_l) {
      this.ReduceImageQualityAndFrameRate();
    }
  }
  static OnInit() {
    this.TemperatureDelegate = (0, puerts_1.toManualReleaseDelegate)(this.htl);
    return !(this.cZa = false);
  }
  static OnClear() {
    (0, puerts_1.releaseManualReleaseDelegate)(this.htl);
    return true;
  }
  static OnTick(e) {
    var t;
    if (UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCVarFloat("r.Kuro.AutoCoolEnable") > 0 && (t = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCVarFloat("r.Kuro.AutoCoolUIEnable") > 0, Platform_1.Platform.IsMobilePlatform()) && t && (this.$Xr += e, this.$Xr > this.uZa)) {
      if (KuroPerformanceController_1.KuroPerformanceController.IsEnable) {
        UE.KuroPerformanceBPLibrary.GetCurrentTemperatureData(this.TemperatureDelegate);
      } else {
        this.ltl();
      }
      this.$Xr = 0;
    }
  }
}
exports.KuroAutoCoolController = KuroAutoCoolController;
(_a = KuroAutoCoolController).uZa = 10000;
KuroAutoCoolController.RKo = true;
KuroAutoCoolController.a_l = 65;
KuroAutoCoolController.$Xr = 0;
KuroAutoCoolController.cZa = false;
KuroAutoCoolController.sMl = 1;
KuroAutoCoolController.nMl = 1;
KuroAutoCoolController.lMl = 1;
KuroAutoCoolController.aMl = 0;
KuroAutoCoolController.hMl = 1;
KuroAutoCoolController._Ml = 1;
KuroAutoCoolController.TemperatureDelegate = undefined;
KuroAutoCoolController.htl = (e, t, i) => {
  if (_a.RKo && Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Render", 68, "KuroAutoCoolController.temperature", ["bResult", e], ["currentTemperature", t], ["tempBudget", i]);
  }
  if (!e || i <= 5) {
    _a.ReduceImageQualityAndFrameRate();
  } else if (_a.cZa) {
    _a.RestoreImageQualityAndFrameRate();
  }
}; //# sourceMappingURL=KuroAutoCoolController.js.map