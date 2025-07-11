"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemManipulableAdsorbedState = undefined;
const puerts_1 = require("puerts");
const Log_1 = require("../../../../Core/Common/Log");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const SceneItemManipulableBaseState_1 = require("./SceneItemManipulableBaseState");
class SceneItemManipulableAdsorbedState extends SceneItemManipulableBaseState_1.SceneItemManipulableBaseState {
  constructor() {
    super(...arguments);
    this.gU = false;
    this.IVs = undefined;
    this.TVs = 0;
    this.LVs = 0;
    this.Lpi = true;
    this.esr = Vector_1.Vector.Create();
    this.DVs = Vector_1.Vector.Create();
    this.AVs = Vector_1.Vector.Create();
    this.tsr = Rotator_1.Rotator.Create();
    this.UVs = Rotator_1.Rotator.Create();
    this.RVs = Rotator_1.Rotator.Create();
  }
  OnEnter() {
    this.SceneItem.ClearCastDestroyTimer();
    this.SceneItem.TryAddTagById(1370513573);
    this.SceneItem.IsCanBeHeld = true;
    this.OpenPhysicsSplit();
    this.PropComp.IsMoving = false;
    if (!FNameUtil_1.FNameUtil.IsNothing(this.SceneItem.ManipulateBaseConfig.待机状态碰撞预设)) {
      this.SceneItem.ActorComp.GetPrimitiveComponent().SetCollisionProfileName(this.SceneItem.ManipulateBaseConfig.待机状态碰撞预设);
    }
    if (!this.gU) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 31, "被控物进入被吸附状态之前未初始化吸附配置", ["PbDataId", this.SceneItem?.ActorComp?.CreatureData.GetPbDataId()]);
      }
    }
    this.SceneItem.ForceMoving = true;
    this.SceneItem.ResetForceDisplace();
    this.SceneItem.ActorComp.PhysicsMode = 0;
    this.LVs = 0;
    this.Lpi = true;
    this.tsr.DeepCopy(this.SceneItem.ActorComp.ActorRotation);
  }
  OnExit() {
    super.OnExit();
    this.SceneItem.ForceMoving = false;
    this.gU = false;
  }
  OnTick(t) {
    if (this.Lpi) {
      this.esr.DeepCopy(this.SceneItem.ActorComp.ActorLocationProxy);
      this.Lpi = false;
    }
    this.LVs += t;
    this.LVs = Math.min(this.LVs, this.TVs);
    t = this.IVs.GetFloatValue(this.LVs / this.TVs);
    Vector_1.Vector.Lerp(this.esr, this.DVs, t, this.AVs);
    Rotator_1.Rotator.Lerp(this.tsr, this.UVs, t, this.RVs);
    this.SceneItem.ActorComp.SetActorLocationAndRotation(this.AVs.ToUeVector(), this.RVs.ToUeRotator(), "[SceneItemOutletComponent.EntityMoveTickHandle]");
    if (this.LVs >= this.TVs) {
      this.Jnr();
      this.SceneItem?.SetState(10, "AdsorbState over time");
    }
    return true;
  }
  InitAdsorptionConfig(t, i, s) {
    var e;
    this.gU = true;
    if (this.IVs = t) {
      e = (0, puerts_1.$ref)(0);
      t.GetTimeRange(undefined, e);
      this.TVs = (0, puerts_1.$unref)(e);
    }
    this.DVs.DeepCopy(i);
    this.UVs.DeepCopy(s);
  }
  Jnr() {
    this.SceneItem.ActivatedOutlet = this.SceneItem.TargetOutletComponent;
    this.SceneItem.ActivatedOutlet.EntityInSocket = this.SceneItem;
    this.SceneItem.RequestAttachToOutlet();
  }
}
exports.SceneItemManipulableAdsorbedState = SceneItemManipulableAdsorbedState;
//# sourceMappingURL=SceneItemManipulableAdsorbedState.js.map