"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeatherActor = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TickSystem_1 = require("../../../Core/Tick/TickSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ConfigManager_1 = require("../../Manager/ConfigManager");
class WeatherComponent {
  constructor() {
    this.BlendWeightNonScale = 1;
    this.Component = undefined;
  }
}
class WeatherActor {
  constructor() {
    this.xko = undefined;
    this.F5l = new WeatherComponent();
    this.N5l = new WeatherComponent();
    this.wko = undefined;
    this.Bko = undefined;
    this.bko = 0;
    this.qko = 0;
    this.Gko = 0;
    this.Nko = 0;
    this.Uqe = -0;
    this.Oko = -0;
    this.kko = false;
    this.Rqe = TickSystem_1.TickSystem.InvalidId;
    this.G2e = false;
    this.wta = 0;
    this.V5l = false;
    this.j5l = 1;
    this.J_ = () => {
      this.Uqe += Time_1.Time.DeltaTime;
      var t = this.Uqe / (this.Oko * 1000);
      var t = MathUtils_1.MathUtils.Clamp(t, 0, 1);
      var i = MathUtils_1.MathUtils.Lerp(this.bko, this.Gko, t);
      var s = MathUtils_1.MathUtils.Lerp(this.qko, this.Nko, t);
      var h = Time_1.Time.DeltaTimeSeconds;
      this.j5l = this.V5l ? this.j5l - h : this.j5l + h;
      this.j5l = MathUtils_1.MathUtils.Clamp(this.j5l, 0, 1);
      this.Fko(i);
      this.Vko(s);
      if (t >= 1 && (this.V5l && this.j5l <= 0 || !this.V5l && this.j5l >= 1)) {
        this.jm();
      }
    };
    this.Fko = t => {
      if (this.wko) {
        this.wko.BlendWeightNonScale = t;
        this.wko.Component.BlendWeight = t * this.j5l;
      }
    };
    this.Vko = t => {
      if (this.Bko) {
        this.Bko.BlendWeightNonScale = t;
        this.Bko.Component.BlendWeight = t * this.j5l;
      }
    };
    this.v9e = () => {
      this.jm();
      this.wko = undefined;
      this.Bko = undefined;
      this.xko = undefined;
    };
  }
  Hko() {
    if (!this.xko?.IsValid()) {
      this.xko = ActorSystem_1.ActorSystem.Get(UE.BP_Weather_C.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble, undefined);
      this.xko.OnDestroyed.Add(this.v9e);
      this.F5l.Component = this.xko.KuroPostProcess_1;
      this.F5l.Component.BlendWeight = this.F5l.BlendWeightNonScale = 1;
      this.N5l.Component = this.xko.KuroPostProcess_2;
      this.N5l.Component.BlendWeight = this.N5l.BlendWeightNonScale = 0;
    }
  }
  BanWeather() {
    this.Destroy();
    this.kko = !this.kko;
  }
  SetActorState(t) {
    if (this.G2e !== t) {
      if (this.xko?.IsValid()) {
        this.xko.SetActorHiddenInGame(!t);
      }
      this.G2e = t;
    }
  }
  Bta() {
    if (this.wta !== 0) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.wta);
      this.wta = 0;
    }
  }
  ChangeWeather(t, i) {
    this.jm();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Weather", 27, "改变天气", ["targetId", t], ["tweentime", i]);
    }
    if (!this.kko) {
      if (t = ConfigManager_1.ConfigManager.WeatherModuleConfig.GetWeatherConfig(t)) {
        t = t.DAPath;
        this.Hko();
        if (this.F5l.BlendWeightNonScale >= this.N5l.BlendWeightNonScale) {
          this.wko = this.F5l;
          this.Bko = this.N5l;
        } else {
          this.wko = this.N5l;
          this.Bko = this.F5l;
        }
        this.Bta();
        this.wta = ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.KuroWeatherDataAsset, t => {
          if (t?.IsValid() && this.Bko && this.Bko.Component) {
            this.wta = 0;
            this.Bko.Component.WeatherDataAsset = t;
          }
        }, 100, "Ui.WeatherUi");
        if (i === 0) {
          this.Fko(0);
          this.Vko(1);
        } else {
          this.bko = this.wko.BlendWeightNonScale;
          this.Gko = 0;
          this.qko = this.Bko.BlendWeightNonScale;
          this.Nko = 1;
          this.Oko = i;
          this.Uqe = 0;
          if (this.Rqe === TickSystem_1.TickSystem.InvalidId) {
            this.Rqe = TickSystem_1.TickSystem.Add(this.J_, "WeatherActor").Id;
          }
        }
      }
    }
  }
  SetWeatherForbidden(t) {
    this.V5l = t;
    if (this.Rqe === TickSystem_1.TickSystem.InvalidId) {
      this.Rqe = TickSystem_1.TickSystem.Add(this.J_, "WeatherActor").Id;
    }
  }
  jm() {
    if (this.Rqe !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Remove(this.Rqe);
      this.Rqe = TickSystem_1.TickSystem.InvalidId;
    }
  }
  Destroy() {
    if (this.xko?.IsValid()) {
      this.xko.K2_DestroyActor();
    }
    this.G2e = false;
    this.xko = undefined;
  }
}
exports.WeatherActor = WeatherActor;
//# sourceMappingURL=WeatherActor.js.map