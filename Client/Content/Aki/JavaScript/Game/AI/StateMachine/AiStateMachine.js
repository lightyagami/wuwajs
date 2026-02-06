"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineBase = exports.appendDepthSpace = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const StateMachineCommon_1 = require("../../../Core/Utils/StateMachine/StateMachineCommon");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const CombatMessage_1 = require("../../Module/CombatMessage/CombatMessage");
const CombatLog_1 = require("../../Utils/CombatLog");
const AiStateMachineTransition_1 = require("./AiStateMachineTransition");
function appendDepthSpace(i, s) {
  for (let t = 0; t < s; t++) {
    i.Append("    ");
  }
}
exports.appendDepthSpace = appendDepthSpace;
class AiStateMachineBase extends StateMachineCommon_1.StateMachineCommon {
  constructor(i, s, h) {
    super(i, h.Name, s);
    this.AiComponent = undefined;
    this.TagComponent = undefined;
    this.AttributeComponent = undefined;
    this.SkillComponent = undefined;
    this.ActorComponent = undefined;
    this.BuffComponent = undefined;
    this.MontageComponent = undefined;
    this.DeathComponent = undefined;
    this.AnimationComponent = undefined;
    this.HitComponent = undefined;
    this.TimeScaleComponent = undefined;
    this.GameplayCueComponent = undefined;
    this.MoveComponent = undefined;
    this.FightStateComponent = undefined;
    this.UnifiedStateComponent = undefined;
    this.FloatingComponent = undefined;
    this.AbilityComponent = undefined;
    this.AiController = undefined;
    this.SummonerAiController = undefined;
    this.IsReferenceNode = false;
    this.IsOverrideNode = false;
    this.IsConduitNode = false;
    this.IsAnimStateMachine = false;
    this.IsAnyStateNode = false;
    this.OverrideNodeUuid = 0;
    this.SkillId = 0;
    this.TakeControlType = 0;
    this.Task = undefined;
    this.OnEnterActions = undefined;
    this.OnExitActions = undefined;
    this.BindStates = undefined;
    this.Transitions = undefined;
    this.Children = undefined;
    this.ChildrenMap = undefined;
    this.AnyStateNode = undefined;
    this.ElapseTime = -0;
    this.SkillEnd = false;
    this.PRu = false;
    this.ExecutedAction = false;
    this.Entity = undefined;
    this.CurrentMessageIdCache = undefined;
    this.HasTaskFinishCondition = false;
    this.Hre = undefined;
    this.jre = false;
    this.WaitSwitchStateSet = new Set();
    this.RemoteSwitchPending = undefined;
    this.RemoteSwitchMessageId = undefined;
    this.jqn = undefined;
    this.Wqn = undefined;
    if (i.Entity && (this.Entity = i.Entity, this.AiComponent = this.Entity.GetComponent(50), this.TagComponent = this.Entity.GetComponent(217), this.AttributeComponent = this.Entity.GetComponent(184), this.SkillComponent = this.Entity.GetComponent(43), this.BuffComponent = this.Entity.GetComponent(185), this.ActorComponent = this.Entity.GetComponent(3), this.MontageComponent = this.Entity.GetComponent(25), this.DeathComponent = this.Entity.GetComponent(15), this.AnimationComponent = this.Entity.GetComponent(188), this.HitComponent = this.Entity.GetComponent(66), this.TimeScaleComponent = this.Entity.GetComponent(133), this.GameplayCueComponent = this.Entity.GetComponent(21), this.MoveComponent = this.Entity.GetComponent(189), this.FightStateComponent = this.Entity.GetComponent(60), this.UnifiedStateComponent = this.Entity.GetComponent(186), this.FloatingComponent = this.Entity.GetComponent(39), this.AbilityComponent = this.Entity.GetComponent(17), this.AiController = this.AiComponent.AiController, s = this.Entity.GetComponent(0).GetSummonerId())) {
      s = ModelManager_1.ModelManager.CreatureModel.GetEntity(s)?.Entity.GetComponent(50);
      this.SummonerAiController = s?.AiController;
    }
    this.Uuid = h.Uuid;
    this.Name = h.Name;
    s = i.NodeReferenceMap.get(h.Uuid);
    this.IsReferenceNode = !!s;
    this.OverrideNodeUuid = h.OverrideCommonUuid;
    this.IsOverrideNode = !!h.OverrideCommonUuid;
    this.IsConduitNode = h.IsConduitNode;
    this.IsAnimStateMachine = h.IsAnimStateMachine;
    this.IsAnyStateNode = h.IsAnyState;
    if (this.IsReferenceNode) {
      let t = this.Owner.GetNodeByUuid(s);
      t = t || new AiStateMachineBase(i, undefined, this.Owner.GetNodeData(s));
      this.jqn = t;
      this.Owner.RegisterNode(this);
    } else {
      this.TakeControlType = h.TakeControlType;
      this.BindStates = [];
      this.OnEnterActions = [];
      this.OnExitActions = [];
      if (h.Task) {
        this.Task = ModelManager_1.ModelManager.AiStateMachineModel.AiStateMachineFactory.CreateTask(this, h.Task);
      }
      if (h.BindStates?.length) {
        for (const f of h.BindStates) {
          var t = ModelManager_1.ModelManager.AiStateMachineModel.AiStateMachineFactory.CreateState(this, f);
          if (t) {
            this.BindStates.push(t);
          }
        }
      }
      if (h.OnEnterActions?.length) {
        for (const c of h.OnEnterActions) {
          var o = ModelManager_1.ModelManager.AiStateMachineModel.AiStateMachineFactory.CreateAction(this, c);
          if (o) {
            this.OnEnterActions.push(o);
          }
        }
      }
      if (h.OnExitActions?.length) {
        for (const M of h.OnExitActions) {
          var e = ModelManager_1.ModelManager.AiStateMachineModel.AiStateMachineFactory.CreateAction(this, M);
          if (e) {
            this.OnExitActions.push(e);
          }
        }
      }
      if (h.Children?.length) {
        this.Children = [];
        this.ChildrenMap = new Map();
        var n = h.Children.length;
        for (let t = 0; t < n; t++) {
          var a = new AiStateMachineBase(i, this, this.Owner.GetNodeData(h.Children[t]));
          this.Children.push(a);
          this.ChildrenMap.set(a.Name, a);
          this.AddStateInstance(a.Name, a);
          if (a.IsAnyStateNode) {
            this.AnyStateNode = a;
          }
        }
      }
      if (h.Transitions) {
        for (const S of h.Transitions) {
          var r;
          var d;
          var v = this.Owner.GetNodeByUuid(S.From);
          if (v) {
            if (r = this.Owner.GetNodeByUuid(S.To)) {
              if (d = new AiStateMachineTransition_1.AiStateMachineTransition(v, S)) {
                this.HasTaskFinishCondition ||= d.HasTaskFinishCondition;
                v.Transitions ||= [];
                v.Transitions.push(d);
              } else {
                CombatLog_1.CombatLog.Error("StateMachineNew", this.Entity, "初始化状态机失败，条件创建失败", ["node", this.Name], ["from", v.Name], ["to", r.Name]);
              }
            } else {
              CombatLog_1.CombatLog.Error("StateMachineNew", this.Entity, "初始化状态机失败，条件创建失败，to节点不存在", ["node", this.Name], ["to", S.To]);
            }
          } else {
            CombatLog_1.CombatLog.Error("StateMachineNew", this.Entity, "初始化状态机失败，条件创建失败，from节点不存在", ["node", this.Name], ["from", S.From]);
          }
        }
      }
      this.Owner.RegisterNode(this);
    }
  }
  get TaskFinished() {
    return this.PRu;
  }
  set TaskFinished(t) {
    this.PRu = t;
    EventSystem_1.EventSystem.EmitWithTarget(this, EventDefine_1.EEventName.OnStateTaskFinished, t);
  }
  get WaitSwitchState() {
    return this.WaitSwitchStateSet.size > 0;
  }
  get MappingNode() {
    var t;
    if (!this.jqn) {
      t = this.Owner.NodeReferenceMap.get(this.Uuid);
      this.jqn = this.Owner.GetNodeByUuid(t);
    }
    return this.jqn;
  }
  get CurrentLeafNode() {
    if (this.CurrentNode) {
      return this.CurrentNode.CurrentLeafNode;
    } else {
      return this;
    }
  }
  get RootNode() {
    return this.Root;
  }
  OnSwitchState(t, i) {
    this.Owner.SwitchStateFrequencyMonitor?.Execute();
    if (t) {
      t?.Name;
      t?.Uuid;
    }
    if (i) {
      i?.Name;
      i?.Uuid;
    }
  }
  OnClear() {
    if (this.Transitions && this.Transitions.length > 0) {
      for (const t of this.Transitions) {
        t.Clear();
      }
    }
    if (this.BindStates && this.BindStates.length > 0) {
      for (const i of this.BindStates) {
        i.Clear();
      }
    }
    if (this.OnEnterActions && this.OnEnterActions.length > 0) {
      for (const s of this.OnEnterActions) {
        s.Clear();
      }
    }
    if (this.OnExitActions && this.OnExitActions.length > 0) {
      for (const h of this.OnExitActions) {
        h.Clear();
      }
    }
    this.Task?.Clear();
    this.Task = undefined;
    this.AiComponent = undefined;
    this.TagComponent = undefined;
    this.AttributeComponent = undefined;
    this.SkillComponent = undefined;
    this.ActorComponent = undefined;
    this.BuffComponent = undefined;
    this.MontageComponent = undefined;
    this.DeathComponent = undefined;
    this.AnimationComponent = undefined;
    this.GameplayCueComponent = undefined;
    this.MoveComponent = undefined;
    this.AbilityComponent = undefined;
    this.TimeScaleComponent = undefined;
    this.HitComponent = undefined;
    this.UnifiedStateComponent = undefined;
    this.FightStateComponent = undefined;
    this.AiController = undefined;
    this.SummonerAiController = undefined;
    this.OnEnterActions = undefined;
    this.OnExitActions = undefined;
    this.BindStates = undefined;
    this.Transitions = undefined;
    this.Children = undefined;
    this.ChildrenMap = undefined;
  }
  OnActivate(t, i = false, s = 0) {
    EventSystem_1.EventSystem.EmitWithTarget(this, EventDefine_1.EEventName.OnStateActivated, true);
    if (this.IsReferenceNode) {
      this.MappingNode.ActiveByReferenceNode(this.Uuid);
    } else {
      this.ElapseTime = s;
      this.SkillEnd = false;
      this.TaskFinished = false;
      this.ExecutedAction = false;
      this.jre = false;
      if (this.Transitions) {
        for (const h of this.Transitions) {
          h.Enter();
        }
      }
      if (this.Task && (this.Task.OnActivate(), this.ShouldHandleState())) {
        this.Owner.SetCurrentTaskNode(this);
        this.Hre = this.FightStateComponent?.TrySwitchState(10, 0, i);
      }
      for (const o of this.BindStates) {
        o.OnActivate(t);
      }
    }
  }
  ShouldHandleState() {
    return !this.Task.CanBeInterrupt && !this.RootNode.IsAnimStateMachine;
  }
  Wre() {
    if (this.Hre) {
      this.FightStateComponent?.ConfirmState(this.Hre);
    }
    if (this.CurrentNode) {
      this.CurrentNode.Wre();
    }
  }
  OnDeactivate(t) {
    EventSystem_1.EventSystem.EmitWithTarget(this, EventDefine_1.EEventName.OnStateActivated, false);
    if (this.IsReferenceNode) {
      this.MappingNode.DeactiveByReferenceNode(this.Uuid);
    } else {
      this.ElapseTime = 0;
      this.SkillEnd = false;
      this.TaskFinished = false;
      this.ExecutedAction = false;
      if (this.Transitions) {
        for (const i of this.Transitions) {
          i.Exit();
        }
      }
      if (this.Task) {
        this.Task.OnDeactivate();
        this.Owner.RemoveCurrentTaskNode(this);
        if (this.Hre !== undefined) {
          this.FightStateComponent?.ExitState(this.Hre);
          this.Hre = undefined;
        } else if (this.ShouldHandleState()) {
          CombatLog_1.CombatLog.Warn("StateMachineNew", this.Entity, "状态机退出主状态Handle清理失败", ["node", this.Name], ["next node", t?.Name]);
        }
      }
      for (const s of this.BindStates) {
        s.OnDeactivate(t);
      }
    }
  }
  OnEnter(t) {
    if (!this.IsReferenceNode) {
      var i;
      var s = this.RootNode.Uuid;
      if (this.Task) {
        (i = Protocol_1.Aki.Protocol.x4n.create()).X4n = Protocol_1.Aki.Protocol.IFs.Proto_BT_Task;
        i.$4n = s;
        i.Y4n = this.Uuid;
        s = CombatMessage_1.CombatNet.Call(28830, this.Entity, i, t => {
          if (t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            CombatLog_1.CombatLog.Warn("StateMachineNew", this.Entity, `FsmStateBehaviorRequest 节点Task行为失败 [${this.Name}|${this.Uuid}]`, ["ErrorCode", t.Q4n]);
          }
        }, this.RootNode.CurrentMessageIdCache, undefined, undefined, true);
        this.Task.OnEnter(s);
        if (!this.Task.IsAsyncTask) {
          CombatMessage_1.CombatNet.RemovePendingCall(s);
        }
      }
      for (const h of this.OnEnterActions) {
        h.DoAction();
      }
      for (const o of this.BindStates) {
        o.OnEnter(t);
      }
      if (this.ActorComponent.IsAutonomousProxy) {
        this.ExecutedAction = true;
      }
    }
  }
  OnExit(t) {
    if (!this.IsReferenceNode) {
      this.Task?.OnExit();
      for (const i of this.OnExitActions) {
        i.DoAction();
      }
      for (const s of this.BindStates) {
        s.OnExit(t);
      }
    }
  }
  OnTick(t) {
    if (!this.IsReferenceNode) {
      this.ElapseTime += t;
      if (this.BindStates) {
        for (const i of this.BindStates) {
          i.Tick(t);
        }
      }
      this.Task?.Tick(t);
    }
  }
  TickTransition() {
    if (this.Transitions) {
      for (const t of this.Transitions) {
        t.Tick();
      }
      if (this.RootNode.IsAnimStateMachine) {
        if (this.ActorComponent.IsMoveAutonomousProxy) {
          for (const i of this.Transitions) {
            if (i.GetResult()) {
              this.TrySwitch(i.To);
              return;
            }
          }
        }
      } else if (!this.jre) {
        for (const s of this.Transitions) {
          if ((s.CanPrediction() && !this.RootNode.WaitSwitchState || this.IsConduitNode) && s.GetResult()) {
            this.TrySwitch(s.To);
            return;
          }
        }
      }
    }
    if (this.AnyStateNode) {
      this.AnyStateNode.TickTransition();
    }
    if (this.CurrentNode) {
      this.CurrentNode.TickTransition();
    }
  }
  OnControl() {
    if (this.TakeControlType === 1) {
      this.OnEnter();
      CombatLog_1.CombatLog.Info("StateMachineNew", this.Entity, "接管控制权，节点重入，执行相关行为", ["node", this.Name]);
    } else {
      if (this.ExecutedAction) {
        this.SkillEnd = true;
        this.TaskFinished = true;
      } else {
        this.OnEnter();
        CombatLog_1.CombatLog.Info("StateMachineNew", this.Entity, "接管控制权，状态未执行行为，执行相关行为", ["node", this.Name]);
      }
      if (this.CurrentNode) {
        this.CurrentNode.OnControl();
      }
    }
  }
  ActiveByReferenceNode(t) {
    this.Wqn ||= new Set();
    this.Wqn.add(t);
    if (!this.Activated) {
      this.Enter();
    }
  }
  DeactiveByReferenceNode(t) {
    this.Wqn.delete(t);
    if (this.Wqn && this.Wqn.size === 0) {
      this.Exit();
    }
  }
  ForceActive(t = true) {
    var i;
    if (this.Parent) {
      if (!(i = this.Parent).Activated) {
        i.ForceActive(t);
      }
      i.Switch(this.Name, t, true, false);
    } else {
      this.Enter(undefined, t, true, false);
    }
  }
  TrySwitch(s) {
    const h = this.Owner.GetNodeByUuid(s);
    var t = Protocol_1.Aki.Protocol.h4n.create();
    t.$4n = this.RootNode.Uuid;
    if (this.IsAnyStateNode) {
      t.J4n = this.Parent.CurrentNode.Uuid;
    } else {
      t.J4n = this.Uuid;
    }
    t.z4n = h.Uuid;
    this.Owner.AnyChange = true;
    const o = ModelManager_1.ModelManager.CombatMessageModel.GenMessageId();
    this.RootNode.WaitSwitchStateSet.add(o);
    this.RootNode.CurrentMessageIdCache = CombatMessage_1.CombatNet.Call(24518, this.Entity, t, t => {
      if (this.Owner?.Entity) {
        if (this.RootNode.WaitSwitchStateSet.has(o)) {
          if (t.fMs.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs || this.RootNode.IsAnimStateMachine) {
            this.Wre();
            this.RootNode.WaitSwitchStateSet.delete(o);
          } else {
            CombatLog_1.CombatLog.Warn("StateMachineNew", this.Entity, `客户端先行切换状态 失败 [${this.Name}|${this.Uuid}] => [${h?.Name}|${h?.Uuid}]`, ["ErrorCode", t.fMs]);
            if (this.RootNode.RemoteSwitchPending) {
              var i = this.Owner.GetNodeByUuid(this.RootNode.RemoteSwitchPending);
              if (!i) {
                return;
              }
              CombatLog_1.CombatLog.Warn("StateMachineNew", this.Entity, `切换远端搁置状态 [${i.Name}|${i.Uuid}]`);
              this.RootNode.CurrentMessageIdCache = this.RootNode.RemoteSwitchMessageId;
              i.ForceActive(true);
              this.RootNode.CurrentMessageIdCache = undefined;
              if (this.ActorComponent.IsAutonomousProxy) {
                (i = Protocol_1.Aki.Protocol.xe_.create()).$4n = this.RootNode.Uuid;
                i.Y4n = s;
                CombatMessage_1.CombatNet.Send(25497, this.Entity, i);
              }
            } else {
              if (t.OTs <= 0) {
                return;
              }
              i = this.Owner.GetNodeByUuid(t.OTs);
              if (!i) {
                return;
              }
              CombatLog_1.CombatLog.Warn("StateMachineNew", this.Entity, `回退状态 [${i.Name}|${i.Uuid}]`);
              i.ForceActive(false);
              i.jre = true;
            }
            this.RootNode.WaitSwitchStateSet.clear();
          }
          this.RootNode.RemoteSwitchPending = undefined;
        } else {
          CombatLog_1.CombatLog.Warn("StateMachineNew", this.Entity, `客户端先行切换状态 失败，前置先行失败[${this.Name}|${this.Uuid}] => [${h?.Name}|${h?.Uuid}]`);
        }
      } else {
        CombatLog_1.CombatLog.Info("StateMachineNew", this.Entity, `客户端先行切换状态 失败，实体已被销毁 [${this.Name}|${this.Uuid}] => [${h?.Name}|${h?.Uuid}]`);
      }
    }, undefined, o);
    CombatLog_1.CombatLog.Info("StateMachineNew", this.Entity, "客户端先行切换状态", ["from", this.Name], ["to", h.Name]);
    this.Parent.Switch(h.Name, true, true, true);
    this.RootNode.CurrentMessageIdCache = undefined;
  }
  SetExecutedAction() {
    this.Task?.OnExecuted();
    if (this.BindStates?.length) {
      for (const t of this.BindStates) {
        t.OnExecuted();
      }
    }
    this.ExecutedAction = true;
    if (this.CurrentNode) {
      this.CurrentNode.SetExecutedAction();
    }
    CombatLog_1.CombatLog.Info("StateMachineNew", this.Entity, "状态切换行为执行通知", ["node", this.Name]);
  }
  HandleServerDebugInfo(t) {
    if (this.Transitions) {
      for (const i of t.XTs) {
        for (const s of this.Transitions) {
          if (s.To === i.YTs) {
            s.HandleServerDebugInfo(i.JTs);
          }
        }
      }
    }
  }
  OnCharSkillEnd(t) {
    if (this.Activated && this.SkillId === t) {
      this.SkillEnd = true;
      this.TaskFinished = true;
      CombatLog_1.CombatLog.Info("StateMachineNew", this.Entity, `监听技能完成 [${this.Name}]`);
    }
  }
  ToString(i, s, h = 0, o = false, e = false) {
    if (this.WaitSwitchState) {
      i.Append(">>> 等待服务器确认切换状态 <<<\n");
    }
    appendDepthSpace(i, h);
    i.Append(`${this.Name}|${this.Uuid}${this.Activated ? " <<<" : ""}\n`);
    if (this.Transitions && this.Transitions.length > 0 && (this.Activated || this.IsAnyStateNode)) {
      s.Append("-------------------------------------------------------------\n");
      s.Append(`${this.Name} [持续时长:${(this.ElapseTime / 1000).toFixed(1)}]\n`);
      for (const a of this.Transitions) {
        appendDepthSpace(s, 1);
        var t = this.Owner.GetNodeByUuid(a.To);
        if (t) {
          s.Append(`目标：${t.Name} | ${t.Uuid}
`);
          a.Condition.ToString(s, 2);
        } else {
          s.Append(`错误下标：${a.To}
`);
        }
      }
      s.Append("-------------------------------------------------------------\n");
    }
    var n = this.Children?.length;
    if (this.Children && n && n > 0) {
      for (let t = 0; t < n; t++) {
        this.Children[t].ToString(i, s, h + 1, o, e);
      }
    }
  }
  GetCurrentStateString() {
    let i = this.Name;
    if (this.WaitSwitchState) {
      i = "[先行]" + i;
    }
    var s = this.Children?.length ?? 0;
    for (let t = 0; t < s; t++) {
      if (this.Children[t].Activated) {
        i += "->" + this.Children[t].GetCurrentStateString();
      }
    }
    return i;
  }
}
exports.AiStateMachineBase = AiStateMachineBase;
//# sourceMappingURL=AiStateMachine.js.map