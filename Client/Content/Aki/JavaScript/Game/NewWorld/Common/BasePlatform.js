"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BasePlatformController = exports.VehicleBasePlatform = exports.SceneItemBasePlatform = exports.CharacterBasePlatform = exports.BasePlatform = void 0;
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  ActorUtils_1 = require("../../Utils/ActorUtils");
class BasePlatform {
  constructor(t) {
    this.EntityHandle = void 0, this.CreatureDataId = 0, this.IsDeltaBaseSpeedNeedZ = !1, this.EntityHandle = t
  }
  GetTransform() {}
  TransformFromRelativeSpace(t, e, r, s) {
    var i = this.GetTransform();
    (0, puerts_1.$set)(r, UE.KismetMathLibrary.D_TransformLocation(i, t)), (0, puerts_1.$set)(s, UE.KismetMathLibrary.D_TransformRotation(i, e))
  }
  TransformToRelativeSpace(t, e, r, s) {
    var i = this.GetTransform();
    (0, puerts_1.$set)(r, UE.KismetMathLibrary.D_InverseTransformLocation(i, t)), (0, puerts_1.$set)(s, UE.KismetMathLibrary.D_InverseTransformRotation(i, e))
  }
  CheckLeave(t, e) {
    return !1
  }
  OnCharacterEnter(t, e) {}
  RequestEnterOrLeave(t) {
    var e, r;
    this.EntityHandle?.Valid ? (e = Protocol_1.Aki.Protocol.cdu.create(), r = this.EntityHandle.CreatureDataId, e.F4n = MathUtils_1.MathUtils.NumberToLong(r), e.phl = t, Net_1.Net.Call(15139, e, t => {})) : Log_1.Log.CheckError() && Log_1.Log.Error("Character", 31, "[BasePlatform.RequestEnterOrLeave] EntityHandle无效")
  }
}
class CharacterBasePlatform extends(exports.BasePlatform = BasePlatform) {
  constructor(t) {
    super(t), this.LeaveSphereCenter = void 0, this.LeaveSphereRadiusSq = 0, this.CacheLocation = Vector_1.Vector.Create(), this.IsDeltaBaseSpeedNeedZ = !1;
    t = t.Entity.GetComponent(3).Actor.BasePlatform;
    t?.IsValid() && (this.LeaveSphereCenter = UE.KismetMathLibrary.Conv_VectorToVectorDouble(t.LeaveSphereCenter), this.LeaveSphereRadiusSq = t.LeaveSphereRadius * t.LeaveSphereRadius)
  }
  GetTransform() {
    if (this.EntityHandle.Valid) {
      var t = this.EntityHandle.Entity.GetComponent(3),
        e = t.Actor.BasePlatform;
      if (e?.IsValid()) return t.Actor.Mesh.D_GetSocketTransform(e.RootComponent.AttachSocketName)
    }
  }
  CheckLeave(t, e) {
    var r;
    return !this.EntityHandle?.Valid || (r = this.GetTransform(), r = UE.KismetMathLibrary.D_TransformLocation(r, this.LeaveSphereCenter), this.CacheLocation.DeepCopy(r), Vector_1.Vector.DistSquared(e, this.CacheLocation) > this.LeaveSphereRadiusSq)
  }
}
exports.CharacterBasePlatform = CharacterBasePlatform;
class SceneItemBasePlatform extends BasePlatform {
  constructor(t) {
    super(t), this.LeaveSphereRadiusSq = 0, this.CacheLocation = Vector_1.Vector.Create(), this.Ddu = [], this.W$o = !1, this.xmu = void 0, this.IsDeltaBaseSpeedNeedZ = !0;
    var t = this.EntityHandle?.Entity.GetComponent(202),
      e = t?.GetInteractionMainActor();
    if (e) {
      var r = e.GetAttachParentActor();
      if (!r) return;
      let t = void 0;
      t = (t = e.CollisionActors && 0 < e.CollisionActors.Num() ? e.CollisionActors?.Get(0) : t) || r;
      e = (0, puerts_1.$ref)(void 0), r = (t.GetActorBounds(!0, void 0, e, !0), (0, puerts_1.$unref)(e)), e = Math.max(r.X, r.Y, r.Z);
      this.LeaveSphereRadiusSq = (e += 50) * e
    }
    r = (t?.CreatureData?.GetPbEntityInitData())?.ComponentsData;
    if (r) {
      e = (0, IComponent_1.getComponent)(r, "VehicleComponent");
      if (e?.VehicleFeatures) {
        this.W$o = !0;
        for (const s of e.VehicleFeatures)
          if (8 === s.Type) {
            for (const i of s.PlayerAttachTags) this.Ddu.push(i);
            break
          }
      }
    }
  }
  GetTransform() {
    return this.EntityHandle?.Entity.GetComponent(1).ActorTransform
  }
  CheckLeave(t, e) {
    if (!this.EntityHandle?.Valid) return !0;
    var r = this.EntityHandle.Entity.GetComponent(202),
      s = Vector_1.Vector.Create(),
      r = (s.DeepCopy(r.ActorLocationProxy), this.W$o && (r = r?.GetMainCollisionActor()) && (i = (0, puerts_1.$ref)(void 0), r.D_GetActorBounds(!1, i, void 0), s.FromUeVector((0, puerts_1.$unref)(i))), this.CacheLocation.DeepCopy(s), Vector_1.Vector.DistSquared(e, this.CacheLocation));
    if (r > this.LeaveSphereRadiusSq) {
      var i = (this.xmu?.GetOwner())?.GetEntityNoBlueprint(),
        o = i?.GetComponent(205);
      if (0 < this.Ddu.length) {
        for (const a of this.Ddu) o?.RemoveTag(a);
        this.RequestEnterOrLeave(!1)
      }
      return this.W$o && ((s = i?.GetComponent(229)) && (s.IsAttachToMoveSceneItem = !1), s?.IsOnVehicle || ((e = i?.GetComponent(45)) && (e.NeedRootMotionWhenAttached = !1), i?.GetComponent(3)?.Owner?.K2_DetachFromActor(1, 1, 1), this.xmu && (this.xmu.bKuroStopUpdateBasedMovement = !1, this.xmu = void 0)), EventSystem_1.EventSystem.EmitWithTarget(this.EntityHandle.Entity, EventDefine_1.EEventName.OnChangeBasedPlatform, t, !1)), !0
    }
    return !1
  }
  OnCharacterEnter(t, e) {
    if (this.EntityHandle.Valid) {
      var r, s = this.EntityHandle.Entity.GetComponent(202),
        i = (e?.GetOwner())?.GetEntityNoBlueprint(),
        o = i?.GetComponent(205);
      if (0 < this.Ddu.length) {
        for (const a of this.Ddu) o?.AddTag(a);
        this.RequestEnterOrLeave(!0)
      }
      this.W$o && ((r = i?.GetComponent(45)) && (r.NeedRootMotionWhenAttached = !0), (r = i?.GetComponent(229)) && (r.IsAttachToMoveSceneItem = !0), i?.GetComponent(3)?.Owner?.K2_AttachToActor(s?.Owner, void 0, 1, 1, 1, !0), this.xmu = e, this.xmu.bKuroStopUpdateBasedMovement = !0, EventSystem_1.EventSystem.EmitWithTarget(this.EntityHandle.Entity, EventDefine_1.EEventName.OnChangeBasedPlatform, t, !0))
    }
  }
}
exports.SceneItemBasePlatform = SceneItemBasePlatform;
class VehicleBasePlatform extends BasePlatform {
  constructor(t) {
    super(t), this.LeaveSphereRadiusSq = 0, this.BoneName = new UE.FName("Bone_Prop001"), this.CacheLocation = Vector_1.Vector.Create(), this.Ddu = [], this.IsDeltaBaseSpeedNeedZ = !0;
    var t = this.EntityHandle?.Entity.GetComponent(202),
      e = t?.GetInteractionMainActor();
    if (e) {
      var r = e.GetAttachParentActor();
      if (!r) return;
      let t = void 0;
      t = (t = e.CollisionActors && 0 < e.CollisionActors.Num() ? e.CollisionActors?.Get(0) : t) || r;
      e = (0, puerts_1.$ref)(void 0), r = (t.GetActorBounds(!0, void 0, e, !0), (0, puerts_1.$unref)(e)), e = Math.max(r.X, r.Y, r.Z);
      this.LeaveSphereRadiusSq = (e += 50) * e
    }
    r = (t?.CreatureData?.GetPbEntityInitData())?.ComponentsData;
    if (r) {
      e = (0, IComponent_1.getComponent)(r, "VehicleComponent");
      if (e?.VehicleFeatures)
        for (const s of e.VehicleFeatures)
          if (8 === s.Type) {
            for (const i of s.PlayerAttachTags) this.Ddu.push(i);
            break
          }
    }
  }
  TransformFromRelativeSpace(t, e, r, s) {
    (this.EntityHandle?.Entity.GetComponent(234)).SkeletalMesh.D_TransformFromBoneSpace(this.BoneName, t, e, r, s)
  }
  TransformToRelativeSpace(t, e, r, s) {
    (this.EntityHandle?.Entity.GetComponent(234)).SkeletalMesh.D_TransformToBoneSpace(this.BoneName, t, e, r, s)
  }
  GetTransform() {
    return this.EntityHandle?.Entity.GetComponent(1).ActorTransform
  }
  CheckLeave(t, e) {
    if (!this.EntityHandle?.Valid) return !0;
    var r = this.EntityHandle.Entity.GetComponent(234),
      r = (this.CacheLocation.DeepCopy(r.ActorLocationProxy), Vector_1.Vector.DistSquared(e, this.CacheLocation));
    if (r > this.LeaveSphereRadiusSq) {
      var s = (Global_1.Global.BaseCharacter?.GetEntityNoBlueprint())?.GetComponent(205);
      if (0 < this.Ddu.length) {
        for (const i of this.Ddu) s?.RemoveTag(i);
        this.RequestEnterOrLeave(!1)
      }
      return !0
    }
    return !1
  }
  OnCharacterEnter(t, e) {
    if (this.EntityHandle.Valid) {
      this.EntityHandle.Entity.GetComponent(114)?.SetTakeOverTick(!0);
      var r = (Global_1.Global.BaseCharacter?.GetEntityNoBlueprint())?.GetComponent(205);
      if (0 < this.Ddu.length) {
        for (const s of this.Ddu) r?.AddTag(s);
        this.RequestEnterOrLeave(!0)
      }
    }
  }
}
exports.VehicleBasePlatform = VehicleBasePlatform;
class BasePlatformController {
  static GetBasePlatformByBasedMovementInfo(t) {
    var t = t.MovementBase?.GetOwner()?.GetAttachRootParentActor();
    if (t?.IsValid()) return t = ActorUtils_1.ActorUtils.GetEntityByActor(t, !1), BasePlatformController.GetBasePlatformByEntity(t)
  }
  static GetBasePlatformByEntity(e) {
    if (e?.Valid) {
      var r = e.Entity.GetComponent(1);
      if (r.OwnedBasePlatform) return r.OwnedBasePlatform;
      let t = void 0;
      return e.Entity.GetComponent(202) ? t = new SceneItemBasePlatform(e) : e.Entity.GetComponent(3) ? t = new CharacterBasePlatform(e) : e.Entity.GetComponent(234) && (t = new VehicleBasePlatform(e)), r.OwnedBasePlatform = t
    }
  }
}
exports.BasePlatformController = BasePlatformController;
//# sourceMappingURL=BasePlatform.js.map