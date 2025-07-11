"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletActorPool = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../GlobalData");
const BulletConstant_1 = require("./BulletConstant");
const SIZE_POOL = 30;
const PRE_ADD_COUNT = 5;
class BulletActorPool {
  static Get(t) {
    let e = undefined;
    if (this.jVo.has(t)) {
      for (var o = this.jVo.get(t); !e && o.length > 0;) {
        if (!(e = o.pop())?.IsValid()) {
          e = undefined;
        }
      }
    }
    if (!e) {
      if (!(e = ActorSystem_1.ActorSystem.Get(UE.KuroEntityActor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble, undefined)).GetComponentByClass(UE.SceneComponent.StaticClass())) {
        e.AddComponentByClass(UE.SceneComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
      }
      e.bAutoDestroyWhenFinished = false;
      e.SetActorEnableCollision(false);
    }
    return e;
  }
  static Recycle(t, e, o = false) {
    t.SetActorHiddenInGame(true);
    t.SetActorEnableCollision(false);
    if (o) {
      t.K2_DetachFromActor(1, 1, 1);
      t.D_SetActorScale3D(Vector_1.Vector.OneVectorDouble);
    }
    if (BulletConstant_1.BulletConstant.OpenActorRecycleCheck && (t.D_GetActorScale3D().op_Equality(Vector_1.Vector.OneVectorDouble) || Log_1.Log.CheckError() && Log_1.Log.Error("Bullet", 17, "bullet actor scale invalid"), o = t.GetComponentByClass(UE.ShapeComponent.StaticClass())) && !o.RelativeScale3D.op_Equality(Vector_1.Vector.OneVector) && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Bullet", 17, "bullet collisionComp scale invalid");
    }
    let l = this.jVo.get(e);
    if (!l) {
      l = [];
      this.jVo.set(e, l);
    }
    if (l.length > SIZE_POOL) {
      ActorSystem_1.ActorSystem.Put("BulletActorPool.Recycle", t);
    } else {
      l.push(t);
    }
  }
  static Preload() {
    this.WVo(0, UE.BoxComponent.StaticClass());
    this.WVo(1, UE.SphereComponent.StaticClass());
    this.WVo(3, UE.BoxComponent.StaticClass());
    this.WVo(4, undefined);
  }
  static WVo(t, e) {
    let o = this.jVo.get(t);
    if (!o) {
      o = [];
      this.jVo.set(t, o);
    }
    for (let t = o.length; t < PRE_ADD_COUNT; t++) {
      var l;
      var r = ActorSystem_1.ActorSystem.Get(UE.KuroEntityActor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble, undefined);
      if (!r.GetComponentByClass(UE.SceneComponent.StaticClass())) {
        r.AddComponentByClass(UE.SceneComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
      }
      r.bAutoDestroyWhenFinished = false;
      r.SetActorHiddenInGame(true);
      r.SetActorEnableCollision(false);
      if (e) {
        if (GlobalData_1.GlobalData.IsPlayInEditor && BulletConstant_1.BulletConstant.CollisionCompVisibleInEditor) {
          (l = r.AddComponentByClass(e, false, MathUtils_1.MathUtils.DefaultTransform, true)).CreationMethod = 3;
          r.FinishAddComponent(l, false, MathUtils_1.MathUtils.DefaultTransform);
        } else {
          r.AddComponentByClass(e, false, MathUtils_1.MathUtils.DefaultTransform, false);
        }
      }
      o.push(r);
    }
  }
  static Clear() {
    for (var [, t] of this.jVo) {
      for (const e of t) {
        ActorSystem_1.ActorSystem.Put("BulletActorPool.Clear", e);
      }
    }
    this.jVo.clear();
  }
}
(exports.BulletActorPool = BulletActorPool).jVo = new Map();
//# sourceMappingURL=BulletActorPool.js.map