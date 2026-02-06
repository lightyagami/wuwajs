"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SunSpiritEffectPerform = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const Quat_1 = require("../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../../Core/Utils/Math/Transform");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EffectContext_1 = require("../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
const SunSpiritBasePerform_1 = require("./SunSpiritBasePerform");
class SunSpiritEffectPerform extends SunSpiritBasePerform_1.SunSpiritBasePerform {
  constructor(t, e) {
    super(t);
    this.OQm = undefined;
    this.GQm = 0;
    this.tat = undefined;
    this.pMn = Transform_1.Transform.Create();
    this.Mme = Transform_1.Transform.Create();
    this.pMn.Set(e.GetLocation(), e.GetRotation(), e.GetScale3D());
  }
  OnInit() {
    this.tat = ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritConfig().FlyingEffectDaPath;
    return this.NQm(this.pMn) && this.VQm();
  }
  OnDestroy() {
    this.HQm("SunSpiritEffectPerform.OnDestroy");
    this.jQm("SunSpiritEffectPerform.OnDestroy");
  }
  GetTransform(t) {
    return !!this.OQm?.IsValid() && (t.FromUeTransform(this.OQm.D_GetTransform()), true);
  }
  GetTransformData(t, e, r) {
    return !!this.OQm?.IsValid() && (t?.FromUeVector(this.OQm.D_K2_GetActorLocation()), e instanceof Quat_1.Quat ? e.FromUeQuat(this.OQm.K2_GetActorQuaternion()) : e instanceof Rotator_1.Rotator && e.FromUeRotator(this.OQm.K2_GetActorRotation()), r?.FromUeVector(this.OQm.D_GetActorScale3D()), true);
  }
  SetTransform(t) {
    return !!this.OQm?.IsValid() && (this.OQm.D_K2_SetActorTransform(t.ToUeTransform(), false, undefined, true), true);
  }
  SetTransformData(t, e, r) {
    return !!this.OQm?.IsValid() && (t && e && r ? (this.Mme.Set(t, e instanceof Quat_1.Quat ? e : e.Quaternion(MathUtils_1.MathUtils.CommonTempQuat), r), this.OQm.D_K2_SetActorTransform(this.Mme.ToUeTransform(), false, undefined, true)) : t && e ? this.OQm.D_K2_SetActorLocationAndRotation(t.ToUeVector(), (e instanceof Quat_1.Quat ? e.Rotator(MathUtils_1.MathUtils.CommonTempRotator) : e).ToUeRotator(), false, undefined, true) : (t && this.OQm.D_K2_SetActorLocation(t.ToUeVector(), false, undefined, true), e instanceof Quat_1.Quat ? this.OQm.K2_SetActorRotation(e.Rotator(MathUtils_1.MathUtils.CommonTempRotator).ToUeRotator(), false) : e instanceof Rotator_1.Rotator && this.OQm.K2_SetActorRotation(e.ToUeRotator(), false), r && this.OQm.D_SetActorScale3D(r.ToUeVector())), true);
  }
  NQm(t) {
    if (!this.OQm?.IsValid()) {
      var e = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), t?.ToUeTransform());
      if (!e) {
        return false;
      }
      if (!e.GetComponentByClass(UE.SceneComponent.StaticClass())) {
        e.AddComponentByClass(UE.SceneComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
      }
      if (t) {
        e.D_K2_SetActorTransform(t.ToUeTransform(), false, undefined, true);
      }
      if (GlobalData_1.GlobalData.IsPlayInEditor) {
        e.SetActorLabel(`SunSpiritPerformanceActor_${this.SunSpiritData.SunSpiritId}_${this.SunSpiritData.InstId}_${this.SunSpiritData.ConfigId}`);
      }
      this.OQm = e;
    }
    return true;
  }
  jQm(t) {
    if (this.OQm?.IsValid()) {
      ActorSystem_1.ActorSystem.Put(t, this.OQm);
    }
    this.OQm = undefined;
  }
  VQm() {
    if (!this.OQm?.IsValid()) {
      return false;
    }
    if (!this.tat || this.tat.length <= 0) {
      return false;
    }
    if (!this.GQm || !EffectSystem_1.EffectSystem.IsValid(this.GQm)) {
      this.GQm = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, MathUtils_1.MathUtils.DefaultTransformDouble, this.tat, "SunSpiritEffectPerform", new EffectContext_1.EffectContext(undefined, this.OQm));
    }
    var t = EffectSystem_1.EffectSystem.GetEffectActor(this.GQm);
    return !!t && (t.K2_AttachToActor(this.OQm, undefined, 2, 2, 2, false), true);
  }
  HQm(t) {
    if (this.GQm && EffectSystem_1.EffectSystem.IsValid(this.GQm)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.GQm, t, false);
    }
    this.GQm = 0;
  }
}
exports.SunSpiritEffectPerform = SunSpiritEffectPerform;
//# sourceMappingURL=SunSpiritEffectPerform.js.map