"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineGroup = undefined;
const Time_1 = require("../../../Core/Common/Time");
const AiBaseById_1 = require("../../../Core/Define/ConfigQuery/AiBaseById");
const AiStateMachineConfigById_1 = require("../../../Core/Define/ConfigQuery/AiStateMachineConfigById");
const RoleBeHitMapAll_1 = require("../../../Core/Define/ConfigQuery/RoleBeHitMapAll");
const RoleBeHitMapById_1 = require("../../../Core/Define/ConfigQuery/RoleBeHitMapById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const StringBuilder_1 = require("../../../Core/Utils/StringBuilder");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const CombatMessage_1 = require("../../Module/CombatMessage/CombatMessage");
const CharacterStateMachineNewComponent_1 = require("../../NewWorld/Character/Common/Component/CharacterStateMachineNewComponent");
const PreloadDefine_1 = require("../../Preload/PreloadDefine");
const CombatLog_1 = require("../../Utils/CombatLog");
const FrequencyMonitor_1 = require("../../Utils/FrequencyMonitor");
const AiStateMachine_1 = require("./AiStateMachine");
const AiStateMachineTaskSkill_1 = require("./Task/AiStateMachineTaskSkill");
const MAX_SWITCH_STATE_COUNT = 5;
const COMMON_ROLE_STATE_MACHINE = "SM_RoleBeHit";
class AiStateMachineGroup {
  constructor(t) {
    this.Kre = 0;
    this.Qre = 0;
    this.Xre = 0;
    this.$re = 0;
    this.Entity = undefined;
    this.StateMachineComp = undefined;
    this.ActorComp = undefined;
    this.Yre = undefined;
    this.Jre = undefined;
    this.NodeMap = undefined;
    this.NodeMapByName = undefined;
    this.NodeDataMap = undefined;
    this.NodeReferenceMap = undefined;
    this.NodeOverrideMap = undefined;
    this.StateMachines = undefined;
    this.StateMachineMap = undefined;
    this.SwitchStateFrequencyMonitor = undefined;
    this.LastActivatedStates = undefined;
    this.Inited = false;
    this.StateMachinesActivated = false;
    this.AnyChange = false;
    this.Rjd = 0;
    this.wjd = false;
    this.zre = undefined;
    this.ErrorMessage = undefined;
    this.OnDeath = () => {
      var t = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(this.Entity);
      if (t?.EntityType !== Protocol_1.Aki.Protocol.kks.Proto_Player && this.StateMachinesActivated) {
        for (const i of this.StateMachines) {
          if (i.Activated) {
            i.Exit();
          }
        }
        this.StateMachinesActivated = false;
      }
    };
    this.OnTeleport = t => {
      this.xd_();
    };
    this.OnBeforeAttachVehicle = () => {
      this.xd_();
    };
    this.OnRoleGoDown = t => {
      if (this.Entity.Id === t) {
        this.xd_();
      }
    };
    this.Zre = (t, i) => {
      if (this.zre.size > 0) {
        for (const e of this.zre) {
          if (e.Task instanceof AiStateMachineTaskSkill_1.AiStateMachineTaskSkill && e.Task.SkillId === i) {
            break;
          }
          CombatLog_1.CombatLog.Warn("StateMachineNew", this.Entity, "主状态激活时，不应该释放其他技能", ["主状态节点", e.Name], ["技能Id", i]);
          break;
        }
      }
    };
    this.ene = (t, i) => {
      if (this.StateMachines?.length) {
        for (const e of this.StateMachines) {
          e.CurrentLeafNode.OnCharSkillEnd(i);
        }
      }
    };
    this.Ljd = (t, i) => {
      if (t) {
        this.Rjd = this.Rjd + 1;
      } else {
        this.Rjd = this.Rjd - 1;
        if (this.Rjd <= 0 && this.wjd) {
          this.wjd = false;
          this.TickStateMachine(true, "SMTickUnlock");
        }
      }
    };
    this.EF_ = new Set();
    this.tne = 0;
    this.zre = new Set();
    if (t) {
      this.Entity = t.Entity;
      this.StateMachineComp = t;
      this.ActorComp = t.Entity.GetComponent(3);
      t = t.Entity.GetComponent(0);
      this.SwitchStateFrequencyMonitor = new FrequencyMonitor_1.FrequencyMonitor(1, 10, "状态机切换", ["PbDataId", t.GetPbDataId()]);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf, this.OnDeath);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSkillEnd, this.ene);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharUseSkill, this.Zre);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.TeleportStartEntity, this.OnTeleport);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnBeforeAttachVehicle, this.OnBeforeAttachVehicle);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.ConditionDrivenSMTickLock, this.Ljd);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleGoDown, this.OnRoleGoDown);
    }
  }
  SetCurrentTaskNode(t) {
    this.zre.add(t);
    if (this.zre.size > 1) {
      const i = new Array();
      this.zre.forEach(t => {
        i.push(t.Name);
      });
      CombatLog_1.CombatLog.Warn("StateMachineNew", this.Entity, "多个主状态节点激活，请保持主状态节点激活唯一", ["已激活主状态节点", i.join(", ")]);
    }
  }
  RemoveCurrentTaskNode(t) {
    this.zre.delete(t);
  }
  IsCurrentTaskSkill(t) {
    if (this.zre) {
      for (const i of this.zre) {
        if (i.Task instanceof AiStateMachineTaskSkill_1.AiStateMachineTaskSkill && i.Task.SkillId === t) {
          return true;
        }
      }
    }
    return false;
  }
  PushErrorMessage(t) {
    CombatLog_1.CombatLog.Error("StateMachineNew", this.Entity, t);
    this.ErrorMessage ||= new StringBuilder_1.StringBuilder();
    this.ErrorMessage.Append(t);
    this.ErrorMessage.Append("\n");
  }
  GetNodeData(t) {
    var i = this.NodeOverrideMap.get(t);
    if (i === undefined) {
      return this.NodeDataMap.get(t);
    } else {
      return this.NodeDataMap.get(i);
    }
  }
  GetBlackboard(t) {
    return this.Yre.get(t);
  }
  GetCustomBlackboard(t) {
    return this.Jre?.get(t);
  }
  RegisterNode(t) {
    var i;
    if (!t.IsAnyStateNode && !(this.NodeMap.set(t.Uuid, t), t.IsReferenceNode)) {
      this.NodeMapByName.set(t.Name, t);
      if (t.IsOverrideNode) {
        i = t.OverrideNodeUuid;
        i = this.NodeDataMap.get(i);
        this.NodeMapByName.set(i.Name, t);
      }
    }
  }
  InitFsmJson() {
    let i = undefined;
    var t = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(this.Entity);
    if ([Protocol_1.Aki.Protocol.kks.Proto_Monster, Protocol_1.Aki.Protocol.kks.Proto_Vision].includes(t.EntityType)) {
      var e = (this.Entity?.GetComponent(0)).GetPbEntityInitData();
      let t = 0;
      var e = (t = e?.ComponentsData && (e = (0, IComponent_1.getComponent)(e.ComponentsData, "AiComponent"))?.AiId && !e.Disabled ? e.AiId : t) ? AiBaseById_1.configAiBaseById.GetConfig(t) : undefined;
      i = e?.StateMachine;
    } else if (t?.EntityType === Protocol_1.Aki.Protocol.kks.Proto_Player) {
      i = COMMON_ROLE_STATE_MACHINE;
      var s = this.Entity?.GetComponent(0)?.GetRoleId();
      var e = RoleBeHitMapAll_1.configRoleBeHitMapAll.GetConfigList();
      if (s && s > 0 && e) {
        for (const o of e) {
          if (o.Id === s) {
            i = RoleBeHitMapById_1.configRoleBeHitMapById.GetConfig(s).StateMachineName;
            break;
          }
        }
      }
    }
    if (i && (t = AiStateMachineConfigById_1.configAiStateMachineConfigById.GetConfig(i))?.StateMachineJson) {
      e = JSON.parse(t.StateMachineJson);
      (t = this.Entity.GetComponent(79)).StateMachineName = i;
      t.StateMachineJsonObject = e;
    }
    return true;
  }
  OnActivate() {
    if (PreloadDefine_1.PreloadSetting.UseNewPreload) {
      this.InitFsmJson();
    }
    var t = this.StateMachineComp.StateMachineJsonObject;
    var i = ConfigManager_1.ConfigManager.AiConfig.CommonStateMachineJsonObject;
    if (i && t) {
      this.Kre = i.Version;
      this.Qre = t.Version;
      this.NodeDataMap = new Map();
      this.NodeReferenceMap = new Map();
      this.NodeOverrideMap = new Map();
      this.LastActivatedStates = new Set();
      for (const s of i.Nodes) {
        this.NodeDataMap.set(s.Uuid, s);
        if (s.ReferenceUuid) {
          this.NodeReferenceMap.set(s.Uuid, s.ReferenceUuid);
        }
      }
      for (const o of t.Nodes) {
        this.NodeDataMap.set(o.Uuid, o);
      }
      for (const h of t.Nodes) {
        if (h.OverrideCommonUuid) {
          this.NodeOverrideMap.set(h.OverrideCommonUuid, h.Uuid);
        }
        if (h.ReferenceUuid) {
          this.NodeReferenceMap.set(h.Uuid, h.ReferenceUuid);
        }
      }
      this.StateMachines = [];
      this.NodeMap = new Map();
      this.NodeMapByName = new Map();
      this.StateMachineMap = new Map();
      this.Yre = new Map();
      this.Jre = new Map();
      for (const n of t.StateMachines) {
        let t = this.GetNodeData(n);
        if (!(t = t.ReferenceUuid ? this.GetNodeData(t.ReferenceUuid) : t)) {
          CombatLog_1.CombatLog.Error("StateMachineNew", this.Entity, "状态机初始化失败，不存在状态机", ["stateMachineId", n]);
          return;
        }
        var e = new AiStateMachine_1.AiStateMachineBase(this, undefined, t);
        if (!e.IsReferenceNode) {
          this.StateMachines.push(e);
        }
      }
      for (const a of this.NodeReferenceMap.values()) {
        const r = this.NodeMap.get(a);
        if (!this.StateMachines.find(t => t === r)) {
          this.StateMachines.push(r);
        }
      }
      CombatLog_1.CombatLog.Info("StateMachineNew", this.Entity, "初始化状态机-成功");
      this.Inited = true;
      this.StartStateMachines();
      if (this.ActorComp.IsAutonomousProxy) {
        this.OnControl();
      }
      this.OnTick(0);
    }
  }
  StartStateMachines() {
    var t = this.Entity.GetComponent(0).ComponentDataMap.get("Uys")?.Uys;
    if (t?.NTs && t.NTs.length > 0) {
      this.Xre = Number(t.VTs);
      this.$re = Number(t.FTs);
      if (this.Qre !== this.$re) {
        CombatLog_1.CombatLog.Warn("StateMachineNew", this.Entity, "实体状态机与服务器版本不一致", ["客户端", this.Qre], ["服务器", this.$re]);
      }
      if (this.Kre !== this.Xre) {
        CombatLog_1.CombatLog.Warn("StateMachineNew", this.Entity, "公共状态机与服务器版本不一致", ["客户端", this.Kre], ["服务器", this.Xre]);
      }
      if (this.Inited) {
        if (t.$Ts) {
          for (const i of t.$Ts) {
            this.Yre.set(i.Z4n, i.e5n);
          }
        }
        if (t.HTs?.WTs) {
          for (const e of t.HTs.WTs) {
            CombatLog_1.CombatLog.Warn("StateMachineNew", this.Entity, "初始化黑板值", ["Key", e.Z4n], ["Value", e.e5n]);
            this.Jre.set(e.Z4n, e.e5n);
          }
        }
        for (const s of t.NTs) {
          this.StartState(s.$4n, s.OTs, s.kTs);
        }
        this.StateMachinesActivated = true;
      }
    } else {
      CombatLog_1.CombatLog.Error("StateMachineNew", this.Entity, "状态机初始化失败，服务器实体没有相关初始状态");
    }
  }
  xd_() {
    for (const t of this.StateMachines) {
      if (t.IsAnimStateMachine) {
        t.Switch(t.FirstState, true, true, true);
      }
    }
  }
  HandleBlackboard(t) {
    CombatLog_1.CombatLog.Info("StateMachineNew", this.Entity, "HandleBlackboard");
    if (t.jTs) {
      for (const i of t.jTs) {
        CombatLog_1.CombatLog.Info("StateMachineNew", this.Entity, "set", ["key", i.Z4n], ["value", i.e5n]);
        this.Yre.set(i.Z4n, i.e5n);
      }
    }
  }
  HandleCustomBlackboard(t) {
    CombatLog_1.CombatLog.Info("StateMachineNew", this.Entity, "HandleCustomBlackboard");
    if (t.HTs?.WTs) {
      for (const i of t.HTs.WTs) {
        CombatLog_1.CombatLog.Info("StateMachineNew", this.Entity, "set", ["key", i.Z4n], ["value", i.e5n]);
        this.Jre.set(i.Z4n, i.e5n);
      }
    }
  }
  Clear() {
    if (this.StateMachines) {
      for (const t of this.StateMachines) {
        t.Clear();
      }
    }
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf, this.OnDeath);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSkillEnd, this.ene);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharUseSkill, this.Zre);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.TeleportStartEntity, this.OnTeleport);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnBeforeAttachVehicle, this.OnBeforeAttachVehicle);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.ConditionDrivenSMTickLock, this.Ljd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleGoDown, this.OnRoleGoDown);
    this.SwitchStateFrequencyMonitor = undefined;
    this.StateMachinesActivated = false;
    this.Entity = undefined;
    this.StateMachineComp = undefined;
    this.ActorComp = undefined;
    this.Yre = undefined;
    this.Jre = undefined;
    this.NodeMap = undefined;
    this.NodeMapByName = undefined;
    this.NodeDataMap = undefined;
    this.NodeReferenceMap = undefined;
    this.StateMachines = undefined;
    this.StateMachineMap = undefined;
    this.ErrorMessage = undefined;
    this.zre = undefined;
    this.LastActivatedStates = undefined;
  }
  RegisterBeHitEvent(t) {
    if (this.EF_.has(t)) {
      CombatLog_1.CombatLog.Error("StateMachineNew", this.Entity, "状态机重复监听受击");
    }
    this.EF_.add(t);
  }
  UnregisterBeHitEvent(t) {
    this.EF_.delete(t);
  }
  TriggerBeHitStateMachine(t, i, e) {
    let s = false;
    for (const o of this.EF_) {
      o(t, i, e);
      s = true;
    }
    if (s) {
      this.OnTick(0);
    }
  }
  TickStateMachine(t, i = "", e = "") {
    if (CharacterStateMachineNewComponent_1.CharacterStateMachineNewComponent.EventDrivenOn) {
      if (this.Rjd > 0) {
        this.wjd = true;
      } else {
        CombatLog_1.CombatLog.Info("StateMachineNew", this.Entity, "AiStateMachineGroup TickStateMachine", ["entity", this.Entity], ["signal result", t], ["from condition", i], ["from node", e]);
        if (t) {
          this.OnTick(0);
        }
      }
    }
  }
  OnTick(t) {
    if (this.StateMachinesActivated) {
      for (const e of this.StateMachines) {
        if (e.Activated) {
          e.Tick(t);
          let i = false;
          for (let t = 0; t < MAX_SWITCH_STATE_COUNT && (!(t > 0) || i); t++) {
            t;
            this.AnyChange = false;
            e.TickTransition();
            i = this.AnyChange && (e.IsAnimStateMachine || e.CurrentLeafNode.IsConduitNode);
          }
        }
      }
      this.LastActivatedStates.clear();
      for (const i of this.StateMachines) {
        let t = i;
        while (this.LastActivatedStates.add(t.Name), t = t.CurrentNode);
      }
    }
  }
  GetNodeByUuid(t) {
    var i;
    if (this.NodeMap) {
      if ((i = this.NodeOverrideMap.get(t)) === undefined) {
        return this.NodeMap.get(t);
      } else {
        return this.NodeMap.get(i);
      }
    }
  }
  GetNodeByName(t) {
    if (this.NodeMapByName) {
      return this.NodeMapByName.get(t);
    }
  }
  CheckLastActivatedNode(t) {
    return this.LastActivatedStates.has(t);
  }
  CheckAnyMontageTaskRunning(t) {
    for (var i of this.StateMachines) {
      if (i !== t) {
        while (i) {
          var e = i.Task;
          if (e && (e.Type === 102 || e.Type === 3 || e.Type === 105)) {
            return true;
          }
          i = i.CurrentNode;
        }
      }
    }
    return false;
  }
  RequestServerDebugInfo() {
    if (!(Time_1.Time.NowSeconds < this.tne + 1)) {
      Net_1.Net.Call(19535, Protocol_1.Aki.Protocol.tes.create({
        F4n: this.ActorComp.CreatureData.GetCreatureDataId()
      }), t => {
        this.HandleEntityFsmGroupInfo(t);
      });
      this.tne = Time_1.Time.NowSeconds;
    }
  }
  BlackboardToString() {
    if (this.Jre) {
      var t;
      var i;
      var e = new StringBuilder_1.StringBuilder("状态机黑板值\n");
      e.Append("-------------------------------------------------------------\n");
      for ([t, i] of this.Jre) {
        e.Append(`[${t}]: ${i}
`);
      }
      e.Append("-------------------------------------------------------------\n");
      return e.ToString();
    }
    return "";
  }
  ToString(t = 0, i) {
    var e = new StringBuilder_1.StringBuilder();
    e.Append(`------[${this.StateMachineComp.StateMachineName}]------
`);
    if (this.Qre !== this.$re) {
      e.Append(`>>> 警告，实体状态机与服务器版本不一致 <<<
客户端:${this.Qre}
服务端:${this.$re}
`);
    }
    if (this.Kre !== this.Xre) {
      e.Append(`>>> 警告，公共状态机与服务器版本不一致 <<<
客户端:${this.Kre}
服务端:${this.Xre}
`);
    }
    if (this.ErrorMessage) {
      e.Append(`>>> 状态机初始化失败 <<<
${this.ErrorMessage.ToString()}
`);
    }
    if (!this.Inited) {
      e.Append(">>> 状态机未初始化，客户端无状态机配置 <<<\n请检查Ai基础.xlsx是否正确配置");
      return [e.ToString(), ""];
    }
    var s = new StringBuilder_1.StringBuilder();
    if (this.StateMachinesActivated) {
      e.Append(">>> 状态机已启动 <<<\n");
    } else {
      e.Append(">>> 状态机未启动 <<<\n服务器状态机配置错误或者怪物已死亡\n");
    }
    e.Append(this.BlackboardToString());
    s.Append("(第一个客户端结果，第二个服务器结果，第三个客户端/服务器条件)\n");
    for (const o of this.StateMachines) {
      e.Append("-------------------------------------------------------------\n");
      o.ToString(e, s);
      e.Append("-------------------------------------------------------------\n");
    }
    return [e.ToString(), s.ToString()];
  }
  StartState(t, i, e) {
    var s = this.GetNodeByUuid(i);
    if (s) {
      if (!s.Activated) {
        CombatLog_1.CombatLog.Warn("StateMachineNew", this.Entity, `设置初始状态，激活状态 [${s.Name}|${s.Uuid}]`);
        s.Start(false, e);
        if (this.ActorComp.IsAutonomousProxy) {
          (s = Protocol_1.Aki.Protocol.xe_.create()).$4n = t;
          s.Y4n = i;
          CombatMessage_1.CombatNet.Send(29644, this.Entity, s);
        }
      }
    } else {
      CombatLog_1.CombatLog.Warn("StateMachineNew", this.Entity, `设置初始状态失败，目标节点不存在 [${t}][${i}]`);
    }
  }
  HandleSwitch(t, i, e, s) {
    var o = this.GetNodeByUuid(t);
    var h = this.GetNodeByUuid(e);
    if (h) {
      if (o.IsAnimStateMachine) {
        if (!this.ActorComp.IsMoveAutonomousProxy) {
          h.ForceActive();
        }
      } else if (o.WaitSwitchState) {
        o.RemoteSwitchPending = e;
        o.RemoteSwitchMessageId = s;
        CombatLog_1.CombatLog.Warn("StateMachineNew", this.Entity, `远端切换状态，目前处于等待切换结果状态，[${h.Name}|${h.Uuid}]`);
      } else if (h.Activated) {
        CombatLog_1.CombatLog.Warn("StateMachineNew", this.Entity, `远端切换状态，状态已激活 [${h.Name}|${h.Uuid}]`);
      } else {
        CombatLog_1.CombatLog.Warn("StateMachineNew", this.Entity, `远端切换状态，root[${o.Name}|${o.Uuid}] 激活节点[${h.Name}|${h.Uuid}]`);
        o.CurrentMessageIdCache = s;
        h.ForceActive();
        o.CurrentMessageIdCache = undefined;
        if (this.ActorComp.IsAutonomousProxy) {
          (s = Protocol_1.Aki.Protocol.xe_.create()).$4n = t;
          s.Y4n = e;
          CombatMessage_1.CombatNet.Send(29644, this.Entity, s);
        }
      }
    } else {
      CombatLog_1.CombatLog.Warn("StateMachineNew", this.Entity, `远端切换状态失败，目标节点不存在 [${e}]`);
    }
  }
  HandleChangeStateConfirm(t, i) {
    var e = this.GetNodeByUuid(i);
    if (e) {
      if (e.Activated) {
        e.SetExecutedAction();
      } else {
        CombatLog_1.CombatLog.Warn("StateMachineNew", this.Entity, `远端修改状态确认通知，该状态机未激活 [${e.Name}|${e.Uuid}]`);
      }
    } else {
      CombatLog_1.CombatLog.Warn("StateMachineNew", this.Entity, `远端确认切换状态失败，目标节点不存在 [${i}]`);
    }
  }
  HandleEntityFsmGroupInfo(t) {
    if (t.KTs) {
      for (const i of t.KTs) {
        for (const e of i.QTs) {
          this.GetNodeByUuid(e.tps)?.HandleServerDebugInfo(e);
        }
      }
    }
  }
  ResetStateMachine(t, i) {
    CombatLog_1.CombatLog.Info("StateMachineNew", this.Entity, "状态机重置");
    if (t?.NTs && t.NTs.length > 0) {
      this.Xre = Number(t.VTs);
      this.$re = Number(t.FTs);
      if (this.Inited) {
        for (const o of t.NTs) {
          var e = this.GetNodeByUuid(o.$4n);
          var s = this.GetNodeByUuid(o.OTs);
          if (!s) {
            CombatLog_1.CombatLog.Error("StateMachineNew", this.Entity, "状态机重置失败，目标状态不存在", ["fsmId", o.$4n], ["fsmId", o.OTs]);
            return;
          }
          CombatLog_1.CombatLog.Warn("StateMachineNew", this.Entity, "状态机重置状态", ["fsmId", o.$4n], ["stateId", o.OTs]);
          e.CurrentMessageIdCache = i;
          s.ForceActive();
          e.CurrentMessageIdCache = undefined;
        }
        this.StateMachinesActivated = true;
      }
    } else {
      CombatLog_1.CombatLog.Error("StateMachineNew", this.Entity, "状态机重置失败，服务器实体没有相关初始状态");
    }
  }
  OnControl() {
    if (this.StateMachinesActivated) {
      for (const t of this.StateMachines) {
        t.OnControl();
      }
    }
  }
}
exports.AiStateMachineGroup = AiStateMachineGroup;
//# sourceMappingURL=AiStateMachineGroup.js.map