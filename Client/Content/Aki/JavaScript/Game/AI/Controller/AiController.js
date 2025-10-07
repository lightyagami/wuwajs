"use strict";

var __decorate = this && this.__decorate || function (t, i, o, e) {
  var s;
  var r = arguments.length;
  var h = r < 3 ? i : e === null ? e = Object.getOwnPropertyDescriptor(i, o) : e;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, i, o, e);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (s = t[n]) {
        h = (r < 3 ? s(h) : r > 3 ? s(i, o, h) : s(i, o)) || h;
      }
    }
  }
  if (r > 3 && h) {
    Object.defineProperty(i, o, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiController = undefined;
const cpp_1 = require("cpp");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const PerformanceController_1 = require("../../../Core/Performance/PerformanceController");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const CombatMessage_1 = require("../../Module/CombatMessage/CombatMessage");
const CombatLog_1 = require("../../Utils/CombatLog");
const AiModelController_1 = require("../Common/AiModelController");
const AiAlertClass_1 = require("./AiAlertClass");
const AiConditionEvents_1 = require("./AiConditionEvents");
const AiHateList_1 = require("./AiHateList");
const AiLevelVarEvent_1 = require("./AiLevelVarEvent");
const AiPatrolController_1 = require("./AiPatrolController");
const AiPerceptionEvents_1 = require("./AiPerceptionEvents");
const AiTaunt_1 = require("./AiTaunt");
const NpcDecisionController_1 = require("./Npc/NpcDecisionController");
class AiController {
  constructor() {
    this.CharAiDesignComp = undefined;
    this.CharActorComp = undefined;
    this.CharSkillComp = undefined;
    this.AiTeam = undefined;
    this.AiTaunt = new AiTaunt_1.AiTaunt(this);
    this.AiHateList = new AiHateList_1.AiHateList(this);
    this.AiCoolDownList = new Map();
    this.AiSkill = undefined;
    this.AiConditionEvents = new AiConditionEvents_1.AiConditionEvents(this);
    this.AiPerceptionEvents = new AiPerceptionEvents_1.AiPerceptionEvents(this);
    this.AiLevelVarEvents = new AiLevelVarEvent_1.AiLevelVarEvent();
    this.AiWanderInfos = undefined;
    this.AiWanderRadiusConfig = undefined;
    this.AiPerception = undefined;
    this.AiAlert = new AiAlertClass_1.AiAlertClass(this);
    this.AiPatrol = new AiPatrolController_1.AiPatrolController();
    this.NpcDecision = undefined;
    this.cY = false;
    this.mie = 0;
    this.die = 0;
    this.ControllerPlayerId = 0;
    this.AiBase = undefined;
    this.StateMachineConfig = undefined;
    this.AiFlee = undefined;
    this.Cie = undefined;
    this.gie = 0;
    this.AiCombatMessageId = undefined;
    this.fie = 0;
    this.YZa = false;
    this.OnChangeMode = () => {
      var t = ModelManager_1.ModelManager.GameModeModel.IsMulti ? TimeUtil_1.TimeUtil.GetServerTimeStamp() - Time_1.Time.WorldTime : Time_1.Time.WorldTime - TimeUtil_1.TimeUtil.GetServerTimeStamp();
      for (const o of this.AiCoolDownList.keys()) {
        var i = this.AiCoolDownList.get(o);
        if (i) {
          i[0] = i[0] + t;
        }
      }
    };
    this.OnEntityCampModified = (t, i, o) => {
      if (t.Id === this.CharAiDesignComp?.Entity.Id) {
        ModelManager_1.ModelManager.AiModel.RemoveActiveAiController(this);
        ModelManager_1.ModelManager.AiModel.AddActiveAiController(this);
      }
      this.AiPerception?.OnEntityCampModified(t, i, o);
      this.AiHateList.OnEntityCampModified(t, i, o);
    };
    this.AiCoolDownEvents = new Map();
  }
  get HatredGroupId() {
    return this.Cie;
  }
  Tick(t) {
    var i;
    this.UpdateCooldownTrigger();
    if (this.cY) {
      if (this.fie === Protocol_1.Aki.Protocol.kks.Proto_Monster && (i = this.GetTeamLevelId()) !== this.AiTeam?.AiTeamLevel.Id) {
        AiModelController_1.AiModelController.RemoveAiFromTeam(this);
        AiModelController_1.AiModelController.AddAiToTeam(this, i);
      }
      this.mie += t;
      ModelManager_1.ModelManager.AiModel.AddAiScore(this);
    }
  }
  ScoreUpdate() {
    var t;
    var i;
    if (this.CharAiDesignComp.Active && (t = cpp_1.KuroTime.GetMilliseconds64(), this.AiPerception && (this.AiPerception.Tick(), this.AiPerceptionEvents.TickPerception()), this.AiAlert.Tick(this.mie), this.AiHateList.AiHate && (this.AiTaunt.Tick(), this.AiHateList.Tick(this.mie)), this.fie !== Protocol_1.Aki.Protocol.kks.Proto_Monster && !this.YZa || this.AiPerceptionEvents.TickHate(), this.mie = 0, PerformanceController_1.PerformanceController.IsEntityTickPerformanceTest)) {
      i = cpp_1.KuroTime.GetMilliseconds64();
      PerformanceController_1.PerformanceController.CollectTickPerformanceInfo("EntityTick" + this.CharActorComp.Entity.Id, false, i - t);
    }
  }
  SetAiDesignComp(t) {
    if (this.CharAiDesignComp !== t && (this.CharAiDesignComp?.Valid && (ModelManager_1.ModelManager.AiModel.RemoveActiveAiController(this), this.AiHateList.UnBindEvents(), this.AiTaunt.Clear(), this.AiPerception?.Clear(false)), this.CharAiDesignComp = t, this.CharActorComp = undefined, this.pie(), !this.NpcDecision) && this.cY && this.CharActorComp && this.fie === Protocol_1.Aki.Protocol.kks.Proto_Npc) {
      this.NpcDecision = new NpcDecisionController_1.NpcDecisionController();
      this.NpcDecision.Init(this);
    }
  }
  pie() {
    var t;
    var i;
    var o;
    if (this.CharAiDesignComp?.Valid && (t = this.CharAiDesignComp.Entity, this.CharActorComp = t.GetComponent(3), i = this.CharActorComp.CreatureData, this.fie = this.CharActorComp.CreatureData.GetEntityType(), this.YZa = this.CharActorComp.CreatureData.IsAutoRole(), this.CharSkillComp = t.GetComponent(40), (o = i.ComponentDataMap.get("oI_"))?.oI_?.fI_ && (this.AiCombatMessageId = MathUtils_1.MathUtils.LongToBigInt(o?.oI_?._Vn)), (o = i.ComponentDataMap.get("fys"))?.fys?.Zys && (this.Cie = MathUtils_1.MathUtils.LongToBigInt(o?.fys?.Zys)), o?.fys?.tIs && (this.AiCombatMessageId = MathUtils_1.MathUtils.LongToBigInt(o?.fys?.tIs)), i = o?.fys?.eIs ?? 0, this.gie = i, ModelManager_1.ModelManager.AiModel.AddActiveAiController(this), this.AiHateList.RefreshAbilityComp(), this.AiTaunt.Init(this.AiHateList), this.AiPatrol.Init(this.CharActorComp), this.AiAlert.Init(this.CharActorComp), this.AiPerception) && (o = t.GetComponent(122))) {
      o.SetLogicRange(this.AiPerception.MaxSenseRange);
    }
    this.cY = !!this.CharAiDesignComp && this.CharAiDesignComp.Active;
    if (this.CharActorComp) {
      CombatLog_1.CombatLog.Info("Ai", this.CharActorComp?.Entity, "AiController.InitBaseInfo", ["enabled", this.cY]);
    }
  }
  GetTeamLevelId() {
    if (this.CharAiDesignComp?.Valid) {
      var t = ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(this.CharAiDesignComp.Entity.Id, "TeamID");
      if (t) {
        return t;
      }
    }
    if (!this.gie) {
      this.gie = 1;
      if ((t = this.CharActorComp.CreatureData.GetPbEntityInitData()) && (t = (0, IComponent_1.getComponent)(t.ComponentsData, "AiComponent")?.AiTeamLevelId)) {
        this.gie = t;
      }
    }
    return this.gie;
  }
  LoadAiConfigs(t, i = false) {
    if (this.CharActorComp?.Valid) {
      ConfigManager_1.ConfigManager.AiConfig.LoadAiConfig(this, t, i);
      if (this.cY) {
        this.AiHateList.UnBindEvents();
        this.AiHateList.BindEvents();
      }
      this.AiTaunt.Reset(this.AiHateList);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("BehaviorTree", 6, "Can't load ai config without binding a Character.");
    }
  }
  Clear() {
    AiModelController_1.AiModelController.RemoveAiFromTeam(this);
    this.AiTaunt.Clear();
    this.AiPerceptionEvents.Clear(true);
    this.AiHateList.Clear();
    if (this.AiPerception) {
      this.AiPerception.Clear();
      this.AiPerception = undefined;
    }
    this.AiConditionEvents.Clear();
    this.AiAlert.Clear();
    this.AiLevelVarEvents.Clear();
    this.AiCoolDownEvents.clear();
    ModelManager_1.ModelManager.AiModel.RemoveActiveAiController(this);
    ModelManager_1.ModelManager.AiModel.RemoveObject(this);
    this.AiPatrol.Clear();
    this.AiTeam = undefined;
    this.CharAiDesignComp = undefined;
    this.CharActorComp = undefined;
    this.CharSkillComp = undefined;
    this.AiSkill = undefined;
    this.AiWanderInfos = undefined;
    this.AiBase = undefined;
    this.AiFlee = undefined;
    if (this.NpcDecision) {
      this.NpcDecision.Destroy();
      this.NpcDecision = undefined;
    }
    this.cY = false;
  }
  SetEnable(t) {
    if (this.cY !== t) {
      if (this.cY = t) {
        this.AiHateList.BindEvents();
        this.AiTaunt.Reset(this.AiHateList);
        AiModelController_1.AiModelController.AddAiToTeam(this, this.GetTeamLevelId());
      } else {
        this.AiPerception?.Clear(false);
        this.AiTaunt.Clear();
        this.AiHateList.Clear(false);
        this.AiPerceptionEvents.Clear();
        AiModelController_1.AiModelController.RemoveAiFromTeam(this);
      }
      this.mie = 0;
    }
  }
  OnSwitchControl(t, i) {
    this.SetControllerPlayerId(i);
    if (t) {
      this.AiConditionEvents.ResetAllConditionEvent();
    }
    this.ResetSwitchControlState();
    this.UpdateCooldownTrigger();
  }
  SetControllerPlayerId(t) {
    this.ControllerPlayerId = t;
  }
  PreSwitchControl() {
    if (this.CharActorComp.IsAutonomousProxy) {
      if (this.CharSkillComp.CurrentSkill) {
        this.die = 1;
      } else {
        this.AiControlSwitchRequest(this.CharActorComp.Entity, this);
        this.die = 2;
      }
    }
  }
  OnSkillEnd() {
    if (this.CharActorComp.IsAutonomousProxy && this.die === 1) {
      this.AiControlSwitchRequest(this.CharActorComp.Entity, this);
      this.die = 2;
    }
  }
  IsWaitingSwitchControl() {
    return this.die === 1 || this.die === 2;
  }
  IsWaitingReceiveControl() {
    return this.die === 3;
  }
  ResetSwitchControlState() {
    this.die = 0;
  }
  GetCoolDownTime(t) {
    return this.AiCoolDownList.get(t)?.[0] ?? 0;
  }
  GetCoolDownRemainTime(t) {
    var t = this.GetCoolDownTime(t);
    var i = ModelManager_1.ModelManager.GameModeModel.IsMulti ? TimeUtil_1.TimeUtil.GetServerTimeStamp() : Time_1.Time.WorldTime;
    if (t < i) {
      return 0;
    } else {
      return t - i;
    }
  }
  IsCoolDownTriggered(t) {
    return this.AiCoolDownList.get(t)?.[1] ?? true;
  }
  UpdateCooldownTrigger() {
    if (this.CharActorComp?.IsAutonomousProxy) {
      var t;
      var i;
      var o;
      var e = ModelManager_1.ModelManager.GameModeModel.IsMulti ? TimeUtil_1.TimeUtil.GetServerTimeStamp() : Time_1.Time.WorldTime;
      for ([t, [i, o]] of this.AiCoolDownList) {
        if (!o && i < e) {
          this.ActivateCooldownTrigger(t);
        }
      }
    }
  }
  ActivateCooldownTrigger(t) {
    var i;
    var o;
    var e = this.AiCoolDownList.get(t)?.[0];
    var s = this.AiCoolDownEvents.get(t);
    this.AiCoolDownList.set(t, [e ?? 0, true]);
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      (o = (i = Protocol_1.Aki.Protocol.Ai).Ie_.create()).H4n = [i.iNs.create({
        j4n: t,
        W4n: true
      })];
      CombatMessage_1.CombatNet.Send(15441, this.CharAiDesignComp.Entity, o);
    }
    if (e !== undefined && s && s.IsValid()) {
      s.Callback.Broadcast(true);
    }
  }
  GetCoolDownReady(t) {
    return this.GetCoolDownRemainTime(t) <= 0;
  }
  AddCoolDownTime(t, i) {
    let o = this.GetCoolDownTime(t);
    var e = ModelManager_1.ModelManager.GameModeModel.IsMulti ? Time_1.Time.ServerTimeStamp : Time_1.Time.WorldTime;
    if (!o || e > o) {
      o = e;
    }
    this.SetCoolDownTime(t, o + i, true, "使用技能");
  }
  SetCoolDownTime(t, i, o, e = "") {
    var s = this.GetCoolDownTime(t);
    if (s && i < s) {
      CombatLog_1.CombatLog.Info("Ai", this.CharAiDesignComp.Entity, e + ":设置Cd失败，比当前冷却结束时间小", ["id", t], ["curNetTime", s], ["nextTime", i]);
    } else {
      CombatLog_1.CombatLog.Info("Ai", this.CharAiDesignComp.Entity, e + ":设置Cd", ["id", t], ["nextTime", i]);
      this.AiCoolDownList.set(t, [i, false]);
      s = Protocol_1.Aki.Protocol.Ai;
      if (ModelManager_1.ModelManager.GameModeModel.IsMulti && o) {
        (e = s.Ie_.create()).K4n = [s.tNs.create({
          j4n: t,
          W4n: i
        })];
        e.H4n = [s.iNs.create({
          j4n: t,
          W4n: false
        })];
        CombatMessage_1.CombatNet.Send(15441, this.CharAiDesignComp.Entity, e);
      }
    }
  }
  InitCooldownTimer(t, i) {
    var o = ModelManager_1.ModelManager.GameModeModel.IsMulti ? Time_1.Time.ServerTimeStamp : Time_1.Time.WorldTime;
    if (this.AiCoolDownEvents.has(t)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MultiplayerCombat", 19, "重复注册AIC计时器", ["Actor", this.CharActorComp?.Actor?.GetName()], ["id", t]);
      }
    } else {
      this.AiCoolDownEvents.set(t, i);
      this.SetCoolDownTime(t, o, true, "初始化AIC延迟节点");
    }
  }
  static AiInformationNotify(t, i) {
    var o = t.GetComponent(47)?.AiController;
    for (const e of i.TSs) {
      o.SetCoolDownTime(e.j4n, MathUtils_1.MathUtils.LongToNumber(e.W4n), false, "远程同步");
    }
  }
  static AiInformationS(t, i) {
    var o = t.GetComponent(47)?.AiController;
    if (o) {
      for (var {
        j4n: e,
        W4n: s
      } of i.K4n) {
        var r = o.AiCoolDownList.get(e)?.[1] ?? true;
        o.AiCoolDownList.set(e, [Number(MathUtils_1.MathUtils.LongToBigInt(s)), r]);
      }
      for (var {
        j4n: h,
        W4n: n
      } of i.H4n) {
        var a = o.AiCoolDownList.get(h)?.[0] ?? 0;
        o.AiCoolDownList.set(h, [a, n]);
      }
      for (const l of i.LSs) {
        o.AiCoolDownList.delete(l);
        o.AiCoolDownEvents.delete(l);
      }
    }
  }
  AiControlSwitchRequest(t, i) {
    var o = Protocol_1.Aki.Protocol.Ai.zXn.create();
    const e = t.GetComponent(0).GetCreatureDataId();
    o.F4n = MathUtils_1.MathUtils.NumberToLong(e);
    Net_1.Net.Call(15425, o, t => {
      if (t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("AI", 14, "AiControlSwitchRequest返回错误", ["EntityId", e], ["ErrorCode", t.Q4n]);
        }
        i.ResetSwitchControlState();
      }
    });
  }
}
__decorate([CombatMessage_1.CombatNet.Listen("QFn", true)], AiController, "AiInformationNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("JFn", true)], AiController, "AiInformationS", null);
exports.AiController = AiController; //# sourceMappingURL=AiController.js.map