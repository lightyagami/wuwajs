"use strict";

var CharacterHoldingHandsComponent_1;
var __decorate = this && this.__decorate || function (t, i, s, e) {
  var n;
  var h = arguments.length;
  var o = h < 3 ? i : e === null ? e = Object.getOwnPropertyDescriptor(i, s) : e;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, i, s, e);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (n = t[r]) {
        o = (h < 3 ? n(o) : h > 3 ? n(i, s, o) : n(i, s)) || o;
      }
    }
  }
  if (h > 3 && o) {
    Object.defineProperty(i, s, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterHoldingHandsComponent = exports.HoldingHandsParams = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const InputController_1 = require("../../../../Input/InputController");
const InputEnums_1 = require("../../../../Input/InputEnums");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const HoldingHandsController_1 = require("../../../../Module/HoldHands/HoldingHandsController");
const HoldingHandsUtils_1 = require("../../../../Module/HoldHands/HoldingHandsUtils");
const CharacterNameDefines_1 = require("../CharacterNameDefines");
const CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes");
const SKILL_ID_INVITATION_START = 401101;
const SKILL_ID_INVITATION_END = 401102;
const listenSkillIds = new Set([SKILL_ID_INVITATION_START, SKILL_ID_INVITATION_END]);
const disableInputTagIds = [-542518289, -541178966, -732810197, 581080458, -1802431900, -469423249, 766688429, -1752099043, -1697149502];
class HoldingHandsParams {
  constructor(t) {
    var i;
    this.Debug = false;
    this.ReachableTag = 0;
    this.InvitingTags = [];
    this.LeadingTags = [];
    this.FollowingTags = [];
    this.DisableTags = [];
    this.EndTime = 5;
    this.LongPressDuration = 1;
    this.IkAlphaDamping = 500;
    this.BindVecDamping = 100;
    this.BindVecDampingInvitation = 400;
    this.WalkRotateSpeedMax = 180;
    this.RunRotateSpeedMax = 180;
    this.InputScaleRun = 1;
    this.YawRange = {
      Min: -90,
      Max: 90
    };
    this.PitchRange = {
      Min: -90,
      Max: 90
    };
    this.ShoulderYawRange = {
      Min: -90,
      Max: 90
    };
    this.ShoulderPitchRange = {
      Min: -90,
      Max: 90
    };
    this.ReachableExtraAngle = 5;
    this.BindDistanceUnReachable = 10;
    this.BindDistanceReachable = 30;
    this.UnReachableDistanceScale = 0.8;
    this.ReachableDistanceScale = 1;
    this.ShoulderDeltaHeightUnReachable = 35;
    this.ShoulderDeltaHeightReachable = 40;
    this.LeaderHitPriority = 50;
    this.FollowerHitPriority = 49;
    this.LeaderMass = 90;
    this.FollowerMass = 60;
    this.InvitationDistance = 83;
    this.InvitationDistanceTolerance = 5;
    this.InvitationEndDistance = 55;
    this.InvitationEndDistanceTolerance = 0;
    this.InvitationEndMoveSpeed = 50;
    this.InvitationTurnSpeed = 200;
    this.HandMinAngle = 45;
    this.LeaderBindPosScale = 1;
    this.FollowerBindPosScale = 1;
    this.BindPosDistance = 2;
    this.KeepFollowingDa = undefined;
    if (t) {
      this.Debug = t.Debug;
      this.ReachableTag = t.牵手范围内.TagId;
      this.InvitingTags = GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(t.邀请中);
      this.LeadingTags = GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(t.牵手中);
      this.FollowingTags = GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(t.被牵手中);
      this.DisableTags = GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(t.牵手禁止);
      this.EndTime = t.超时终止时长;
      this.LongPressDuration = t.长按退出时长;
      this.IkAlphaDamping = t.进出牵手阻尼;
      this.BindVecDamping = t.牵手点阻尼;
      this.WalkRotateSpeedMax = t.走路最大旋转速度;
      this.RunRotateSpeedMax = t.跑步最大旋转速度;
      this.InputScaleRun = t.跑步速度缩放;
      i = t.牵手点偏转角范围;
      this.YawRange = i ? {
        Min: i.LowerBound.Value,
        Max: i.UpperBound.Value
      } : {
        Min: -90,
        Max: 90
      };
      i = t.牵手点俯仰角范围;
      this.PitchRange = i ? {
        Min: i.LowerBound.Value,
        Max: i.UpperBound.Value
      } : {
        Min: -90,
        Max: 90
      };
      i = t.肩部偏转角范围;
      this.ShoulderYawRange = i ? {
        Min: i.LowerBound.Value,
        Max: i.UpperBound.Value
      } : {
        Min: -90,
        Max: 90
      };
      i = t.肩部俯仰角范围;
      this.ShoulderPitchRange = i ? {
        Min: i.LowerBound.Value,
        Max: i.UpperBound.Value
      } : {
        Min: -90,
        Max: 90
      };
      this.ReachableExtraAngle = t.范围内额外角度;
      this.BindDistanceUnReachable = t.范围外牵手点最大距离;
      this.BindDistanceReachable = t.范围内牵手点最大距离;
      this.ReachableDistanceScale = t.范围内可达距离缩放;
      this.UnReachableDistanceScale = t.范围外可达距离缩放;
      this.ShoulderDeltaHeightReachable = t.范围内肩部最大高度差;
      this.ShoulderDeltaHeightUnReachable = t.范围外肩部最大高度差;
      this.LeaderHitPriority = t.牵手者碰撞优先级;
      this.FollowerHitPriority = t.被牵手者碰撞优先级;
      this.LeaderMass = t.牵手者质量;
      this.FollowerMass = t.被牵手者质量;
      this.InvitationDistance = t.邀请距离;
      this.InvitationDistanceTolerance = t.邀请距离容差;
      this.InvitationEndDistance = t.邀请结束距离;
      this.InvitationEndDistanceTolerance = t.邀请结束距离容差;
      this.InvitationEndMoveSpeed = t.邀请结束移动速度;
      this.InvitationTurnSpeed = t.邀请旋转速度;
      this.BindVecDampingInvitation = t.邀请时牵手点阻尼;
      this.HandMinAngle = t.手掌最小夹角;
      this.LeaderBindPosScale = t.牵手者牵手点位置缩放;
      this.FollowerBindPosScale = t.被牵手者牵手点位置缩放;
      this.BindPosDistance = t.贴合距离;
      this.KeepFollowingDa = t.跟随配置;
    }
  }
}
exports.HoldingHandsParams = HoldingHandsParams;
let CharacterHoldingHandsComponent = CharacterHoldingHandsComponent_1 = class CharacterHoldingHandsComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.AnimInstance = undefined;
    this.SkelMesh = undefined;
    this.TraceElement = undefined;
    this.ActorComp = undefined;
    this.Lie = undefined;
    this.oRe = undefined;
    this.I5r = undefined;
    this.MoveComp = undefined;
    this.EIe = undefined;
    this.cBe = undefined;
    this.Bhh = undefined;
    this.IX1 = new Map();
    this.yWc = new Map();
    this.cz = Vector_1.Vector.Create();
    this.fz = Vector_1.Vector.Create();
    this.YJo = Vector_1.Vector.Create();
    this.aO1 = false;
    this.dsd = false;
    this.Xcd = undefined;
    this.msd = undefined;
    this.H1d = undefined;
    this.$1d = undefined;
    this.CanSkillInterrupt = true;
    this.Pgd = false;
    this.zmd = undefined;
    this.bJe = (t, i) => {
      if (listenSkillIds.has(i) && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Character", 82, "[CharacterHoldingHandsComponent.OnSkillEnd]", ["entityId", t], ["skillId", i]), i === SKILL_ID_INVITATION_END)) {
        this.OnInvitationAnimEnd();
      }
    };
    this.SWc = (t, i) => {
      if (t === this.Entity.Id && listenSkillIds.has(i) && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Character", 82, "[CharacterHoldingHandsComponent.OnSillEndByInterrupt]", ["entityId", t], ["skillId", i]), this.CanSkillInterrupt)) {
        this.ReleaseAllHands("邀请技能被打断");
      }
    };
    this.OnStateInherit = (t, i) => {
      if (t?.Valid && !i) {
        var s = t.GetComponent(297);
        if (s) {
          for (const r of this.yWc) {
            var e = r[0];
            var n = r[1];
            var h = this.Model?.GetRelation(n);
            if (h) {
              var o = h instanceof HoldingHandsUtils_1.Binding;
              let t = false;
              if (h.Follower === this) {
                h.Follower = s;
                if (o) {
                  h.FollowerRuntime = s.GetHandRuntime(e);
                  h.FollowerRuntime.IkTarget.Alpha = 1;
                }
              } else if (h.Leader === this) {
                h.Leader = s;
                if (o) {
                  h.LeaderRuntime = s.GetHandRuntime(e);
                  h.LeaderRuntime.IkTarget.Alpha = 1;
                }
                t = true;
              }
              s.OnAddBinding(e, n, false);
              this.OnDeleteRelation(e, t, false);
            }
          }
        }
      }
    };
    this.xie = () => {
      this.ReleaseAllHands("换人");
    };
    this.bpr = () => {
      this.ReleaseAllHands("传送开始");
    };
  }
  get Params() {
    CharacterHoldingHandsComponent_1.K3u ||= CharacterHoldingHandsComponent_1.LoadCommonParams();
    return CharacterHoldingHandsComponent_1.K3u;
  }
  get KeepFollowingConfig() {
    if (!this.zmd && this.Params.KeepFollowingDa) {
      this.zmd = ResourceSystem_1.ResourceSystem.Load(this.Params.KeepFollowingDa.ToAssetPathName(), UE.BP_KeepFollowingConfig_C);
    }
    return this.zmd;
  }
  OnStart() {
    this.EIe = this.Entity.CheckGetComponent(0);
    var t = this.EIe.GetEntityType();
    if (t !== Protocol_1.Aki.Protocol.kks.Proto_Monster || this.EIe.IsCharacterMonster()) {
      this.aO1 = t === Protocol_1.Aki.Protocol.kks.Proto_Player;
      this.ActorComp = this.Entity.CheckGetComponent(3);
      this.oRe = this.Entity.CheckGetComponent(178);
      this.Lie = this.Entity.CheckGetComponent(206);
      this.I5r = this.Entity.CheckGetComponent(102);
      this.MoveComp = this.Entity.CheckGetComponent(45);
      this.cBe = this.Entity.GetComponent(39);
      this.SkelMesh = this.ActorComp?.Actor.Mesh;
      this.AnimInstance = this.oRe?.MainAnimInstance;
    } else {
      this.Disable("[CharacterHoldingHandsComponent.OnStart]");
    }
    return true;
  }
  OnActivate() {
    var t;
    var i = this.oRe?.MainAnimInstance;
    if (UE.KuroStaticLibrary.IsObjectClassByName(i, CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLENPC) || UE.KuroStaticLibrary.IsObjectClassByName(i, CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE)) {
      if (this.EIe?.HoldHandTargetEntityId && !this.EIe?.HoldHandIsFollow && (i = this.EIe.GetCreatureDataId().toString() + this.EIe?.HoldHandTargetEntityId.toString(), t = ModelManager_1.ModelManager.CreatureModel?.GetEntity(this.EIe?.HoldHandTargetEntityId)?.Entity?.GetComponent(297))) {
        HoldingHandsController_1.HoldingHandsController.AddBinding(i, this, t, this.EIe.HoldHandType).NoLerpNextUpdate = true;
      }
    } else {
      this.Disable("[CharacterHoldingHandsComponent.OnActivate]");
    }
  }
  OnEnd() {
    this.ReleaseAllHands("实体销毁", true, false);
    this.TryRemoveEvents();
    return true;
  }
  OnTick(t) {
    if (this.IX1.size !== 0) {
      var i = this.GetRoleState();
      if (i === 0) {
        for (const s of this.IX1.values()) {
          s.LerpAlphas(this.Params.IkAlphaDamping, t);
        }
      } else if (this.EWc(i)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Character", 82, "[CharacterHoldingHandsComponent] 因DisableTags断开牵手", ["entityId", this.Entity.Id]);
        }
        this.ReleaseAllHands("DisableTags");
      } else {
        this.W1d();
        this.TTu(i, t);
      }
    }
  }
  EWc(t) {
    return this.Lie.HasAnyTag(this.Params.DisableTags);
  }
  TTu(i, s) {
    if (i === 2) {
      let t = this.Params.WalkRotateSpeedMax;
      i = (t = this.I5r?.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Run ? this.Params.RunRotateSpeedMax : t) * s / 1000;
      this.MoveComp.SetInputMaxDegree(i);
      if (this.I5r.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Run) {
        this.MoveComp.SetInputScale(this.Params.InputScaleRun);
      } else {
        this.MoveComp.SetInputScale(1);
      }
    } else {
      this.MoveComp.SetInputMaxDegree(0);
      this.MoveComp.SetInputScale(1);
    }
  }
  get Model() {
    return ModelManager_1.ModelManager.HoldingHandsModel;
  }
  GetHandRuntime(t) {
    let i = this.IX1.get(t);
    if (!i) {
      (i = new HoldingHandsUtils_1.HandRuntime()).HandType = t;
      this.IX1.set(t, i);
    }
    return i;
  }
  GetRelationByHand(t) {
    t = this.yWc.get(t);
    if (t !== undefined) {
      return this.Model?.GetRelation(t);
    }
  }
  GetRelationByFollower(t) {
    for (const s of this.yWc.values()) {
      var i = this.Model?.GetRelation(s);
      if (i && i.Follower === t && i.Leader === this) {
        return i;
      }
    }
  }
  GetHandIkTarget(t) {
    t = this.IX1.get(t);
    if (t) {
      return t.IkTarget;
    }
  }
  GetHandIkTargetUe(t) {
    t = this.IX1.get(t);
    if (t && t.IkTarget) {
      t.IkTargetUe ||= new UE.IKTarget();
      t.IkTargetUe.Location = t.IkTarget.Location.ToUeVectorOld();
      t.IkTargetUe.Rotation = t.IkTarget.Rotation.ToUeQuat();
      t.IkTargetUe.Alpha = t.IkTarget.Alpha;
      return t.IkTargetUe;
    }
  }
  GetRoleState() {
    if (this.yWc && this.yWc.size !== 0) {
      for (const i of this.yWc.values()) {
        var t = this.Model?.GetRelation(i);
        if (t && t instanceof HoldingHandsUtils_1.Binding) {
          if (t.Leader === this) {
            return 2;
          }
          if (t.Follower === this) {
            return 1;
          }
        }
      }
    }
    return 0;
  }
  GetIsHoldingHands() {
    return this.GetRoleState() === 2;
  }
  GetIsBeHoldingHands() {
    return this.GetRoleState() === 1;
  }
  GetIsAcceptingInvitation() {
    return this.dsd;
  }
  GetLeaderInfo() {
    for (const i of this.yWc) {
      var t = this.Model?.GetRelation(i[1]);
      if (t && t.Follower === this) {
        return [i[0], t.Leader];
      }
    }
  }
  GetFollowerInfo() {
    for (const i of this.yWc) {
      var t = this.Model?.GetRelation(i[1]);
      if (t && t.Leader === this) {
        return [i[0], t.Follower];
      }
    }
  }
  GetHandReachable(t) {
    t = this.GetRelationByHand(t);
    return !!t && !!(t instanceof HoldingHandsUtils_1.Binding) && t.Reachable;
  }
  GetIfHanding() {
    return this.GetRoleState() !== 0;
  }
  static GetMaxReachableDistance(t) {
    return t.LeaderRuntime.MaxBendLength + t.FollowerRuntime.MaxBendLength;
  }
  GetFollowingPosition(t) {
    this.MoveComp?.MoveController.GetFollowingPosition(this.cz, t.ActorComp);
    return this.cz;
  }
  SetBindingsNoLerp() {
    for (const i of this.yWc.values()) {
      var t = this.Model?.GetRelation(i);
      if (t && t instanceof HoldingHandsUtils_1.Binding && (t.NoLerpNextUpdate = true, Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Character", 82, "[CharacterHoldingHandsComponent.SetAllBindingsNoLerp]", ["key", t.Key], ["leader", t.Leader?.Entity.Id], ["follower", t.Follower?.Entity.Id]);
      }
    }
  }
  static StartInvitation(t, i) {
    const e = t.Leader;
    const n = t.Follower;
    e.yWc.set(i, t.Key);
    n.yWc.set(1 - i, t.Key);
    i = n.ActorComp.ActorLocationProxy;
    t = e.ActorComp.ActorLocationProxy;
    const h = e.cz;
    t.Subtraction(i, h);
    h.Normalize();
    h.MultiplyEqual(e.Params.InvitationDistance);
    i.Addition(h, e.YJo);
    t = e.MoveComp?.CurrentMovementSettings?.WalkSpeed ?? 100;
    i = {
      Points: {
        Index: 0,
        Position: e.YJo,
        MoveState: IComponent_1.EPatrolMoveState.Walk,
        MoveSpeed: t
      },
      Navigation: false,
      IsFly: false,
      DebugMode: true,
      Loop: false,
      Callback: t => {
        var i;
        var s;
        if (t === 1) {
          e.MoveComp.StopMoveNew();
          t = n.ActorComp.ActorLocationProxy;
          i = e.ActorComp.ActorLocationProxy;
          s = e.fz;
          t.Subtraction(i, s);
          s.Normalize();
          s.Multiply(-1, h);
          n.w4u(h, 0);
          e.w4u(s, 10, () => {
            e.cBe?.BeginSkill(SKILL_ID_INVITATION_START, {
              Reason: "开始牵手邀约"
            });
          });
        } else {
          e.MoveComp.StopMoveNew();
          e.ReleaseAllHands("邀请时Leader移动失败");
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Character", 82, "[CharacterHoldingHandsComponent] Leader无法走到邀请点，退出牵手", ["leader", e.Entity.Id]);
          }
        }
      },
      TurnSpeed: e.Params.InvitationTurnSpeed,
      ReturnTimeoutFailed: 2,
      ReturnFalseWhenNavigationFailed: false,
      Distance: e.Params.InvitationDistanceTolerance
    };
    if (e.cBe) {
      e.cBe.StopAllSkills("牵手邀请");
    }
    e.MoveComp.MoveAlongPath(i);
    e.Q1d(true, 2);
  }
  FollowerAccept() {
    for (const i of this.yWc.values()) {
      var t = this.Model?.GetRelation(i);
      if (t && t.Follower && t.Leader) {
        const s = t.Follower;
        s.dsd = true;
        if (s.msd) {
          s.msd.Remove();
        }
        s.msd = TimerSystem_1.FlowTimeTimerSystem.Delay(() => {
          if (s && (s.msd && (s.msd.Remove(), s.msd = undefined), s.ReleaseAllHands("邀请时未触发AN"), s.dsd = false, Log_1.Log.CheckError())) {
            Log_1.Log.Error("Character", 82, "[CharacterHoldingHandsComponent] Follower邀请接受AN未触发，退出牵手", ["follower", s.Entity.Id]);
          }
        }, 3000);
        break;
      }
    }
  }
  InvitationToBinding() {
    for (const n of this.yWc.values()) {
      var t = this.Model?.GetRelation(n);
      if (t && t.Follower && t.Leader) {
        const h = t.Follower;
        var i = t.Leader;
        if (h.msd) {
          h.msd.Remove();
          h.msd = undefined;
        }
        h.dsd = false;
        HoldingHandsController_1.HoldingHandsController.AddBinding(t.Key, i, h, t.LeaderHandType, true);
        i.cBe?.EndSkill(SKILL_ID_INVITATION_START, "牵手邀请结束");
        t.Leader.cBe?.BeginSkill(SKILL_ID_INVITATION_END, {
          Reason: "牵手邀请结束回到站立"
        });
        var t = h.ActorComp.ActorLocationProxy;
        var s = i.ActorComp.ActorLocationProxy;
        var e = i.cz;
        t.Subtraction(s, e);
        e.Normalize();
        e.MultiplyEqual(i.Params.InvitationEndDistance);
        s.Addition(e, h.YJo);
        h.Entity.GetComponent(102)?.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Walk);
        var t = {
          Index: 0,
          Position: h.YJo,
          MoveState: IComponent_1.EPatrolMoveState.Walk,
          MoveSpeed: i.Params.InvitationEndMoveSpeed
        };
        var s = {
          Points: [t],
          Navigation: false,
          IsFly: false,
          DebugMode: true,
          Loop: false,
          Callback: t => {
            if (t !== 1 && (h.MoveComp.StopMoveNew(), h.ReleaseAllHands("邀请时Follower移动失败"), Log_1.Log.CheckInfo())) {
              Log_1.Log.Info("Character", 82, "[CharacterHoldingHandsComponent] Follower无法走到结束邀请点，退出牵手", ["follower", h.Entity.Id]);
            }
          },
          ReturnTimeoutFailed: 2,
          ReturnFalseWhenNavigationFailed: false,
          Distance: i.Params.InvitationEndDistanceTolerance
        };
        h.MoveComp.MoveAlongPath(s);
        break;
      }
    }
  }
  OnInvitationAnimEnd() {
    for (const h of this.yWc.values()) {
      const o = this.Model?.GetRelation(h);
      if (o && o instanceof HoldingHandsUtils_1.Binding && o.Follower && o.Leader) {
        var t = o.Leader;
        var i = o.Follower;
        var s = t.ActorComp.ActorLocationProxy;
        var e = i.ActorComp.ActorLocationProxy;
        var n = this.cz;
        e.Subtraction(s, n);
        var e = t.ActorComp.ActorUpProxy;
        var s = this.fz;
        Vector_1.Vector.CrossProduct(n, e, s);
        s.Normalize();
        if (o.LeaderHandType === 0) {
          s.MultiplyEqual(-1);
        }
        i.w4u(s, 0);
        t.w4u(s, 0, () => {
          CharacterHoldingHandsComponent_1.gsd(o);
        });
        break;
      }
    }
  }
  static gsd(t) {
    var i;
    var s;
    if (t && t instanceof HoldingHandsUtils_1.Binding && t.Follower && t.Leader && (i = t.Leader, s = t.Follower, i.H1d && (i.H1d.Remove(), i.H1d = undefined), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ForceReleaseInput, "进入牵手状态"), i.OnEnterHoldingHands(t.LeaderHandType), s.OnEnterHoldingHands(t.FollowerHandType), s.KeepFollowingConfig)) {
      s.MoveComp?.MoveController.StartKeepFollowingWithDataAsset(i.ActorComp, s.KeepFollowingConfig, t.FollowerHandType);
    }
  }
  w4u(t, i, s = undefined) {
    var e = t.HeadingAngle() * MathUtils_1.MathUtils.RadToDeg;
    var n = this.ActorComp.ActorRotationProxy.Yaw;
    var e = (e = Math.abs(e - n)) > 180 ? 360 - e : e;
    if (e < i) {
      s?.();
    } else {
      this.ActorComp.SetInputFacing(t, true);
      this.ActorComp.SetOverrideTurnSpeed(this.Params.InvitationTurnSpeed);
      n = () => {
        s?.();
        this.ActorComp?.SetActorRotation(this.ActorComp.InputRotatorProxy.ToUeRotator(), "牵手邀请转向目标");
      };
      if (s) {
        i = e / this.Params.InvitationTurnSpeed * 1000 + (e > 45 ? 500 : 0);
        if (this.H1d?.Valid()) {
          this.H1d.Remove();
        }
        this.$1d = n;
        this.H1d = TimerSystem_1.FlowTimeTimerSystem.Delay(this.$1d, i);
      }
    }
  }
  W1d() {
    if (this.H1d?.Valid() && this.MoveComp?.HasMoveInput) {
      this.H1d.Remove();
      this.H1d = undefined;
      this.$1d?.();
      this.$1d = undefined;
    }
  }
  OnAddBinding(t, i, s = false) {
    this.yWc.set(t, i);
    i = this.GetHandRuntime(t);
    i.InBind = true;
    i.IkTarget ||= new HoldingHandsUtils_1.IkTarget();
    if (!s) {
      this.OnEnterHoldingHands(t);
    }
  }
  OnEnterHoldingHands(t) {
    var i = this.GetRoleState();
    if (i !== 0) {
      this.Q1d(false, i);
      this.K1d(true, i);
      if (i === 2) {
        this.MoveComp.CharacterMovement.HitPriority = this.Params.LeaderHitPriority;
        this.MoveComp.CharacterMovement.Mass = this.Params.LeaderMass;
      } else if (i === 1) {
        this.MoveComp.CharacterMovement.HitPriority = this.Params.FollowerHitPriority;
        this.MoveComp.CharacterMovement.Mass = this.Params.FollowerMass;
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CharHoldingHandsChanged, this.Entity.Id, true, i, t);
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharHoldingHandsChanged, this.Entity.Id, true, i, t);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Character", 42, "[CharacterHoldingHandsComponent] 进入牵手状态", ["entityId", this.Entity.Id], ["roleState", i], ["handType", t]);
      }
      if (this.aO1) {
        this.IWc();
      }
      this.TryAddEvents();
    }
  }
  ReleaseAllHands(t = "", i = false, s = true) {
    for (const e of this.yWc.values()) {
      HoldingHandsController_1.HoldingHandsController.RequestReleaseHands(e, t, i, s);
    }
  }
  OnDeleteRelation(t, i, s = true) {
    var e;
    var n = this.GetRelationByHand(t);
    this.yWc.delete(t);
    var n = n instanceof HoldingHandsUtils_1.Binding;
    if (n) {
      (e = this.GetHandRuntime(t)).InBind = false;
      e.TargetAlpha = 0;
      if (!s) {
        e.IkTarget.Alpha = 0;
      }
    }
    this.J3u(i, t, n);
  }
  J3u(t, i, s) {
    var e = t ? 2 : 1;
    this.K1d(false, e);
    this.Q1d(false, e);
    if (this.msd) {
      this.msd.Remove();
      this.msd = undefined;
    }
    if (this.H1d?.Valid()) {
      this.H1d.Remove();
      this.H1d = undefined;
    }
    this.dsd = false;
    if (t) {
      this.cBe?.EndSkill(SKILL_ID_INVITATION_START, "退出牵手");
    } else {
      this.MoveComp?.MoveController.StopKeepHoldingHands();
    }
    if (s && (this.OnReachable(false, i), this.MoveComp.SetInputMaxDegree(0), this.MoveComp.SetInputScale(1), this.MoveComp.ResetHitPriorityAndGoThrough(), this.MoveComp.ResetMass(), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CharHoldingHandsChanged, this.Entity.Id, false, e, i), EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharHoldingHandsChanged, this.Entity.Id, false, e, i), Log_1.Log.CheckInfo() && Log_1.Log.Info("Character", 42, "[CharacterHoldingHandsComponent] 退出牵手状态", ["entityId", this.Entity.Id], ["roleState", e], ["handType", i]), this.aO1)) {
      this.Eol();
    }
    this.TryRemoveEvents();
  }
  Q1d(t, i) {
    if (i === 2) {
      if (t) {
        for (const s of this.Params.InvitingTags) {
          this.Lie?.AddTag(s);
        }
      } else {
        for (const e of this.Params.InvitingTags) {
          this.Lie?.RemoveTag(e);
        }
      }
    }
  }
  K1d(t, i) {
    let s = undefined;
    if (i === 2) {
      s = this.Params.LeadingTags;
    } else if (i === 1) {
      s = this.Params.FollowingTags;
    }
    if (s) {
      if (t) {
        for (const e of s) {
          this.Lie?.AddTag(e);
        }
      } else {
        for (const n of s) {
          this.Lie?.RemoveTag(n);
        }
      }
    }
  }
  OnReachable(t, i) {
    var s = this.Params.ReachableTag;
    if (t) {
      this.Lie?.AddTag(s);
      this.Z3u(true, i);
    } else {
      this.Lie?.RemoveTag(s);
      this.Z3u(false, i);
    }
  }
  Z3u(t, i) {
    var s = i === 1 ? 135688342 : 205425647;
    if (t) {
      this.Lie?.AddTag(s);
    } else {
      this.Lie?.RemoveTag(s);
    }
    if (this.oRe) {
      if (i === 1) {
        this.oRe.EnableRightArmBlend = t;
      } else {
        this.oRe.EnableLeftArmBlend = t;
      }
    }
  }
  OnlyStopAiMove() {
    this.MoveComp?.MoveController.StopKeepHoldingHands();
  }
  OnlyStartAiMove() {
    var t = this.GetLeaderInfo();
    if (t && !(t.length < 2) && t[1] && t[1].ActorComp && this.KeepFollowingConfig && (this.MoveComp?.MoveController.StartKeepFollowingWithDataAsset(t[1].ActorComp, this.KeepFollowingConfig, t[0]), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Character", 45, "[CharacterHoldingHandsComponent]OnlyStartAiMove成功", ["entityId", this.Entity.Id]);
    }
  }
  TryAddEvents() {
    if (!this.Pgd) {
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSkillEnd, this.bJe);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharInterruptSkill, this.SWc);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.TeleportStart, this.bpr);
      if (this.aO1) {
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie);
      }
      this.Pgd = true;
    }
  }
  TryRemoveEvents() {
    if (this.Pgd) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSkillEnd, this.bJe);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharInterruptSkill, this.SWc);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.TeleportStart, this.bpr);
      if (this.aO1) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
      }
      this.Pgd = false;
    }
  }
  CheckObstacle(t) {
    return !!this.ActorComp && !!t.ActorComp && (this.TraceElement || this.CreateTraceElement(), this.cz.DeepCopy(this.ActorComp.ActorLocationProxy), this.fz.DeepCopy(this.ActorComp.ActorUpProxy), this.fz.MultiplyEqual(this.ActorComp.HalfHeight), this.cz.AdditionEqual(this.fz), TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.TraceElement, this.cz), this.cz.DeepCopy(t.ActorComp.ActorLocationProxy), this.fz.DeepCopy(t.ActorComp.ActorUpProxy), this.fz.MultiplyEqual(t.ActorComp.HalfHeight), this.cz.AdditionEqual(this.fz), TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.TraceElement, this.cz), TraceElementCommon_1.TraceElementCommon.SphereTrace(this.TraceElement, "CharacterHoldingHandsComponent.CheckBindingObstacle"));
  }
  CreateTraceElement() {
    this.TraceElement = UE.NewObject(UE.TraceSphereElement.StaticClass());
    this.TraceElement.bIsSingle = true;
    this.TraceElement.bIgnoreSelf = true;
    this.TraceElement.WorldContextObject = this.ActorComp.Owner;
    this.TraceElement.Radius = 10;
    this.TraceElement.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
    this.TraceElement.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStaticIgnoreBullet);
  }
  static LoadCommonParams() {
    var t = "/Game/Aki/Character/Role/Common/Data/DA/DA_HoldingHandsCommon.DA_HoldingHandsCommon";
    var i = ResourceSystem_1.ResourceSystem.Load(t, UE.BP_HoldingHandsConfig_C);
    if (i?.IsValid()) {
      i = new HoldingHandsParams(i);
      return CharacterHoldingHandsComponent_1.K3u = i;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 82, "[CharacterHoldingHandsComponent.LoadCommonParams] 获取牵手参数DA失败", ["DaPath", t]);
      }
      return new HoldingHandsParams();
    }
  }
  IWc() {
    if (this.Bhh) {
      this.Eol();
    }
    this.Bhh = InputController_1.InputController.CreateInputLayer(6);
    this.Bhh.Init(this);
    InputController_1.InputController.AddInputLayer(this.Entity.Id, this.Bhh);
  }
  Eol() {
    if (this.Bhh) {
      InputController_1.InputController.RemoveInputLayer(this.Bhh);
      this.Bhh.Clear();
      this.Bhh = undefined;
    }
  }
  GetLongPressDuration(t) {
    if (t !== InputEnums_1.EInputAction.技能1) {
      return 0;
    } else {
      return this.Params.LongPressDuration;
    }
  }
  IsHoldingAction(t) {
    return !!this.Bhh?.IsHoldingAction(t);
  }
  OnLeaderSitDown() {
    if (this.Xcd) {
      return this.Xcd;
    }
    for (const t of this.yWc.values()) {
      const i = this.Model?.GetRelation(t);
      if (i && i instanceof HoldingHandsUtils_1.Binding && i.Follower) {
        this.SetDisableInputTags(true);
        i.Follower.SetDisableInputTags(true);
        const s = ((this.Xcd = i).Follower.Xcd = i).Follower;
        const e = this.Entity.GetComponent(29);
        if (e) {
          e.OnLeaveSitDown = () => {
            if (!s.IsSitDown() && i) {
              HoldingHandsController_1.HoldingHandsController.AddBinding(i.Key, i.Leader, i.Follower, i.LeaderHandType);
            }
            e.OnLeaveSitDown = undefined;
          };
        }
        HoldingHandsController_1.HoldingHandsController.RequestReleaseHands(t, "坐下临时断开", false, false);
        return i;
      }
    }
  }
  OnLeaderStandUp() {
    this.SetDisableInputTags(false);
    this.Xcd.Follower.SetDisableInputTags(false);
    HoldingHandsController_1.HoldingHandsController.AddBinding(this.Xcd.Key, this.Xcd.Leader, this.Xcd.Follower, this.Xcd.LeaderHandType);
    this.Xcd.Follower.Xcd = undefined;
    this.Xcd = undefined;
  }
  IsSitDown() {
    var t = this.Entity.GetComponent(29);
    if (t) {
      return t.IsSitDown;
    } else {
      return !!(t = this.Entity.GetComponent(91)) && t.Phase !== 0;
    }
  }
  IsSitDownWithHoldingHands() {
    return !!this.Xcd && this.IsSitDown();
  }
  GetHoldingHandsOtherEntity() {
    var t;
    var i;
    if (this.IsSitDownWithHoldingHands()) {
      t = this.Xcd.Leader.Entity;
      i = this.Xcd.Follower.Entity;
      if (this.Entity === t) {
        return i;
      } else {
        return t;
      }
    }
    switch (this.GetRoleState()) {
      case 1:
        return this.GetLeaderInfo()[1].Entity;
      case 2:
        return this.GetFollowerInfo()[1].Entity;
    }
  }
  SetDisableInputTags(t = true) {
    if (this.Lie) {
      if (t) {
        for (const i of disableInputTagIds) {
          this.Lie?.AddTag(i);
        }
      } else {
        for (const s of disableInputTagIds) {
          this.Lie?.RemoveTag(s);
        }
      }
    }
  }
};
CharacterHoldingHandsComponent.K3u = undefined;
CharacterHoldingHandsComponent = CharacterHoldingHandsComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(297)], CharacterHoldingHandsComponent);
exports.CharacterHoldingHandsComponent = CharacterHoldingHandsComponent; //# sourceMappingURL=CharacterHoldingHandsComponent.js.map