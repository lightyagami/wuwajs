"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BasePlatformController = exports.VehicleBasePlatform = exports.SceneItemBasePlatform = exports.CharacterBasePlatform = exports.BasePlatform = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ActorUtils_1 = require("../../Utils/ActorUtils");
class BasePlatform {
  constructor(t) {
    this.EntityHandle = undefined;
    this.CreatureDataId = 0;
    this.IsDeltaBaseSpeedNeedZ = false;
    this.EntityHandle = t;
  }
  GetTransform() {}
  TransformFromRelativeSpace(t, e, r, s) {
    var i = this.GetTransform();
    (0, puerts_1.$set)(r, UE.KismetMathLibrary.D_TransformLocation(i, t));
    (0, puerts_1.$set)(s, UE.KismetMathLibrary.D_TransformRotation(i, e));
  }
  TransformToRelativeSpace(t, e, r, s) {
    var i = this.GetTransform();
    (0, puerts_1.$set)(r, UE.KismetMathLibrary.D_InverseTransformLocation(i, t));
    (0, puerts_1.$set)(s, UE.KismetMathLibrary.D_InverseTransformRotation(i, e));
  }
  CheckLeave(t, e) {
    return false;
  }
  OnCharacterEnter(t, e) {}
  RequestEnterOrLeave(t) {
    var e;
    var r;
    if (this.EntityHandle?.Valid) {
      e = Protocol_1.Aki.Protocol.sRu.create();
      r = this.EntityHandle.CreatureDataId;
      e.F4n = MathUtils_1.MathUtils.NumberToLong(r);
      e.phl = t;
      Net_1.Net.Call(15139, e, t => {});
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 31, "[BasePlatform.RequestEnterOrLeave] EntityHandle无效");
    }
  }
}
class CharacterBasePlatform extends (exports.BasePlatform = BasePlatform) {
  constructor(t) {
    super(t);
    this.LeaveSphereCenter = undefined;
    this.LeaveSphereRadiusSq = 0;
    this.CacheLocation = Vector_1.Vector.Create();
    this.IsDeltaBaseSpeedNeedZ = false;
    t = t.Entity.GetComponent(3).Actor.BasePlatform;
    if (t?.IsValid()) {
      this.LeaveSphereCenter = UE.KismetMathLibrary.Conv_VectorToVectorDouble(t.LeaveSphereCenter);
      this.LeaveSphereRadiusSq = t.LeaveSphereRadius * t.LeaveSphereRadius;
    }
  }
  GetTransform() {
    if (this.EntityHandle.Valid) {
      var t = this.EntityHandle.Entity.GetComponent(3);
      var e = t.Actor.BasePlatform;
      if (e?.IsValid()) {
        return t.Actor.Mesh.D_GetSocketTransform(e.RootComponent.AttachSocketName);
      }
    }
  }
  CheckLeave(t, e) {
    var r;
    return !this.EntityHandle?.Valid || (r = this.GetTransform(), r = UE.KismetMathLibrary.D_TransformLocation(r, this.LeaveSphereCenter), this.CacheLocation.DeepCopy(r), Vector_1.Vector.DistSquared(e, this.CacheLocation) > this.LeaveSphereRadiusSq);
  }
}
exports.CharacterBasePlatform = CharacterBasePlatform;
class SceneItemBasePlatform extends BasePlatform {
  constructor(t) {
    super(t);
    this.LeaveSphereRadiusSq = 0;
    this.CacheLocation = Vector_1.Vector.Create();
    this.Z2u = [];
    this.W$o = false;
    this.IsDeltaBaseSpeedNeedZ = true;
    var t = this.EntityHandle?.Entity.GetComponent(212);
    var e = t?.GetInteractionMainActor();
    if (e) {
      var r = e.GetAttachParentActor();
      if (!r) {
        return;
      }
      let t = undefined;
      t = (t = e.CollisionActors && e.CollisionActors.Num() > 0 ? e.CollisionActors?.Get(0) : t) || r;
      e = (0, puerts_1.$ref)(undefined);
      t.GetActorBounds(true, undefined, e, true);
      r = (0, puerts_1.$unref)(e);
      e = Math.max(r.X, r.Y, r.Z);
      this.LeaveSphereRadiusSq = (e += 50) * e;
    }
    r = t?.CreatureData?.GetPbEntityInitData()?.ComponentsData;
    if (r) {
      e = (0, IComponent_1.getComponent)(r, "VehicleComponent");
      if (e?.VehicleFeatures) {
        this.W$o = true;
        for (const s of e.VehicleFeatures) {
          if (s.Type === 8) {
            for (const i of s.PlayerAttachTags) {
              this.Z2u.push(i);
            }
            break;
          }
        }
      }
    }
  }
  GetTransform() {
    return this.EntityHandle?.Entity.GetComponent(1).ActorTransform;
  }
  CheckLeave(e, r) {
    if (this.EntityHandle?.Valid) {
      var s;
      var i = this.EntityHandle.Entity.GetComponent(212);
      var o = e?.GetComponent(187)?.CharacterMovement;
      let t = false;
      if (this.W$o) {
        if ((h = i?.GetMainCollisionActor()) && o) {
          a = (0, puerts_1.$ref)(undefined);
          s = (0, puerts_1.$ref)(undefined);
          h.D_GetActorBounds(false, a, s);
          (h = Vector_1.Vector.Create()).FromUeVector((0, puerts_1.$unref)(a));
          (a = Vector_1.Vector.Create()).FromUeVector((0, puerts_1.$unref)(s));
          a.Z += o.GetMaxJumpHeight();
          t = this.qQu(r, a, h);
        }
      } else {
        this.CacheLocation.DeepCopy(i.ActorLocationProxy);
        s = Vector_1.Vector.DistSquared(r, this.CacheLocation);
        t = s < this.LeaveSphereRadiusSq;
      }
      if (t) {
        return false;
      }
      var a;
      var h;
      var n = e?.GetComponent(215);
      if (this.Z2u.length > 0) {
        for (const f of this.Z2u) {
          n?.RemoveTag(f);
        }
        this.RequestEnterOrLeave(false);
      }
      if (this.W$o) {
        if (a = e?.GetComponent(242)) {
          a.IsAttachToMoveSceneItem = false;
        }
        if (!a?.IsOnVehicle) {
          if (h = e?.GetComponent(46)) {
            h.NeedRootMotionWhenAttached = false;
          }
          e?.GetComponent(3)?.Owner?.K2_DetachFromActor(1, 1, 1);
          if (o) {
            o.bKuroStopUpdateBasedMovement = false;
          }
        }
        EventSystem_1.EventSystem.EmitWithTarget(this.EntityHandle.Entity, EventDefine_1.EEventName.OnChangeBasedPlatform, e, false);
      }
      i = this.EntityHandle.Entity?.GetComponent(338);
      if (i) {
        i.OnCharacterLeave(e.Id);
      }
    }
    return true;
  }
  qQu(t, e, r) {
    return t.X >= r.X - e.X && t.X <= r.X + e.X && t.Y >= r.Y - e.Y && t.Y <= r.Y + e.Y && t.Z >= r.Z - e.Z && t.Z <= r.Z + e.Z;
  }
  OnCharacterEnter(t, e) {
    if (this.EntityHandle.Valid) {
      var r = this.EntityHandle.Entity.GetComponent(212);
      var s = e?.GetOwner()?.GetEntityNoBlueprint();
      var i = s?.GetComponent(215);
      if (this.Z2u.length > 0) {
        for (const a of this.Z2u) {
          i?.AddTag(a);
        }
        this.RequestEnterOrLeave(true);
      }
      if (this.W$o) {
        if (o = s?.GetComponent(46)) {
          o.NeedRootMotionWhenAttached = true;
        }
        if (o = s?.GetComponent(242)) {
          o.IsAttachToMoveSceneItem = true;
        }
        s?.GetComponent(3)?.Owner?.K2_AttachToActor(r?.Owner, undefined, 1, 1, 1, true);
        e.bKuroStopUpdateBasedMovement = true;
        EventSystem_1.EventSystem.EmitWithTarget(this.EntityHandle.Entity, EventDefine_1.EEventName.OnChangeBasedPlatform, t, true);
      }
      var o = this.EntityHandle?.Entity?.GetComponent(338);
      if (o) {
        o.OnCharacterStandOn(t.Id);
      }
    }
  }
}
exports.SceneItemBasePlatform = SceneItemBasePlatform;
class VehicleBasePlatform extends BasePlatform {
  constructor(t) {
    super(t);
    this.LeaveSphereRadiusSq = 0;
    this.BoneName = new UE.FName("Bone_Prop001");
    this.CacheLocation = Vector_1.Vector.Create();
    this.Z2u = [];
    this.IsDeltaBaseSpeedNeedZ = true;
    var t = this.EntityHandle?.Entity.GetComponent(212);
    var e = t?.GetInteractionMainActor();
    if (e) {
      var r = e.GetAttachParentActor();
      if (!r) {
        return;
      }
      let t = undefined;
      t = (t = e.CollisionActors && e.CollisionActors.Num() > 0 ? e.CollisionActors?.Get(0) : t) || r;
      e = (0, puerts_1.$ref)(undefined);
      t.GetActorBounds(true, undefined, e, true);
      r = (0, puerts_1.$unref)(e);
      e = Math.max(r.X, r.Y, r.Z);
      this.LeaveSphereRadiusSq = (e += 50) * e;
    }
    r = t?.CreatureData?.GetPbEntityInitData()?.ComponentsData;
    if (r) {
      e = (0, IComponent_1.getComponent)(r, "VehicleComponent");
      if (e?.VehicleFeatures) {
        for (const s of e.VehicleFeatures) {
          if (s.Type === 8) {
            for (const i of s.PlayerAttachTags) {
              this.Z2u.push(i);
            }
            break;
          }
        }
      }
    }
  }
  TransformFromRelativeSpace(t, e, r, s) {
    (this.EntityHandle?.Entity.GetComponent(247)).SkeletalMesh.D_TransformFromBoneSpace(this.BoneName, t, e, r, s);
  }
  TransformToRelativeSpace(t, e, r, s) {
    (this.EntityHandle?.Entity.GetComponent(247)).SkeletalMesh.D_TransformToBoneSpace(this.BoneName, t, e, r, s);
  }
  GetTransform() {
    return this.EntityHandle?.Entity.GetComponent(1).ActorTransform;
  }
  CheckLeave(t, e) {
    if (!this.EntityHandle?.Valid) {
      return true;
    }
    var r = this.EntityHandle.Entity.GetComponent(247);
    this.CacheLocation.DeepCopy(r.ActorLocationProxy);
    var r = Vector_1.Vector.DistSquared(e, this.CacheLocation);
    if (r > this.LeaveSphereRadiusSq) {
      var s = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()?.GetComponent(215);
      if (this.Z2u.length > 0) {
        for (const i of this.Z2u) {
          s?.RemoveTag(i);
        }
        this.RequestEnterOrLeave(false);
      }
      return true;
    }
    return false;
  }
  OnCharacterEnter(t, e) {
    if (this.EntityHandle.Valid) {
      this.EntityHandle.Entity.GetComponent(123)?.SetTakeOverTick(true);
      var r = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()?.GetComponent(215);
      if (this.Z2u.length > 0) {
        for (const s of this.Z2u) {
          r?.AddTag(s);
        }
        this.RequestEnterOrLeave(true);
      }
    }
  }
}
exports.VehicleBasePlatform = VehicleBasePlatform;
class BasePlatformController {
  static GetBasePlatformByBasedMovementInfo(t) {
    var t = t.MovementBase?.GetOwner()?.GetAttachRootParentActor();
    if (t?.IsValid()) {
      t = ActorUtils_1.ActorUtils.GetEntityByActor(t, false);
      return BasePlatformController.GetBasePlatformByEntity(t);
    }
  }
  static GetBasePlatformByEntity(e) {
    if (e?.Valid) {
      var r = e.Entity.GetComponent(1);
      if (r.OwnedBasePlatform) {
        return r.OwnedBasePlatform;
      }
      let t = undefined;
      if (e.Entity.GetComponent(212)) {
        t = new SceneItemBasePlatform(e);
      } else if (e.Entity.GetComponent(3)) {
        t = new CharacterBasePlatform(e);
      } else if (e.Entity.GetComponent(247)) {
        t = new VehicleBasePlatform(e);
      }
      return r.OwnedBasePlatform = t;
    }
  }
}
exports.BasePlatformController = BasePlatformController;
//# sourceMappingURL=BasePlatform.js.map