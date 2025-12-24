"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayCueFromSummoned = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../../Core/Common/Log");
const EntitySystem_1 = require("../../../../../../../Core/Entity/EntitySystem");
const FNameUtil_1 = require("../../../../../../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../../../../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../../../Core/Utils/Math/Vector");
const EffectContext_1 = require("../../../../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../../../../Effect/EffectSystem");
const BlackboardController_1 = require("../../../../../../World/Controller/BlackboardController");
const GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueFromSummoned extends GameplayCueBase_1.GameplayCueBase {
  constructor() {
    super(...arguments);
    this.k$o = undefined;
    this.F$o = undefined;
    this.p$o = undefined;
    this.V$o = undefined;
    this.m$o = 0;
    this.H$o = undefined;
    this.j$o = undefined;
    this.W$o = false;
  }
  OnInit() {
    var t;
    var e = this.Instigator?.Entity;
    if (e) {
      this.Vi();
      this.H$o = Transform_1.Transform.Create();
      this.H$o.SetScale3D(Vector_1.Vector.OneVectorProxy);
      this.j$o = Transform_1.Transform.Create();
      t = BlackboardController_1.BlackboardController.GetIntValueByEntity(e.Id, this.CueConfig.CompName);
      this.k$o = EntitySystem_1.EntitySystem.Get(t)?.CheckGetComponent(3)?.Actor;
      this.F$o = e.Id;
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Battle", 48, "无法获取Buff施放者");
    }
  }
  OnCreate() {
    if (this.k$o) {
      this.m$o = EffectSystem_1.EffectSystem.SpawnEffect(this.k$o, new UE.TransformDouble(), this.CueConfig.Path, "[GameplayCueFromSummoned.OnCreate]", new EffectContext_1.EffectContext(this.F$o), 0);
      this.K$o();
      if (this.CueConfig.Comp === 1) {
        this.W$o = true;
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Battle", 48, "无法获取召唤物");
    }
  }
  OnTick(t) {
    if (this.W$o) {
      this.K$o();
    }
  }
  OnDestroy() {
    this.k$o = undefined;
    this.F$o = undefined;
    this.W$o = false;
    this.V$o = undefined;
    this.p$o.splice(0, this.p$o.length);
    this.p$o = undefined;
    this.H$o = undefined;
    this.j$o = undefined;
    if (EffectSystem_1.EffectSystem.IsValid(this.m$o)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.m$o, "[GameplayCueEffect.OnDestroy]", false);
      this.m$o = 0;
    }
  }
  Vi() {
    var t = Vector_1.Vector.Create(this.CueConfig.Location.X, this.CueConfig.Location.Y, this.CueConfig.Location.Z);
    var e = Rotator_1.Rotator.Create(this.CueConfig.Rotation.Y, this.CueConfig.Rotation.Z, this.CueConfig.Rotation.X);
    var i = Vector_1.Vector.Create(this.CueConfig.Scale.X, this.CueConfig.Scale.Y, this.CueConfig.Scale.Z);
    this.V$o = Transform_1.Transform.Create(e.Quaternion(), t, i);
    this.p$o = new Array();
    var s = this.CueConfig.Socket.split("#");
    for (let t = 0, e = s?.length; t < e; t++) {
      this.p$o.push(FNameUtil_1.FNameUtil.GetDynamicFName(s[t]));
    }
  }
  K$o() {
    var t;
    var e;
    var i;
    var s;
    if (EffectSystem_1.EffectSystem.IsValid(this.m$o) && (t = EffectSystem_1.EffectSystem.GetEffectActor(this.m$o)) && t.IsValid()) {
      e = this.H$o.GetLocation();
      if (this.p$o.length > 0) {
        e.FromUeVector(this.k$o.Mesh.D_GetSocketLocation(this.p$o[0]));
      } else {
        e.DeepCopy(this.k$o.CharacterActorComponent.ActorLocationProxy);
      }
      i = this.j$o.GetLocation();
      if (this.p$o.length > 1) {
        i.FromUeVector(this.ActorInternal.Mesh.D_GetSocketLocation(this.p$o[1]));
      } else {
        i.DeepCopy(this.GetActorComponent().ActorLocationProxy);
      }
      s = this.H$o.GetRotation();
      i.SubtractionEqual(e).ToOrientationQuat(s);
      this.V$o.ComposeTransforms(this.H$o, this.j$o);
      t.D_K2_SetActorLocationAndRotation(this.j$o.GetLocation().ToUeVector(), this.j$o.GetRotation().Rotator().ToUeRotator(), false, undefined, true);
    }
  }
}
exports.GameplayCueFromSummoned = GameplayCueFromSummoned;
//# sourceMappingURL=GameplayCueFromSummoned.js.map