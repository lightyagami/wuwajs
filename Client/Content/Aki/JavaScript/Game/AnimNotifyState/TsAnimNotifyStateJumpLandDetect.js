"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../Core/Define/QueryTypeDefine");
const Rotator_1 = require("../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../Core/Utils/Math/Transform");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const CharacterNameDefines_1 = require("../NewWorld/Character/Common/CharacterNameDefines");
const CharacterUnifiedStateTypes_1 = require("../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const traceColorRed = new UE.LinearColor(1, 0, 0, 1);
const traceColorGreen = new UE.LinearColor(0, 1, 0, 1);
class JumpLandDetectParams {
  constructor() {
    this.TotalTime = 0;
    this.NowTime = 0;
    this.Entity = undefined;
    this.HeightOffset = Vector_1.Vector.Create();
    this.SetGoThrough = false;
  }
}
class TsAnimNotifyStateJumpLandDetect extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.MaxHeightOffset = 200;
    this.OnlyDown = true;
    this.IgnoreActorTag = undefined;
    this.DebugDraw = false;
    this.EndPointHeight = 0;
    this.EnableGoThrough = false;
    this.TsInited = false;
    this.TmpVector = Vector_1.Vector.Create();
    this.TmpVector2 = Vector_1.Vector.Create();
    this.TmpRotator = Rotator_1.Rotator.Create();
    this.OwnerTransform = Transform_1.Transform.Create();
    this.ParamsMap = new Map();
  }
  Constructor() {
    this.TsInited = false;
    this.TmpVector = Vector_1.Vector.Create();
    this.TmpVector2 = Vector_1.Vector.Create();
    this.TmpRotator = Rotator_1.Rotator.Create();
    this.OwnerTransform = Transform_1.Transform.Create();
    this.ParamsMap = new Map();
  }
  Init() {
    if (!this.TsInited || !this.ParamsMap) {
      this.TsInited = true;
      this.TmpVector = Vector_1.Vector.Create();
      this.TmpVector2 = Vector_1.Vector.Create();
      this.TmpRotator = Rotator_1.Rotator.Create();
      this.OwnerTransform = Transform_1.Transform.Create();
      this.ParamsMap = new Map();
    }
  }
  K2_NotifyBegin(t, e, r) {
    var i = t.GetOwner();
    if (!(i instanceof TsBaseCharacter_1.default)) {
      return false;
    }
    this.Init();
    var s = i.GetEntityIdNoBlueprint();
    let a = this.ParamsMap.get(s);
    if (!a) {
      a = new JumpLandDetectParams();
      this.ParamsMap.set(s, a);
    }
    var s = a.Entity?.GetComponent(187);
    if (this.EnableGoThrough && s?.IsKuroPlanarPhysWalkingEnable) {
      s.CharacterMovement.GoThroughLower = true;
      s.CharacterMovement.GoThroughPriority = 0;
      a.SetGoThrough = true;
    } else {
      a.SetGoThrough = false;
    }
    a.Entity = i.GetEntityNoBlueprint();
    var o = Vector_1.Vector.Create();
    var h = Vector_1.Vector.Create();
    var n = Vector_1.Vector.Create();
    var s = Vector_1.Vector.Create();
    var t = t.GetAnimInstance();
    this.OwnerTransform.FromUeTransform(i.D_GetTransform());
    this.GetCurveLocation(t, 0, this.TmpVector);
    this.GetCurveRotator(t, 0, this.TmpRotator);
    this.GetCurveLocation(t, r, this.TmpVector2);
    MathUtils_1.MathUtils.InverseTransformPositionNoScale(this.TmpVector, this.TmpRotator, this.TmpVector2, this.TmpVector2);
    this.TmpVector2.Z -= this.EndPointHeight;
    this.OwnerTransform.TransformPosition(this.TmpVector2, this.TmpVector2);
    var c = Vector_1.Vector.Create();
    this.OwnerTransform.GetRotation().RotateVector(Vector_1.Vector.UpVectorProxy, c);
    c.Multiply(this.MaxHeightOffset, h);
    var t = i.CapsuleComponent.GetScaledCapsuleRadius();
    c.MultiplyEqual(i.CapsuleComponent.GetScaledCapsuleHalfHeight() - t);
    this.TmpVector2.Subtraction(c, o);
    if (this.OnlyDown) {
      n.DeepCopy(o);
    } else {
      o.Addition(h, n);
    }
    o.Subtraction(h, s);
    var _ = (0, puerts_1.$ref)(UE.NewArray(UE.HitResult));
    UE.KismetSystemLibrary.D_SphereTraceMulti(i, n.ToUeVector(), s.ToUeVector(), t, QueryTypeDefine_1.KuroTraceTypeQuery.IkGround, false, undefined, this.DebugDraw ? 2 : 0, _, true, traceColorRed, traceColorGreen, 5);
    var f = (0, puerts_1.$unref)(_);
    var m = f.Num();
    a.TotalTime = 0;
    for (let t = a.NowTime = 0; t < m; ++t) {
      var u = f.Get(t);
      if (u.bBlockingHit) {
        if (!u.Actor.ActorHasTag(this.IgnoreActorTag) && i.CharacterMovement.IsWalkable(u)) {
          (u = Vector_1.Vector.Create(u.Location)).Subtraction(o, a.HeightOffset);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Character", 57, "JumpLandDetectStart", ["tempTarget", o], ["hitLocation", u], ["startLocation", n], ["detectOffset", h], ["finalLocation", this.TmpVector2], ["actorHalfUpVector", c], ["ownerTransform", this.OwnerTransform], ["startTransform.location", this.TmpVector], ["startTransform.rotation", this.TmpRotator]);
          }
          a.TotalTime = r;
          return true;
        } else {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Movement", 6, "JumpLandDetectStart No Hit", ["tempTarget", o]);
          }
          return false;
        }
      }
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Movement", 6, "JumpLandDetectStart No Hit2", ["tempTarget", o]);
    }
    return true;
  }
  K2_NotifyEnd(t, e) {
    var r;
    var i;
    var t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && (r = t.GetEntityIdNoBlueprint(), !!(r = this.ParamsMap.get(r))) && ((i = r.Entity.GetComponent(184)) ? (r.SetGoThrough && (t.CharacterMovement.GoThroughLower = false, r.Entity?.GetComponent(46)?.ResetHitPriorityAndGoThrough()), r.NowTime <= r.TotalTime && i.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Air && r.TotalTime > 0 && (i = (r.TotalTime - r.NowTime) / r.TotalTime, this.Move(e, r, i)), r.NowTime >= r.TotalTime && this.EndPointHeight <= 0 && this.TrySetMovementMode(t), true) : (Log_1.Log.CheckError() && Log_1.Log.Error("Test", 6, "JumpLandDetect No Unified", ["Actor", t.GetName()]), false));
  }
  K2_NotifyTick(t, e, r) {
    var i;
    var t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && (t = t.GetEntityIdNoBlueprint(), !!(t = this.ParamsMap.get(t))) && (t.Entity.GetComponent(184).PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground ? t.TotalTime -= r : t.NowTime <= t.TotalTime && t.TotalTime > 0 && (i = Math.min(t.TotalTime - t.NowTime, r) / t.TotalTime, this.Move(e, t, i), t.NowTime += r), true);
  }
  Move(t, e, r) {
    if (!e.Entity.GetComponent(40)?.IsSkillMontageInvalid(t.GetName())) {
      t = e.Entity.GetComponent(3);
      e.HeightOffset.Multiply(r, this.TmpVector);
      if (this.TmpVector.ContainsNaN() && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Movement", 6, "Move NaN", ["HeightOffset", e.HeightOffset], ["offsetRate", r]);
      }
      t.AddActorWorldOffset(this.TmpVector.ToUeVector(), "TsAnimNotifyStateJumpLandDetect", true);
    }
  }
  GetCurveLocation(t, e, r) {
    r.X = t.GetMainAnimsCurveValueWithDelta(CharacterNameDefines_1.CharacterNameDefines.ROOT_Y, e);
    r.Y = -t.GetMainAnimsCurveValueWithDelta(CharacterNameDefines_1.CharacterNameDefines.ROOT_X, e);
    r.Z = t.GetMainAnimsCurveValueWithDelta(CharacterNameDefines_1.CharacterNameDefines.ROOT_Z, e);
  }
  GetCurveRotator(t, e, r) {
    r.Pitch = 0;
    r.Yaw = t.GetMainAnimsCurveValueWithDelta(CharacterNameDefines_1.CharacterNameDefines.ROOT_LOOK, e);
    r.Roll = 0;
  }
  TrySetMovementMode(t) {
    if (!t.CharacterActorComponent?.Entity?.GetComponent(242)?.IsOnVehicle) {
      t.KuroSetMovementMode({
        Mode: 1,
        CustomMode: 0,
        Context: "[TsAnimNotifyStateJumpLandDetect.K2_NotifyEnd]"
      });
    }
  }
  GetNotifyName() {
    return "跳跃检测着陆";
  }
}
exports.default = TsAnimNotifyStateJumpLandDetect;
//# sourceMappingURL=TsAnimNotifyStateJumpLandDetect.js.map