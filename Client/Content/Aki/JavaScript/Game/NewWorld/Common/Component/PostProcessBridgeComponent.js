"use strict";

var PostProcessBridgeComponent_1;
var __decorate = this && this.__decorate || function (t, i, s, e) {
  var o;
  var h = arguments.length;
  var r = h < 3 ? i : e === null ? e = Object.getOwnPropertyDescriptor(i, s) : e;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, i, s, e);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (o = t[n]) {
        r = (h < 3 ? o(r) : h > 3 ? o(i, s, r) : o(i, s)) || r;
      }
    }
  }
  if (h > 3 && r) {
    Object.defineProperty(i, s, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostProcessBridgeComponent = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const SkyboxById_1 = require("../../../../Core/Define/ConfigQuery/SkyboxById");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const GlobalData_1 = require("../../../GlobalData");
const ComponentForceTickController_1 = require("../../../World/Controller/ComponentForceTickController");
const RoleTriggerController_1 = require("../../Character/Role/RoleTriggerController");
const DEFAULT_PRIORITY = 10;
const TICK_TIME = 1000;
let PostProcessBridgeComponent = PostProcessBridgeComponent_1 = class PostProcessBridgeComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.gU = false;
    this.Vge = false;
    this.knn = undefined;
    this.Fnn = undefined;
    this.Vnn = undefined;
    this.Hnn = undefined;
    this.jnn = undefined;
    this.Wnn = undefined;
    this.OC = undefined;
    this.Knn = true;
    this.Qnn = undefined;
    this.Xnn = undefined;
    this.e8 = 0;
    this.$nn = false;
    this.Ynn = 0.001;
    this.Jue = 10;
    this.Jnn = 0;
    this.znn = 0;
    this.Znn = t => {
      if (t) {
        this.OnTriggerEnter();
      } else {
        this.OnTriggerExit();
      }
    };
    this.KHr = t => {
      if (this.gU && (this.Xnn > 0 && this.esn(t), this.znn !== this.Jnn)) {
        if (this.Jnn > this.znn) {
          this.znn = this.znn + t * this.Ynn;
          this.znn = Math.min(this.znn, this.Jnn);
        } else {
          this.znn = this.znn - t * this.Ynn;
          this.znn = Math.max(this.znn, this.Jnn);
        }
        this.Wnn.BlendWeight = this.znn;
        this.tsn();
      }
    };
  }
  OnInitData(t) {
    var i;
    var t = t.GetParam(PostProcessBridgeComponent_1)[0];
    if (t.SkyboxSetting) {
      if (i = SkyboxById_1.configSkyboxById.GetConfig(t.SkyboxSetting)) {
        this.knn = i.StaticSkybox;
        this.Fnn = i.DynamicSkybox;
      }
    } else {
      this.knn = t.WeatherDataAsset;
      this.Fnn = t.PPTODDataAsset;
    }
    if (t.FadeTime !== undefined && t.FadeTime > 0) {
      this.Ynn = 1 / (t.FadeTime * TimeUtil_1.TimeUtil.InverseMillisecond);
    } else {
      this.Ynn = 0;
    }
    this.Jue = t.Priority || DEFAULT_PRIORITY;
    this.Knn = t.TriggerMode === undefined;
    this.Qnn = t.TriggerMode;
    if (t.TriggerMode?.Type === IComponent_1.ETriggerMode.Distance) {
      i = t.TriggerMode;
      this.Xnn = i.Distance * i.Distance;
    } else {
      this.Xnn = 0;
    }
    this.e8 = 0;
    return !(this.$nn = false);
  }
  OnStart() {
    var t;
    var i = this.Entity.GetComponent(1).Owner;
    if (i?.IsValid()) {
      this.OC = i;
      if (GlobalData_1.GlobalData.IsPlayInEditor) {
        t = this.Entity.GetComponent(0)?.GetPbDataId();
        i.SetActorLabel("SkyboxEntity_" + t);
      }
      this.Wnn = i.GetComponentByClass(UE.KuroPostProcessComponent.StaticClass());
      if (!this.Wnn?.IsValid()) {
        this.Wnn = i.AddComponentByClass(UE.KuroPostProcessComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
      }
      this.Wnn.bUnbound = true;
      this.Wnn.BlendWeight = this.znn;
      this.tsn();
      if (this.Knn) {
        this.jnn = this.Entity.GetComponent(91);
        if (!this.jnn) {
          this.gU = false;
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Entity", 17, "氛围组件初始化失败，缺少RangeComponent");
          }
          return false;
        }
        this.jnn.AddOnPlayerOverlapCallback(this.Znn);
      }
      this.gU = true;
      this.EnableComponent();
      if (!StringUtils_1.StringUtils.IsEmpty(this.knn)) {
        ResourceSystem_1.ResourceSystem.LoadAsync(this.knn, UE.KuroWeatherDataAsset, t => {
          if (t?.IsValid()) {
            this.Vnn = t;
            this.Wnn.WeatherDataAsset = this.Vnn;
            this.Wnn.SetPriority(this.Jue);
          }
        });
        return true;
      }
      if (!StringUtils_1.StringUtils.IsEmpty(this.Fnn)) {
        ResourceSystem_1.ResourceSystem.LoadAsync(this.Fnn, UE.KuroTODData, t => {
          if (t?.IsValid()) {
            this.Hnn = t;
            this.Wnn.PPTODDataAsset = this.Hnn;
            this.Wnn.SetPriority(this.Jue);
          }
        });
        return true;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 17, "氛围组件初始化失败", ["WeatherDataAssetPath", this.knn], ["TodDataAssetPath", this.Fnn]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Entity", 17, "氛围组件初始化失败, actor为空");
    }
    return false;
  }
  OnTriggerEnter() {
    if (this.gU && this.Vge && (this.$nn = true, this.SetTargetBlendWeight(1), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Entity", 17, "氛围组件触发", ["WeatherDataAssetPath", this.knn], ["TodDataAssetPath", this.Fnn]);
    }
  }
  OnTriggerExit() {
    if (this.gU && this.Vge && (this.$nn = false, this.SetTargetBlendWeight(0), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Entity", 17, "氛围组件关闭", ["WeatherDataAssetPath", this.knn], ["TodDataAssetPath", this.Fnn]);
    }
  }
  SetTargetBlendWeight(t, i = false) {
    if (this.gU) {
      this.Jnn = t;
      if (!!i || this.Ynn === 0) {
        this.znn = t;
        this.Wnn.BlendWeight = this.znn;
        this.tsn();
      }
    }
  }
  EnableComponent() {
    if (this.gU) {
      this.Vge = true;
      this.e8 = TICK_TIME;
      this.$nn = false;
      if (this.Knn) {
        if (this.jnn.IsOverlappingPlayer()) {
          this.OnTriggerEnter();
        }
      } else if (this.Qnn?.Type === IComponent_1.ETriggerMode.Global) {
        this.OnTriggerEnter();
      }
    }
  }
  DisableComponent() {
    if (this.gU) {
      this.Vge = false;
      this.SetTargetBlendWeight(0);
    }
  }
  OnActivate() {
    if (!Info_1.Info.EnableForceTick && this.Active) {
      ComponentForceTickController_1.ComponentForceTickController.RegisterTick(this, this.KHr);
    }
  }
  OnEnable() {
    if (!Info_1.Info.EnableForceTick && this.Entity?.IsInit) {
      ComponentForceTickController_1.ComponentForceTickController.RegisterTick(this, this.KHr);
    }
  }
  OnDisable(t) {
    if (!Info_1.Info.EnableForceTick) {
      ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(this);
    }
  }
  OnForceTick(t) {
    this.KHr(t);
  }
  esn(t) {
    this.e8 += t;
    if (!(this.e8 < TICK_TIME)) {
      this.e8 = 0;
      if ((t = RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger())?.IsValid() && this.OC?.IsValid()) {
        t = t.GetSquaredDistanceTo(this.OC) < this.Xnn;
        if (this.$nn) {
          if (!t) {
            this.OnTriggerExit();
          }
        } else if (t) {
          this.OnTriggerEnter();
        }
      }
    }
  }
  tsn() {
    this.Wnn.bEnabled = this.znn > 0;
  }
  OnEnd() {
    if (this.jnn) {
      this.jnn.RemoveOnPlayerOverlapCallback(this.Znn);
      this.jnn = undefined;
    }
    this.gU = false;
    if (!Info_1.Info.EnableForceTick) {
      ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(this);
    }
    return true;
  }
};
PostProcessBridgeComponent = PostProcessBridgeComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(116)], PostProcessBridgeComponent);
exports.PostProcessBridgeComponent = PostProcessBridgeComponent; //# sourceMappingURL=PostProcessBridgeComponent.js.map