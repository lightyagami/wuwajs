"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotWeather = exports.PlotWeatherActorInfo = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TimeUtil_1 = require("../../Common/TimeUtil");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const WeatherController_1 = require("../Weather/WeatherController");
const PLOT_WEATHER_PRIORITY = 100;
class PlotWeatherActorInfo {
  constructor() {
    this.WeatherConfig = undefined;
    this.Actor = undefined;
    this.KuroPostProcessComponent = undefined;
    this.TargetBlendWeight = 0;
    this.CurBlendWeight = 0;
    this.ChangeSpeed = 0;
    this.Priority = 0;
    this.IsLoadCompleted = false;
  }
  Disable() {
    if (this.WeatherConfig) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 17, "停止剧情天气", ["id", this.WeatherConfig.Id], ["DA", this.WeatherConfig.DAPath]);
      }
      this.WeatherConfig = undefined;
      if (this.KuroPostProcessComponent?.IsValid()) {
        this.KuroPostProcessComponent.bEnabled = false;
      }
      this.IsLoadCompleted = false;
      this.CurBlendWeight = 0;
      this.IsLoadCompleted = false;
    }
  }
  Destroy() {
    this.WeatherConfig = undefined;
    if (this.Actor?.IsValid()) {
      ActorSystem_1.ActorSystem.Put("PlotWeatherActorInfo.Destroy", this.Actor);
      this.Actor = undefined;
    }
    this.KuroPostProcessComponent = undefined;
  }
}
exports.PlotWeatherActorInfo = PlotWeatherActorInfo;
class PlotWeather {
  constructor() {
    this.Oto = 0;
    this.Uk = false;
    this.kje = undefined;
    this.Fje = undefined;
  }
  Init() {
    this.Oto = 0;
    this.Uk = false;
  }
  Clear() {
    this.Oto = 0;
    this.Uk = false;
    this.kto();
  }
  OnPlotEnd() {
    if (this.Uk) {
      this.Uk = false;
      WeatherController_1.WeatherController.RequestChangeWeather(this.Oto);
    }
    this.kto();
  }
  StopAllWeather() {
    if (this.Uk) {
      this.kje?.Disable();
      this.Fje?.Disable();
    }
  }
  kto() {
    this.kje?.Destroy();
    this.kje = undefined;
    this.Fje?.Destroy();
    this.Fje = undefined;
  }
  OnTick(t) {
    this.Z0e(this.Fje, t);
    this.Z0e(this.kje, t);
  }
  Z0e(t, i) {
    if (t && t.IsLoadCompleted && t.CurBlendWeight !== t.TargetBlendWeight) {
      var s = t.CurBlendWeight;
      if (t.ChangeSpeed === 0) {
        t.CurBlendWeight = t.TargetBlendWeight;
      } else {
        if (!(i > 0)) {
          return;
        }
        if (t.TargetBlendWeight > t.CurBlendWeight) {
          t.CurBlendWeight = t.CurBlendWeight + i * t.ChangeSpeed;
          t.CurBlendWeight = Math.min(t.CurBlendWeight, t.TargetBlendWeight);
        } else {
          t.CurBlendWeight = t.CurBlendWeight - i * t.ChangeSpeed;
          t.CurBlendWeight = Math.max(t.CurBlendWeight, t.TargetBlendWeight);
        }
      }
      t.KuroPostProcessComponent.BlendWeight = t.CurBlendWeight;
      if (s === 0 && t.CurBlendWeight > 0 && (t.KuroPostProcessComponent.bEnabled = true, Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Plot", 17, "剧情天气开始", ["id", t.WeatherConfig.Id], ["DA", t.WeatherConfig.DAPath]);
      }
      if (s > 0 && t.CurBlendWeight === 0 && (t.KuroPostProcessComponent.bEnabled = false, Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Plot", 17, "剧情天气结束", ["id", t.WeatherConfig.Id], ["DA", t.WeatherConfig.DAPath]);
      }
    }
  }
  ChangeWeather(t, i, s, h = PLOT_WEATHER_PRIORITY) {
    this.Oto = t;
    this.Uk = i;
    if (this.kje) {
      this.kje.TargetBlendWeight = 0;
    }
    i = ConfigManager_1.ConfigManager.WeatherModuleConfig.GetWeatherConfig(t);
    if (i) {
      if (this.kje) {
        if (this.kje.WeatherConfig?.Id === i.Id) {
          this.kje.TargetBlendWeight = 1;
          this.Z0e(this.kje, 0);
          this.jje();
          this.Fto(i, s);
          this.Vto(h);
        } else if (this.Fje) {
          t = this.Fje;
          this.Fje = this.kje;
          this.kje = t;
          if (this.kje.WeatherConfig?.Id === i.Id) {
            this.kje.TargetBlendWeight = 1;
            this.Z0e(this.kje, 0);
            this.jje();
            this.Fto(i, s);
          } else {
            this.Fto(i, s);
            this.Kje();
          }
          this.Vto(h);
        } else {
          this.Fje = this.kje;
          this.kje = new PlotWeatherActorInfo();
          this.Fto(i, s);
          this.Vto(h);
          this.Hto();
        }
      } else {
        this.kje = new PlotWeatherActorInfo();
        this.Fto(i, s);
        this.Vto(h);
        this.Hto();
      }
    }
  }
  Fto(t, i) {
    this.kje.WeatherConfig = t;
    this.kje.ChangeSpeed = i > 0 ? 1 / (i * TimeUtil_1.TimeUtil.InverseMillisecond) : 0;
    if (this.Fje) {
      this.Fje.ChangeSpeed = this.kje.ChangeSpeed;
    }
  }
  jje() {
    if (this.kje && this.kje.Actor?.IsValid() && Global_1.Global.BaseCharacter) {
      this.kje.Actor.D_K2_SetActorLocation(Global_1.Global.BaseCharacter.D_K2_GetActorLocation(), false, undefined, true);
    }
  }
  Hto() {
    let t = undefined;
    t = Global_1.Global.BaseCharacter ? Global_1.Global.BaseCharacter.D_GetTransform() : new UE.TransformDouble();
    var i = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), t);
    var s = i.AddComponentByClass(UE.KuroPostProcessComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      i.SetActorLabel("PlotWeatherActor");
    }
    s.bUnbound = true;
    s.BlendWeight = 0;
    s.bEnabled = false;
    this.kje.Actor = i;
    this.kje.KuroPostProcessComponent = s;
    this.kje.TargetBlendWeight = 1;
    this.kje.CurBlendWeight = 0;
    this.kje.IsLoadCompleted = false;
    this.Xje();
  }
  Kje() {
    var t = this.kje.KuroPostProcessComponent;
    this.kje.TargetBlendWeight = 1;
    this.kje.CurBlendWeight = 0;
    this.kje.IsLoadCompleted = false;
    t.PPTODDataAsset = undefined;
    t.WeatherDataAsset = undefined;
    t.BlendWeight = 0;
    t.bEnabled = false;
    this.jje();
    this.Xje();
  }
  Xje() {
    const i = this.kje.WeatherConfig;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 17, "加载剧情天气", ["id", i.Id], ["DA", i.DAPath]);
    }
    const s = this.kje.KuroPostProcessComponent;
    ResourceSystem_1.ResourceSystem.LoadAsync(i.DAPath, UE.KuroWeatherDataAsset, t => {
      if (t?.IsValid() && this.kje.WeatherConfig?.Id === i.Id) {
        s.WeatherDataAsset = t;
        s.SetPriority(this.kje.Priority);
        this.kje.IsLoadCompleted = true;
        this.Z0e(this.kje, 0);
      }
    });
  }
  Vto(t) {
    if (this.kje && this.kje.Priority !== t && (this.kje.Priority = t, this.kje.IsLoadCompleted) && this.kje.KuroPostProcessComponent?.IsValid()) {
      this.kje.KuroPostProcessComponent.SetPriority(t);
    }
  }
}
exports.PlotWeather = PlotWeather;
//# sourceMappingURL=PlotWeather.js.map