"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletUtil = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Entity_1 = require("../../../Core/Entity/Entity");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const Macro_1 = require("../../../Core/Preprocessor/Macro");
const MathCommon_1 = require("../../../Core/Utils/Math/MathCommon");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const SpaceUtils_1 = require("../../../Core/Utils/SpaceUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../Common/TimeUtil");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const Global_1 = require("../../Global");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const PhantomUtil_1 = require("../../Module/Phantom/PhantomUtil");
const CharacterUtils_1 = require("../Character/CharacterUtils");
const CampUtils_1 = require("../Character/Common/Blueprint/Utils/CampUtils");
const FollowUtils_1 = require("../Character/Common/Component/Abilities/Follow/FollowUtils");
const PawnTimeScaleComponent_1 = require("../Pawn/Component/PawnTimeScaleComponent");
const BulletConstant_1 = require("./BulletConstant");
const BulletStaticFunction_1 = require("./BulletStaticMethod/BulletStaticFunction");
const BulletPool_1 = require("./Model/BulletPool");
const QUARTER_PI_DEGREE = 45;
class BulletUtil {
  static GetTargetLocation(t, e, o) {
    if (o.BulletDataMain.Move.TrackTarget === 10) {
      return o.BulletInitParams.InitTargetLocation;
    } else if (o.Target?.Valid) {
      return t.GetSocketLocation(e);
    } else {
      return undefined;
    }
  }
  static VictimInValid(t) {
    return !t?.Valid || this.DoesEntityContainsTag(t, 1008164187) || this.DoesEntityContainsTag(t, -208062360);
  }
  static AttackedCondition(t, e) {
    return !this.VictimInValid(e?.Entity) && this.AttackedCampCondition(t, e);
  }
  static AttackedCampCondition(t, e) {
    var o = e.Entity.GetComponent(0);
    if (t.BulletCamp === 11) {
      if (o.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Vision) {
        return o.GetPlayerId() === t.AttackerPlayerId;
      } else {
        l = ModelManager_1.ModelManager.GameModeModel.IsMulti ? ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(t.AttackerPlayerId, {
          ParamType: 2,
          IsControl: true
        }).EntityHandle.Id : Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint();
        if (ModelManager_1.ModelManager.CharacterModel.IsValid(l)) {
          return l === e.Entity.Id;
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Bullet", 20, "子弹对小队攻击，找不到当前控制玩家", ["Id", t.BulletRowName], ["Attacker", t.AttackerActorComp?.Owner?.GetName()], ["CurrentEntityId", l]);
          }
          return false;
        }
      }
    }
    var l = t.AttackerCamp;
    let r = 0;
    if (o.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Player) {
      r = o.GetEntityCamp();
    }
    o = CampUtils_1.CampUtils.GetCampRelationship(l, r) * 2;
    if (e === t.AttackerActorComp) {
      return !!(t.BulletCamp & 1);
    } else {
      return !!(t.BulletCamp & o) && (o != 4 || !this.DoesEntityContainsTag(e.Entity, -149285150));
    }
  }
  static DoesEntityContainsTag(t, e) {
    return !!t && (!!t.GetComponent(208)?.HasTag(e) || !!(t = t.GetComponent(217)) && t.HasTag(e));
  }
  static GetCurrentRole(t) {
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      return ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(t.AttackerPlayerId, {
        ParamType: 2,
        IsControl: true
      }).EntityHandle?.Entity?.GetComponent(3);
    } else {
      return Global_1.Global.BaseCharacter?.CharacterActorComponent;
    }
  }
  static ShakeTest(t, e) {
    if (!CharacterUtils_1.CharacterUtils.CanCharacterMonsterOrSummonedDisplayEffect(t.AttackerHandle)) {
      return false;
    }
    let o = false;
    var l = t.BulletDataMain.Render;
    if ((0, RegisterComponent_1.isComponentInstance)(e, 3) && e.IsRoleAndCtrlByMe && l.VictimCameraShakeOnHit.length > 0 && l.CameraShakeCountMax > t.ShakeNumbers) {
      o = true;
    }
    if (o = t.Attacker && t.IsAutonomousProxy && (l.AttackerCameraShakeOnHit.length > 0 || l.AttackerCameraShakeOnHitWeakPoint.length > 0) && l.CameraShakeCountMax > t.ShakeNumbers && BulletUtil.IsPlayerOrSummons(t) ? true : o) {
      t.ShakeNumbers++;
    }
    return o;
  }
  static IsPlayerOrSummons(t) {
    if (t.AttackerActorComp.IsRoleAndCtrlByMe) {
      return true;
    }
    if (t.AttackerActorComp.IsAutonomousProxy) {
      var e = t.AttackerCreatureDataComp;
      var o = e.GetSummonerPlayerId();
      if (o && o === ModelManager_1.ModelManager.PlayerInfoModel.GetId()) {
        if (t.BulletDataMain.Render.CameraShakeToSummonOwner) {
          return true;
        }
        if (FollowUtils_1.FollowUtils.IsFollowingPlayer(e.GetCreatureDataId(), o)) {
          return true;
        }
      }
    }
    return false;
  }
  static SummonBullet(t, e, o, l, r = undefined, i = undefined, a = true) {
    var n;
    if (t.NeedDestroy) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Bullet", 20, "子弹SummonBullet父子弹已销毁", ["子弹ID", t.BulletRowName]);
      }
    } else {
      (n = ControllerHolder_1.ControllerHolder.BulletController.GetActionCenter().CreateBulletActionInfo(11)).ChildrenType = e;
      n.Victim = o;
      n.IsStayInCharacter = l;
      n.CreateOnAuthority = a;
      if (r) {
        n.ParentImpactPoint = Vector_1.Vector.Create(r);
      }
      if (i) {
        n.ParentLastPosition = Vector_1.Vector.Create(i);
      }
      ControllerHolder_1.ControllerHolder.BulletController.GetActionRunner().AddAction(t, n);
    }
  }
  static CheckSupport(t, e) {
    t = t.BulletDataMain.Execution.SupportCamp;
    if (t && t.length > 0) {
      for (const o of t) {
        if (o === e) {
          return true;
        }
      }
    }
    return false;
  }
  static ProcessHandOverEffectToSon(t, e) {
    if (e?.Valid && (e = e.GetBulletInfo()).BulletDataMain.Render.HandOverParentEffect) {
      BulletStaticFunction_1.BulletStaticFunction.HandOverEffects(t, e);
    }
  }
  static FrozenBulletTime(t, e) {
    t.FrozenTime = e * TimeUtil_1.TimeUtil.InverseMillisecond;
    BulletUtil.BulletFrozen(t);
  }
  static BulletFrozen(t) {
    t.IsFrozen = true;
    var e = t.ActorComponent;
    if (e) {
      e.SetBulletCustomTimeDilation(0);
      BulletStaticFunction_1.BulletStaticFunction.SetBulletEffectTimeScale(t.EffectInfo, 0);
    }
  }
  static BulletUnfrozen(t) {
    t.IsFrozen = false;
    var e = t.ActorComponent;
    var o = t.Attacker?.GetComponent(133)?.GetTopForeverTimeScale(0) ?? ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation;
    e.SetBulletCustomTimeDilation(o);
    BulletStaticFunction_1.BulletStaticFunction.SetBulletEffectTimeScale(t.EffectInfo, 1);
  }
  static FrozenCharacterBullet(t, e, o = 0) {
    t = ModelManager_1.ModelManager.BulletModel.GetBulletSetByAttacker(t);
    if (t) {
      for (const r of t) {
        var l = r.GetBulletInfo();
        if (!!StringUtils_1.StringUtils.IsEmpty(e) || l.BulletDataMain.BulletName === e) {
          BulletUtil.FrozenBulletTime(l, o);
        }
      }
    }
  }
  static UnFrozenCharacterBullet(t, e) {
    t = ModelManager_1.ModelManager.BulletModel.GetBulletSetByAttacker(t);
    if (t) {
      for (const l of t) {
        var o = l.GetBulletInfo();
        if (!!StringUtils_1.StringUtils.IsEmpty(e) || o.BulletDataMain.BulletName === e) {
          BulletUtil.BulletUnfrozen(o);
        }
      }
    }
  }
  static SetTimeScale(t, e, o, l, r, i, a = 0, n = 0) {
    if (r <= 0 || t.BulletDataMain.TimeScale.TimeScaleWithAttacker) {
      return 0;
    }
    if (a > 0 && r <= a) {
      return 0;
    }
    var a = Time_1.Time.WorldTimeSeconds - a;
    var _ = a + r;
    let u = n;
    if (n >= 0) {
      t.TimeScaleId += 1;
      u = t.TimeScaleId;
    }
    n = new PawnTimeScaleComponent_1.TimeScale(a, _, e, o, l, r, u, i, (0, PawnTimeScaleComponent_1.getSourceGroup)(i));
    t.TimeScaleList.Push(n);
    t.TimeScaleMap.set(u, n);
    return u;
  }
  static RemoveTimeScale(t, e) {
    t = t.TimeScaleMap.get(e);
    if (t) {
      t.MarkDelete = true;
    }
  }
  static SetVictimTimeScale(t, e, o, l, r, i, a, n, _, u = false) {
    if (!(a <= 0)) {
      o = o.SetTimeScale(l, r, i, a, n, u, true);
      if (_ && o > 0 && (l = EntitySystem_1.EntitySystem.Get(t)?.GetBulletInfo().CollisionInfo)) {
        l.HitTimeScaleEntityMap.set(e, o);
      }
    }
  }
  static GetHitRotator(t, e, o) {
    o.FromUeRotator(e.ActorRotationProxy);
    var l = t.BulletDataMain.Base.RelativeDirection;
    if (l === 3) {
      return false;
    }
    if ((0, RegisterComponent_1.isComponentInstance)(e, 3) && e.Entity.GetComponent(217)?.HasTag(855966206)) {
      return false;
    }
    var r = t.AttackerActorComp;
    var i = Vector_1.Vector.Create();
    switch (l) {
      case 0:
        i.FromUeVector(r.ActorLocationProxy);
        i.SubtractionEqual(e.ActorLocationProxy);
        MathUtils_1.MathUtils.LookRotationUpFirst(i, e.ActorUpProxy, o);
        break;
      case 1:
        i.FromUeVector(t.ActorComponent.ActorLocationProxy);
        i.SubtractionEqual(e.ActorLocationProxy);
        MathUtils_1.MathUtils.LookRotationUpFirst(i, e.ActorUpProxy, o);
        break;
      case 2:
        var a = t.AttackerMoveComp?.IsStandardGravity ?? true;
        if (t.MoveInfo.BulletSpeedDir.Equals(Vector_1.Vector.ZeroVectorProxy, MathCommon_1.MathCommon.KindaSmallNumber)) {
          if (a) {
            i.FromUeVector(t.ActorComponent.ActorForward);
            i.Z = 0;
          } else {
            Vector_1.Vector.VectorPlaneProject(t.ActorComponent.ActorForwardProxy, t.AttackerMoveComp.GravityUp, i);
          }
          i.MultiplyEqual(-1);
        } else if (a) {
          i.Set(-t.MoveInfo.BulletSpeedDir.X, -t.MoveInfo.BulletSpeedDir.Y, 0);
        } else {
          Vector_1.Vector.VectorPlaneProject(t.MoveInfo.BulletSpeedDir, t.AttackerMoveComp.GravityUp, i);
          i.MultiplyEqual(-1);
        }
        MathUtils_1.MathUtils.LookRotationUpFirst(i, e.ActorUpProxy, o);
        break;
      case 4:
        if (SpaceUtils_1.SpaceUtils.IsLocationInSideBullet(t, e.ActorLocationProxy)) {
          i.FromUeVector(e.ActorLocationProxy);
          i.SubtractionEqual(t.ActorComponent.ActorLocationProxy);
        } else {
          i.FromUeVector(t.ActorComponent.ActorLocationProxy);
          i.SubtractionEqual(e.ActorLocationProxy);
        }
        MathUtils_1.MathUtils.LookRotationUpFirst(i, e.ActorUpProxy, o);
    }
    return true;
  }
  static SetHitRotator(t, e, o) {
    if (BulletUtil.GetHitRotator(t, e, this.TmpRotator) && !e.Entity.GetComponent(217)?.HasTag(1447214865) && (this.TmpRotator2.Set(0, o, 0), this.TmpRotator.Quaternion(this.TmpQuat), this.TmpRotator2.Quaternion(this.TmpQuat2), this.TmpQuat.Multiply(this.TmpQuat2, this.TmpQuat), this.TmpQuat.Rotator(this.TmpRotator), e.SetActorRotation(this.TmpRotator.ToUeRotator(), this.constructor.name, false), (0, RegisterComponent_1.isComponentInstance)(e, 3))) {
      e.SetInputRotator(this.TmpRotator);
    }
    return this.TmpRotator.ToUeRotator();
  }
  static GetOverrideHitAnimByAngle(t, e, o) {
    let l = e;
    var e = (0, RegisterComponent_1.isComponentInstance)(t, 214);
    var r = ModelManager_1.ModelManager.BulletModel;
    var i = r.SelfAdaptBeHitAnim.has(l);
    if (i || e) {
      o = ((o - 180 - t.ActorRotationProxy.Yaw + QUARTER_PI_DEGREE) % 360 + 360) % 360;
      t = Math.floor(o / 90);
      if (i) {
        l = (r.HeavyHitAnim.has(l) ? r.Index2HeavyHitAnimMap : r.Index2LightHitAnimMap)[t];
      } else if (e) {
        l = r.Index2HeavyHitAnimMap[t];
      }
    }
    return l;
  }
  static CheckBulletAttackerExist(t) {
    var e;
    return !!t.AttackerHandle?.Valid && (!!(e = t.AttackerCreatureDataComp?.GetCreatureDataId()) && e === ModelManager_1.ModelManager.BulletModel?.SceneBulletOwnerId || t.AttackerActorComp?.Owner !== undefined);
  }
  static FindLookAtRotDouble(t, e, o, l) {
    var r = BulletPool_1.BulletPool.CreateVector();
    r.FromUeVector(e);
    var e = BulletPool_1.BulletPool.CreateVector();
    e.FromUeVector(t);
    r.SubtractionEqual(e);
    if (o) {
      const i = UE.KismetMathLibrary.D_MakeRotFromZX(l, r.ToUeVector(true));
      BulletPool_1.BulletPool.RecycleVector(r);
      BulletPool_1.BulletPool.RecycleVector(e);
      return i;
    }
    r.Normalize();
    t = BulletPool_1.BulletPool.CreateVector();
    o = BulletPool_1.BulletPool.CreateVector();
    t.FromUeVector(l);
    Vector_1.Vector.CrossProduct(t, r, o);
    o.Normalize();
    Vector_1.Vector.CrossProduct(r, o, t);
    const i = UE.KismetMathLibrary.D_MakeRotFromZX(t.ToUeVector(), r.ToUeVector(true));
    BulletPool_1.BulletPool.RecycleVector(t);
    BulletPool_1.BulletPool.RecycleVector(o);
    BulletPool_1.BulletPool.RecycleVector(r);
    BulletPool_1.BulletPool.RecycleVector(e);
    return i;
  }
  static FindLookAtRotDoubleStandard(t, e, o) {
    var l;
    var r;
    if (o) {
      (o = BulletPool_1.BulletPool.CreateVector()).FromUeVector(e);
      (l = BulletPool_1.BulletPool.CreateVector()).FromUeVector(t);
      o.SubtractionEqual(l);
      r = UE.KismetMathLibrary.D_MakeRotFromZX(Vector_1.Vector.UpVectorDouble, o.ToUeVector(true));
      BulletPool_1.BulletPool.RecycleVector(o);
      BulletPool_1.BulletPool.RecycleVector(l);
      return r;
    } else {
      return UE.KismetMathLibrary.D_FindLookAtRotation(t.ToUeVector(true), e);
    }
  }
  static ClampBeginRotator(t) {
    var e;
    var o;
    var l = t.BulletDataMain.Move.BeginVelocityLimitMap;
    if (!(l.size <= 0)) {
      if (t.AttackerMoveComp?.IsStandardGravity ?? true) {
        BulletUtil.Gh1(t);
      } else {
        t.MoveInfo.BeginSpeedRotator.Vector(BulletUtil.Fh1);
        t.AttackerActorComp.ActorQuatProxy.UnRotateVector(BulletUtil.Fh1, BulletUtil.Fh1);
        BulletUtil.Fh1.Rotation(BulletUtil.Nh1);
        e = (l.get(1) ?? MathCommon_1.MathCommon.RightAngle) * -1;
        o = l.get(0) ?? MathCommon_1.MathCommon.RightAngle;
        BulletUtil.Nh1.Pitch = MathUtils_1.MathUtils.ClampAngle(BulletUtil.Nh1.Pitch, e, o);
        e = (l.get(2) ?? MathCommon_1.MathCommon.RightAngle) * -1;
        o = l.get(3) ?? MathCommon_1.MathCommon.RightAngle;
        BulletUtil.Nh1.Yaw = MathUtils_1.MathUtils.ClampAngle(BulletUtil.Nh1.Yaw, e, o);
        BulletUtil.Nh1.Vector(BulletUtil.Fh1);
        t.AttackerActorComp.ActorQuatProxy.RotateVector(BulletUtil.Fh1, BulletUtil.Fh1);
        BulletUtil.Fh1.Rotation(t.MoveInfo.BeginSpeedRotator);
      }
    }
  }
  static Gh1(r) {
    var i = r.BulletDataMain.Move.BeginVelocityLimitMap;
    if (!(i.size <= 0)) {
      var a = BulletPool_1.BulletPool.CreateRotator();
      a.FromUeRotator(r.AttackerActorComp.ActorRotationProxy);
      var n = BulletPool_1.BulletPool.CreateRotator();
      n.FromUeRotator(r.MoveInfo.BeginSpeedRotator);
      let t = i.get(0);
      if (t === undefined) {
        t = MathCommon_1.MathCommon.FlatAngle - 0.1;
      }
      let e = i.get(1);
      if (e === undefined) {
        e = MathCommon_1.MathCommon.FlatAngle - 0.1;
      }
      r.MoveInfo.BeginSpeedRotator.Pitch = MathUtils_1.MathUtils.ClampAngle(n.Pitch, a.Pitch - e, a.Pitch + t);
      let o = i.get(3);
      if (o === undefined) {
        o = MathCommon_1.MathCommon.FlatAngle - 0.1;
      }
      let l = i.get(2);
      if (l === undefined) {
        l = MathCommon_1.MathCommon.FlatAngle - 0.1;
      }
      r.MoveInfo.BeginSpeedRotator.Yaw = MathUtils_1.MathUtils.ClampAngle(n.Yaw, a.Yaw - l, a.Yaw + o);
      if (BulletConstant_1.BulletConstant.OpenMoveLog && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Bullet", 20, "ClampBeginRotatorStandard", ["BulletId", r.BulletRowName], ["Bullet", n], ["Attacker", a], ["Pitch.Limit", a.Pitch - e + ":" + (a.Pitch + t)], ["Yaw.Limit", a.Yaw - l + ":" + (a.Yaw + o)], ["Result", r.MoveInfo.BeginSpeedRotator]);
      }
      r.MoveInfo.BeginSpeedRotator.Roll = 0;
      BulletPool_1.BulletPool.RecycleRotator(a);
      BulletPool_1.BulletPool.RecycleRotator(n);
    }
  }
  static GetSkillContextId(e, o) {
    e = e?.GetComponent(42);
    if (e) {
      let t = e?.GetSkill(o)?.MNc;
      if (!t && e?.Entity?.Id) {
        var l = EntitySystem_1.EntitySystem.GetComponent(e?.Entity?.Id, 0).GetSummonerId();
        if (l > 0) {
          const e = ModelManager_1.ModelManager.CreatureModel.GetEntity(l)?.Entity;
          l = e?.GetComponent(42);
          t = l?.GetSkill(o)?.MNc;
        } else {
          l = PhantomUtil_1.PhantomUtil.GetSummonedEntity(e?.Entity, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantCustom)?.Entity?.GetComponent(42);
          t = l?.GetSkill(o)?.MNc;
        }
      }
      return t;
    }
  }
  static CreateBulletFromAN(t, e, o, l, r, i, a, n, _) {
    var u = t instanceof Entity_1.Entity ? t : t.GetEntityNoBlueprint();
    var s = this.GetSkillContextId(u, l);
    return ControllerHolder_1.ControllerHolder.BulletController.CreateBulletCustomTarget(t, e, o, {
      SkillId: l,
      SkillContextId: s,
      SyncType: r ? 1 : 0,
      InitTargetLocation: a,
      LocationOffset: n,
      BeginRotatorOffset: _,
      BattleContext: u?.GetComponent(42)?.GetSkill(l)?.BattleContext
    }, i, 1)?.Id ?? 0;
  }
  static AttachParentEffectSkeleton(t, e, o) {
    var l = t.BulletDataMain.Move;
    if (l.IsLockScale) {
      t.Actor.RootComponent.SetAbsolute(false, false, true);
    }
    t.ClearCacheLocationAndRotation();
    t.ActorComponent.ResetAllCachedTime();
    t.ActorComponent.NeedDetach = true;
    EffectSystem_1.EffectSystem.AttachToEffectSkeletalMesh(o, t.Actor, l.BoneName, 0);
    if (BulletConstant_1.BulletConstant.OpenMoveLog && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Bullet", 20, "BulletUtil.AttachParentEffectSkeleton", ["Bullet", t.BulletRowName], ["NeedDetach", t.ActorComponent.NeedDetach]);
    }
    t.Actor.D_K2_SetActorRelativeLocation(t.BornLocationOffset.ToUeVector(), false, undefined, false);
    t.Actor.K2_SetActorRelativeRotation(Rotator_1.Rotator.ZeroRotator, false, undefined, true);
    return true;
  }
  static AroundBulletAxisAndBeginVector(t, e, o, l, r, i = undefined) {
    var a;
    if (r) {
      a = BulletPool_1.BulletPool.CreateVector();
      if (e.X > 0) {
        a.Set(Math.cos(t.Z * MathCommon_1.MathCommon.DegToRad), 0, Math.sin(t.Z * MathCommon_1.MathCommon.DegToRad));
        r.ActorQuatProxy.RotateVector(a, o);
        l.FromUeVector(r.ActorRightProxy);
      } else if (e.Y > 0) {
        a.Set(Math.sin(t.Z * MathCommon_1.MathCommon.DegToRad), Math.cos(t.Z * MathCommon_1.MathCommon.DegToRad), 0);
        r.ActorQuatProxy.RotateVector(a, o);
        l.FromUeVector(r.ActorUpProxy);
      } else {
        a.Set(0, Math.sin(t.Z * MathCommon_1.MathCommon.DegToRad), Math.cos(t.Z * MathCommon_1.MathCommon.DegToRad));
        r.ActorQuatProxy.RotateVector(a, o);
        l.FromUeVector(r.ActorForwardProxy);
      }
      BulletPool_1.BulletPool.RecycleVector(a);
    } else if (i) {
      r = t.Z;
      if (e.X > 0) {
        Vector_1.Vector.Lerp(Vector_1.Vector.ForwardVectorProxy, i, MathUtils_1.MathUtils.Clamp(r, 0, 180), o);
        i.CrossProduct(Vector_1.Vector.ForwardVectorProxy, l);
      } else if (e.Y > 0) {
        a = BulletPool_1.BulletPool.CreateVector();
        i.CrossProduct(Vector_1.Vector.ForwardVectorProxy, a);
        Vector_1.Vector.Lerp(a, Vector_1.Vector.ForwardVectorProxy, MathUtils_1.MathUtils.Clamp(r, 0, 180), o);
        BulletPool_1.BulletPool.RecycleVector(a);
        l.FromUeVector(i);
      } else {
        a = BulletPool_1.BulletPool.CreateVector();
        i.CrossProduct(Vector_1.Vector.ForwardVectorProxy, a);
        Vector_1.Vector.Lerp(i, a, MathUtils_1.MathUtils.Clamp(r, 0, 180), o);
        BulletPool_1.BulletPool.RecycleVector(a);
        l.FromUeVector(Vector_1.Vector.ForwardVectorProxy);
      }
    } else if (e.X > 0) {
      o.Set(Math.cos(t.Z * MathCommon_1.MathCommon.DegToRad), 0, Math.sin(t.Z * MathCommon_1.MathCommon.DegToRad));
      l.FromUeVector(Vector_1.Vector.RightVectorProxy);
    } else if (e.Y > 0) {
      o.Set(Math.sin(t.Z * MathCommon_1.MathCommon.DegToRad), Math.cos(t.Z * MathCommon_1.MathCommon.DegToRad), 0);
      l.FromUeVector(Vector_1.Vector.UpVectorProxy);
    } else {
      o.Set(0, Math.sin(t.Z * MathCommon_1.MathCommon.DegToRad), Math.cos(t.Z * MathCommon_1.MathCommon.DegToRad));
      l.FromUeVector(Vector_1.Vector.ForwardVectorProxy);
    }
  }
  static TagStackCountCondition(t, e) {
    e = e.split("#").map(t => t.trim());
    if (e.length !== 2) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 20, "子弹数组Tag条件 格式错误! 参数需要2个!");
      }
      return false;
    }
    var o = Number(e[1]);
    if (isNaN(o)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 20, "子弹数组Tag条件 格式错误! 参数需要是数字!");
      }
      return false;
    }
    switch (e[0]) {
      case ">":
        return o < t;
      case ">=":
        return o <= t;
      case "<":
        return t < o;
      case "<=":
        return t <= o;
      case "==":
        return t === o;
      case "!=":
        return t !== o;
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Battle", 20, "子弹数组Tag条件 格式错误! 不支持的操作符!");
        }
        return false;
    }
  }
}
(exports.BulletUtil = BulletUtil).TmpRotator = Rotator_1.Rotator.Create();
BulletUtil.TmpRotator2 = Rotator_1.Rotator.Create();
BulletUtil.TmpQuat = Quat_1.Quat.Create();
BulletUtil.TmpQuat2 = Quat_1.Quat.Create();
BulletUtil.TmpVector = Vector_1.Vector.Create();
BulletUtil.Fh1 = Vector_1.Vector.Create();
BulletUtil.Nh1 = Rotator_1.Rotator.Create(); //# sourceMappingURL=BulletUtil.js.map