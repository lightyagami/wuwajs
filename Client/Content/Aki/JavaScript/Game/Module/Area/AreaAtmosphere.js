"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AreaAtmosphere = exports.AreaAtmosphereActorInfo = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
class AreaAtmosphereActorInfo {
  constructor() {
    this.AreaAtmosphereInfo = undefined;
    this.Actor = undefined;
    this.KuroPostProcessComponent = undefined;
    this.TargetBlendWeight = 0;
    this.CurBlendWeight = 0;
    this.ChangeSpeed = 0;
    this.IsLoadCompleted = false;
  }
  Clear() {
    this.AreaAtmosphereInfo = undefined;
    if (this.Actor) {
      ActorSystem_1.ActorSystem.Put("AreaAtmosphereActorInfo.Clear", this.Actor);
    }
    this.Actor = undefined;
    this.KuroPostProcessComponent = undefined;
  }
}
exports.AreaAtmosphereActorInfo = AreaAtmosphereActorInfo;
class AreaAtmosphere {
  constructor() {
    this.kje = undefined;
    this.Fje = undefined;
    this.uMe = () => {
      this.Vje();
    };
    this.nye = () => {
      this.Hje();
    };
    this.Hje = () => {
      if (this.kje) {
        this.kje.TargetBlendWeight = 0;
      }
      var e = ModelManager_1.ModelManager.AreaModel.AreaInfo;
      if (e) {
        let t = e.AtmosphereId;
        if (t === 0) {
          if (e.Father === 0) {
            return;
          }
          e = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(e.Father);
          if (!e || e.AtmosphereId === 0) {
            return;
          }
          t = e.AtmosphereId;
        }
        var i;
        var e = ConfigManager_1.ConfigManager.AreaConfig.GetAreaAtmosphereInfo(t);
        if (e) {
          if (this.kje) {
            if (this.kje.AreaAtmosphereInfo.Id === e.Id) {
              this.kje.TargetBlendWeight = 1;
              this.Z0e(this.kje, 0);
              this.jje();
            } else if (this.Fje) {
              i = this.Fje;
              this.Fje = this.kje;
              this.kje = i;
              if (this.kje.AreaAtmosphereInfo.Id === e.Id) {
                this.kje.TargetBlendWeight = 1;
                this.Z0e(this.kje, 0);
                this.jje();
              } else {
                this.Wje(e);
                this.Kje();
              }
            } else {
              this.Fje = this.kje;
              this.kje = new AreaAtmosphereActorInfo();
              this.Wje(e);
              this.Qje();
            }
          } else {
            this.kje = new AreaAtmosphereActorInfo();
            this.Wje(e);
            this.Qje();
          }
        }
      }
    };
    this.AU();
  }
  AU() {
    this.dde();
  }
  Destroy() {
    this.Cde();
    this.Vje();
  }
  Vje() {
    if (this.kje) {
      this.kje.Clear();
      this.kje = undefined;
    }
    if (this.Fje) {
      this.Fje.Clear();
      this.Fje = undefined;
    }
  }
  OnTick(t) {
    this.Z0e(this.kje, t);
    this.Z0e(this.Fje, t);
  }
  Z0e(t, e) {
    if (t && t.IsLoadCompleted && t.CurBlendWeight !== t.TargetBlendWeight) {
      var i = t.CurBlendWeight;
      if (t.ChangeSpeed === 0) {
        t.CurBlendWeight = t.TargetBlendWeight;
      } else {
        if (!(e > 0)) {
          return;
        }
        if (t.TargetBlendWeight > t.CurBlendWeight) {
          t.CurBlendWeight = t.CurBlendWeight + e * t.ChangeSpeed;
          t.CurBlendWeight = Math.min(t.CurBlendWeight, t.TargetBlendWeight);
        } else {
          t.CurBlendWeight = t.CurBlendWeight - e * t.ChangeSpeed;
          t.CurBlendWeight = Math.max(t.CurBlendWeight, t.TargetBlendWeight);
        }
      }
      t.KuroPostProcessComponent.BlendWeight = t.CurBlendWeight;
      if (i === 0 && t.CurBlendWeight > 0 && (t.KuroPostProcessComponent.bEnabled = true, Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Area", 17, "区域氛围开启", ["id", t.AreaAtmosphereInfo.Id], ["DA", t.AreaAtmosphereInfo.DAPath]);
      }
      if (i > 0 && t.CurBlendWeight === 0 && (t.KuroPostProcessComponent.bEnabled = false, Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Area", 17, "区域氛围关闭", ["id", t.AreaAtmosphereInfo.Id], ["DA", t.AreaAtmosphereInfo.DAPath]);
      }
    }
  }
  dde() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ClearWorld, this.uMe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeArea, this.Hje);
  }
  Cde() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ClearWorld, this.uMe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeArea, this.Hje);
  }
  Wje(t) {
    if ((this.kje.AreaAtmosphereInfo = t).FadeTime > 0) {
      this.kje.ChangeSpeed = 1 / (t.FadeTime * TimeUtil_1.TimeUtil.InverseMillisecond);
    } else {
      this.kje.ChangeSpeed = 0;
    }
  }
  jje() {
    if (this.kje && this.kje.Actor?.IsValid() && Global_1.Global.BaseCharacter) {
      this.kje.Actor.D_K2_SetActorLocation(Global_1.Global.BaseCharacter.D_K2_GetActorLocation(), false, undefined, true);
    }
  }
  Qje() {
    let t = undefined;
    t = Global_1.Global.BaseCharacter ? Global_1.Global.BaseCharacter.D_GetTransform() : new UE.TransformDouble();
    var e = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), t);
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      e.SetActorLabel("AreaAtmosphere");
    }
    var i = e.AddComponentByClass(UE.KuroPostProcessComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
    i.bUnbound = true;
    i.BlendWeight = 0;
    i.bEnabled = false;
    this.kje.Actor = e;
    this.kje.KuroPostProcessComponent = i;
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
    const e = this.kje.AreaAtmosphereInfo;
    const i = this.kje.KuroPostProcessComponent;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Area", 17, "开始加载区域氛围", ["id", e.Id], ["DA", e.DAPath]);
    }
    if (e.IsTOD) {
      ResourceSystem_1.ResourceSystem.LoadAsync(e.DAPath, UE.KuroTODData, t => {
        if (t?.IsValid() && this.kje.AreaAtmosphereInfo.Id === e.Id && (this.kje.IsLoadCompleted = true, i.PPTODDataAsset = t, i.SetPriority(e.Priority), this.Z0e(this.kje, 0), Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("Area", 17, "加载氛围资源成功", ["id", e.Id], ["DA", e.DAPath]);
        }
      });
    } else {
      ResourceSystem_1.ResourceSystem.LoadAsync(e.DAPath, UE.KuroWeatherDataAsset, t => {
        if (t?.IsValid() && this.kje.AreaAtmosphereInfo.Id === e.Id && (this.kje.IsLoadCompleted = true, i.WeatherDataAsset = t, i.SetPriority(e.Priority), this.Z0e(this.kje, 0), Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("Area", 17, "加载氛围资源成功", ["id", e.Id], ["DA", e.DAPath]);
        }
      });
    }
  }
}
exports.AreaAtmosphere = AreaAtmosphere;
//# sourceMappingURL=AreaAtmosphere.js.map