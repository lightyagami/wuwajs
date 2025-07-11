"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectModelGhostSpec = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const EffectModelHelper_1 = require("../../Render/Effect/Data/EffectModelHelper");
const EffectSpec_1 = require("./EffectSpec");
class GhostElement {
  constructor(e, t) {
    this.Name = undefined;
    this.PoseComponent = undefined;
    this.Name = e;
    this.PoseComponent = t;
  }
}
class EffectModelGhostSpec extends EffectSpec_1.EffectSpec {
  constructor() {
    super(...arguments);
    this.n0e = [];
    this.s0e = new Map();
    this.a0e = new Map();
    this.h0e = undefined;
    this.l0e = 0;
    this._0e = 0;
    this.u0e = undefined;
  }
  OnInit() {
    this._0e = 1;
    this.u0e = this.EffectModel.MaterialRef;
    return true;
  }
  OnPlay() {
    this.l0e = -999;
    this.h0e = this.Handle.GetContext();
    if (this.h0e) {
      if (this.h0e.SkeletalMeshComp) {
        if (this.h0e.UseSpawnRate) {
          this._0e = 1 / Math.max(this.h0e.SpawnRate, 0.000001);
        } else {
          this._0e = this.h0e.SpawnInterval;
        }
        this.CollectSkeletalMesh(this.h0e.SkeletalMeshComp);
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("RenderEffect", 25, "残影EffectContext缺少SkeletalMesh组件");
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("RenderEffect", 25, "残影EffectContext类型错误");
    }
  }
  static GetComponentName(e) {
    switch (e) {
      case 0:
        return EffectModelGhostSpec.BodyName;
      case 1:
        return EffectModelGhostSpec.WeaponCase0Name;
      case 2:
        return EffectModelGhostSpec.WeaponCase1Name;
      case 3:
        return EffectModelGhostSpec.WeaponCase2Name;
      case 4:
        return EffectModelGhostSpec.WeaponCase3Name;
      case 5:
        return EffectModelGhostSpec.WeaponCase4Name;
      case 6:
        return EffectModelGhostSpec.HuluCaseName;
      case 7:
        return EffectModelGhostSpec.OtherCase0Name;
      case 8:
        return EffectModelGhostSpec.OtherCase1Name;
      case 9:
        return EffectModelGhostSpec.OtherCase2Name;
      case 10:
        return EffectModelGhostSpec.OtherCase3Name;
      case 11:
        return EffectModelGhostSpec.OtherCase4Name;
      case 24:
        return;
    }
  }
  CollectSkeletalMesh(t) {
    var e = t.GetOwner();
    if (e) {
      var s = e.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
      var o = s.Num();
      var h = new Map();
      for (let e = 0; e < o; e++) {
        var c = s.Get(e);
        if (c && c !== t) {
          h.set(c.GetName(), c);
        }
      }
      var i = this.EffectModel.MeshComponentsToUse.Num();
      for (let e = 0; e < i; ++e) {
        var f;
        var r = this.EffectModel.MeshComponentsToUse.Get(e);
        if (r === 0) {
          this.a0e.set(t, EffectModelGhostSpec.GetComponentName(r));
        } else {
          r = EffectModelGhostSpec.GetComponentName(r);
          if (f = h.get(r)) {
            this.a0e.set(f, r);
          } else if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("RenderEffect", 25, "残影获取Skeletal失败", ["name", r]);
          }
        }
      }
      var a = this.EffectModel.CustomComponentNames.Num();
      for (let e = 0; e < a; ++e) {
        var n = this.EffectModel.CustomComponentNames.Get(e).toString();
        var l = h.get(n);
        if (l) {
          this.a0e.set(l, n);
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("RenderEffect", 25, "残影获取Skeletal失败", ["name", n]);
        }
      }
      for (const p of this.a0e.values()) {
        this.s0e.set(p, []);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RenderEffect", 25, "残影获取Actor失败");
    }
  }
  OnTick(e) {
    var t;
    this.c0e();
    if (!!this.Handle.IsPlaying() && !this.Handle.IsStopping() && !((t = this._0e) < 0)) {
      if (this.LifeTime.TotalPassTime - this.l0e >= t) {
        this.m0e();
      }
    }
  }
  OnCanStop() {
    if (this.HasInitTickOptimize && this.Handle) {
      return cpp_1.FKuroEffectSystemInterface.GetGhostEffectCanStop(this.Handle.Id);
    } else {
      return !this.n0e || this.n0e.length === 0;
    }
  }
  XAr() {
    for (const e of this.n0e) {
      for (const t of e[0]) {
        t.PoseComponent.K2_DestroyComponent(t.PoseComponent);
      }
    }
    this.n0e.length = 0;
    for (const s of this.s0e.values()) {
      for (const o of s) {
        o.K2_DestroyComponent(o);
      }
    }
    this.s0e.clear();
    this.a0e.clear();
    this.h0e = undefined;
  }
  OnStop(e, t) {
    if (t) {
      this.XAr();
    }
  }
  m0e() {
    var e = [];
    for (const i of this.a0e.keys()) {
      if (i && i.IsVisible() && !i.bHiddenInGame) {
        var s = this.a0e.get(i);
        let t = undefined;
        var o = this.s0e.get(s);
        if (o.length) {
          (t = o.pop()).SetComponentTickEnabled(false);
          t.SetVisibility(true);
          t.Activate(true);
        } else {
          (t = EffectModelHelper_1.EffectModelHelper.AddSceneComponent(this.Handle.GetSureEffectActor(), UE.PoseableMeshComponent.StaticClass(), undefined, undefined, false, this.EffectModel)).SetSkeletalMesh(i.SkeletalMesh, false);
          t.SetLODBias(3);
          var h = this.u0e;
          for (let e = 0; e < t.GetNumMaterials(); e++) {
            t.SetMaterial(e, h);
          }
        }
        o = i.D_K2_GetComponentToWorld();
        t.D_K2_SetWorldTransform(o, false, undefined, true);
        t.CopyPoseFromSkeletalComponent(i);
        t.SetCustomPrimitiveDataFloat(0, 1);
        e.push(new GhostElement(s, t));
      }
    }
    var t = this.h0e.GhostLifeTime;
    var c = this.LifeTime.TotalPassTime;
    this.n0e.push([e, c + t]);
    this.l0e = c;
  }
  c0e() {
    let e = 0;
    for (const o of this.n0e) {
      var t = o[1];
      if (t >= this.LifeTime.TotalPassTime) {
        var t = (t - this.LifeTime.TotalPassTime) / this.h0e.GhostLifeTime;
        var s = UE.KuroCurveLibrary.GetValue_Float(this.EffectModel.AlphaCurve, t);
        for (const h of o[0]) {
          h.PoseComponent.SetCustomPrimitiveDataFloat(0, s);
        }
      } else {
        for (const c of o[0]) {
          c.PoseComponent.Deactivate();
          c.PoseComponent.SetVisibility(false);
          c.PoseComponent.SetComponentTickEnabled(false);
          this.s0e.get(c.Name).push(c.PoseComponent);
        }
        e++;
      }
    }
    if (e > 0) {
      this.n0e.splice(0, e);
    }
  }
  IsOverrideTick() {
    return true;
  }
  RegisterToKuroEffectSystem() {
    var e;
    if (this.Handle && this.h0e?.SkeletalMeshComp && this.EffectModel && (e = this.Handle.GetSureEffectActor())) {
      this.HasInitTickOptimize = true;
      cpp_1.FKuroEffectSystemInterface.RegisterEffectGhostHandle(this.Handle.Id, this.Handle.Parent?.Id ?? 0, this.EffectModel, e, this.h0e.SkeletalMeshComp, this.h0e.GhostLifeTime, this._0e);
    }
  }
}
(exports.EffectModelGhostSpec = EffectModelGhostSpec).BodyName = "Body";
EffectModelGhostSpec.WeaponCase0Name = "WeaponCase0";
EffectModelGhostSpec.WeaponCase1Name = "WeaponCase1";
EffectModelGhostSpec.WeaponCase2Name = "WeaponCase2";
EffectModelGhostSpec.WeaponCase3Name = "WeaponCase3";
EffectModelGhostSpec.WeaponCase4Name = "WeaponCase4";
EffectModelGhostSpec.HuluCaseName = "HuluCase";
EffectModelGhostSpec.OtherCase0Name = "OtherCase0";
EffectModelGhostSpec.OtherCase1Name = "OtherCase1";
EffectModelGhostSpec.OtherCase2Name = "OtherCase2";
EffectModelGhostSpec.OtherCase3Name = "OtherCase3";
EffectModelGhostSpec.OtherCase4Name = "OtherCase4"; //# sourceMappingURL=EffectModelGhostSpec.js.map