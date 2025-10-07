"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillBehaviorAction = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Stats_1 = require("../../../../../../../Core/Common/Stats");
const Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../../../../Core/Entity/EntitySystem");
const FNameUtil_1 = require("../../../../../../../Core/Utils/FNameUtil");
const MathCommon_1 = require("../../../../../../../Core/Utils/Math/MathCommon");
const Quat_1 = require("../../../../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../../../../../Core/Utils/ObjectUtils");
const CameraUtility_1 = require("../../../../../../Camera/CameraUtility");
const TsBaseCharacter_1 = require("../../../../../../Character/TsBaseCharacter");
const Global_1 = require("../../../../../../Global");
const GlobalData_1 = require("../../../../../../GlobalData");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil");
const CombatLog_1 = require("../../../../../../Utils/CombatLog");
const WorldGlobal_1 = require("../../../../../../World/WorldGlobal");
const SkillBehaviorBatchBulletTask_1 = require("../../../../../Bullet/BulletStaticMethod/SkillBehaviorBatchBulletTask");
const BulletUtil_1 = require("../../../../../Bullet/BulletUtil");
const RefCompAirWallController_1 = require("../../../../../SceneItem/RefCompController/RefCompAirWallController");
const SkillUtils_1 = require("../SkillUtils");
const SkillBehaviorMisc_1 = require("./SkillBehaviorMisc");
const tmpVector = Vector_1.Vector.Create();
const tmpQuat = Quat_1.Quat.Create();
const tmpRotator = Rotator_1.Rotator.Create();
class SkillBehaviorAction {
  static BeginGroup(t, i) {
    if (i.Entity.GetComponent(3).IsAutonomousProxy) {
      for (let e = 0; e < t.Num(); e++) {
        this.Begin(t.Get(e), i);
      }
    }
  }
  static Begin(e, t) {
    SkillUtils_1.SkillUtils.Log(1, 1, t.Entity, "SkillBehaviorAction.Begin", ["技能Id", t.Skill.SkillId], ["技能名", t.Skill.SkillName], ["技能行为", e.ActionType]);
    try {
      switch (e.ActionType) {
        case 0:
          this.tZo(e, t);
          break;
        case 1:
          this.bd(e, t);
          break;
        case 2:
          this.iZo(e, t);
          break;
        case 3:
          this.oZo(e, t);
          break;
        case 4:
          this.rZo(e, t);
          break;
        case 5:
          this.nZo(e, t);
          break;
        case 6:
          this.sZo(e, t);
          break;
        case 7:
          this.aZo(e, t);
          break;
        case 8:
          this.hZo(e, t);
          break;
        case 9:
          this.bst(e, t);
          break;
        case 10:
          this.lZo(e, t);
          break;
        case 11:
          this._Zo(e, t);
          break;
        case 12:
          this.Kpl(e, t);
          break;
        case 13:
          this.K4_(e, t);
          break;
        case 14:
          this.LQ_(t.Entity, e.CommonConf, t.Skill.SkillId);
      }
    } catch (e) {
      CombatLog_1.CombatLog.ErrorWithStack("Skill", t.Entity, "SkillBehaviorAction.Begin异常", e, ["技能Id", t.Skill.SkillId], ["技能名", t.Skill.SkillName]);
    }
  }
  static LQ_(e, t, i) {
    SkillBehaviorBatchBulletTask_1.SkillBehaviorBatchBulletTask.Create(e, t, i).StartAsync();
  }
  static End(i) {
    SkillBehaviorMisc_1.paramMap.get(i)?.forEach(t => {
      SkillUtils_1.SkillUtils.Log(1, 1, t.Entity, "SkillBehaviorAction.End", ["技能Id", i.SkillId], ["技能名", i.SkillName], ["技能行为", t.ActionType]);
      try {
        switch (t.ActionType) {
          case 2:
            t.Entity.GetComponent(21).RemoveCueByHandle(t.GameplayCue);
            break;
          case 6:
            t.Entity.GetComponent(3).Actor.KuroSetMovementMode({
              Mode: t.MovementMode,
              Context: "[SkillBehaviorAction.End]"
            });
            break;
          case 7:
            t.Entity.GetComponent(3).Actor.CapsuleComponent.SetCollisionResponseToChannel(t.CollisionChannel, t.CollisionResponse);
            break;
          case 8:
            t.SummonSkillComponent.EndSkill(t.SummonSkillId, "SkillBehaviorAction.End");
        }
      } catch (e) {
        CombatLog_1.CombatLog.ErrorWithStack("Skill", t.Entity, "SkillBehaviorAction.End异常", e, ["技能Id", i.SkillId], ["技能名", i.SkillName], ["技能行为", t.ActionType]);
      }
    });
    SkillBehaviorMisc_1.paramMap.delete(i);
  }
  static CalculateLocation(t, i) {
    var a = i.Entity.GetComponent(3);
    let r = a.ActorLocation;
    let e = a.ActorForward;
    let l = Vector_1.Vector.ZeroVectorDouble;
    switch (t.LocationType) {
      case 0:
        if (!FNameUtil_1.FNameUtil.IsNothing(t.BoneName)) {
          const n = a.GetSocketTransform(t.BoneName);
          r = n.GetLocation();
          e = n.GetRotation().GetForwardVectorDouble();
        }
        break;
      case 1:
        if (i.SkillComponent.SkillTarget) {
          if (!SkillUtils_1.SkillUtils.IsTsActor(i.SkillComponent.SkillTarget)) {
            return l;
          }
          [r, e] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(i.SkillComponent.SkillTarget.Entity.GetComponent(1).Owner);
          var o = i.SkillComponent.GetTargetTransform().GetLocation();
          var c = (0, SkillBehaviorMisc_1.traceWall)(a, Vector_1.Vector.Create(r), Vector_1.Vector.Create(o), t.DebugTrace);
          if (c && c[0]) {
            SkillUtils_1.SkillUtils.Log(0, 1, i.Entity, "SkillBehaviorAction.SetLocation技能目标胶囊体中心和技能目标锁定点之间有阻挡，设置位置失败", ["技能Id", i.Skill.SkillId], ["技能名", i.Skill.SkillName]);
            break;
          }
          r = o;
        }
        break;
      case 2:
        c = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(32).GetCurrentTarget();
        if (c) {
          if (!SkillUtils_1.SkillUtils.IsTsActor(c)) {
            return l;
          }
          [r, e] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(c.Entity.GetComponent(1).Owner);
        }
        break;
      case 3:
        [r, e] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(Global_1.Global.BaseCharacter);
        break;
      case 4:
        o = ModelManager_1.ModelManager.CreatureModel.GetEntity(i.Entity.GetComponent(0).GetSummonerId())?.Entity?.GetComponent(1);
        [r, e] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(o.Owner);
        break;
      case 5:
        [r, e] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(ModelManager_1.ModelManager.CameraModel.FightCamera.GetComponent(4).CameraActor);
        break;
      case 6:
        c = ControllerHolder_1.ControllerHolder.BlackboardController.GetVectorValueByEntity(i.Entity.Id, t.BlackboardKey);
        r = WorldGlobal_1.WorldGlobal.ToUeVector(c);
        break;
      case 7:
        o = ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(i.Entity.Id, t.BlackboardKey);
        c = EntitySystem_1.EntitySystem.Get(o);
        if (c?.Valid) {
          [r, e] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(c.GetComponent(170).Owner);
        }
        break;
      case 8:
        o = PhantomUtil_1.PhantomUtil.GetSummonedEntity(i.Entity, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantCustom, t.FollowIndex);
        if (o?.Valid) {
          c = o.Entity?.GetComponent(1);
          if (c) {
            if (FNameUtil_1.FNameUtil.IsNothing(t.BoneName)) {
              [r, e] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(c.Owner);
            } else {
              const n = c.GetSocketTransform(t.BoneName);
              r = n.GetLocation();
              e = n.GetRotation().GetForwardVectorDouble();
            }
          }
        }
    }
    switch (t.LocationForwardType) {
      case 0:
        break;
      case 1:
        e = a.Actor.D_GetActorForwardVector();
        break;
      case 2:
        var s = a.ActorLocation.op_Subtraction(r);
        e.Set(s.X, s.Y, 0);
        break;
      case 3:
        s = r.op_Subtraction(Global_1.Global.CharacterCameraManager.D_GetCameraLocation());
        e.Set(s.X, s.Y, 0);
        break;
      case 4:
        (e = Global_1.Global.BaseCharacter.D_K2_GetActorLocation().op_Subtraction(r)).Set(e.X, e.Y, 0);
    }
    if (t.BestSpot && t.Strategy === 4) {
      S = ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities();
      v = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(i.Entity);
      if ((S = S.indexOf(v)) + 1 > t.AngleOffsets.Num()) {
        SkillUtils_1.SkillUtils.Log(3, 1, i.Entity, "SkillBehaviorAction.SetLocation当前施法者所处编队位置大于配置数组", ["技能Id", i.Skill.SkillId], ["技能名", i.Skill.SkillName], ["index", S]);
      } else {
        v = t.AngleOffsets.Get(S);
        e = e.RotateAngleAxis(v, Vector_1.Vector.UpVectorDouble);
      }
    }
    var _ = Vector_1.Vector.Create(r);
    const n = new UE.TransformDouble(e.Rotation(), r, Vector_1.Vector.OneVectorDouble);
    var k;
    var S = UE.KismetMathLibrary.Conv_VectorToVectorDouble(t.LocationOffset);
    r = n.TransformPositionNoScale(S);
    if (t.Restrict) {
      let e = a.ActorLocation;
      switch (t.RestrictType) {
        case 0:
          e = Global_1.Global.BaseCharacter.D_K2_GetActorLocation();
          break;
        case 1:
          break;
        case 2:
          if (i.Entity.GetComponent(0).IsMonster()) {
            k = a.GetInitLocation();
            e.Set(k.X, k.Y, k.Z);
          }
      }
      var v = r.op_Subtraction(e).Size2D();
      if (v > t.RestrictDistance) {
        S = t.RestrictDistance / v;
        MathUtils_1.MathUtils.LerpVector(e, r, S, r);
      }
    }
    let h = Vector_1.Vector.Create(r);
    if (t.BestSpot) {
      if (t.Strategy === 3) {
        l = Global_1.Global.BaseCharacter.D_K2_GetActorLocation();
      }
      if (!_.Equals(h)) {
        switch (t.Strategy) {
          case 4:
          case 0:
            var u = (0, SkillBehaviorMisc_1.traceWall)(a, _, h, t.DebugTrace);
            if (!u) {
              SkillUtils_1.SkillUtils.Log(0, 1, i.Entity, "SkillBehaviorAction.SetLocation撞墙停止射线起点和终点位置相同，设置位置失败", ["技能Id", i.Skill.SkillId], ["技能名", i.Skill.SkillName]);
              return l;
            }
            h = u[1];
            break;
          case 1:
          case 2:
          case 3:
            {
              let e = false;
              var M = Vector_1.Vector.Create();
              var B = Vector_1.Vector.Create();
              h.Subtraction(_, M);
              for (const p of SkillBehaviorMisc_1.angles) {
                M.RotateAngleAxis(p, Vector_1.Vector.UpVectorProxy, B);
                _.Addition(B, h);
                var d = (0, SkillBehaviorMisc_1.traceWall)(a, _, h, t.DebugTrace);
                if (!d) {
                  SkillUtils_1.SkillUtils.Log(0, 1, i.Entity, "SkillBehaviorAction.SetLocation四向查询射线起点和终点位置相同，设置位置失败", ["技能Id", i.Skill.SkillId], ["技能名", i.Skill.SkillName]);
                  return l;
                }
                if (!d[0]) {
                  e = true;
                  h = d[1];
                  break;
                }
              }
              if (e) {
                break;
              }
              SkillUtils_1.SkillUtils.Log(0, 1, i.Entity, "SkillBehaviorAction.SetLocation四个方向都撞墙了，设置位置失败", ["技能Id", i.Skill.SkillId], ["技能名", i.Skill.SkillName]);
              return l;
            }
        }
      }
      {
        let e = undefined;
        if (t.Strategy === 2) {
          if (t.LocationType !== 0) {
            e = Vector_1.Vector.Create(a.ActorLocation);
          }
        } else if (t.Strategy === 3) {
          e = Vector_1.Vector.Create(Global_1.Global.BaseCharacter.D_K2_GetActorLocation());
        }
        if (e) {
          var v = Vector_1.Vector.Create(h);
          var m = (0, SkillBehaviorMisc_1.traceWall)(a, e, v, t.DebugTrace);
          if (!m) {
            SkillUtils_1.SkillUtils.Log(0, 1, i.Entity, "SkillBehaviorAction.SetLocation检测空气墙射线起点和终点位置相同，设置位置失败", ["技能Id", i.Skill.SkillId], ["技能名", i.Skill.SkillName]);
            return l;
          }
          var b = m[0];
          if (b) {
            var C = b.GetHitCount();
            for (let e = 0; e < C; e++) {
              var U = b.Actors.Get(e);
              if (ObjectUtils_1.ObjectUtils.IsValid(U)) {
                if (U.Tags.FindIndex(RefCompAirWallController_1.AIR_WALL) !== -1) {
                  SkillUtils_1.SkillUtils.Log(0, 1, i.Entity, "SkillBehaviorAction.SetLocation检测到空气墙", ["技能Id", i.Skill.SkillId], ["技能名", i.Skill.SkillName]);
                  h = m[1];
                  break;
                }
              }
            }
          }
        }
      }
      if (t.OnGround) {
        S = (0, SkillBehaviorMisc_1.traceGroundWithGravity)(a, h, t.DebugTrace);
        if (!S[0]) {
          SkillUtils_1.SkillUtils.Log(0, 1, i.Entity, "SkillBehaviorAction.SetLocation贴地没有找到合法的落脚点，设置位置失败", ["技能Id", i.Skill.SkillId], ["技能名", i.Skill.SkillName]);
          return l;
        }
        (h = S[1]).Z += t.GroundOffset;
      }
    }
    r = h.ToUeVector();
    v = t.Navigation;
    if (v > 0) {
      var S = i.Entity.GetComponent(179);
      var f = Vector_1.Vector.Create();
      S.GravityUp.Multiply(v, f);
      if (!UE.NavigationSystemV1.D_K2_ProjectPointToNavigation(GlobalData_1.GlobalData.World, r, undefined, undefined, undefined, f.ToUeVector(), v)) {
        S = (0, puerts_1.$ref)(undefined);
        if (!UE.NavigationSystemV1.D_K2_GetRandomLocationInNavigableRadius(GlobalData_1.GlobalData.World, r, S, v)) {
          SkillUtils_1.SkillUtils.Log(0, 1, i.Entity, "SkillBehaviorAction.SetLocation没有找到合法的导航网格落点，设置位置失败", ["技能Id", i.Skill.SkillId], ["技能名", i.Skill.SkillName]);
          return l;
        }
        r = (0, puerts_1.$unref)(S);
      }
    }
    return r;
  }
  static tZo(e, t) {
    var i;
    var e = SkillBehaviorAction.CalculateLocation(e, t);
    if (!e.Equals(Vector_1.Vector.ZeroVectorDouble, MathCommon_1.MathCommon.KindaSmallNumber)) {
      i = t.Entity.GetComponent(3);
      SkillUtils_1.SkillUtils.Log(0, 1, t.Entity, "SkillBehaviorAction.SetLocation最终点", ["位置", e.ToString()]);
      i.SetActorLocation(e, SkillBehaviorMisc_1.CONTEXT + ".Final", false);
    }
  }
  static CalculateRotation(e, t) {
    let i = undefined;
    let a = undefined;
    switch (e.RotationType) {
      case 0:
        a = t.SkillComponent.SkillTarget;
        break;
      case 1:
        a = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
        break;
      case 2:
        var r = t.Entity.GetComponent(0);
        a = ModelManager_1.ModelManager.CreatureModel.GetEntity(r.GetSummonerId());
        break;
      case 3:
        (i = tmpVector).FromUeVector(ModelManager_1.ModelManager.CameraModel.FightCamera.GetComponent(4).CameraActor.D_K2_GetActorLocation());
        break;
      case 4:
        if (t.SkillComponent.SkillTarget === ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity) {
          (i = tmpVector).FromUeVector(ModelManager_1.ModelManager.CameraModel.FightCamera.GetComponent(4).CameraActor.D_K2_GetActorLocation());
        } else {
          a = t.SkillComponent.SkillTarget;
        }
        break;
      case 5:
        break;
      default:
        a = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(t.Entity);
    }
    if (a && a.Entity !== t.Entity) {
      i = a.Entity.GetComponent(1).ActorLocationProxy;
    }
    var l = t.Entity.GetComponent(3);
    if (i) {
      i.Subtraction(l.ActorLocationProxy, tmpVector);
      MathUtils_1.MathUtils.LookRotationUpFirst(tmpVector, l.MoveComp.GravityUp, tmpQuat);
    } else {
      tmpQuat.DeepCopy(l.ActorQuatProxy);
    }
    if (e.DirectionOffset !== 0) {
      tmpRotator.Set(0, e.DirectionOffset, 0);
      tmpQuat.Multiply(tmpRotator.Quaternion(), tmpQuat);
    }
    tmpQuat.Rotator(tmpRotator);
    return tmpRotator.ToUeRotator();
  }
  static bd(e, t) {
    var i = t.Entity.GetComponent(3);
    var e = SkillBehaviorAction.CalculateRotation(e, t);
    SkillUtils_1.SkillUtils.Log(0, 1, t.Entity, "SkillBehaviorAction.SetRotation", ["朝向", e]);
    i.SetActorRotation(e, "SkillBehaviorAction.SetDirection");
  }
  static iZo(t, i) {
    var a = i.Entity.GetComponent(21);
    for (let e = 0; e < t.Cues.Num(); e++) {
      var r = t.Cues.Get(e);
      var l = a.AddCue(Number(r.CueId), {
        Sync: true
      });
      if (r.Stop) {
        (0, SkillBehaviorMisc_1.getEndSkillBehaviorParamList)(i.Skill).push({
          Entity: i.Entity,
          ActionType: t.ActionType,
          GameplayCue: l
        });
      }
    }
  }
  static oZo(t, i) {
    for (let e = 0; e < t.Bullets.Num(); e++) {
      var a;
      var r = t.Bullets.Get(e);
      for (let e = 0; e < r.bulletCount; e++) {
        let e = -1;
        if (i.Skill.SkillBehaviorAnimNotifyMessageId) {
          if ((a = i.Entity.GetComponent(3).Actor) instanceof TsBaseCharacter_1.default) {
            e = BulletUtil_1.BulletUtil.CreateBulletFromAN(a, r.bulletRowName, i.Entity.GetComponent(3).ActorTransform, i.Skill.SkillId, true, i.Skill.SkillBehaviorAnimNotifyMessageId);
          }
        } else {
          e = ControllerHolder_1.ControllerHolder.BulletController.CreateBulletCustomTarget(i.Entity, r.bulletRowName, i.Entity.GetComponent(3).ActorTransform, {
            SkillId: i.Skill.SkillId,
            SkillContextId: i.Skill.MNc,
            SyncType: 1,
            BattleFlags: i.Skill.BattleFlags
          }, i.Skill.MNc).Id;
        }
        if (r.BlackboardKey) {
          ControllerHolder_1.ControllerHolder.BlackboardController.SetIntValueByEntity(i.Entity.Id, r.BlackboardKey, e);
        }
      }
    }
  }
  static rZo(e, t) {
    t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t.Entity.Id);
    if (CameraUtility_1.CameraUtility.CheckApplyCameraModifyCondition(t, e.CameraModifierSettings, e.CameraEffectiveClientType, e.CameraModifierConditions)) {
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ApplyCameraModify(e.Tag, e.Duration, e.BlendInTime, e.BlendOutTime, e.CameraModifierSettings, undefined, e.BreakBlendOutTime, e.BlendInCurve, e.BlendOutCurve, undefined, e.CameraAttachSocket.toString());
    }
  }
  static nZo(e, t) {
    ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera.PlayerComponent.PlayCameraSequence(e.CameraSequenceSettings, e.ResetLockOnCamera, e.AdditiveRotation, t.Entity.GetComponent(3).Actor, e.CameraAttachSocket, e.CameraDetectSocket, e.ExtraSphereLocation, e.ExtraDetectSphereRadius, e.IsShowExtraSphere);
  }
  static sZo(e, t) {
    t.Entity.GetComponent(3).Actor.KuroSetMovementMode({
      Mode: e.BeginMovementMode,
      Context: "[SkillBehaviorAction.SetMovementMode]"
    });
    (0, SkillBehaviorMisc_1.getEndSkillBehaviorParamList)(t.Skill).push({
      Entity: t.Entity,
      ActionType: e.ActionType,
      MovementMode: e.EndMovementMode
    });
  }
  static aZo(e, t) {
    var i = t.Entity.GetComponent(3).Actor.CapsuleComponent;
    if (e.CollisionRestore) {
      (0, SkillBehaviorMisc_1.getEndSkillBehaviorParamList)(t.Skill).push({
        Entity: t.Entity,
        ActionType: e.ActionType,
        CollisionChannel: e.CollisionChannel,
        CollisionResponse: i.GetCollisionResponseToChannel(e.CollisionChannel)
      });
    }
    i.SetCollisionResponseToChannel(e.CollisionChannel, e.CollisionResponse);
  }
  static hZo(e, t) {
    var i = PhantomUtil_1.PhantomUtil.GetSummonedEntity(t.Entity, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantCustom, e.FollowIndex);
    if (i) {
      i = i.Entity.GetComponent(40);
      if (e.StopSummonSkill) {
        (0, SkillBehaviorMisc_1.getEndSkillBehaviorParamList)(t.Skill).push({
          Entity: t.Entity,
          ActionType: e.ActionType,
          SummonSkillComponent: i,
          SummonSkillId: e.SummonSkillId
        });
      }
      i.BeginSkill(e.SummonSkillId, {
        Target: t.SkillComponent.SkillTarget?.Entity,
        Reason: "SkillBehaviorAction.UseSummonSkill"
      });
    }
  }
  static bst(e, t) {
    let i = undefined;
    switch (e.BuffTarget) {
      case 0:
        i = t.Entity.GetComponent(175);
        break;
      case 1:
        i = t.SkillComponent.SkillTarget?.Entity?.GetComponent(175);
    }
    var a;
    if (i) {
      if (e.Add) {
        a = t.Skill.SkillBehaviorAnimNotifyMessageId || t.Skill.MNc;
        a = {
          InstigatorId: ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(t.Entity.Id),
          Reason: "从技能行为添加Buff",
          PreMessageId: a
        };
        i.AddBuff(Number(e.BuffId), a);
      } else {
        i.RemoveBuff(Number(e.BuffId), -1, "从技能行为移除Buff");
      }
    }
  }
  static lZo(e, t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t.Entity.Id, 206);
    if (t?.Valid && e.Tag.TagName !== "None") {
      if (e.Add) {
        t.AddTag(e.Tag.TagId);
      } else {
        t.RemoveTag(e.Tag.TagId);
      }
    }
  }
  static _Zo(e, t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t.Entity.Id, 19);
    if (t?.Valid) {
      t.TryExitWeakTime();
    }
  }
  static Kpl(e, t) {
    var i = EntitySystem_1.EntitySystem.GetComponent(t.Entity.Id, 40);
    if (i?.Valid) {
      i.PlaySkillMontageWithEndAbility(t.Skill, e.MontageIndex, e.StartSection, e.StartTime);
    }
  }
  static K4_(e, t) {
    var i = EntitySystem_1.EntitySystem.GetComponent(t.Entity.Id, 282);
    if (i?.Valid) {
      var a = e.UpdateCustomValue.ValueName;
      var r = a.Num();
      for (let e = 0; e < r; e++) {
        var l = a.Get(e);
        i.UpdateCustomValue(l);
      }
    }
  }
}
exports.SkillBehaviorAction = SkillBehaviorAction;
//# sourceMappingURL=SkillBehaviorAction.js.map