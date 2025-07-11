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
const SceneItemReferenceComponent_1 = require("../../../../../SceneItem/SceneItemReferenceComponent");
const SkillBehaviorMisc_1 = require("./SkillBehaviorMisc");
const tmpVector = Vector_1.Vector.Create();
const tmpQuat = Quat_1.Quat.Create();
const tmpRotator = Rotator_1.Rotator.Create();
class SkillBehaviorAction {
  static BeginGroup(t, a) {
    if (a.Entity.GetComponent(3).IsAutonomousProxy) {
      for (let e = 0; e < t.Num(); e++) {
        this.Begin(t.Get(e), a);
      }
    }
  }
  static Begin(e, t) {
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
  static LQ_(e, t, a) {
    SkillBehaviorBatchBulletTask_1.SkillBehaviorBatchBulletTask.Create(e, t, a).StartAsync();
  }
  static End(a) {
    SkillBehaviorMisc_1.paramMap.get(a)?.forEach(t => {
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
        CombatLog_1.CombatLog.ErrorWithStack("Skill", t.Entity, "SkillBehaviorAction.End异常", e, ["技能Id", a.SkillId], ["技能名", a.SkillName], ["技能行为", t.ActionType]);
      }
    });
    SkillBehaviorMisc_1.paramMap.delete(a);
  }
  static CalculateLocation(t, a) {
    var i = a.Entity.GetComponent(3);
    let r = i.ActorLocation;
    let e = i.ActorForward;
    let o = Vector_1.Vector.ZeroVectorDouble;
    switch (t.LocationType) {
      case 0:
        break;
      case 1:
        if (a.SkillComponent.SkillTarget) {
          [r, e] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(a.SkillComponent.SkillTarget.Entity.GetComponent(1).Owner);
          var l = a.SkillComponent.GetTargetTransform().GetLocation();
          var c = (0, SkillBehaviorMisc_1.traceWall)(i, Vector_1.Vector.Create(r), Vector_1.Vector.Create(l), t.DebugTrace);
          if (c && c[0]) {
            CombatLog_1.CombatLog.Info("Skill", a.Entity, "SkillBehaviorAction.SetLocation技能目标胶囊体中心和技能目标锁定点之间有阻挡，设置位置失败", ["技能Id", a.Skill.SkillId], ["技能名", a.Skill.SkillName]);
            break;
          }
          r = l;
        }
        break;
      case 2:
        c = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(32).GetCurrentTarget();
        if (c) {
          [r, e] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(c.Entity.GetComponent(1).Owner);
        }
        break;
      case 3:
        [r, e] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(Global_1.Global.BaseCharacter);
        break;
      case 4:
        l = ModelManager_1.ModelManager.CreatureModel.GetEntity(a.Entity.GetComponent(0).GetSummonerId())?.Entity?.GetComponent(1);
        [r, e] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(l.Owner);
        break;
      case 5:
        [r, e] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(ModelManager_1.ModelManager.CameraModel.FightCamera.GetComponent(4).CameraActor);
        break;
      case 6:
        c = ControllerHolder_1.ControllerHolder.BlackboardController.GetVectorValueByEntity(a.Entity.Id, t.BlackboardKey);
        r = WorldGlobal_1.WorldGlobal.ToUeVector(c);
        break;
      case 7:
        l = ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(a.Entity.Id, t.BlackboardKey);
        c = EntitySystem_1.EntitySystem.Get(l);
        if (c?.Valid) {
          [r, e] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(c.GetComponent(169).Owner);
        }
    }
    switch (t.LocationForwardType) {
      case 0:
        break;
      case 1:
        e = i.Actor.D_GetActorForwardVector();
        break;
      case 2:
        var s = i.ActorLocation.op_Subtraction(r);
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
      k = ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities();
      v = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(a.Entity);
      if ((k = k.indexOf(v)) + 1 > t.AngleOffsets.Num()) {
        CombatLog_1.CombatLog.Error("Skill", a.Entity, "SkillBehaviorAction.SetLocation当前施法者所处编队位置大于配置数组", ["技能Id", a.Skill.SkillId], ["技能名", a.Skill.SkillName], ["index", k]);
      } else {
        v = t.AngleOffsets.Get(k);
        e = e.RotateAngleAxis(v, Vector_1.Vector.UpVectorDouble);
      }
    }
    var _;
    var n = Vector_1.Vector.Create(r);
    var k = new UE.TransformDouble(e.Rotation(), r, Vector_1.Vector.OneVectorDouble);
    var v = UE.KismetMathLibrary.Conv_VectorToVectorDouble(t.LocationOffset);
    r = k.TransformPositionNoScale(v);
    if (t.Restrict) {
      let e = i.ActorLocation;
      switch (t.RestrictType) {
        case 0:
          e = Global_1.Global.BaseCharacter.D_K2_GetActorLocation();
          break;
        case 1:
          break;
        case 2:
          if (a.Entity.GetComponent(0).IsMonster()) {
            _ = i.GetInitLocation();
            e.Set(_.X, _.Y, _.Z);
          }
      }
      k = r.op_Subtraction(e).Size2D();
      if (k > t.RestrictDistance) {
        v = t.RestrictDistance / k;
        MathUtils_1.MathUtils.LerpVector(e, r, v, r);
      }
    }
    let S = Vector_1.Vector.Create(r);
    if (t.BestSpot) {
      if (t.Strategy === 3) {
        o = Global_1.Global.BaseCharacter.D_K2_GetActorLocation();
      }
      if (!n.Equals(S)) {
        switch (t.Strategy) {
          case 4:
          case 0:
            var h = (0, SkillBehaviorMisc_1.traceWall)(i, n, S, t.DebugTrace);
            if (!h) {
              CombatLog_1.CombatLog.Info("Skill", a.Entity, "SkillBehaviorAction.SetLocation撞墙停止射线起点和终点位置相同，设置位置失败", ["技能Id", a.Skill.SkillId], ["技能名", a.Skill.SkillName]);
              return o;
            }
            S = h[1];
            break;
          case 1:
          case 2:
          case 3:
            {
              let e = false;
              var m = Vector_1.Vector.Create();
              var u = Vector_1.Vector.Create();
              S.Subtraction(n, m);
              for (const f of SkillBehaviorMisc_1.angles) {
                m.RotateAngleAxis(f, Vector_1.Vector.UpVectorProxy, u);
                n.Addition(u, S);
                var M = (0, SkillBehaviorMisc_1.traceWall)(i, n, S, t.DebugTrace);
                if (!M) {
                  CombatLog_1.CombatLog.Info("Skill", a.Entity, "SkillBehaviorAction.SetLocation四向查询射线起点和终点位置相同，设置位置失败", ["技能Id", a.Skill.SkillId], ["技能名", a.Skill.SkillName]);
                  return o;
                }
                if (!M[0]) {
                  e = true;
                  S = M[1];
                  break;
                }
              }
              if (!e) {
                CombatLog_1.CombatLog.Info("Skill", a.Entity, "SkillBehaviorAction.SetLocation四个方向都撞墙了，设置位置失败", ["技能Id", a.Skill.SkillId], ["技能名", a.Skill.SkillName]);
                return o;
              }
              {
                let e = undefined;
                if (t.Strategy === 2) {
                  if (t.LocationType !== 0) {
                    e = Vector_1.Vector.Create(i.ActorLocation);
                  }
                } else if (t.Strategy === 3) {
                  e = Vector_1.Vector.Create(Global_1.Global.BaseCharacter.D_K2_GetActorLocation());
                }
                if (e) {
                  var h = Vector_1.Vector.Create(S);
                  var b = (0, SkillBehaviorMisc_1.traceWall)(i, e, h, t.DebugTrace);
                  if (!b) {
                    CombatLog_1.CombatLog.Info("Skill", a.Entity, "SkillBehaviorAction.SetLocation检测空气墙射线起点和终点位置相同，设置位置失败", ["技能Id", a.Skill.SkillId], ["技能名", a.Skill.SkillName]);
                    return o;
                  }
                  var d = b[0];
                  if (d) {
                    var B = d.GetHitCount();
                    for (let e = 0; e < B; e++) {
                      var C = d.Actors.Get(e);
                      if (ObjectUtils_1.ObjectUtils.IsValid(C)) {
                        if (C.Tags.FindIndex(SceneItemReferenceComponent_1.AIR_WALL) !== -1) {
                          CombatLog_1.CombatLog.Info("Skill", a.Entity, "SkillBehaviorAction.SetLocation检测到空气墙", ["技能Id", a.Skill.SkillId], ["技能名", a.Skill.SkillName]);
                          S = b[1];
                          break;
                        }
                      }
                    }
                  }
                }
              }
              break;
            }
        }
      }
      if (t.OnGround) {
        k = (0, SkillBehaviorMisc_1.traceGroundWithGravity)(i, S, t.DebugTrace);
        if (!k[0]) {
          CombatLog_1.CombatLog.Info("Skill", a.Entity, "SkillBehaviorAction.SetLocation贴地没有找到合法的落脚点，设置位置失败", ["技能Id", a.Skill.SkillId], ["技能名", a.Skill.SkillName]);
          return o;
        }
        (S = k[1]).Z += t.GroundOffset;
      }
    }
    r = S.ToUeVector();
    v = t.Navigation;
    if (v > 0) {
      var k = a.Entity.GetComponent(178);
      var p = Vector_1.Vector.Create();
      k.GravityUp.Multiply(v, p);
      if (!UE.NavigationSystemV1.D_K2_ProjectPointToNavigation(GlobalData_1.GlobalData.World, r, undefined, undefined, undefined, p.ToUeVector(), v)) {
        k = (0, puerts_1.$ref)(undefined);
        if (!UE.NavigationSystemV1.D_K2_GetRandomLocationInNavigableRadius(GlobalData_1.GlobalData.World, r, k, v)) {
          CombatLog_1.CombatLog.Info("Skill", a.Entity, "SkillBehaviorAction.SetLocation没有找到合法的导航网格落点，设置位置失败", ["技能Id", a.Skill.SkillId], ["技能名", a.Skill.SkillName]);
          return o;
        }
        r = (0, puerts_1.$unref)(k);
      }
    }
    return r;
  }
  static tZo(e, t) {
    var a;
    var e = SkillBehaviorAction.CalculateLocation(e, t);
    if (!e.Equals(Vector_1.Vector.ZeroVectorDouble, MathCommon_1.MathCommon.KindaSmallNumber)) {
      a = t.Entity.GetComponent(3);
      CombatLog_1.CombatLog.Info("Skill", t.Entity, "SkillBehaviorAction.SetLocation最终点", ["位置", e]);
      a.SetActorLocation(e, SkillBehaviorMisc_1.CONTEXT + ".Final", false);
    }
  }
  static CalculateRotation(e, t) {
    let a = undefined;
    let i = undefined;
    switch (e.RotationType) {
      case 0:
        i = t.SkillComponent.SkillTarget;
        break;
      case 1:
        i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
        break;
      case 2:
        var r = t.Entity.GetComponent(0);
        i = ModelManager_1.ModelManager.CreatureModel.GetEntity(r.GetSummonerId());
        break;
      case 3:
        (a = tmpVector).FromUeVector(ModelManager_1.ModelManager.CameraModel.FightCamera.GetComponent(4).CameraActor.D_K2_GetActorLocation());
        break;
      case 4:
        if (t.SkillComponent.SkillTarget === ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity) {
          (a = tmpVector).FromUeVector(ModelManager_1.ModelManager.CameraModel.FightCamera.GetComponent(4).CameraActor.D_K2_GetActorLocation());
        } else {
          i = t.SkillComponent.SkillTarget;
        }
        break;
      default:
        i = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(t.Entity);
    }
    if (i && i.Entity !== t.Entity) {
      a = i.Entity.GetComponent(1).ActorLocationProxy;
    }
    var o = t.Entity.GetComponent(3);
    if (a) {
      a.Subtraction(o.ActorLocationProxy, tmpVector);
      MathUtils_1.MathUtils.LookRotationUpFirst(tmpVector, o.MoveComp.GravityUp, tmpQuat);
    } else {
      tmpQuat.DeepCopy(o.ActorQuatProxy);
    }
    if (e.DirectionOffset !== 0) {
      tmpRotator.Set(0, e.DirectionOffset, 0);
      tmpQuat.Multiply(tmpRotator.Quaternion(), tmpQuat);
    }
    tmpQuat.Rotator(tmpRotator);
    return tmpRotator.ToUeRotator();
  }
  static bd(e, t) {
    var a = t.Entity.GetComponent(3);
    var e = SkillBehaviorAction.CalculateRotation(e, t);
    a.SetActorRotation(e, "SkillBehaviorAction.SetDirection");
  }
  static iZo(t, a) {
    var i = a.Entity.GetComponent(21);
    for (let e = 0; e < t.Cues.Num(); e++) {
      var r = t.Cues.Get(e);
      var o = i.AddCue(Number(r.CueId), {
        Sync: true
      });
      if (r.Stop) {
        (0, SkillBehaviorMisc_1.getEndSkillBehaviorParamList)(a.Skill).push({
          Entity: a.Entity,
          ActionType: t.ActionType,
          GameplayCue: o
        });
      }
    }
  }
  static oZo(t, a) {
    for (let e = 0; e < t.Bullets.Num(); e++) {
      var i;
      var r = t.Bullets.Get(e);
      for (let e = 0; e < r.bulletCount; e++) {
        let e = -1;
        if (a.Skill.SkillBehaviorAnimNotifyMessageId) {
          if ((i = a.Entity.GetComponent(3).Actor) instanceof TsBaseCharacter_1.default) {
            e = BulletUtil_1.BulletUtil.CreateBulletFromAN(i, r.bulletRowName, a.Entity.GetComponent(3).ActorTransform, a.Skill.SkillId, true, a.Skill.SkillBehaviorAnimNotifyMessageId);
          }
        } else {
          e = ControllerHolder_1.ControllerHolder.BulletController.CreateBulletCustomTarget(a.Entity, r.bulletRowName, a.Entity.GetComponent(3).ActorTransform, {
            SkillId: a.Skill.SkillId,
            SkillContextId: a.Skill.MNc,
            SyncType: 1,
            BattleFlags: a.Skill.BattleFlags
          }, a.Skill.MNc).Id;
        }
        if (r.BlackboardKey) {
          ControllerHolder_1.ControllerHolder.BlackboardController.SetIntValueByEntity(a.Entity.Id, r.BlackboardKey, e);
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
    var a = t.Entity.GetComponent(3).Actor.CapsuleComponent;
    if (e.CollisionRestore) {
      (0, SkillBehaviorMisc_1.getEndSkillBehaviorParamList)(t.Skill).push({
        Entity: t.Entity,
        ActionType: e.ActionType,
        CollisionChannel: e.CollisionChannel,
        CollisionResponse: a.GetCollisionResponseToChannel(e.CollisionChannel)
      });
    }
    a.SetCollisionResponseToChannel(e.CollisionChannel, e.CollisionResponse);
  }
  static hZo(e, t) {
    var a = PhantomUtil_1.PhantomUtil.GetSummonedEntity(t.Entity, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantCustom, e.FollowIndex);
    if (a) {
      a = a.Entity.GetComponent(40);
      if (e.StopSummonSkill) {
        (0, SkillBehaviorMisc_1.getEndSkillBehaviorParamList)(t.Skill).push({
          Entity: t.Entity,
          ActionType: e.ActionType,
          SummonSkillComponent: a,
          SummonSkillId: e.SummonSkillId
        });
      }
      a.BeginSkill(e.SummonSkillId, {
        Target: t.SkillComponent.SkillTarget?.Entity,
        Reason: "SkillBehaviorAction.UseSummonSkill"
      });
    }
  }
  static bst(e, t) {
    let a = undefined;
    switch (e.BuffTarget) {
      case 0:
        a = t.Entity.GetComponent(174);
        break;
      case 1:
        a = t.SkillComponent.SkillTarget?.Entity?.GetComponent(174);
    }
    var i;
    if (a) {
      if (e.Add) {
        i = t.Skill.SkillBehaviorAnimNotifyMessageId || t.Skill.MNc;
        i = {
          InstigatorId: ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(t.Entity.Id),
          Reason: "从技能行为添加Buff",
          PreMessageId: i
        };
        a.AddBuff(Number(e.BuffId), i);
      } else {
        a.RemoveBuff(Number(e.BuffId), -1, "从技能行为移除Buff");
      }
    }
  }
  static lZo(e, t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t.Entity.Id, 205);
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
    var a = EntitySystem_1.EntitySystem.GetComponent(t.Entity.Id, 40);
    if (a?.Valid) {
      a.PlaySkillMontageWithEndAbility(t.Skill, e.MontageIndex, e.StartSection, e.StartTime);
    }
  }
  static K4_(e, t) {
    var a = EntitySystem_1.EntitySystem.GetComponent(t.Entity.Id, 278);
    if (a?.Valid) {
      var i = e.UpdateCustomValue.ValueName;
      var r = i.Num();
      for (let e = 0; e < r; e++) {
        var o = i.Get(e);
        a.UpdateCustomValue(o);
      }
    }
  }
}
exports.SkillBehaviorAction = SkillBehaviorAction;
//# sourceMappingURL=SkillBehaviorAction.js.map