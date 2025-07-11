"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectModelTrailSpec = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const EffectModelHelper_1 = require("../../Render/Effect/Data/EffectModelHelper");
const EffectMaterialParameter_1 = require("../../Render/Effect/Data/Parameters/EffectMaterialParameter");
const SkeletalMeshEffectContext_1 = require("../EffectContext/SkeletalMeshEffectContext");
const EffectSpec_1 = require("./EffectSpec");
class EffectModelTrailSpec extends EffectSpec_1.EffectSpec {
  constructor() {
    super(...arguments);
    this.ParentActor = undefined;
    this.AttachCount = 0;
    this.SkeletalMeshComp = undefined;
    this.WorldToParentActor = undefined;
    this.UseBones = false;
    this.AttachBoneNames = undefined;
    this.AttachLocations = undefined;
    this.UnitLength = 0;
    this.LocationsCurve = undefined;
    this.DissipateNum = 0;
    this.IsDead = false;
    this.LastSubdivision = 0;
    this.DissipateLeft = 0;
    this.LocationsFromCurve = undefined;
    this.DyMaterial = undefined;
    this.MaterialParameters = undefined;
    this.BezierMeshComp = undefined;
    this.MaxSubdivision = 12;
    this.MaxMeshLength = 100;
    this.MaxLayerNum = 600;
    this.cz = undefined;
  }
  OnCanStop() {
    return true;
  }
  OnInit() {
    this.ParentActor = this.Handle.GetSureEffectActor();
    return true;
  }
  Setup(t) {
    this.SkeletalMeshComp = t;
    if (this.SkeletalMeshComp) {
      if (this.EffectModel.AttachToBones) {
        this.UseBones = true;
        this.AttachCount = this.EffectModel.AttachBoneNames.Num();
        if (this.AttachCount < 2) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("RenderEffect", 25, "拖尾特效绑定点数量不足", ["DA文件", this.EffectModel.GetName()]);
          }
          return;
        }
        this.AttachBoneNames = new Array();
        this.AttachLocations = new Array();
        for (let i = 0; i < this.AttachCount; i++) {
          var s = this.EffectModel.AttachBoneNames.Get(i);
          let t = Vector_1.Vector.Create(0, 0, 0);
          if (this.EffectModel.RelativeLocations.Num() > i) {
            t = Vector_1.Vector.Create(this.EffectModel.RelativeLocations.Get(i));
          }
          if (!this.SkeletalMeshComp.DoesSocketExist(s)) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("RenderEffect", 25, "拖尾特效找不到插槽", ["DA文件", this.EffectModel.GetName()], ["网格体", this.SkeletalMeshComp.GetName()], ["插槽名", s]);
            }
            return;
          }
          this.AttachBoneNames.push(s);
          this.AttachLocations.push(t);
        }
      } else {
        this.UseBones = false;
        this.AttachCount = this.EffectModel.RelativeLocations.Num();
        if (this.AttachCount < 2) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("RenderEffect", 25, "拖尾特效绑定点数量不足", ["DA文件", this.EffectModel.GetName()]);
          }
          return;
        }
        this.AttachLocations = new Array();
        for (let t = 0; t < this.AttachCount; t++) {
          var i = Vector_1.Vector.Create(this.EffectModel.RelativeLocations.Get(t));
          this.AttachLocations.push(i);
        }
      }
      if (!this.BezierMeshComp) {
        this.BezierMeshComp = EffectModelHelper_1.EffectModelHelper.AddSceneComponent(this.ParentActor, UE.KuroBezierMeshComponent.StaticClass(), undefined, undefined, false, this.EffectModel);
        this.SceneComponent = this.BezierMeshComp;
      }
      this.DyMaterial = UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(this.BezierMeshComp, this.EffectModel.Material);
      this.BezierMeshComp.SetMaterial(0, this.DyMaterial);
      this.MaterialParameters = new EffectMaterialParameter_1.default(this.EffectModel.FloatParameters, this.EffectModel.ColorParameters);
      this.MaterialParameters.Apply(this.DyMaterial, 0, true);
      this.BezierMeshComp.Setup(this.AttachCount, this.EffectModel.UnitLength);
      this.WorldToParentActor = this.ParentActor.D_GetTransform().Inverse();
      this.LocationsCurve = this.EffectModel.LocationsCurve;
      this.LocationsFromCurve = new Array();
      for (let t = 0; t < this.AttachCount; t++) {
        var e = Vector_1.Vector.Create(0, 0, 0);
        this.LocationsFromCurve.push(e);
      }
      this.cz = Vector_1.Vector.Create(0, 0, 0);
      this.DissipateNum = 0;
      this.IsDead = false;
      this.DissipateLeft = 0;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RenderEffect", 25, "拖尾特效错误：没有寻找到骨骼模型", ["DA文件", this.EffectModel.GetName()]);
    }
  }
  OnTick() {
    if (this.BezierMeshComp) {
      if (!this.IsDead && !this.SkeletalMeshComp?.IsValid()) {
        this.Stop("[EffectModelTrailSpec.OnTick]", false);
      }
      var s = this.LocationsCurve.Num();
      for (let t = 0; t < s; t++) {
        var e = this.LocationsCurve.GetKey(t);
        var h = this.LocationsCurve.Get(e);
        var h = UE.KuroCurveLibrary.GetValue_Vector(h, this.LifeTime.TotalPassTime);
        this.LocationsFromCurve[e].FromUeVector(h);
      }
      if (this.BezierMeshComp.GetLayerNum() > this.MaxLayerNum) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RenderEffect", 25, "拖尾特效太长", ["特效名", this.EffectModel.GetName()]);
        }
        this.SetDead();
      }
      if (!this.IsDead) {
        for (let t = 0; t < this.AttachCount; t++) {
          var r = this.GetAttachLocation(t);
          this.BezierMeshComp.SetKeyPoint(t, r.X, r.Y, r.Z);
        }
        var o = UE.KuroCurveLibrary.GetValue_Float(this.EffectModel.Alpha, this.LifeTime.TotalPassTime);
        this.BezierMeshComp.AddLayer(o);
      }
      let t = 0;
      t = this.IsDead ? this.EffectModel.DissipateSpeedAfterDead : UE.KuroCurveLibrary.GetValue_Float(this.EffectModel.DissipateSpeed, this.LifeTime.TotalPassTime);
      if (!this.Handle.GetIgnoreTimeScale()) {
        t = t * this.GetTimeScale() * this.GetGlobalTimeScale();
      }
      t += this.DissipateLeft;
      let i = Math.floor(t);
      this.DissipateLeft = t - i;
      o = this.BezierMeshComp.GetMeshHeight() - this.MaxMeshLength;
      if (o > i) {
        i = o;
        this.DissipateLeft = 0;
      }
      this.BezierMeshComp.Dissipate(i);
      this.BezierMeshComp.UpdateMesh(0);
      this.BezierMeshComp.SetVisibility(true);
      this.MaterialParameters.Tick(this.DyMaterial, this.LifeTime.PassTime);
    }
  }
  OnEnd() {
    if (this.BezierMeshComp?.GetOwner()) {
      this.BezierMeshComp.GetOwner().K2_DestroyComponent(this.BezierMeshComp);
      this.BezierMeshComp = undefined;
      this.DyMaterial = undefined;
    }
    return true;
  }
  SetDead() {
    this.IsDead = true;
  }
  ShouldDestroy() {
    return !this.BezierMeshComp || !!this.IsDead && (!!this.EffectModel.DestroyAtOnce || this.BezierMeshComp.GetMeshHeight() === 0);
  }
  GetAttachLocation(t) {
    let i = undefined;
    let s = undefined;
    this.AttachLocations[t].Addition(this.LocationsFromCurve[t], this.cz);
    i = this.UseBones ? this.SkeletalMeshComp.D_GetSocketTransform(this.AttachBoneNames[t], 0) : this.SkeletalMeshComp.D_K2_GetComponentToWorld();
    s = this.WorldToParentActor.TransformPosition(i.TransformPosition(this.cz.ToUeVector(true)));
    return Vector_1.Vector.Create(s);
  }
  OnStop(t, i) {
    this.BezierMeshComp?.ClearData();
    this.BezierMeshComp?.SetVisibility(false);
    this.BezierMeshComp?.SetComponentTickEnabled(false);
    this.SetDead();
  }
  OnPlay(t) {
    var i = this.Handle?.GetContext();
    if (i && i instanceof SkeletalMeshEffectContext_1.SkeletalMeshEffectContext && i.SkeletalMeshComp) {
      this.Setup(i.SkeletalMeshComp);
      this.BezierMeshComp?.SetComponentTickEnabled(true);
    }
  }
  HasMaterialParameters() {
    return true;
  }
  GetMaterialParameters() {
    return this.MaterialParameters;
  }
  IsOverrideTick() {
    return true;
  }
  RegisterToKuroEffectSystem() {
    var t;
    var i;
    if (this.Handle && this.BezierMeshComp && this.EffectModel && this.DyMaterial && (t = this.Handle?.GetContext()) && t instanceof SkeletalMeshEffectContext_1.SkeletalMeshEffectContext && t.SkeletalMeshComp && (i = this.Handle.GetSureEffectActor())) {
      this.HasInitTickOptimize = true;
      cpp_1.FKuroEffectSystemInterface.RegisterEffectTrailHandle(this.Handle.Id, this.Handle.Parent?.Id ?? 0, this.EffectModel, i, this.BezierMeshComp, t.SkeletalMeshComp, this.DyMaterial);
    }
  }
}
exports.EffectModelTrailSpec = EffectModelTrailSpec;
//# sourceMappingURL=EffectModelTrailSpec.js.map