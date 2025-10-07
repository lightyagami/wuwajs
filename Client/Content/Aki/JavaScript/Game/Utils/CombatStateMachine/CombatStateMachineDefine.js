"use strict";

var Fsm;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fsm = undefined;
(function (s) {
  s.Task = class t {
    constructor() {
      this.Type = 0;
      this.CanBeInterrupt = false;
      this.Name = undefined;
    }
  };
  s.TaskSkill = class c {
    constructor() {
      this.SkillId = 0;
    }
  };
  s.TaskSkillByName = class i {
    constructor() {
      this.SkillName = "";
    }
  };
  s.TaskRandomMontage = class o {
    constructor() {
      this.MontageNames = undefined;
      this.HideOnLoading = false;
      this.BlendInTime = 0;
      this.RandomByClient = false;
    }
  };
  s.TaskLeaveFight = class h {
    constructor() {
      this.BlinkTime = 0;
      this.MaxStopTime = 0;
      this.UsePatrolPointPriority = false;
    }
  };
  s.TaskMontage = class r {
    constructor() {
      this.MontageName = "";
      this.HideOnLoading = false;
      this.BlendInTime = 0;
    }
  };
  s.TaskMoveToTarget = class a {
    constructor() {
      this.TargetType = 0;
      this.MoveState = 0;
      this.EndDistance = 0;
      this.TurnSpeed = 0;
      this.WalkOff = false;
    }
  };
  s.TaskPatrol = class l {
    constructor() {
      this.MoveState = 0;
      this.OpenDebugMode = false;
    }
  };
  s.TaskBeHitMontage = class u {
    constructor() {
      this.DefaultMontageName = "";
      this.MontageMap = [];
      this.BlendInTime = 0;
    }
  };
  s.TaskGroupPatrol = class n {};
  s.Action = class v {
    constructor() {
      this.Type = 0;
      this.Name = undefined;
    }
  };
  s.ActionAddBuff = class d {
    constructor() {
      this.BuffId = 0;
    }
  };
  s.ActionRemoveBuff = class e {
    constructor() {
      this.BuffId = 0;
    }
  };
  s.ActionCastSkill = class p {
    constructor() {
      this.SkillId = 0;
    }
  };
  s.ActionCancelSkill = class x {
    constructor() {
      this.SkillId = 0;
    }
  };
  s.ActionResetStatus = class m {};
  s.ActionEnterFight = class F {};
  s.ActionCastSkillByName = class _ {
    constructor() {
      this.SkillName = "";
    }
  };
  s.ActionCancelSkillByName = class b {
    constructor() {
      this.SkillName = "";
    }
  };
  s.ActionInstChangeStateTag = class f {
    constructor() {
      this.TagId = 0;
    }
  };
  s.ActionResetPart = class j {
    constructor() {
      this.PartName = "";
      this.ResetActivate = false;
      this.ResetLife = false;
    }
  };
  s.ActionActivatePart = class M {
    constructor() {
      this.PartName = "";
      this.Activate = false;
    }
  };
  s.ActionActivateSkillGroup = class O {
    constructor() {
      this.ConfigId = 0;
      this.Activate = false;
    }
  };
  s.ActionDispatchEvent = class g {
    constructor() {
      this.Event = "";
    }
  };
  s.ActionCue = class k {
    constructor() {
      this.CueIds = undefined;
    }
  };
  s.ActionStopMontage = class q {
    constructor() {
      this.BlendOutTime = 0;
    }
  };
  s.ActionExitHit = class w {};
  s.ActionSendGameplayEvent = class y {
    constructor() {
      this.TagId = 0;
    }
  };
  s.State = class z {
    constructor() {
      this.Type = 0;
      this.Name = undefined;
    }
  };
  s.BindBuff = class A {
    constructor() {
      this.BuffId = 0;
    }
  };
  s.BindSkill = class B {
    constructor() {
      this.SkillId = 0;
    }
  };
  s.BindTag = class C {
    constructor() {
      this.TagId = 0;
    }
  };
  s.BindSkillByName = class D {
    constructor() {
      this.SkillName = "";
    }
  };
  s.BindSkillCounter = class E {
    constructor() {
      this.SkillIds = undefined;
      this.BlackboardKey = "";
      this.AddValueMin = 0;
      this.AddValueMax = 0;
      this.Reset = false;
    }
  };
  s.BindDelaySuicide = class G {
    constructor() {
      this.SuicideDelay = 0;
      this.DestroyDelay = 0;
    }
  };
  s.BindActivateSkillGroup = class H {
    constructor() {
      this.ConfigId = 0;
    }
  };
  s.BindAiHateConfig = class I {
    constructor() {
      this.ConfigId = 0;
    }
  };
  s.BindAiSenseEnable = class J {
    constructor() {
      this.ConfigId = 0;
    }
  };
  s.BindCue = class K {
    constructor() {
      this.CueIds = undefined;
      this.HideOnLoading = false;
    }
  };
  s.BindDisableActor = class L {};
  s.BindLeaveFight = class N {
    constructor() {
      this.RandomRadius = 0;
      this.MinWanderDistance = 0;
      this.MaxNavigationMillisecond = 0;
      this.MoveStateForWanderOrReset = false;
      this.MaxStopTime = 0;
      this.BlinkTime = 0;
      this.UsePatrolPointPriority = false;
    }
  };
  s.BindMontage = class P {
    constructor() {
      this.MontageName = "";
      this.HideOnLoading = false;
    }
  };
  s.BindBoneVisible = class Q {
    constructor() {
      this.BoneName = "";
      this.Visible = false;
    }
  };
  s.BindMeshVisible = class R {
    constructor() {
      this.Tag = "";
      this.Visible = false;
      this.PropagateToChildren = false;
    }
  };
  s.BindBoneCollision = class S {
    constructor() {
      this.BoneName = "";
      this.IsBlockPawn = false;
      this.IsBulletDetect = false;
      this.IsBlockCamera = false;
      this.IsBlockPawnOnExit = false;
      this.IsBulletDetectOnExit = false;
      this.IsBlockCameraOnExit = false;
    }
  };
  s.BindPartPanelVisible = class T {
    constructor() {
      this.PartName = "";
      this.Visible = false;
    }
  };
  s.BindDeathMontage = class U {
    constructor() {
      this.DeathType = 0;
      this.MontageName = "";
    }
  };
  s.BindPalsy = class V {
    constructor() {
      this.CounterAttackEffect = "";
      this.CounterAttackCamera = "";
    }
  };
  s.BindCollisionChannel = class W {
    constructor() {
      this.IgnoreChannels = undefined;
    }
  };
  s.BindDisableCollision = class X {};
  s.Condition = class Y {
    constructor() {
      this.Type = 0;
      this.Reverse = false;
      this.Index = 0;
      this.Name = undefined;
    }
  };
  s.CondAnd = class Z {
    constructor() {
      this.Conditions = undefined;
    }
  };
  s.CondOr = class $ {
    constructor() {
      this.Conditions = undefined;
    }
  };
  s.CondTrue = class ss {};
  s.CondHpLessThan = class ts {
    constructor() {
      this.HpRatio = 0;
    }
  };
  s.CondSkillEnd = class cs {};
  s.CondTag = class is {
    constructor() {
      this.TagId = 0;
      this.TagName = "";
    }
  };
  s.CondBBValueCompare = class os {
    constructor() {
      this.Key1 = 0;
      this.Key2 = 0;
      this.Compare = 0;
    }
  };
  s.CondAttrCompare = class hs {
    constructor() {
      this.Attr1 = 0;
      this.Attr2 = 0;
      this.Compare = 0;
    }
  };
  s.CondAttribute = class rs {
    constructor() {
      this.AttributeId = 0;
      this.Min = 0;
      this.Max = 0;
    }
  };
  s.CondAttributeRate = class as {
    constructor() {
      this.AttributeId = 0;
      this.Denominator = 0;
      this.Min = 0;
      this.Max = 0;
    }
  };
  s.CondCheckState = class ls {
    constructor() {
      this.TargetState = 0;
    }
  };
  s.CondHate = class us {};
  s.CondTimer = class ns {
    constructor() {
      this.MinTime = 0;
      this.MaxTime = 0;
    }
  };
  s.CondWaitClient = class vs {};
  s.CondCheckStateByName = class ds {
    constructor() {
      this.TargetStateName = "";
    }
  };
  s.CondInstStateChange = class es {
    constructor() {
      this.TagId = 0;
    }
  };
  s.CondBuffStack = class ps {
    constructor() {
      this.BuffId = 0;
      this.MinStack = 0;
      this.MaxStack = 0;
    }
  };
  s.CondPartLife = class xs {
    constructor() {
      this.PartName = "";
      this.CheckRate = false;
      this.Min = 0;
      this.Max = 0;
    }
  };
  s.CondCheckPartActivated = class ms {
    constructor() {
      this.PartName = "";
    }
  };
  s.CondListenEvent = class Fs {
    constructor() {
      this.Event = "";
    }
  };
  s.CondCheckPositionState = class _s {
    constructor() {
      this.PositionState = 0;
    }
  };
  s.CondTaskFinish = class bs {};
  s.CondMontageTimeRemaining = class fs {
    constructor() {
      this.Time = 0;
    }
  };
  s.CondListenBeHit = class js {
    constructor() {
      this.NoHitAnimation = false;
      this.SoftKnock = false;
      this.HeavyKnock = false;
      this.KnockUp = false;
      this.KnockDown = false;
      this.Parry = false;
      this.VisionCounterAttackId = 0;
    }
  };
  s.CondHasMoveInput = class Ms {};
  s.CondCheckGroupPatrol = class Os {};
  s.CondMontageTimeElapsing = class gs {
    constructor() {
      this.Time = 0;
    }
  };
  s.CondCheckLastState = class ks {
    constructor() {
      this.TargetStateName = "";
    }
  };
  s.CondCheckDissolveCombine = class qs {};
  s.Transition = class ws {
    constructor() {
      this.From = 0;
      this.To = 0;
      this.TransitionPredictionType = undefined;
      this.Weight = 0;
      this.Conditions = undefined;
    }
  };
  s.Node = class ys {
    constructor() {
      this.Uuid = 0;
      this.ReferenceUuid = undefined;
      this.OverrideCommonUuid = undefined;
      this.IsAnimStateMachine = false;
      this.IsConduitNode = false;
      this.IsAnyState = false;
      this.Name = "";
      this.TakeControlType = 0;
      this.TransitionRule = 0;
    }
  };
  s.StateMachineGroup = class zs {
    constructor() {
      this.Version = undefined;
      this.StateMachines = undefined;
      this.Nodes = undefined;
    }
  };
})(Fsm = exports.Fsm ||= {}); //# sourceMappingURL=CombatStateMachineDefine.js.map