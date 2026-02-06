"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const Time_1 = require("../../../Core/Common/Time");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const GravityUtils_1 = require("../../Utils/GravityUtils");
const DRAW_ARROW_SIZE = 100;
const DRAW_LINE_THICKNESS = 3;
const ARROW_LENGTH_SUB = 20;
const targetLinkColor = new UE.LinearColor(1, 0, 0, 1);
const teamMemberLinkColor = new UE.LinearColor(0, 1, 0, 1);
const allyLinkColor = new UE.LinearColor(0.6, 1, 0.6, 1);
const neutralLinkColor = new UE.LinearColor(1, 1, 0, 1);
const enemyLinkColor = new UE.LinearColor(1, 0, 1, 1);
const areaCenterColor = new UE.LinearColor(0, 1, 1, 1);
const DEFAULT_SEGMENTS = 24;
const minHateAreaColor = new UE.LinearColor(1, 0, 1, 1);
const maxHateAreaColor = new UE.LinearColor(0, 1, 1, 1);
const minHateInitAreaColor = new UE.LinearColor(1, 0, 0, 1);
const maxHateInitAreaColor = new UE.LinearColor(0, 1, 0, 1);
class TsAiController extends UE.KuroAIController {
  constructor() {
    super(...arguments);
    this.CharAiDesignComp = undefined;
    this.CharTagComp = undefined;
    this.CharBuffComp = undefined;
    this.CharStateMachineComp = undefined;
    this.AiController = undefined;
    this.BehaviorTree = undefined;
    this.StateMachineGroup = undefined;
  }
  Constructor() {
    this.CharAiDesignComp = undefined;
    this.CharTagComp = undefined;
    this.CharBuffComp = undefined;
    this.CharStateMachineComp = undefined;
    this.AiController = undefined;
  }
  GetEntity() {
    return this.CharAiDesignComp?.Entity;
  }
  GetAiComp() {
    return this.CharAiDesignComp;
  }
  SetupBehaviorTree(t) {
    return this.BehaviorTree !== t && (this.BehaviorTree = t, this.RunBehaviorTree(t), true);
  }
  InitAiController(t) {
    this.CharAiDesignComp = t;
    this.AiController = t.AiController;
    this.CharBuffComp = t.Entity.GetComponent(185);
    this.CharTagComp = t.Entity.GetComponent(217);
    this.CharStateMachineComp = t.Entity.GetComponent(81);
  }
  DrawDebugLines(t) {
    var e;
    var i;
    var r;
    var o;
    if (this.CharAiDesignComp?.Valid && (o = this.AiController.CharActorComp.ActorLocationProxy, e = this.AiController.AiHateList.GetCurrentTarget(), this.DrawPerception(o, e), e?.Valid) && (e = e.Entity.GetComponent(3), this.DrawArrow(o, e.ActorLocationProxy, targetLinkColor), (e = this.AiController.AiTeam.GetAiTeamAreaMemberData(this.AiController))?.IsAttacker && (TsAiController.TmpVector.DeepCopy(o), GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.AiController.CharActorComp, TsAiController.TmpVector, this.AiController.CharActorComp.HalfHeight), UE.KismetSystemLibrary.D_DrawDebugBox(this, TsAiController.TmpVector.ToUeVector(), new UE.VectorDouble(10, 10, 10), enemyLinkColor, this.AiController.CharActorComp.ActorRotation, 0, DRAW_LINE_THICKNESS)), e) && e.AreaIndex >= 0) {
      i = TsAiController.TmpVector3;
      r = TsAiController.TmpVector2;
      i.DeepCopy(o);
      GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.AiController.CharActorComp, i, 10 - this.AiController.CharActorComp.HalfHeight);
      o = (e.CachedControllerYaw + e.AngleCenter) * MathUtils_1.MathUtils.DegToRad;
      r.Set(Math.cos(o) * e.DistanceCenter, Math.sin(o) * e.DistanceCenter, 0);
      e.Group.GravityQuat.RotateVector(r, r);
      r.AdditionEqual(i);
      this.DrawArrow(i, r, areaCenterColor);
    }
  }
  DrawPerception(t, e) {
    var i;
    var r;
    var o = this.AiController.AiPerception;
    if (o) {
      for (const C of o.ShareAllyLink) {
        var s = ControllerHolder_1.ControllerHolder.CharacterController.GetCharacterActorComponentById(C);
        if (s) {
          this.DrawArrow(t, s.ActorLocationProxy, teamMemberLinkColor);
        }
      }
      for (const A of o.Allies) {
        if (!o.ShareAllyLink.has(A)) {
          if (i = ControllerHolder_1.ControllerHolder.CharacterController.GetCharacterActorComponentById(A)) {
            this.DrawArrow(t, i.ActorLocationProxy, allyLinkColor);
          }
        }
      }
      for (const d of o.AllEnemies) {
        if (!e?.Valid || d !== e.Id) {
          if (r = ControllerHolder_1.ControllerHolder.CharacterController.GetCharacterActorComponentById(d)) {
            this.DrawArrow(t, r.ActorLocationProxy, enemyLinkColor);
          }
        }
      }
      for (const _ of o.Neutrals) {
        var n = ControllerHolder_1.ControllerHolder.CharacterController.GetCharacterActorComponentById(_);
        if (n) {
          this.DrawArrow(t, n.ActorLocationProxy, neutralLinkColor);
        }
      }
    }
    var l = this.AiController.CharActorComp;
    TsAiController.TmpVector.FromUeVector(l.GetInitLocation());
    var h = TsAiController.TmpVector;
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(l, h, -l.HalfHeight);
    var a = this.AiController.AiHateList.AiHate;
    var l = l.FloorLocation;
    UE.KismetSystemLibrary.D_DrawDebugSphere(this, l.ToUeVector(), a.DisengageDistanceRange.Min, DEFAULT_SEGMENTS, minHateAreaColor);
    UE.KismetSystemLibrary.D_DrawDebugSphere(this, l.ToUeVector(), a.DisengageDistanceRange.Max, DEFAULT_SEGMENTS, maxHateAreaColor);
    UE.KismetSystemLibrary.D_DrawDebugSphere(this, h.ToUeVector(), a.DisengageBornDistance.Min, DEFAULT_SEGMENTS, minHateInitAreaColor);
    UE.KismetSystemLibrary.D_DrawDebugSphere(this, h.ToUeVector(), a.DisengageBornDistance.Max, DEFAULT_SEGMENTS, maxHateInitAreaColor);
  }
  OnStart() {}
  获取控制权时() {}
  状态切换时(t, e, i) {}
  AddComplicatedEventBinder(t, e) {
    if (this.AiController) {
      this.AiController.AiConditionEvents.AddConditionEvent(t, e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Test", 6, "Error Call AddComplicatedEventBinder", ["AIC", this.GetName()]);
    }
  }
  AddSceneItemDestroyEventBinder(t, e) {
    if (this.AiController) {
      this.AiController.AiPerceptionEvents.AddSceneItemDestroyEvent(t, e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Test", 6, "Error Call AddSceneItemDestroyEventBinder", ["AIC", this.GetName()]);
    }
  }
  AddLevelVarBoolEventBinder(t, e) {
    if (this.AiController) {
      this.AiController.AiLevelVarEvents.AddLevelVarEvent(t, e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Test", 31, "Error Call AddLevelVarBoolEventBinder", ["AIC", this.GetName()]);
    }
  }
  AddLevelVarIntEventBinder(t, e) {
    if (this.AiController) {
      this.AiController.AiLevelVarEvents.AddLevelVarEvent(t, e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Test", 31, "Error Call AddLevelVarBoolEventBinder", ["AIC", this.GetName()]);
    }
  }
  AddHateEventBinder(t) {
    this.AiController?.AiPerceptionEvents.AddAiHateEvent(t);
  }
  AddPerceptionEventBinder(t) {
    this.AiController?.AiPerceptionEvents.AddAiPerceptionEvent(t, false, true, false);
  }
  SetPerceptionEventState(t, e, i) {
    this.AiController?.AiPerceptionEvents.SetPerceptionEventState(t, e, i);
  }
  AddHateOutRangeEventBinder(t) {
    this.AiController?.AiPerceptionEvents.AddAiHateOutRangeEvent(t);
  }
  ActivateSkillGroup(t, e) {
    if (this.AiController?.AiSkill) {
      this.AiController.AiSkill.ActivateSkillGroup(t, e);
    }
  }
  AddSkillCd(t, e) {
    if (this.AiController?.AiSkill) {
      this.AiController.AiSkill.AddSkillCd(t, e);
    }
  }
  AicApplyBuff(t) {
    if (this.CharBuffComp?.Valid) {
      this.CharBuffComp.AddBuffFromAi(this.AiController.AiCombatMessageId, Number(t), {
        InstigatorId: this.CharBuffComp.CreatureDataId,
        Reason: "AIC蓝图添加buff(AicApplyBuff)"
      });
    }
  }
  AicApplyBuffToTarget(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 222);
    if (t && this.CharBuffComp?.Valid) {
      t.AddBuffFromAi(this.AiController.AiCombatMessageId, Number(e), {
        InstigatorId: this.CharBuffComp.CreatureDataId,
        Reason: "AIC蓝图添加buff(AicApplyBuffToTarget)"
      });
    }
  }
  AicRemoveBuff(t) {
    if (this.CharBuffComp?.Valid) {
      this.CharBuffComp.RemoveBuff(Number(t), -1, "AIC蓝图移除buff（AIC Remove Buff）");
    }
  }
  AicAddTag(t) {
    if (this.CharTagComp?.Valid) {
      this.CharTagComp.AddTag(t?.TagId);
    }
  }
  AicRemoveTag(t) {
    if (this.CharTagComp?.Valid) {
      this.CharTagComp.RemoveTag(t?.TagId);
    }
    if (this.CharBuffComp?.Valid) {
      this.CharBuffComp.RemoveBuffByTag(t?.TagId, "AIC蓝图移除buff");
    }
  }
  SetBattleWanderTime(t, e) {
    if (this.AiController.AiWanderInfos?.AiBattleWanderGroups) {
      this.AiController.AiWanderInfos.SetOverrideBattleWanderTime(t, e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("AI", 6, "没有配置战斗游荡，不能设置战斗游荡时长", ["AiBaseConfigId", this.AiController.AiBase.Id]);
    }
  }
  SetBattleWanderIndex(t) {
    if (this.AiController.AiWanderInfos?.AiBattleWanderGroups) {
      if (t < 0 || this.AiController.AiWanderInfos.AiBattleWanderGroups.length <= t) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("AI", 6, "设置战斗游荡组不合法", ["AiBaseConfigId", this.AiController.AiBase.Id], ["TargetIndex", t]);
        }
      } else {
        this.AiController.AiWanderInfos.CurrentBattleWanderIndex = t;
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("AI", 6, "没有配置战斗游荡，不能设置战斗游荡组", ["AiBaseConfigId", this.AiController.AiBase.Id]);
    }
  }
  AddBattleWanderEndTime(t) {
    if (this.AiController.AiWanderInfos?.AiBattleWanderGroups) {
      this.AiController.AiWanderInfos.BattleWanderAddTime += t;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("AI", 6, "没有配置战斗游荡，不能增加游荡结束时间", ["AiBaseConfigId", this.AiController.AiBase.Id]);
    }
  }
  SetAiSenseEnable(t, e) {
    this.AiController.AiPerception?.SetAiSenseEnable(t, e);
  }
  AddOrRemoveAiSense(t, e) {
    this.AiController.AiPerception?.AddOrRemoveAiSense(t, e);
  }
  EnableAiSenseByType(t, e) {
    this.AiController.AiPerception?.EnableAiSenseByType(t, e);
  }
  SetAiHateConfig(t) {
    TsAiController.StatSetAiHateConfig.Start();
    this.AiController.AiHateList.AiHate = t ? ConfigManager_1.ConfigManager.AiConfig.LoadAiHate(Number(t)) : ConfigManager_1.ConfigManager.AiConfig.LoadAiHateByController(this.AiController, undefined);
    TsAiController.StatSetAiHateConfig.Stop();
  }
  ChangeHatred(t, e, i) {
    this.AiController.AiHateList.ChangeHatred(t, e, i);
  }
  ClearHatred(t) {
    this.AiController.AiHateList.ClearHatred(t);
  }
  AddAlertEventBinder(t) {
    this.AiController.AiAlert.CallbackEvent = t;
  }
  SetAiAlertConfig(t) {
    this.AiController.AiAlert.AiAlertConfig = t ? ConfigManager_1.ConfigManager.AiConfig.LoadAiAlert(t) : ConfigManager_1.ConfigManager.AiConfig.LoadAiAlert(this.AiController.AiBase.SubBehaviorConfigs.get("AiAlert"));
  }
  SetAiEnable(t, e) {
    e = "TsAiController_" + e;
    if (t) {
      this.CharAiDesignComp.EnableAi(e);
    } else {
      this.CharAiDesignComp.DisableAi(e);
    }
  }
  TestChangeAi(t) {
    this.CharAiDesignComp.LoadAiConfigs(Number(t));
  }
  LogReport(t) {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("BehaviorTree", 8, "埋点废弃,请删除相关配置");
    }
  }
  逻辑主控() {
    return this.AiController.CharActorComp.IsAutonomousProxy;
  }
  移动主控() {
    return this.AiController.CharActorComp.IsMoveAutonomousProxy;
  }
  检查状态机状态(t) {
    return false;
  }
  切换状态机状态(t) {}
  GetCoolDownDone(t) {
    return this.AiController.GetCoolDownRemainTime(t) === 0;
  }
  GetCoolDownRemainTime(t) {
    return this.AiController.GetCoolDownRemainTime(t);
  }
  SetCoolDown(t, e) {
    var i = ModelManager_1.ModelManager.GameModeModel.IsMulti ? Time_1.Time.ServerTimeStamp : Time_1.Time.WorldTime;
    this.AiController.SetCoolDownTime(t, i + e, true, "蓝图");
  }
  InitCooldownEvent(t, e) {
    this.AiController.InitCooldownTimer(t, e);
  }
  StartCooldownTimer(t, e) {
    var i = ModelManager_1.ModelManager.GameModeModel.IsMulti ? Time_1.Time.ServerTimeStamp : Time_1.Time.WorldTime;
    this.AiController.SetCoolDownTime(t, i + e, true, "蓝图AIC延迟节点");
  }
  GetDebugStateMachine(t) {
    this.CharStateMachineComp?.StateMachineGroup?.RequestServerDebugInfo();
    var e = this.CharStateMachineComp?.StateMachineGroup?.ToString();
    var i = (0, puerts_1.$unref)(t);
    if (e) {
      for (const r of e) {
        i.Add(r);
      }
    }
  }
  GetDebugText() {
    return `激活的技能组：
 ${JSON.stringify([...this.AiController.AiSkill.ActiveSkillGroup])}
技能CD：${this.AiController.AiSkill.GetCdDebugString()}
战斗游荡组：${this.AiController.AiWanderInfos?.CurrentBattleWanderIndex}
仇恨：
${this.AiController.AiHateList.GetHatredMapDebugText()}
团队AI：
逻辑主控：${this.AiController.CharActorComp.IsAutonomousProxy}
移动主控：${this.AiController.CharActorComp.IsMoveAutonomousProxy}
等待切换主控：${this.AiController.IsWaitingSwitchControl()}
感知：${this.AiController.AiPerception?.GetEnableAiSenseDebug()}
怪物仇恨组： ${this.AiController.HatredGroupId}
部位血量: ${this.CharBuffComp?.Entity?.GetComponent(74)?.GetDebugText()}
集群Id：${this.AiController.GetTeamLevelId()}
阵营: ${this.GetEntity()?.GetComponent(0)?.GetEntityCamp()}
`;
  }
  ReceiveDestroyed() {
    if (ObjectUtils_1.ObjectUtils.IsValid(this)) {
      this.Clear();
      super.ReceiveDestroyed();
    }
  }
  Clear() {
    this.CharAiDesignComp = undefined;
    this.CharBuffComp = undefined;
    this.CharTagComp = undefined;
    this.AiController = undefined;
    this.BehaviorTree = undefined;
    this.CharStateMachineComp = undefined;
  }
  DrawArrow(t, e, i) {
    e.Subtraction(t, TsAiController.TmpVector);
    e = TsAiController.TmpVector.Size();
    TsAiController.TmpVector.MultiplyEqual((e - ARROW_LENGTH_SUB) / e);
    TsAiController.TmpVector.AdditionEqual(t);
    UE.KismetSystemLibrary.D_DrawDebugArrow(this, t.ToUeVector(), TsAiController.TmpVector.ToUeVector(), DRAW_ARROW_SIZE, i, 0, DRAW_LINE_THICKNESS);
  }
}
TsAiController.TmpVector = Vector_1.Vector.Create();
TsAiController.TmpVector2 = Vector_1.Vector.Create();
TsAiController.TmpVector3 = Vector_1.Vector.Create();
TsAiController.StatSetAiHateConfig = Stats_1.Stat.Create("SetAiHateConfig");
exports.default = TsAiController; //# sourceMappingURL=TsAiController.js.map