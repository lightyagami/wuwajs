"use strict";

var SceneItemPhysicalAttachComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, s) {
  var h;
  var o = arguments.length;
  var n = o < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, i, s);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (h = t[r]) {
        n = (o < 3 ? h(n) : o > 3 ? h(e, i, n) : h(e, i)) || n;
      }
    }
  }
  if (o > 3 && n) {
    Object.defineProperty(e, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemPhysicalAttachComponent = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem");
const QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../../GlobalData");
let SceneItemPhysicalAttachComponent = SceneItemPhysicalAttachComponent_1 = class SceneItemPhysicalAttachComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Lo = undefined;
    this.Hte = undefined;
    this.Qln = undefined;
    this.Xln = undefined;
    this.$ln = undefined;
    this.Yln = undefined;
    this.Jln = undefined;
    this.Hnr = undefined;
    this.zie = undefined;
    this.rvi = undefined;
    this.TQc = false;
    this.zln = Vector_1.Vector.Create();
    this.Zln = t => {
      if (this.Yln === undefined) {
        this.e1n();
      }
      this.Hte.PhysicsMode = 1;
      this.Qln?.SetLinearDamping(this.Lo?.DampingCoefficient ?? 0.1);
      if (!this.$ln) {
        this.t1n();
      }
      t = Vector_1.Vector.Create(this.$ln.HitLocation.op_Subtraction(t.Attacker.GetComponent(1).ActorLocation));
      t.Normalize();
      t.MultiplyEqual(this.$ln.HitDirection.Size());
      this.Qln?.SetPhysicsLinearVelocity(t.ToUeVectorOld());
    };
    this.i1n = (t, e) => {
      if (this.rvi !== undefined && EffectSystem_1.EffectSystem.IsValid(this.rvi) && t.includes(-1278190765)) {
        EffectSystem_1.EffectSystem.StopEffectById(this.rvi, "[SceneItemPhysicalAttachComponent.StartHandleDestoryState]", false);
        this.rvi = undefined;
      }
    };
  }
  OnInitData(t) {
    t = t.GetParam(SceneItemPhysicalAttachComponent_1)[0];
    this.Lo = t;
    return true;
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(203);
    this.Qln = this.Hte.Owner?.GetComponentByClass(UE.StaticMeshComponent.StaticClass());
    this.Xln = this.Entity.GetComponent(155);
    this.Xln.RegisterComponent(this);
    this.mSe();
    return true;
  }
  OnActivate() {
    this.o1n();
    if (!StringUtils_1.StringUtils.IsEmpty(this.Lo?.EffectPath)) {
      this.r1n();
    }
    this.zln.DeepCopy(this.Hte.ActorLocationProxy);
    this.Hte?.GetPrimitiveComponent().SetCollisionObjectType(QueryTypeDefine_1.KuroCollisionChannel.Pawn);
  }
  OnEnd() {
    this.n1n();
    this.dSe();
    return true;
  }
  OnTick(t) {
    var e = UE.NewArray(UE.VectorDouble);
    e.Add(this.Jln.D_K2_GetActorLocation());
    e.Add(this.Hte.ActorLocation);
    this.zie?.D_SetSplinePoints(e, 1, true);
    if (!!this.Yln?.IsValid() && !(this.Qln.GetPhysicsLinearVelocity().Size() > 1) && !(e = this.Hte.ActorLocationProxy, Vector_1.Vector.Dist(this.zln, e) > 1)) {
      this.Hte.PhysicsMode = 0;
      this.Yln.K2_DestroyActor();
      this.Yln = undefined;
    }
  }
  mSe() {
    EventSystem_1.EventSystem.AddWithTarget(this, EventDefine_1.EEventName.OnSceneItemHitByHitData, this.Zln);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnLevelTagChanged, this.i1n);
  }
  dSe() {
    EventSystem_1.EventSystem.RemoveWithTarget(this, EventDefine_1.EEventName.OnSceneItemHitByHitData, this.Zln);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnLevelTagChanged, this.i1n);
  }
  o1n() {
    const t = new UE.TransformDouble();
    var e;
    t.SetTranslation(this.Hte.ActorLocation);
    if (this.Lo.AttachTarget.Type === "RelativePoint") {
      e = new UE.VectorDouble(this.Lo.AttachTarget.RelativePoint.X ?? 0, this.Lo.AttachTarget.RelativePoint.Y ?? 0, this.Lo.AttachTarget.RelativePoint.Z ?? 0);
      t.SetTranslation(this.Hte.ActorLocation.op_Addition(e));
    }
    if (this.Jln === undefined && !this.TQc) {
      this.TQc = true;
      ResourceSystem_1.ResourceSystem.LoadTypeAsync("BP_PhysicsAttachedBase_C", () => {
        this.TQc = false;
        this.Jln = ActorSystem_1.ActorSystem.Get(UE.BP_PhysicsAttachedBase_C.StaticClass(), t);
      });
    }
  }
  e1n() {
    if (this.Yln === undefined) {
      this.Yln = ActorSystem_1.ActorSystem.Spawn(UE.PhysicsConstraintActor.StaticClass(), undefined, undefined);
    }
    switch (this.Lo.AngularLimit.Swing1Motion.Type) {
      case "ACM_Free":
        this.Yln.ConstraintComp.SetAngularSwing1Limit(0, 0);
        break;
      case "ACM_Limited":
        this.Yln.ConstraintComp.SetAngularSwing1Limit(1, this.Lo.AngularLimit.Swing1Motion.LimitValue);
        break;
      case "ACM_Locked":
        this.Yln.ConstraintComp.SetAngularSwing1Limit(2, 0);
    }
    switch (this.Lo.AngularLimit.Swing2Motion.Type) {
      case "ACM_Free":
        this.Yln.ConstraintComp.SetAngularSwing2Limit(0, 0);
        break;
      case "ACM_Limited":
        this.Yln.ConstraintComp.SetAngularSwing2Limit(1, this.Lo.AngularLimit.Swing2Motion.LimitValue);
        break;
      case "ACM_Locked":
        this.Yln.ConstraintComp.SetAngularSwing2Limit(2, 0);
    }
    switch (this.Lo.AngularLimit.TwistMotion.Type) {
      case "ACM_Free":
        this.Yln.ConstraintComp.SetAngularTwistLimit(0, 0);
        break;
      case "ACM_Limited":
        this.Yln.ConstraintComp.SetAngularTwistLimit(1, this.Lo.AngularLimit.TwistMotion.LimitValue);
        break;
      case "ACM_Locked":
        this.Yln.ConstraintComp.SetAngularTwistLimit(2, 0);
    }
    this.Yln.K2_AttachToActor(this.Jln, undefined, 2, 2, 2, false);
    this.Yln.ConstraintComp.ConstraintActor1 = this.Jln;
    this.Yln.ConstraintComp.ConstraintActor2 = this.Hte.Owner;
    this.Yln.ConstraintComp.SetConstrainedComponents(this.Jln?.GetComponentByClass(UE.PrimitiveComponent.StaticClass()), undefined, this.Qln, undefined);
  }
  r1n() {
    var t;
    this.Hnr = ActorSystem_1.ActorSystem.Get(UE.BP_BasePathLine_C.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble);
    if (this.Hnr && (this.Hnr.K2_AttachToActor(this.Jln, undefined, 2, 2, 2, false), (t = UE.NewArray(UE.VectorDouble)).Add(this.Jln.D_K2_GetActorLocation()), t.Add(this.Hte.ActorLocation), this.zie = this.Hnr.GetComponentByClass(UE.SplineComponent.StaticClass()), this.zie.D_SetSplinePoints(t, 1, true), this.rvi = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, MathUtils_1.MathUtils.DefaultTransformDouble, this.Lo?.EffectPath, "[SceneItemPhysicalAttachComponent.CreateSplineActor]", new EffectContext_1.EffectContext(undefined, this.Hnr)), EffectSystem_1.EffectSystem.IsValid(this.rvi))) {
      EffectSystem_1.EffectSystem.GetEffectActor(this.rvi).K2_AttachToActor(this.Hnr, undefined, 2, 2, 2, false);
    }
  }
  t1n() {
    this.$ln = this.Hte?.GetInteractionMainActor();
  }
  n1n() {
    if (this.Yln !== undefined) {
      this.Yln.K2_DetachFromActor(1, 1, 1);
      ActorSystem_1.ActorSystem.Put("SceneItemPhysicalAttachComponent.ClearActors1", this.Yln);
      this.Yln = undefined;
    }
    if (this.rvi !== undefined) {
      EffectSystem_1.EffectSystem.StopEffectById(this.rvi, "[SceneItemPhysicalAttachComponent.ClearActors3]", true);
      this.rvi = undefined;
    }
    if (this.Hnr !== undefined) {
      this.Hnr.K2_DetachFromActor(1, 1, 1);
      ActorSystem_1.ActorSystem.Put("SceneItemPhysicalAttachComponent.ClearActors4", this.Hnr);
      this.Hnr = undefined;
    }
    if (this.Jln !== undefined) {
      ActorSystem_1.ActorSystem.Put("SceneItemPhysicalAttachComponent.ClearActors2", this.Jln);
      this.Jln = undefined;
    }
  }
};
SceneItemPhysicalAttachComponent = SceneItemPhysicalAttachComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(222)], SceneItemPhysicalAttachComponent);
exports.SceneItemPhysicalAttachComponent = SceneItemPhysicalAttachComponent; //# sourceMappingURL=SceneItemPhysicalAttachComponent.js.map