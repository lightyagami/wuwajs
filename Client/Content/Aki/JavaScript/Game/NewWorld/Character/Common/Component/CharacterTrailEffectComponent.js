"use strict";

var __decorate = this && this.__decorate || function (t, e, r, i) {
  var o;
  var s = arguments.length;
  var n = s < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, r) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, r, i);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (o = t[a]) {
        n = (s < 3 ? o(n) : s > 3 ? o(e, r, n) : o(e, r)) || n;
      }
    }
  }
  if (s > 3 && n) {
    Object.defineProperty(e, r, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterTrailEffectComponent = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Transform_1 = require("../../../../../Core/Utils/Math/Transform");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
let CharacterTrailEffectComponent = class CharacterTrailEffectComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ActorComp = undefined;
    this.TrailComp = undefined;
    this.DisableKey = undefined;
  }
  OnStart() {
    this.ActorComp = this.Entity.GetComponent(2);
    this.ActorComp?.Actor.Mesh?.SetRenderKuroTrail(true);
    this.EnableTrailEffect(this.ShouldUseTrailEffect(), "CharacterTrailEffectComp.OnStart");
    return true;
  }
  OnTick(t) {
    if (this.TrailComp?.IsValid()) {
      this.TrailComp.KuroTickComponentOutside(t * MathUtils_1.MathUtils.MillisecondToSecond);
    }
  }
  ShouldUseTrailEffect() {
    var t;
    var e;
    return !Info_1.Info.IsMobilePlatform() && !!this.ActorComp?.CreatureData && (t = this.ActorComp.CreatureData).GetEntityConfigType() !== Protocol_1.Aki.Protocol.rLs.Proto_Template && t.GetEntityConfigType() !== Protocol_1.Aki.Protocol.rLs.Proto_Character && (t.IsNpc() && t.GetSubEntityType() === 2 ? !!(e = t.ComponentDataMap.get("Gys")?.Gys) && this.CheckIsAreaEnableTrailEffectByPbDataId(e.Ejn) : this.CheckIsAreaEnableTrailEffectByPbDataId(t.GetPbDataId()));
  }
  CheckIsAreaEnableTrailEffectByPbDataId(t) {
    t = ModelManager_1.ModelManager.CreatureModel.GetEntityData(t);
    return !!t?.AreaId && !!ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(t.AreaId)?.IsEnableSceneInteractionEffects;
  }
  EnableTrailEffect(t, e) {
    if (t) {
      this.TryInitTrailComponent();
      if (this.TrailComp?.IsValid()) {
        if (this.DisableKey) {
          this.Enable(this.DisableKey, e);
          this.DisableKey = undefined;
          this.ActorComp?.Actor.Mesh?.SetRenderKuroTrail(true);
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Test", 50, "启用足迹效果", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["CreatureId", this.ActorComp?.CreatureData.GetCreatureDataId()]);
        }
      } else if (!this.DisableKey) {
        this.DisableKey = this.Disable(e);
        this.ActorComp?.Actor.Mesh?.SetRenderKuroTrail(false);
      }
    } else if (!this.DisableKey) {
      this.DisableKey = this.Disable(e);
      this.ActorComp?.Actor.Mesh?.SetRenderKuroTrail(false);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Test", 50, "关闭足迹效果", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["CreatureId", this.ActorComp?.CreatureData.GetCreatureDataId()]);
      }
    }
  }
  TryInitTrailComponent() {
    if (!this.TrailComp?.IsValid()) {
      this.TrailComp = this.FindOrAddTrailComponent();
      this.TrailComp?.SetComponentTickEnabled(false);
    }
  }
  FindOrAddTrailComponent() {
    if (this.ActorComp?.Owner?.IsValid()) {
      let t = this.ActorComp.Owner.GetComponentByClass(UE.BP_SnowTrailComponent_C.StaticClass());
      var e;
      if (!t?.IsValid()) {
        MathUtils_1.MathUtils.CommonTempVector.Set(0, 0, -this.ActorComp.HalfHeight);
        (e = Transform_1.Transform.Create()).SetLocation(MathUtils_1.MathUtils.CommonTempVector);
        t = this.ActorComp.Owner.AddComponentByClass(UE.BP_SnowTrailComponent_NPC_C.StaticClass(), false, e.ToUeTransformOld(), false);
      }
      return t;
    }
  }
};
CharacterTrailEffectComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(347)], CharacterTrailEffectComponent);
exports.CharacterTrailEffectComponent = CharacterTrailEffectComponent; //# sourceMappingURL=CharacterTrailEffectComponent.js.map