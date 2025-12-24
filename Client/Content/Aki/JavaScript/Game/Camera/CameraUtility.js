"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraUtility = undefined;
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const CommonParamById_1 = require("../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../Core/Define/QueryTypeDefine");
const GameplayTagUtils_1 = require("../../Core/Utils/GameplayTagUtils");
const MathCommon_1 = require("../../Core/Utils/Math/MathCommon");
const Quat_1 = require("../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../Core/Utils/TraceElementCommon");
const TsAiController_1 = require("../AI/Controller/TsAiController");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const Global_1 = require("../Global");
const GlobalData_1 = require("../GlobalData");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const CharacterNameDefines_1 = require("../NewWorld/Character/Common/CharacterNameDefines");
const ActorUtils_1 = require("../Utils/ActorUtils");
const GravityUtils_1 = require("../Utils/GravityUtils");
const CameraModel_1 = require("./CameraModel");
const PROFILE_KEY = "CameraUtility_CheckCollision_Camera";
const RESET_FOCUS_TIME = 0.6;
const PITCH_LIMIT_VALUE = 89.9;
class CameraUtility {
  static GetSocketLocation(t, a, e, r = undefined) {
    let i = undefined;
    let s = undefined;
    if (t) {
      i = t;
      s = r?.Valid ? r : ActorUtils_1.ActorUtils.GetEntityByActor(t);
    } else {
      if (!r?.Valid) {
        e.Reset();
        return;
      }
      if (!(i = r.Entity.GetComponent(1)?.Owner)) {
        e.Reset();
        return;
      }
      s = r;
    }
    if (this.khe(s)) {
      if ((t = i).Mesh && a?.toString()) {
        e.FromUeVector(t.Mesh.D_GetSocketLocation(a));
        return;
      } else {
        s.Entity.GetComponent(186).GetCameraPosition(e);
        return;
      }
    }
    if (s.Valid) {
      e.DeepCopy(s.Entity.GetComponent(1).ActorLocationProxy);
    }
  }
  static khe(t) {
    return !!t?.Valid && ((t = t.Entity.GetComponent(0).GetEntityType()) === Protocol_1.Aki.Protocol.kks.Proto_Monster || t === Protocol_1.Aki.Protocol.kks.Proto_Npc || t === Protocol_1.Aki.Protocol.kks.Proto_Player || t === Protocol_1.Aki.Protocol.kks.Proto_Vision);
  }
  static GetRootTransform(t) {
    if (t?.Mesh) {
      return t.Mesh.D_GetSocketTransform(this.Root);
    } else {
      return new UE.TransformDouble();
    }
  }
  static TargetCanBeSelect(t) {
    return !!t.Valid && !!t.Active && (!(t = t.Entity.GetComponent(215)) || !t.HasTag(1008164187) && !t.HasTag(-1243968098));
  }
  static GetCameraTargetEntityHandle() {
    var t = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    if (t.Valid) {
      t = t.CharacterEntityHandle;
      if (t?.Valid) {
        return t;
      }
    }
  }
  static GetCameraLockOnTargetEntityHandle() {
    var t = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    if (t.Valid) {
      t = t.TargetEntity;
      if (t?.Valid) {
        return t;
      }
    }
  }
  static GetCameraCharacterRotation(t) {
    t.Reset();
    var a = ModelManager_1.ModelManager.CameraModel?.FightCamera?.LogicComponent;
    if (a?.Valid && a?.Character?.CharacterActorComponent) {
      t.DeepCopy(a.Character.CharacterActorComponent.ActorRotationProxy);
    }
  }
  static GetPlayerTargetAndCameraYawOffset() {
    var t = ModelManager_1.ModelManager.CameraModel?.FightCamera?.LogicComponent;
    if (!t?.Valid || !t?.TargetEntity?.Valid || !t?.Character?.CharacterActorComponent) {
      return 0;
    }
    this.GetSocketLocation(undefined, t.TargetSocketName, this.cz, t.TargetEntity);
    this.cz.SubtractionEqual(t.Character.CharacterActorComponent.ActorLocationProxy);
    CameraUtility.GetVectorInGravity(this.cz, this.cz);
    var t = this.cz.HeadingAngle() * MathUtils_1.MathUtils.RadToDeg;
    this.cie.DeepCopy(Global_1.Global.CharacterCameraManager.GetCameraRotation());
    var a = CameraUtility.GetYawInGravity(this.cie);
    return MathUtils_1.MathUtils.WrapAngle(t - a);
  }
  static GetCameraDefaultFocusRotator() {
    var t;
    var a = CommonParamById_1.configCommonParamById.GetFloatConfig("InitialCameraPitch");
    var e = ModelManager_1.ModelManager.CameraModel?.FightCamera?.LogicComponent;
    if (e?.Valid && e?.Character?.IsValid() && e?.Character?.CharacterActorComponent) {
      if (!(t = e.Character.CharacterActorComponent.Entity.GetComponent(215))?.Valid || t.HasTag(-648310348)) {
        this.cie.Reset();
        CameraUtility.SetPitchInGravity(this.cie, a, this.cie);
      } else if (e.IsInNormalGravityMode()) {
        t = e.Character.CharacterActorComponent.ActorRotation.Euler();
        this.cie.Pitch = a;
        this.cie.Yaw = t.Z;
        this.cie.Roll = t.X;
      } else {
        CameraUtility.SetPitchInGravity(e.Character.CharacterActorComponent.ActorRotationProxy, a, this.cie);
      }
    } else {
      this.cie.Pitch = a;
      this.cie.Yaw = 0;
      this.cie.Roll = 0;
    }
    return this.cie;
  }
  static GetCameraDefaultFocusUeRotator() {
    return this.GetCameraDefaultFocusRotator().ToUeRotator();
  }
  static CheckCameraShakeCondition(t) {
    return !!t?.Valid && this.CheckFormationControlState(t, true, true);
  }
  static CheckCameraSequenceCondition(t, a = 0) {
    if (!t) {
      return false;
    }
    switch (a) {
      case 0:
        var e = t.GetEntityNoBlueprint()?.GetComponent(0);
        if (e?.IsRole()) {
          return !!e?.IsCharacterMonster() || Global_1.Global.BaseCharacter === t;
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Camera", 57, "SwitchSequenceCamera生效客户端类型`单客户端`只允许在角色身上调用");
          }
          return false;
        }
      case 1:
        return true;
      case 3:
        if (t.GetEntityNoBlueprint()?.GetComponent(0)?.IsMonster()) {
          return (e = t.GetController()) instanceof TsAiController_1.default && !!(e = e.AiController?.AiHateList?.GetCurrentTarget()?.Entity?.GetComponent(3))?.Valid && !!(e.Owner instanceof TsBaseCharacter_1.default) && !!e.IsAutonomousProxy && e.Owner === Global_1.Global.BaseCharacter;
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Camera", 57, "SwitchSequenceCamera生效客户端类型`仇恨目标客户端`只允许在怪物身上调用");
          }
          return false;
        }
      case 4:
        if (t.GetEntityNoBlueprint()?.GetComponent(0)?.IsMonster()) {
          return !!(e = t.GetEntityNoBlueprint()?.GetComponent(41))?.Valid && e.SkillTarget === ModelManager_1.ModelManager.CharacterModel.GetHandle(Global_1.Global.BaseCharacter?.EntityId ?? 0);
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Camera", 57, "SwitchSequenceCamera生效客户端类型`技能目标客户端`只允许在怪物身上调用");
          }
          return false;
        }
      case 2:
        if (t.GetEntityNoBlueprint()?.GetComponent(0)?.IsMonster()) {
          return !!(e = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()?.GetComponent(33))?.Valid && e.GetCurrentTarget() === ModelManager_1.ModelManager.CharacterModel.GetHandle(t.EntityId);
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Camera", 57, "SwitchSequenceCamera生效客户端类型`锁定目标客户端`只允许在怪物身上调用");
          }
          return false;
        }
      default:
        return false;
    }
  }
  static CheckApplyCameraModifyCondition(t, a, e = 0, r = undefined) {
    return !!t?.Valid && !!this.CheckFormationControlState(t, false, !a.IsSwitchModifier) && !!this.Vhe(t, e) && (!r || !!this.Hhe(r));
  }
  static CheckFormationControlState(t, a = false, e = false) {
    if (!t?.Valid) {
      return false;
    }
    var r = t.Entity.GetComponent(234);
    if (r?.Valid) {
      return r.IsAutonomousProxy;
    }
    let i = undefined;
    r = t.Entity.GetComponent(246);
    if ((i = (r?.Valid && r.Driver?.Valid ? r.Driver : t.Entity).GetComponent(0))?.Valid) {
      r = i.IsVision() || i.IsMonster() ? ModelManager_1.ModelManager.CreatureModel.GetEntityId(i.GetSummonerId()) : t.Id;
      t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(r, {
        ParamType: 1
      });
      if (t && (a && !t.IsMyRole() || e && !t.IsControl())) {
        return false;
      }
    }
    return true;
  }
  static Vhe(t, a) {
    if (!t?.Valid) {
      return false;
    }
    var e = t.Entity.GetComponent(0);
    if (!e?.Valid) {
      return false;
    }
    switch (a) {
      case 0:
      case 7:
        return e.GetPlayerId() === ModelManager_1.ModelManager.PlayerInfoModel?.GetId() && (e.IsRole() || e.IsVision());
      case 9:
        var r = t.Entity.GetComponent(246);
        if (r?.Valid && r.Driver?.Valid) {
          return !!(r = r.Driver.GetComponent(0))?.Valid && r.GetPlayerId() === ModelManager_1.ModelManager.PlayerInfoModel?.GetId() && (r.IsRole() || r.IsVision());
        } else {
          return false;
        }
      case 1:
      case 8:
      case 10:
        return true;
      case 3:
        if (e.IsMonster()) {
          return (r = t.Entity.GetComponent(3).Owner?.GetController()) instanceof TsAiController_1.default && !!(r = r.AiController?.AiHateList?.GetCurrentTarget()?.Entity?.GetComponent(3))?.Valid && !!(r.Owner instanceof TsBaseCharacter_1.default) && !!r.IsAutonomousProxy && r.Owner === Global_1.Global.BaseCharacter;
        } else {
          return false;
        }
      case 4:
        if (e.IsMonster()) {
          return !!(r = t.Entity.GetComponent(41))?.Valid && r.SkillTarget === ModelManager_1.ModelManager.CharacterModel.GetHandle(Global_1.Global.BaseCharacter?.EntityId ?? 0);
        } else {
          return false;
        }
      case 6:
      case 2:
        if (e.IsMonster()) {
          return !!(r = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()?.GetComponent(33))?.Valid && r.ShowTarget === ModelManager_1.ModelManager.CharacterModel.GetHandle(t.Id);
        } else {
          return false;
        }
      case 5:
        return e.IsMonster();
      default:
        return false;
    }
  }
  static Hhe(t = undefined) {
    return !t || this.jhe(t);
  }
  static jhe(a) {
    var e = a.Num();
    for (let t = 0; t < e; ++t) {
      var r = a.Get(t);
      switch (r.ConditionType) {
        case 0:
          if (this.Whe(r)) {
            break;
          }
          return false;
        case 1:
          if (this.Khe(r)) {
            break;
          }
          return false;
        case 2:
          if (this.Qhe(r)) {
            break;
          }
          return false;
        case 3:
          if (this.Xhe(r)) {
            break;
          }
          return false;
        case 4:
          if (this.$he(r)) {
            break;
          }
          return false;
        case 5:
          if (this.Yhe(r)) {
            break;
          }
          return false;
        case 6:
          if (this.Jhe(r)) {
            break;
          }
          return false;
        case 7:
          if (this.zhe(r)) {
            break;
          }
          return false;
        case 8:
          if (this.Z5a(r)) {
            break;
          }
          return false;
        case 9:
          if (this.r7_(r)) {
            break;
          }
          return false;
        case 10:
          if (this.o7_(r)) {
            break;
          }
          return false;
        default:
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Camera", 57, "未支持的相机 Modify ConditionType", ["ConditionType", r.ConditionType]);
          }
          return false;
      }
    }
    return true;
  }
  static Whe(t) {
    var a = Global_1.Global.BaseCharacter.GetEntityNoBlueprint().GetComponent(215);
    var a = t.AnyTag ? a.HasAnyTag(GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(t.TagToCheck)) : a.HasAllTag(GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(t.TagToCheck));
    if (t.Reverse) {
      return !a;
    } else {
      return a;
    }
  }
  static Khe(t) {
    let a = false;
    var e = this.GetCameraLockOnTargetEntityHandle();
    if (e) {
      e = e.Entity.GetComponent(215);
      a = t.AnyTag ? e.HasAnyTag(GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(t.TagToCheck)) : e.HasAllTag(GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(t.TagToCheck));
    }
    if (t.Reverse) {
      return !a;
    } else {
      return a;
    }
  }
  static Qhe(t) {
    let a = false;
    var e = ModelManager_1.ModelManager.CameraModel.FightCameraFinalDistance;
    if (e >= t.ArmLengthMin && e <= t.ArmLengthMax) {
      a = true;
    }
    if (t.Reverse) {
      return !a;
    } else {
      return a;
    }
  }
  static Xhe(t) {
    let a = false;
    var e;
    var r;
    var i = this.GetCameraLockOnTargetEntityHandle();
    if (i && (e = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent.CameraLocation, r = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent.CameraForward, i.Entity.GetComponent(3).ActorLocationProxy.Subtraction(e, this.cz), r.CrossProduct(this.cz, this.cz), this.cz.Z < 0)) {
      a = true;
    }
    if (t.Reverse) {
      return !a;
    } else {
      return a;
    }
  }
  static $he(t) {
    let a = false;
    var e;
    var r = this.GetCameraLockOnTargetEntityHandle();
    if (r && (e = Global_1.Global.BaseCharacter.CharacterActorComponent.SkeletalMesh.D_GetSocketLocation(CharacterNameDefines_1.CharacterNameDefines.ROOT), r = r.Entity.GetComponent(3).ActorLocationProxy, (e = Math.abs(e.Z - r.Z)) >= t.LockTargetDeltaZMin) && e <= t.LockTargetDeltaZMax) {
      a = true;
    }
    if (t.Reverse) {
      return !a;
    } else {
      return a;
    }
  }
  static Yhe(t) {
    let a = false;
    var e;
    if (this.GetCameraLockOnTargetEntityHandle() && (e = Math.abs(this.GetPlayerTargetAndCameraYawOffset())) >= t.LockTargetDeltaYawMin && e <= t.LockTargetDeltaYawMax) {
      a = true;
    }
    if (t.Reverse) {
      return !a;
    } else {
      return a;
    }
  }
  static Jhe(t) {
    let a = false;
    this.cie.DeepCopy(Global_1.Global.CharacterCameraManager.GetCameraRotation());
    var e = CameraUtility.GetPitchInGravity(this.cie);
    if (e >= t.LockTargetDeltaPitchMin && e <= t.LockTargetDeltaPitchMax) {
      a = true;
    }
    if (t.Reverse) {
      return !a;
    } else {
      return a;
    }
  }
  static zhe(t) {
    let a = false;
    var e;
    var r;
    var i = this.GetCameraLockOnTargetEntityHandle();
    if (i && (e = Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy, i = i.Entity.GetComponent(3).ActorLocationProxy, CameraUtility.GetVectorInGravity(e, this.cz), CameraUtility.GetVectorInGravity(i, this.gme), e = Vector_1.Vector.DistSquared2D(this.cz, this.gme), i = t.MinLockDistance * t.MinLockDistance, r = t.MaxLockDistance * t.MaxLockDistance, i <= e) && e <= r) {
      a = true;
    }
    if (t.Reverse) {
      return !a;
    } else {
      return a;
    }
  }
  static Z5a(t) {
    let a = false;
    var e;
    var r;
    if (t.CameraTraceRadius > 0) {
      e = Global_1.Global.BaseCharacter.CharacterActorComponent.ActorRotationProxy;
      if ((r = Global_1.Global.BaseCharacter.CharacterActorComponent.SkeletalMesh).DoesSocketExist(t.CameraTraceSocket)) {
        this.cz.DeepCopy(r.D_GetSocketLocation(t.CameraTraceSocket));
      } else {
        this.cz.DeepCopy(r.D_GetSocketLocation(this.CameraPosition));
      }
      this.gme.DeepCopy(t.CameraTraceOffset);
      e.Quaternion().RotateVector(this.gme, this.gme);
      this.gme.AdditionEqual(this.cz);
      if (!this.Fse) {
        this.Fse = UE.NewObject(UE.TraceSphereElement.StaticClass());
        this.Fse.bIsSingle = true;
        this.Fse.bTraceComplex = false;
        this.Fse.bIgnoreSelf = true;
        this.Fse.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Camera);
        this.Fse.WorldContextObject = GlobalData_1.GlobalData.World;
      }
      this.Fse.Radius = t.CameraTraceRadius;
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Fse, this.gme);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Fse, this.gme);
      a = !TraceElementCommon_1.TraceElementCommon.SphereTrace(this.Fse, PROFILE_KEY);
    }
    if (t.Reverse) {
      return !a;
    } else {
      return a;
    }
  }
  static r7_(t) {
    let a = false;
    var e;
    var r = this.GetCameraTargetEntityHandle();
    var i = this.GetCameraLockOnTargetEntityHandle();
    if (r && i && (e = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent.CameraLocation, r = r.Entity.GetComponent(3).ActorLocationProxy, i.Entity.GetComponent(3).ActorLocationProxy.Subtraction(r, this.cz), e.Subtraction(r, this.gme), this.gme.CrossProduct(this.cz, this.cz), CameraUtility.GetVectorInGravity(this.cz, this.cz), this.cz.Z > 0)) {
      a = true;
    }
    if (t.Reverse) {
      return !a;
    } else {
      return a;
    }
  }
  static o7_(t) {
    let a = false;
    var e;
    var r = this.GetCameraTargetEntityHandle();
    var i = this.GetCameraLockOnTargetEntityHandle();
    if (r && i && (e = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent.CameraLocation, r = r.Entity.GetComponent(3).ActorLocationProxy, i.Entity.GetComponent(3).ActorLocationProxy.Subtraction(r, this.cz), e.Subtraction(r, this.gme), this.gme.CrossProduct(this.cz, this.cz), CameraUtility.GetVectorInGravity(this.cz, this.cz), this.cz.Z < 0)) {
      a = true;
    }
    if (t.Reverse) {
      return !a;
    } else {
      return a;
    }
  }
  static CharacterMovementBaseIsMoving() {
    var t = ControllerHolder_1.ControllerHolder.CameraController.FightCamera?.LogicComponent?.Character?.BasedMovement?.MovementBase;
    return !!t && t.Mobility === 2 && (!t.GetComponentVelocity().IsNearlyZero(MathUtils_1.MathUtils.KindaSmallNumber) || !!(t = ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByBaseItem(t.GetOwner())?.Entity.GetComponent(148)) && !!t.IsMovingOrTeleporting());
  }
  static SetCameraRotationWithString(t) {
    var a = [];
    for (const e of t.matchAll(/[+-]?\d+(?<Decimal>\.\d*)?/g)) {
      a.push(e[0]);
    }
    if (!(a.length < 2)) {
      CameraUtility.SetCameraRotationWithAxisString(a[0], a[1]);
    }
  }
  static SetCameraRotationWithAxisString(t, a) {
    t = MathCommon_1.MathCommon.Clamp(parseFloat(t || "0"), -PITCH_LIMIT_VALUE, PITCH_LIMIT_VALUE);
    a = MathUtils_1.MathUtils.WrapAngle(parseFloat(a || "0"));
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.SetRotation(new UE.Rotator(t, a, 0));
  }
  static ResetFocus(t = RESET_FOCUS_TIME, a = undefined, e = true, r = 0) {
    var i = ModelManager_1.ModelManager.CameraModel?.FightCamera?.LogicComponent;
    if (i?.Valid) {
      i.ResetCameraInput();
      i.PlayCameraEulerRotatorWithCurve(CameraUtility.GetCameraDefaultFocusRotator(), t, a, e, r);
    }
  }
  static PrintRotationInNormalGravity(t, a) {
    var e = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    if (e.Valid && (t.Quaternion(this.e7o), e.GravityQuat.Multiply(this.e7o, this.k6r), this.k6r.Rotator(this.cie), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Camera", 57, a, ["rotation", t], ["RotatorInNormalGravity", this.cie]);
    }
  }
  static PrintRotationInCameraGravity(t, a) {
    var e = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    if (e.Valid && (t.Quaternion(this.e7o), e.GravityInverseQuat.Multiply(this.e7o, this.k6r), this.k6r.Rotator(this.cie), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Camera", 57, a, ["rotation", t], ["RotatorInCameraGravity", this.cie]);
    }
  }
  static GetRotatorInGravity(t, a) {
    var e = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    if (!e.Valid || e.IsInNormalGravityMode()) {
      a.DeepCopy(t);
    } else {
      t.Quaternion(this.e7o);
      e.GravityInverseQuat.Multiply(this.e7o, this.k6r);
      this.k6r.Rotator(a);
    }
    return a;
  }
  static SetRotatorInGravity(t, a) {
    var e = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    if (!e.Valid || e.IsInNormalGravityMode()) {
      t.DeepCopy(a);
    } else {
      a.Quaternion(this.e7o);
      e.GravityQuat.Multiply(this.e7o, this.k6r);
      this.k6r.Rotator(t);
    }
    return t;
  }
  static GetRotatorInNormal(t, a) {
    var e = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    if (!e.Valid || e.IsInNormalGravityMode()) {
      a.DeepCopy(t);
    } else {
      t.Quaternion(this.e7o);
      e.GravityQuat.Multiply(this.e7o, this.k6r);
      this.k6r.Rotator(a);
    }
    return a;
  }
  static GetVectorInGravity(t, a) {
    var e = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    if (!e.Valid || e.IsInNormalGravityMode()) {
      a.DeepCopy(t);
    } else {
      e.GravityInverseQuat.RotateVector(t, a);
    }
    return a;
  }
  static GetVectorInNormal(t, a) {
    var e = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    if (!e.Valid || e.IsInNormalGravityMode()) {
      a.DeepCopy(t);
    } else {
      e.GravityQuat.RotateVector(t, a);
    }
    return a;
  }
  static GetPitchInGravity(t) {
    var a = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    return (!a.Valid || a.IsInNormalGravityMode() ? t : (GravityUtils_1.GravityUtils.GetRotatorInGravity(t, a.GravityInverseQuat, this.cie), this.cie)).Pitch;
  }
  static SetPitchInGravity(t, a, e) {
    var r = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    if (!r.Valid || r.IsInNormalGravityMode()) {
      e.DeepCopy(t);
      e.Pitch = MathCommon_1.MathCommon.Clamp(a, -PITCH_LIMIT_VALUE, PITCH_LIMIT_VALUE);
    } else {
      GravityUtils_1.GravityUtils.GetRotatorInGravity(t, r.GravityInverseQuat, this.cie);
      this.cie.Pitch = MathCommon_1.MathCommon.Clamp(a, -PITCH_LIMIT_VALUE, PITCH_LIMIT_VALUE);
      GravityUtils_1.GravityUtils.GetRotatorInNormal(this.cie, r.GravityQuat, e);
    }
    return e;
  }
  static AddPitchInGravity(t, a, e) {
    var r = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    if (!r.Valid || r.IsInNormalGravityMode()) {
      e.DeepCopy(t);
      e.Pitch = MathCommon_1.MathCommon.Clamp(e.Pitch + a, -PITCH_LIMIT_VALUE, PITCH_LIMIT_VALUE);
    } else {
      GravityUtils_1.GravityUtils.GetRotatorInGravity(t, r.GravityInverseQuat, this.cie);
      this.cie.Pitch = MathCommon_1.MathCommon.Clamp(this.cie.Pitch + a, -PITCH_LIMIT_VALUE, PITCH_LIMIT_VALUE);
      GravityUtils_1.GravityUtils.GetRotatorInNormal(this.cie, r.GravityQuat, e);
    }
    return e;
  }
  static GetYawInGravity(t) {
    var a = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    return (!a.Valid || a.IsInNormalGravityMode() ? t : (GravityUtils_1.GravityUtils.GetRotatorInGravity(t, a.GravityInverseQuat, this.cie), this.cie)).Yaw;
  }
  static SetYawInGravity(t, a, e) {
    var r = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    if (!r.Valid || r.IsInNormalGravityMode()) {
      e.DeepCopy(t);
      e.Yaw = MathUtils_1.MathUtils.WrapAngle(a);
    } else {
      GravityUtils_1.GravityUtils.GetRotatorInGravity(t, r.GravityInverseQuat, this.cie);
      this.cie.Yaw = MathUtils_1.MathUtils.WrapAngle(a);
      GravityUtils_1.GravityUtils.GetRotatorInNormal(this.cie, r.GravityQuat, e);
    }
    return e;
  }
  static AddYawInGravity(t, a, e) {
    var r = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    if (!r.Valid || r.IsInNormalGravityMode()) {
      e.DeepCopy(t);
      e.Yaw = MathUtils_1.MathUtils.WrapAngle(e.Yaw + a);
    } else {
      GravityUtils_1.GravityUtils.GetRotatorInGravity(t, r.GravityInverseQuat, this.cie);
      this.cie.Yaw = MathUtils_1.MathUtils.WrapAngle(this.cie.Yaw + a);
      GravityUtils_1.GravityUtils.GetRotatorInNormal(this.cie, r.GravityQuat, e);
    }
    return e;
  }
  static GetRollInGravity(t) {
    var a = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    return (!a.Valid || a.IsInNormalGravityMode() ? t : (GravityUtils_1.GravityUtils.GetRotatorInGravity(t, a.GravityInverseQuat, this.cie), this.cie)).Roll;
  }
  static SetRollInGravity(t, a, e) {
    var r = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    if (!r.Valid || r.IsInNormalGravityMode()) {
      e.DeepCopy(t);
      e.Roll = MathUtils_1.MathUtils.WrapAngle(a);
    } else {
      GravityUtils_1.GravityUtils.GetRotatorInGravity(t, r.GravityInverseQuat, this.cie);
      this.cie.Roll = MathUtils_1.MathUtils.WrapAngle(a);
      GravityUtils_1.GravityUtils.GetRotatorInNormal(this.cie, r.GravityQuat, e);
    }
    return e;
  }
  static AddRollInGravity(t, a, e) {
    var r = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    if (!r.Valid || r.IsInNormalGravityMode()) {
      e.DeepCopy(t);
      e.Roll = MathUtils_1.MathUtils.WrapAngle(e.Roll + a);
    } else {
      GravityUtils_1.GravityUtils.GetRotatorInGravity(t, r.GravityInverseQuat, this.cie);
      this.cie.Roll = MathUtils_1.MathUtils.WrapAngle(this.cie.Roll + a);
      GravityUtils_1.GravityUtils.GetRotatorInNormal(this.cie, r.GravityQuat, e);
    }
    return e;
  }
  static SetXnInGravity(t, a, e) {
    var r = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    if (!r.Valid || r.IsInNormalGravityMode()) {
      e.DeepCopy(t);
      e.X = a;
    } else {
      GravityUtils_1.GravityUtils.GetVectorInGravity(t, r.GravityInverseQuat, e);
      e.X = a;
      GravityUtils_1.GravityUtils.GetVectorInNormal(e, r.GravityQuat, e);
    }
    return e;
  }
  static SetYnInGravity(t, a, e) {
    var r = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    if (!r.Valid || r.IsInNormalGravityMode()) {
      e.DeepCopy(t);
      e.Y = a;
    } else {
      GravityUtils_1.GravityUtils.GetVectorInGravity(t, r.GravityInverseQuat, e);
      e.Y = a;
      GravityUtils_1.GravityUtils.GetVectorInNormal(e, r.GravityQuat, e);
    }
    return e;
  }
  static SetZnInGravity(t, a, e) {
    var r = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    if (!r.Valid || r.IsInNormalGravityMode()) {
      e.DeepCopy(t);
      e.Z = a;
    } else {
      GravityUtils_1.GravityUtils.GetVectorInGravity(t, r.GravityInverseQuat, e);
      e.Z = a;
      GravityUtils_1.GravityUtils.GetVectorInNormal(e, r.GravityQuat, e);
    }
    return e;
  }
  static GetZnInGravity(t) {
    var a = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    return (!a.Valid || a.IsInNormalGravityMode() ? t : CameraUtility.GetVectorInGravity(t, this.cz)).Z;
  }
  static AddZnInGravity(t, a, e) {
    var r = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent;
    if (!r.Valid || r.IsInNormalGravityMode()) {
      e.DeepCopy(t);
      e.Z += a;
    } else {
      e.DeepCopy(t);
      GravityUtils_1.GravityUtils.AddZnInGravity(r.GravityDirect, e, a);
    }
    return e;
  }
  static GetCameraMode(t) {
    switch (t) {
      case 0:
        return CameraModel_1.cameraModeLockOn;
      case 2:
        return CameraModel_1.cameraModeWidget;
      case 1:
        return CameraModel_1.cameraModeSequence;
      case 3:
        return CameraModel_1.cameraModeScene;
      case 4:
        return CameraModel_1.cameraModeOrbital;
      case 5:
        return CameraModel_1.cameraModeFree;
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Camera", 57, "Invalid Camera Mode", ["cameraMode", t]);
        }
        return CameraModel_1.cameraModeDefault;
    }
  }
  static GetValidPitchAngle(t, a) {
    if (!MathUtils_1.MathUtils.IsNearlyZero(t, MathCommon_1.MathCommon.KindaSmallNumber) && MathUtils_1.MathUtils.IsNearlyZero(Math.abs(t) % MathCommon_1.MathCommon.RightAngle, MathCommon_1.MathCommon.KindaSmallNumber)) {
      if (t > 0) {
        return PITCH_LIMIT_VALUE;
      } else {
        return -PITCH_LIMIT_VALUE;
      }
    } else if (a) {
      return Math.max(t, -PITCH_LIMIT_VALUE);
    } else {
      return Math.min(t, PITCH_LIMIT_VALUE);
    }
  }
}
(exports.CameraUtility = CameraUtility).CameraPosition = new UE.FName("CameraPosition");
CameraUtility.HitCase = new UE.FName("HitCase");
CameraUtility.Root = new UE.FName("Root");
CameraUtility.cz = Vector_1.Vector.Create();
CameraUtility.gme = Vector_1.Vector.Create();
CameraUtility.e7o = Quat_1.Quat.Create();
CameraUtility.k6r = Quat_1.Quat.Create();
CameraUtility.cie = Rotator_1.Rotator.Create();
CameraUtility.CapsuleHeightRatio = 0.67;
CameraUtility.Fse = undefined; //# sourceMappingURL=CameraUtility.js.map