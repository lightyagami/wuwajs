"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletLogicShowMesh = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EffectModelHelper_1 = require("../../../Render/Effect/Data/EffectModelHelper");
const BulletLogicController_1 = require("./BulletLogicController");
const MIN_LOD = 99;
class BulletLogicShowMesh extends BulletLogicController_1.BulletLogicController {
  constructor(t, e) {
    super(t, e);
    this.l9e = undefined;
    this.N7o = undefined;
    this.a7o = undefined;
    this.O7o = new Array();
    this.h7o = t;
  }
  BulletLogicAction(t = 0) {
    this.a7o = this.Bullet.GetBulletInfo();
    if (this.a7o) {
      if (this.a7o.Target) {
        this.k7o();
        this.F7o();
        this.V7o();
        this.H7o();
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 4, "子弹没有目标，生成残影失败");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 4, "无法获取BattleInfo");
    }
  }
  OnBulletDestroy() {
    const e = this.Bullet.GetBulletInfo();
    if (this.N7o) {
      e.Actor.K2_DestroyComponent(this.N7o);
    }
    if (this.l9e) {
      e.Actor.K2_DestroyComponent(this.l9e);
      this.l9e = undefined;
    }
    this.O7o.forEach(t => {
      if (t) {
        e.Actor.K2_DestroyComponent(t);
      }
    });
    this.O7o.length = 0;
  }
  k7o() {
    if (this.a7o.Target) {
      var t = this.a7o.Target.GetComponent(3).Actor.Mesh;
      this.N7o = this.j7o(t);
      if (this.N7o) {
        t = (0, puerts_1.$ref)(new UE.HitResult());
        this.N7o.D_K2_SetWorldTransform(this.a7o.ActorComponent.ActorTransform, false, t, true);
        this.N7o.CopyPoseFromSkeletalComponent(this.a7o.Target.GetComponent(3).Actor.Mesh);
        this.N7o.SetForcedLOD(MIN_LOD);
        return !(this.N7o.CastShadow = false);
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 4, "PoseComponent初始化失败");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 4, "子弹没有目标，生成残影失败");
    }
    return false;
  }
  j7o(t) {
    var e = undefined;
    (e = EffectModelHelper_1.EffectModelHelper.AddSceneComponent(this.a7o.Actor, UE.PoseableMeshComponent.StaticClass(), undefined, undefined, false)).SetSkeletalMesh(t.SkeletalMesh, false);
    return e;
  }
  F7o() {
    this.l9e ||= this.a7o.Actor.AddComponentByClass(UE.CharRenderingComponent_C.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
    if (this.l9e) {
      this.l9e.Init(0);
      this.l9e.AddComponentByCase(0, this.N7o);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 4, "BulletLogicShowMesh中渲染组件添加失败");
    }
  }
  V7o() {
    var t = this.Bullet.GetBulletInfo().Target;
    if (t) {
      var e = t.GetComponent(84);
      if (e) {
        e = e.GetWeaponMesh();
        t = t.GetComponent(0).GetRoleConfig().WeaponScale;
        const s = Vector_1.Vector.Create(t[0], t[1], t[2]);
        let i = 0;
        const o = [1, 2, 3, 4, 5];
        e.CharacterWeapons.forEach(t => {
          var e;
          if (!t.WeaponHidden) {
            e = undefined;
            (e = EffectModelHelper_1.EffectModelHelper.AddSceneComponent(this.a7o.Actor, UE.PoseableMeshComponent.StaticClass(), undefined, undefined, false)).SetSkeletalMesh(t.Mesh.SkeletalMesh, false);
            e.CopyPoseFromSkeletalComponent(t.Mesh);
            e.SetForcedLOD(MIN_LOD);
            e.CastShadow = false;
            this.W7o(e, t.BattleSocket, s.ToUeVector());
            this.l9e.AddComponentByCase(o[i + 1], e);
            this.O7o.push(e);
          }
          ++i;
        });
      }
    }
  }
  H7o() {
    const e = this.h7o.MaterialEffect.AssetPathName?.toString();
    if (e !== "") {
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.PD_CharacterControllerData_C, t => {
        if (t) {
          this.l9e.AddMaterialControllerData(t);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Battle", 4, "无法找到BulletLogicShowMesh子弹材质效果", ["EffectPath", e]);
        }
      });
    }
  }
  W7o(t, e, i) {
    var s = new UE.TransformDouble();
    s.SetScale3D(i);
    t.K2_AttachToComponent(this.N7o, e, 0, 0, 0, true);
    t.D_K2_SetRelativeTransform(s, false, undefined, true);
  }
}
exports.BulletLogicShowMesh = BulletLogicShowMesh;
//# sourceMappingURL=BulletLogicShowMesh.js.map