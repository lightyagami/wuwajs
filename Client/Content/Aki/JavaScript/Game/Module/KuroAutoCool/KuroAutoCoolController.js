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
const ModelManager_1 = require("../../Manager/ModelManager");
class KuroAutoCoolController extends ControllerBase_1.ControllerBase {
  static SetMaxFrameRate(t) {
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "t.MaxFPS " + t);
  }
  static GetMaxFrameRate() {
    return UE.KismetSystemLibrary.GetConsoleVariableFloatValue("t.MaxFPS");
  }
  static GetCurrentValue(t) {
    return GameSettingsManager_1.GameSettingsManager.GetCurrentValue(t);
  }
  static ApplyNiagaraQuality(t) {
    var e = GameSettingsDeviceRender_1.GameSettingsDeviceRender.IsIosAndAndroidHighDevice();
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.DisableDistortion " + (t > 0 && e ? 0 : 1));
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "fx.Niagara.QualityLevel " + (t > 0 ? 1 : 0));
  }
  static ApplyMobileResolution(t) {
    let e = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetMobileResolutionByIndex(t);
    t = UE.KismetSystemLibrary.GetConsoleVariableFloatValue("r.SecondaryScreenPercentage.GameViewport");
    if (GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetDefaultScreenResolution().Y < 750 && t < 70) {
      e = Math.min(e * 1.5, 100);
    }
    UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.ScreenPercentage " + e);
  }
  static ReduceImageQualityAndFrameRate(t) {
    let e = this.GetCurrentValue(GameSettingsDefine_1.EFunction.MOBILERESOLUTION);
    let i = this.GetCurrentValue(GameSettingsDefine_1.EFunction.NIAGARAQUALITY);
    let o = this.GetCurrentValue(GameSettingsDefine_1.EFunction.VOLUMELIGHT);
    let r = this.GetCurrentValue(GameSettingsDefine_1.EFunction.IMAGEDETAIL);
    let s = this.GetCurrentValue(GameSettingsDefine_1.EFunction.SHADOWQUALITY);
    let a = this.GetCurrentValue(GameSettingsDefine_1.EFunction.NPCDENSITY);
    if (this.RKo && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Render", 68, "自动渲染调节触发前", ["CurrentFps", t], ["Resolution", e], ["Niagara", i], ["ImageDetail", r], ["VolumeLight", o], ["Shadow", s], ["NpcDensity", a]);
    }
    if (t > 55) {
      this.cZa = true;
      this.SetMaxFrameRate(55);
      t = 55;
      if (i && i > this.nMl) {
        this.ApplyNiagaraQuality(this.nMl);
        i = this.nMl;
      }
      if (e && e > this.sMl) {
        this.ApplyMobileResolution(this.sMl);
        e = this.sMl;
      }
    } else if (t > 50 && t <= 55) {
      this.cZa = true;
      this.SetMaxFrameRate(50);
      t = 50;
      if (o && o > this.aMl) {
        GameSettingsUtils_1.GameSettingsUtils.ApplyVolumeLight(this.aMl);
        o = this.aMl;
      }
      if (r && r > this.lMl) {
        GameSettingsUtils_1.GameSettingsUtils.ApplyImageDetail(this.lMl);
        r = this.lMl;
      }
    } else if (t > 45 && t <= 50) {
      this.cZa = true;
      this.SetMaxFrameRate(45);
      t = 45;
      if (a && a > this.hMl) {
        GameSettingsUtils_1.GameSettingsUtils.ApplyNpcDensity(this.hMl);
        a = this.hMl;
      }
    } else if (t > 40 && t <= 45 && (this.cZa = true, this.SetMaxFrameRate(40), t = 40, s) && s > this._Ml) {
      GameSettingsUtils_1.GameSettingsUtils.ApplyShadowQuality(this._Ml);
      s = this._Ml;
    }
    if (this.RKo && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Render", 68, "自动渲染调节触发后", ["CurrentFps", t], ["Resolution", e], ["Niagara", i], ["ImageDetail", r], ["VolumeLight", o], ["NpcDensity", a], ["Shadow", s]);
    }
  }
  static RestoreImageQualityAndFrameRate(t) {
    var e;
    var i = this.GetCurrentValue(GameSettingsDefine_1.EFunction.MOBILERESOLUTION);
    var o = this.GetCurrentValue(GameSettingsDefine_1.EFunction.NIAGARAQUALITY);
    var r = this.GetCurrentValue(GameSettingsDefine_1.EFunction.VOLUMELIGHT);
    var s = this.GetCurrentValue(GameSettingsDefine_1.EFunction.IMAGEDETAIL);
    var a = this.GetCurrentValue(GameSettingsDefine_1.EFunction.SHADOWQUALITY);
    var n = this.GetCurrentValue(GameSettingsDefine_1.EFunction.NPCDENSITY);
    if (this.RKo && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Render", 68, "自动渲染调节恢复前", ["CurrentFps", t]);
    }
    if (Platform_1.Platform.IsMobilePlatform()) {
      this.cZa = false;
    }
    let l = t;
    if (t >= 55) {
      this.cZa = false;
      e = ModelManager_1.ModelManager.MenuModel?.GetDataCacheOrCurValue(GameSettingsDefine_1.EFunction.HIGHESTFPS) ?? 0;
      l = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetFrameByList(e);
      if (o && o > this.nMl) {
        this.ApplyNiagaraQuality(o);
      }
      if (i && i > this.sMl) {
        this.ApplyMobileResolution(i);
      }
    } else if (t >= 50 && t < 55) {
      l = 55;
      if (r && r > this.aMl) {
        GameSettingsUtils_1.GameSettingsUtils.ApplyVolumeLight(r);
      }
      if (s && s > this.lMl) {
        GameSettingsUtils_1.GameSettingsUtils.ApplyImageDetail(s);
      }
    } else if (t >= 45 && t < 50) {
      l = 50;
      if (n && n > this.hMl) {
        GameSettingsUtils_1.GameSettingsUtils.ApplyNpcDensity(n);
      }
    } else if (t >= 40 && t < 45 && (l = 45, a) && a > this._Ml) {
      GameSettingsUtils_1.GameSettingsUtils.ApplyShadowQuality(a);
    }
    this.SetMaxFrameRate(l);
    if (this.RKo && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Render", 68, "自动渲染调节恢复后", ["MaxFps", l], ["Resolution", i], ["Niagara", o], ["ImageDetail", s], ["VolumeLight", r], ["NpcDensity", n], ["Shadow", a]);
    }
  }
  static ltl() {
    var t = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCpuTemperature();
    if (this.RKo && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Render", 68, "当前CPU温度", ["CpuTemperature", t]);
    }
    this.$Xr = 0;
    var e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetMaxFps();
    if (this.cZa && t < this.a_l) {
      this.RestoreImageQualityAndFrameRate(e);
    } else if (t >= this.a_l) {
      this.ReduceImageQualityAndFrameRate(e);
    }
  }
  static uim(e) {
    if (!(e <= 0)) {
      var i = 1000 / e;
      this.cim.push(i);
      this.mim.push(e);
      if (this.mim.length > 3) {
        this.mim.shift();
      }
      if (this.mim.length === 3 && (r = (this.mim[0] + this.mim[1] + this.mim[2]) / 3, this.fim.push((o = r * 2 < e && e > 84) ? 1 : 0), o) && this.RKo && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Render", 92, "检测到Jank帧", ["CurrentFrameTime", e], ["AvgLast3FrameTime", r]);
      }
      var o = Date.now();
      if (o - this.gim >= this.Cim) {
        var r = this.fim.reduce((t, e) => t + e, 0);
        var s = this.cim.length > 0 ? this.cim.reduce((t, e) => t + e, 0) / this.cim.length : 0;
        this.gim = o;
        this.fim = [];
        this.cim = [];
        if (r >= 2) {
          this.pim++;
          this.vim = 0;
        } else if (r >= 1) {
          this.vim = 0;
        } else {
          this.vim++;
          this.pim = 0;
        }
        let t = this.yim;
        var o = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetRecommendQualityLv();
        if (o !== undefined && (o = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetDeviceRenderFeature(o)) !== undefined && (o = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetOtherChangedValue(o).get(GameSettingsDefine_1.EFunction.HIGHESTFPS)) !== undefined) {
          t = GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetFrameByList(o);
        }
        var o = Math.min(t, this.GetMaxFrameRate()) * 0.9;
        if (this.RKo && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Render", 92, "5秒窗口统计", ["JankCount", r], ["CurrentFrameTime", e], ["FpsThreshold", o], ["AvgFPS", s]);
        }
        if (!this.cZa && (this.pim >= 2 || s < o)) {
          if (this.RKo && Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Render", 92, "触发降画质");
          }
          this.ReduceImageQualityAndFrameRate(i);
        } else if (this.cZa && (r >= 1 || s < o)) {
          if (this.RKo && Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Render", 92, "维持降画质状态");
          }
        } else if (this.cZa && this.vim >= 3 && o <= s) {
          if (this.RKo && Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Render", 92, "恢复升画质");
          }
          this.RestoreImageQualityAndFrameRate(i);
        }
        this.$Xr = 0;
      }
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
  static OnTick(t) {
    if (UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCVarFloat("r.Kuro.AutoCoolEnable") > 0 && UE.KuroRenderingRuntimeBPPluginBPLibrary.GetCVarFloat("r.Kuro.AutoCoolUIEnable") > 0) {
      this.$Xr += t;
      if (!(this.$Xr < this.uZa)) {
        if (Platform_1.Platform.IsMobilePlatform()) {
          if (KuroPerformanceController_1.KuroPerformanceController.IsEnable) {
            UE.KuroPerformanceBPLibrary.GetCurrentTemperatureData(this.TemperatureDelegate);
          } else {
            this.ltl();
          }
        } else if (Platform_1.Platform.IsPcPlatform()) {
          this.uim(t);
        }
        this.$Xr = 0;
      }
    }
  }
}
exports.KuroAutoCoolController = KuroAutoCoolController;
(_a = KuroAutoCoolController).uZa = 10000;
KuroAutoCoolController.RKo = true;
KuroAutoCoolController.a_l = 65;
KuroAutoCoolController.yim = 50;
KuroAutoCoolController.$Xr = 0;
KuroAutoCoolController.cZa = false;
KuroAutoCoolController.sMl = 1;
KuroAutoCoolController.nMl = 1;
KuroAutoCoolController.lMl = 1;
KuroAutoCoolController.aMl = 0;
KuroAutoCoolController.hMl = 1;
KuroAutoCoolController._Ml = 1;
KuroAutoCoolController.TemperatureDelegate = undefined;
KuroAutoCoolController.htl = (t, e, i) => {
  if (_a.RKo && Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Render", 68, "KuroAutoCoolController.temperature", ["bResult", t], ["currentTemperature", e], ["tempBudget", i]);
  }
  e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetMaxFps();
  if (!t || i <= 5) {
    _a.ReduceImageQualityAndFrameRate(e);
  } else if (_a.cZa) {
    _a.RestoreImageQualityAndFrameRate(e);
  }
};
KuroAutoCoolController.mim = [];
KuroAutoCoolController.fim = [];
KuroAutoCoolController.cim = [];
KuroAutoCoolController.gim = 0;
KuroAutoCoolController.pim = 0;
KuroAutoCoolController.vim = 0;
KuroAutoCoolController.Cim = 5000; //# sourceMappingURL=KuroAutoCoolController.js.map