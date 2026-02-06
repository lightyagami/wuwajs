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
  static BeginGroup(e, t) {
    if (t.Entity.GetComponent(3).IsAutonomousProxy) {
      for (let i = 0; i < e.Num(); i++) {
        this.Begin(e.Get(i), t);
      }
    }
  }
  static Begin(i, e) {
    SkillUtils_1.SkillUtils.Log(1, 1, e.Entity, "SkillBehaviorAction.Begin", ["技能Id", e.Skill.SkillId], ["技能名", e.Skill.SkillName], ["技能行为", i.ActionType]);
    try {
      switch (i.ActionType) {
        case 0:
          this.tZo(i, e);
          break;
        case 1:
          this.bd(i, e);
          break;
        case 2:
          this.iZo(i, e);
          break;
        case 3:
          this.oZo(i, e);
          break;
        case 4:
          this.rZo(i, e);
          break;
        case 5:
          this.nZo(i, e);
          break;
        case 6:
          this.sZo(i, e);
          break;
        case 7:
          this.aZo(i, e);
          break;
        case 8:
          this.hZo(i, e);
          break;
        case 9:
          this.bst(i, e);
          break;
        case 10:
          this.lZo(i, e);
          break;
        case 11:
          this._Zo(i, e);
          break;
        case 12:
          this.Kpl(i, e);
          break;
        case 13:
          this.K4_(i, e);
          break;
        case 14:
          this.LQ_(e.Entity, i.CommonConf, e.Skill.SkillId);
      }
    } catch (i) {
      CombatLog_1.CombatLog.ErrorWithStack("Skill", e.Entity, "SkillBehaviorAction.Begin异常", i, ["技能Id", e.Skill.SkillId], ["技能名", e.Skill.SkillName]);
    }
  }
  static End(t) {
    SkillBehaviorMisc_1.paramMap.get(t)?.forEach(e => {
      SkillUtils_1.SkillUtils.Log(1, 1, e.Entity, "SkillBehaviorAction.End", ["技能Id", t.SkillId], ["技能名", t.SkillName], ["技能行为", e.ActionType]);
      try {
        switch (e.ActionType) {
          case 2:
            e.Entity.GetComponent(21).RemoveCueByHandle(e.GameplayCue);
            break;
          case 6:
            e.Entity.GetComponent(3).Actor.KuroSetMovementMode({
              Mode: e.MovementMode,
              Context: "[SkillBehaviorAction.End]"
            });
            break;
          case 7:
            e.Entity.GetComponent(3).Actor.CapsuleComponent.SetCollisionResponseToChannel(e.CollisionChannel, e.CollisionResponse);
            break;
          case 8:
            e.SummonSkillComponent.EndSkill(e.SummonSkillId, "SkillBehaviorAction.End");
        }
      } catch (i) {
        CombatLog_1.CombatLog.ErrorWithStack("Skill", e.Entity, "SkillBehaviorAction.End异常", i, ["技能Id", t.SkillId], ["技能名", t.SkillName], ["技能行为", e.ActionType]);
      }
    });
    SkillBehaviorMisc_1.paramMap.delete(t);
  }
  static CalculateLocation(e, t) {
    SkillBehaviorAction.x4g.Start();
    var a = t.Entity.GetComponent(3);
    let l = a.ActorLocation;
    let i = a.ActorForward;
    let o = Vector_1.Vector.ZeroVectorDouble;
    switch (e.LocationType) {
      case 0:
        if (!FNameUtil_1.FNameUtil.IsNothing(e.BoneName)) {
          const _ = a.GetSocketTransform(e.BoneName);
          l = _.GetLocation();
          i = _.GetRotation().GetForwardVectorDouble();
        }
        break;
      case 1:
        if (t.SkillComponent.SkillTarget) {
          [l, i] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(t.SkillComponent.SkillTarget.Entity.GetComponent(1).Owner);
          var r = t.SkillComponent.GetTargetTransform().GetLocation();
          var c = (0, SkillBehaviorMisc_1.traceWall)(a, Vector_1.Vector.Create(l), Vector_1.Vector.Create(r), e.DebugTrace);
          if (c && c[0]) {
            SkillUtils_1.SkillUtils.Log(0, 1, t.Entity, "SkillBehaviorAction.SetLocation技能目标胶囊体中心和技能目标锁定点之间有阻挡，设置位置失败", ["技能Id", t.Skill.SkillId], ["技能名", t.Skill.SkillName]);
            break;
          }
          l = r;
        }
        break;
      case 2:
        c = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(34).GetCurrentTarget();
        if (c) {
          [l, i] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(c.Entity.GetComponent(1).Owner);
        }
        break;
      case 3:
        [l, i] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(Global_1.Global.BaseCharacter);
        break;
      case 4:
        r = ModelManager_1.ModelManager.CreatureModel.GetEntity(t.Entity.GetComponent(0).GetSummonerId())?.Entity?.GetComponent(1);
        [l, i] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(r.Owner);
        break;
      case 5:
        [l, i] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(ModelManager_1.ModelManager.CameraModel.FightCamera.GetComponent(4).CameraActor);
        break;
      case 6:
        c = ControllerHolder_1.ControllerHolder.BlackboardController.GetVectorValueByEntity(t.Entity.Id, e.BlackboardKey);
        l = WorldGlobal_1.WorldGlobal.ToUeVector(c);
        break;
      case 7:
        r = ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(t.Entity.Id, e.BlackboardKey);
        c = EntitySystem_1.EntitySystem.Get(r);
        if (c?.Valid) {
          [l, i] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(c.GetComponent(180).Owner);
        }
        break;
      case 8:
        r = PhantomUtil_1.PhantomUtil.GetSummonedEntity(t.Entity, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantCustom, e.FollowIndex);
        if (r?.Valid) {
          c = r.Entity?.GetComponent(1);
          if (c) {
            if (FNameUtil_1.FNameUtil.IsNothing(e.BoneName)) {
              [l, i] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(c.Owner);
            } else {
              const _ = c.GetSocketTransform(e.BoneName);
              l = _.GetLocation();
              i = _.GetRotation().GetForwardVectorDouble();
            }
          }
        }
    }
    switch (e.LocationForwardType) {
      case 0:
        break;
      case 1:
        i = a.Actor.D_GetActorForwardVector();
        break;
      case 2:
        var s = a.ActorLocation.op_Subtraction(l);
        i.Set(s.X, s.Y, 0);
        break;
      case 3:
        s = l.op_Subtraction(Global_1.Global.CharacterCameraManager.D_GetCameraLocation());
        i.Set(s.X, s.Y, 0);
        break;
      case 4:
        (i = Global_1.Global.BaseCharacter.D_K2_GetActorLocation().op_Subtraction(l)).Set(i.X, i.Y, 0);
    }
    if (e.BestSpot && e.Strategy === 5) {
      S = ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities();
      v = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(t.Entity);
      if ((S = S.indexOf(v)) + 1 > e.AngleOffsets.Num()) {
        SkillUtils_1.SkillUtils.Log(3, 1, t.Entity, "SkillBehaviorAction.SetLocation当前施法者所处编队位置大于配置数组", ["技能Id", t.Skill.SkillId], ["技能名", t.Skill.SkillName], ["index", S]);
      } else {
        v = e.AngleOffsets.Get(S);
        i = i.RotateAngleAxis(v, Vector_1.Vector.UpVectorDouble);
      }
    }
    var n = Vector_1.Vector.Create(l);
    const _ = new UE.TransformDouble(i.Rotation(), l, Vector_1.Vector.OneVectorDouble);
    var k;
    var S = UE.KismetMathLibrary.Conv_VectorToVectorDouble(e.LocationOffset);
    l = _.TransformPositionNoScale(S);
    if (e.Restrict) {
      let i = a.ActorLocation;
      switch (e.RestrictType) {
        case 0:
          i = Global_1.Global.BaseCharacter.D_K2_GetActorLocation();
          break;
        case 1:
          break;
        case 2:
          if (t.Entity.GetComponent(0).IsMonster()) {
            k = a.GetInitLocation();
            i.Set(k.X, k.Y, k.Z);
          }
      }
      var v = l.op_Subtraction(i).Size2D();
      if (v > e.RestrictDistance) {
        S = e.RestrictDistance / v;
        MathUtils_1.MathUtils.LerpVector(i, l, S, l);
      }
    }
    let h = Vector_1.Vector.Create(l);
    if (e.BestSpot) {
      if (e.Strategy === 4) {
        o = Global_1.Global.BaseCharacter.D_K2_GetActorLocation();
      }
      if (!n.Equals(h)) {
        switch (e.Strategy) {
          case 5:
          case 0:
          case 1:
            var B = (0, SkillBehaviorMisc_1.traceWall)(a, n, h, e.DebugTrace);
            if (!B) {
              SkillUtils_1.SkillUtils.Log(0, 1, t.Entity, "SkillBehaviorAction.SetLocation撞墙停止射线起点和终点位置相同，设置位置失败", ["技能Id", t.Skill.SkillId], ["技能名", t.Skill.SkillName]);
              SkillBehaviorAction.x4g.Stop();
              return o;
            }
            h = B[1];
            break;
          case 2:
          case 3:
          case 4:
            {
              let i = false;
              var u = Vector_1.Vector.Create();
              var M = Vector_1.Vector.Create();
              h.Subtraction(n, u);
              for (const U of SkillBehaviorMisc_1.angles) {
                u.RotateAngleAxis(U, Vector_1.Vector.UpVectorProxy, M);
                n.Addition(M, h);
                var m = (0, SkillBehaviorMisc_1.traceWall)(a, n, h, e.DebugTrace);
                if (!m) {
                  SkillUtils_1.SkillUtils.Log(0, 1, t.Entity, "SkillBehaviorAction.SetLocation四向查询射线起点和终点位置相同，设置位置失败", ["技能Id", t.Skill.SkillId], ["技能名", t.Skill.SkillName]);
                  SkillBehaviorAction.x4g.Stop();
                  return o;
                }
                if (!m[0]) {
                  i = true;
                  h = m[1];
                  break;
                }
              }
              if (i) {
                break;
              }
              SkillUtils_1.SkillUtils.Log(0, 1, t.Entity, "SkillBehaviorAction.SetLocation四个方向都撞墙了，设置位置失败", ["技能Id", t.Skill.SkillId], ["技能名", t.Skill.SkillName]);
              SkillBehaviorAction.x4g.Stop();
              return o;
            }
        }
      }
      {
        let i = undefined;
        if (e.Strategy === 3 || e.Strategy === 1) {
          if (e.LocationType !== 0) {
            i = Vector_1.Vector.Create(a.ActorLocation);
          }
        } else if (e.Strategy === 4) {
          i = Vector_1.Vector.Create(Global_1.Global.BaseCharacter.D_K2_GetActorLocation());
        }
        if (i) {
          var v = Vector_1.Vector.Create(h);
          var d = (0, SkillBehaviorMisc_1.traceWall)(a, i, v, e.DebugTrace);
          if (!d) {
            SkillUtils_1.SkillUtils.Log(0, 1, t.Entity, "SkillBehaviorAction.SetLocation检测空气墙射线起点和终点位置相同，设置位置失败", ["技能Id", t.Skill.SkillId], ["技能名", t.Skill.SkillName]);
            SkillBehaviorAction.x4g.Stop();
            return o;
          }
          var b = d[0];
          if (b) {
            var A = b.GetHitCount();
            for (let i = 0; i < A; i++) {
              var C = b.Actors.Get(i);
              if (ObjectUtils_1.ObjectUtils.IsValid(C)) {
                if (C.Tags.FindIndex(RefCompAirWallController_1.AIR_WALL) !== -1) {
                  SkillUtils_1.SkillUtils.Log(0, 1, t.Entity, "SkillBehaviorAction.SetLocation检测到空气墙", ["技能Id", t.Skill.SkillId], ["技能名", t.Skill.SkillName]);
                  h = d[1];
                  break;
                }
              }
            }
          }
        }
      }
      if (e.OnGround) {
        S = (0, SkillBehaviorMisc_1.traceGroundWithGravity)(a, h, e.DebugTrace);
        if (!S[0]) {
          SkillUtils_1.SkillUtils.Log(0, 1, t.Entity, "SkillBehaviorAction.SetLocation贴地没有找到合法的落脚点，设置位置失败", ["技能Id", t.Skill.SkillId], ["技能名", t.Skill.SkillName]);
          SkillBehaviorAction.x4g.Stop();
          return o;
        }
        (h = S[1]).Z += e.GroundOffset;
      }
    }
    l = h.ToUeVector();
    v = e.Navigation;
    if (v > 0) {
      var S = t.Entity.GetComponent(189);
      var p = Vector_1.Vector.Create();
      S.GravityUp.Multiply(v, p);
      if (!UE.NavigationSystemV1.D_K2_ProjectPointToNavigation(GlobalData_1.GlobalData.World, l, undefined, undefined, undefined, p.ToUeVector(), v)) {
        S = (0, puerts_1.$ref)(undefined);
        if (!UE.NavigationSystemV1.D_K2_GetRandomLocationInNavigableRadius(GlobalData_1.GlobalData.World, l, S, v)) {
          SkillUtils_1.SkillUtils.Log(0, 1, t.Entity, "SkillBehaviorAction.SetLocation没有找到合法的导航网格落点，设置位置失败", ["技能Id", t.Skill.SkillId], ["技能名", t.Skill.SkillName]);
          SkillBehaviorAction.x4g.Stop();
          return o;
        }
        l = (0, puerts_1.$unref)(S);
      }
    }
    SkillBehaviorAction.x4g.Stop();
    return l;
  }
  static tZo(i, e) {
    SkillBehaviorAction.B4g.Start();
    var t;
    var i = SkillBehaviorAction.CalculateLocation(i, e);
    if (!i.Equals(Vector_1.Vector.ZeroVectorDouble, MathCommon_1.MathCommon.KindaSmallNumber)) {
      t = e.Entity.GetComponent(3);
      SkillUtils_1.SkillUtils.Log(0, 1, e.Entity, "SkillBehaviorAction.SetLocation最终点", ["位置", i.ToString()]);
      t.SetActorLocation(i, SkillBehaviorMisc_1.CONTEXT + ".Final", false);
    }
    SkillBehaviorAction.B4g.Stop();
  }
  static CalculateRotation(i, e) {
    SkillBehaviorAction.k4g.Start();
    let t = undefined;
    let a = undefined;
    let l = undefined;
    switch (i.RotationType) {
      case 0:
        a = e.SkillComponent.SkillTarget;
        break;
      case 1:
        a = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
        break;
      case 2:
        var o = e.Entity.GetComponent(0);
        a = ModelManager_1.ModelManager.CreatureModel.GetEntity(o.GetSummonerId());
        break;
      case 3:
        (t = tmpVector).FromUeVector(ModelManager_1.ModelManager.CameraModel.FightCamera.GetComponent(4).CameraActor.D_K2_GetActorLocation());
        break;
      case 4:
        if (e.SkillComponent.SkillTarget === ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity) {
          (t = tmpVector).FromUeVector(ModelManager_1.ModelManager.CameraModel.FightCamera.GetComponent(4).CameraActor.D_K2_GetActorLocation());
        } else {
          a = e.SkillComponent.SkillTarget;
        }
        break;
      case 5:
        break;
      case 6:
        {
          const r = e.Entity.GetComponent(3);
          if (!r.IsAutonomousProxy) {
            break;
          }
          l = r.InputDirectProxy;
          break;
        }
      default:
        a = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(e.Entity);
    }
    if (a && a.Entity !== e.Entity) {
      t = a.Entity.GetComponent(1).ActorLocationProxy;
    }
    const r = e.Entity.GetComponent(3);
    if (t) {
      t.Subtraction(r.ActorLocationProxy, tmpVector);
      MathUtils_1.MathUtils.LookRotationUpFirst(tmpVector, r.MoveComp.GravityUp, tmpQuat);
    } else if (l) {
      MathUtils_1.MathUtils.LookRotationUpFirst(l, r.MoveComp.GravityUp, tmpQuat);
    } else {
      tmpQuat.DeepCopy(r.ActorQuatProxy);
    }
    if (i.DirectionOffset !== 0) {
      tmpRotator.Set(0, i.DirectionOffset, 0);
      tmpQuat.Multiply(tmpRotator.Quaternion(), tmpQuat);
    }
    tmpQuat.Rotator(tmpRotator);
    SkillBehaviorAction.k4g.Stop();
    return tmpRotator.ToUeRotator();
  }
  static bd(i, e) {
    SkillBehaviorAction.q4g.Start();
    var t = e.Entity.GetComponent(3);
    var i = SkillBehaviorAction.CalculateRotation(i, e);
    SkillUtils_1.SkillUtils.Log(0, 1, e.Entity, "SkillBehaviorAction.SetRotation", ["朝向", i]);
    t.SetActorRotation(i, "SkillBehaviorAction.SetDirection");
    SkillBehaviorAction.q4g.Stop();
  }
  static iZo(e, t) {
    SkillBehaviorAction.O4g.Start();
    var a = t.Entity.GetComponent(21);
    for (let i = 0; i < e.Cues.Num(); i++) {
      var l = e.Cues.Get(i);
      var o = a.AddCue(Number(l.CueId), {
        Sync: true
      });
      if (l.Stop) {
        (0, SkillBehaviorMisc_1.getEndSkillBehaviorParamList)(t.Skill).push({
          Entity: t.Entity,
          ActionType: e.ActionType,
          GameplayCue: o
        });
      }
    }
    SkillBehaviorAction.O4g.Stop();
  }
  static oZo(e, t) {
    SkillBehaviorAction.G4g.Start();
    for (let i = 0; i < e.Bullets.Num(); i++) {
      var a;
      var l = e.Bullets.Get(i);
      for (let i = 0; i < l.bulletCount; i++) {
        let i = -1;
        if (t.Skill.SkillBehaviorAnimNotifyMessageId) {
          if ((a = t.Entity.GetComponent(3).Actor) instanceof TsBaseCharacter_1.default) {
            i = BulletUtil_1.BulletUtil.CreateBulletFromAN(a, l.bulletRowName, t.Entity.GetComponent(3).ActorTransform, t.Skill.SkillId, true, t.Skill.SkillBehaviorAnimNotifyMessageId, t.Skill.ExtraTargetLocation);
          }
        } else {
          i = ControllerHolder_1.ControllerHolder.BulletController.CreateBulletCustomTarget(t.Entity, l.bulletRowName, t.Entity.GetComponent(3).ActorTransform, {
            SkillId: t.Skill.SkillId,
            SkillContextId: t.Skill.MNc,
            SyncType: 1,
            BattleContext: t.Skill.BattleContext,
            InitTargetLocation: t.Skill.ExtraTargetLocation
          }, t.Skill.MNc).Id;
        }
        if (l.BlackboardKey) {
          ControllerHolder_1.ControllerHolder.BlackboardController.SetIntValueByEntity(t.Entity.Id, l.BlackboardKey, i);
        }
      }
    }
    SkillBehaviorAction.G4g.Stop();
  }
  static rZo(i, e) {
    SkillBehaviorAction.F4g.Start();
    e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e.Entity.Id);
    if (CameraUtility_1.CameraUtility.CheckApplyCameraModifyCondition(e, i.CameraModifierSettings, i.CameraEffectiveClientType, i.CameraModifierConditions)) {
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ApplyCameraModify(i.Tag, i.Duration, i.BlendInTime, i.BlendOutTime, i.CameraModifierSettings, undefined, i.BreakBlendOutTime, i.BlendInCurve, i.BlendOutCurve, undefined, i.CameraAttachSocket.toString());
      SkillBehaviorAction.F4g.Stop();
    }
  }
  static nZo(i, e) {
    SkillBehaviorAction.F4g.Start();
    ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera.PlayerComponent.PlayCameraSequence(i.CameraSequenceSettings, i.ResetLockOnCamera, i.AdditiveRotation, e.Entity.GetComponent(3).Actor, i.CameraAttachSocket, i.CameraDetectSocket, i.ExtraSphereLocation, i.ExtraDetectSphereRadius, i.IsShowExtraSphere);
    SkillBehaviorAction.F4g.Stop();
  }
  static sZo(i, e) {
    e.Entity.GetComponent(3).Actor.KuroSetMovementMode({
      Mode: i.BeginMovementMode,
      Context: "[SkillBehaviorAction.SetMovementMode]"
    });
    (0, SkillBehaviorMisc_1.getEndSkillBehaviorParamList)(e.Skill).push({
      Entity: e.Entity,
      ActionType: i.ActionType,
      MovementMode: i.EndMovementMode
    });
  }
  static aZo(i, e) {
    var t = e.Entity.GetComponent(3).Actor.CapsuleComponent;
    if (i.CollisionRestore) {
      (0, SkillBehaviorMisc_1.getEndSkillBehaviorParamList)(e.Skill).push({
        Entity: e.Entity,
        ActionType: i.ActionType,
        CollisionChannel: i.CollisionChannel,
        CollisionResponse: t.GetCollisionResponseToChannel(i.CollisionChannel)
      });
    }
    t.SetCollisionResponseToChannel(i.CollisionChannel, i.CollisionResponse);
  }
  static hZo(i, e) {
    var t = PhantomUtil_1.PhantomUtil.GetSummonedEntity(e.Entity, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantCustom, i.FollowIndex);
    if (t) {
      t = t.Entity.GetComponent(42);
      if (i.StopSummonSkill) {
        (0, SkillBehaviorMisc_1.getEndSkillBehaviorParamList)(e.Skill).push({
          Entity: e.Entity,
          ActionType: i.ActionType,
          SummonSkillComponent: t,
          SummonSkillId: i.SummonSkillId
        });
      }
      t.BeginSkill(i.SummonSkillId, {
        Target: e.SkillComponent.SkillTarget?.Entity,
        Reason: "SkillBehaviorAction.UseSummonSkill"
      });
    }
  }
  static bst(i, e) {
    let t = undefined;
    switch (i.BuffTarget) {
      case 0:
        t = e.Entity.GetComponent(185);
        break;
      case 1:
        t = e.SkillComponent.SkillTarget?.Entity?.GetComponent(185);
    }
    var a;
    if (t) {
      if (i.Add) {
        a = e.Skill.SkillBehaviorAnimNotifyMessageId || e.Skill.MNc;
        a = {
          InstigatorId: ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e.Entity.Id),
          Reason: "从技能行为添加Buff",
          PreMessageId: a
        };
        t.AddBuff(Number(i.BuffId), a);
      } else {
        t.RemoveBuff(Number(i.BuffId), -1, "从技能行为移除Buff");
      }
    }
  }
  static lZo(i, e) {
    e = EntitySystem_1.EntitySystem.GetComponent(e.Entity.Id, 217);
    if (e?.Valid && i.Tag.TagName !== "None") {
      if (i.Add) {
        e.AddTag(i.Tag.TagId);
      } else {
        e.RemoveTag(i.Tag.TagId);
      }
    }
  }
  static _Zo(i, e) {
    e = EntitySystem_1.EntitySystem.GetComponent(e.Entity.Id, 19);
    if (e?.Valid) {
      e.TryExitWeakTime();
    }
  }
  static Kpl(i, e) {
    var t = EntitySystem_1.EntitySystem.GetComponent(e.Entity.Id, 42);
    if (t?.Valid) {
      t.PlaySkillMontageWithEndAbility(e.Skill, i.MontageIndex, i.StartSection, i.StartTime);
    }
  }
  static K4_(i, e) {
    var t = EntitySystem_1.EntitySystem.GetComponent(e.Entity.Id, 307);
    if (t?.Valid) {
      var a = i.UpdateCustomValue.ValueName;
      var l = a.Num();
      for (let i = 0; i < l; i++) {
        var o = a.Get(i);
        t.UpdateCustomValue(o);
      }
    }
  }
  static LQ_(i, e, t) {
    SkillBehaviorAction.N4g.Start();
    SkillBehaviorBatchBulletTask_1.SkillBehaviorBatchBulletTask.Create(i, e, t).StartAsync();
    SkillBehaviorAction.N4g.Stop();
  }
}
(exports.SkillBehaviorAction = SkillBehaviorAction).x4g = Stats_1.Stat.Create("[SkillBehaviorAction]CalculateLocation");
SkillBehaviorAction.k4g = Stats_1.Stat.Create("[SkillBehaviorAction]CalculateRotation");
SkillBehaviorAction.B4g = Stats_1.Stat.Create("[SkillBehaviorAction]SetLocation");
SkillBehaviorAction.q4g = Stats_1.Stat.Create("[SkillBehaviorAction]SetRotation");
SkillBehaviorAction.O4g = Stats_1.Stat.Create("[SkillBehaviorAction]PlayEffect");
SkillBehaviorAction.G4g = Stats_1.Stat.Create("[SkillBehaviorAction]CreateBullet");
SkillBehaviorAction.F4g = Stats_1.Stat.Create("[SkillBehaviorAction]Camera");
SkillBehaviorAction.N4g = Stats_1.Stat.Create("[SkillBehaviorAction]BatchCreate"); //# sourceMappingURL=SkillBehaviorAction.js.map