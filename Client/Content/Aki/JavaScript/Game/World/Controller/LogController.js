"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogController = undefined;
const Json_1 = require("../../../Core/Common/Json");
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const Time_1 = require("../../../Core/Common/Time");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const TickSystem_1 = require("../../../Core/Tick/TickSystem");
const LauncherNetworkDetectionDefine_1 = require("../../../Launcher/NetworkDetection/LauncherNetworkDetectionDefine");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const FormationDataController_1 = require("../../Module/Abilities/FormationDataController");
const LogReportController_1 = require("../../Module/LogReport/LogReportController");
const LogReportDefine_1 = require("../../Module/LogReport/LogReportDefine");
const CharacterGasDebugComponent_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterGasDebugComponent");
const LOG_SWITCH = false;
const FRAMING_LOG_NUM = 20;
class DebugInfo extends Json_1.JsonObjBase {
  constructor(o, e, t, r, l, n, a, g, _, s, i, L) {
    super();
    this.场景模式 = o;
    this.是否场景主 = e;
    this.场景号 = t;
    this.时间流速 = r;
    this.玩家Id = l;
    this.玩家位置 = n;
    this.是否联机 = a;
    this.编队玩家 = g;
    this.队伍buff = _;
    this.队伍属性 = s;
    this.编队角色 = i;
    this.技能按钮 = L;
  }
}
class SkillButtonDebugInfo extends Json_1.JsonObjBase {
  constructor(o, e) {
    super();
    this.EntityHandleId = o;
    this.Button = e;
  }
}
class LogController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    Net_1.Net.Register(24715, this.SLn);
    return true;
  }
  static OnClear() {
    Net_1.Net.UnRegister(24715);
    return true;
  }
  static qfr(o) {
    if (LogController.Gfr === TickSystem_1.TickSystem.InvalidId) {
      LogController.Gfr = TickSystem_1.TickSystem.Add(LogController.Nfr, "LogReportFraming", 2).Id;
    }
    this.Ofr.push(o);
  }
  static LogBattleStartPush(o, e = false) {
    if (LOG_SWITCH && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 28, "日志上报-开始战斗日志", ["内容", o]);
    }
    if (e) {
      this.qfr(o);
    } else {
      LogReportController_1.LogReportController.LogReport(o);
    }
  }
  static LogBattleEndPush(o, e = false) {
    if (LOG_SWITCH && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 28, "日志上报-战斗结算日志", ["内容", o]);
    }
    if (e) {
      this.qfr(o);
    } else {
      LogReportController_1.LogReportController.LogReport(o);
    }
  }
  static LogSingleCharacterStatusPush(o, e = false) {
    if (LOG_SWITCH && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 28, "日志上报-单个角色日志", ["内容", o]);
    }
    if (e) {
      this.qfr(o);
    } else {
      LogReportController_1.LogReportController.LogReport(o);
    }
  }
  static LogSingleMonsterStatusPush(o, e = false) {
    if (LOG_SWITCH && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 28, "日志上报-单个怪物日志", ["内容", o]);
    }
    if (e) {
      this.qfr(o);
    } else {
      LogReportController_1.LogReportController.LogReport(o);
    }
  }
  static LogCharacterDeathPush(o, e, t = false) {
    var r;
    var l = new LogReportDefine_1.DeathRecord();
    l.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId;
    l.i_area_level = ModelManager_1.ModelManager.AreaModel.AreaInfo.Level;
    if (Global_1.Global.BaseCharacter) {
      r = Global_1.Global.BaseCharacter.D_K2_GetActorLocation();
      l.f_x = r.X;
      l.f_y = r.Y;
      l.f_z = r.Z;
      l.i_death_reason = e;
      l.i_death_role_id = o;
      if (LOG_SWITCH && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 28, "日志上报-单机大世界死亡", ["内容", l]);
      }
      if (t) {
        this.qfr(l);
      } else {
        LogReportController_1.LogReportController.LogReport(l);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 4, "日志上报-单机大世界死亡，当前不存在Global.BaseCharacter", ["roleId", o]);
    }
  }
  static LogRoleSkillReportPush(o, e, t = false) {
    o.s_reports = Json_1.Json.Stringify(e);
    if (LOG_SWITCH && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 28, "日志上报-角色技能日志", ["内容", o.s_reports]);
    }
    if (t) {
      this.qfr(o);
    } else {
      LogReportController_1.LogReportController.LogReport(o);
    }
  }
  static LogMonsterSkillReportPush(o, e, t = false) {
    o.s_reports = Json_1.Json.Stringify(e);
    if (LOG_SWITCH && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 28, "日志上报-怪物技能日志", ["内容", o.s_reports]);
    }
    if (t) {
      this.qfr(o);
    } else {
      LogReportController_1.LogReportController.LogReport(o);
    }
  }
  static LogDoubleBallReport(o, e, t = false) {
    o.s_reports = Json_1.Json.Stringify(Array.from(e.values()));
    if (LOG_SWITCH && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 28, "日志上报-协奏作用日志", ["内容", o]);
    }
    if (t) {
      this.qfr(o);
    } else {
      LogReportController_1.LogReportController.LogReport(o);
    }
  }
  static LogTriggerBuffDamagePush(o) {
    var e = new LogReportDefine_1.TriggerBuffDamageRecord();
    e.i_area_id = o.AreaId.toString();
    e.s_buff_id = o.BuffId.toString();
    e.f_time = o.TimeStamp.toFixed(2);
    e.f_player_pos_x = o.Location.X.toFixed(2);
    e.f_player_pos_y = o.Location.Y.toFixed(2);
    e.f_player_pos_z = o.Location.Z.toFixed(2);
    e.i_damage = o.Damage.toString();
    if (LOG_SWITCH && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 35, "日志上报-地形机关buff伤害日志", ["内容", e]);
    }
    LogReportController_1.LogReportController.LogReport(e);
  }
  static LogElevatorUsedPush(o) {
    if (LOG_SWITCH && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 35, "日志上报-电梯使用日志", ["内容", o]);
    }
    LogReportController_1.LogReportController.LogReport(o);
  }
  static LogInstFightStartPush(o) {
    if (LOG_SWITCH && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 28, "日志上报-副本开始日志", ["内容", o]);
    }
    LogReportController_1.LogReportController.LogReport(o);
  }
  static LogInstFightEndPush(o) {
    if (LOG_SWITCH && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 28, "日志上报-副本结束日志", ["内容", o]);
    }
    LogReportController_1.LogReportController.LogReport(o);
  }
  static LogRoleDevPush(o) {
    if (LOG_SWITCH && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("RoleDev", 88, "日志上报-角色培养计划日志", ["内容", o]);
    }
    LogReportController_1.LogReportController.LogReport(o);
  }
  static SetCurrentUploadLogId(o) {
    this.vMm = o;
  }
  static LogCustomServiceReport(o) {
    var e = new LogReportDefine_1.CustomServiceLogEvent();
    e.s_trace_id = LogController.vMm;
    e.log_status = LauncherNetworkDetectionDefine_1.SendStateToCustomServiceLogMap.get(o) ?? 0;
    LogReportController_1.LogReportController.LogReport(e);
  }
  static GetSkillButtonDebugInfo() {
    var o = [];
    for (const l of ModelManager_1.ModelManager.SkillButtonUiModel.GetAllSkillButtonEntityData()) {
      var e = new SkillButtonDebugInfo(l.EntityHandle?.Id ?? 0, []);
      if (l.SkillButtonDataMap) {
        for (const n of l.SkillButtonDataMap.values()) {
          e.Button.push(n.GetDebugInfo());
        }
      }
      o.push(e);
    }
    var t = ModelManager_1.ModelManager.SkillButtonUiModel.GetCurSkillButtonFollowerEntityData();
    if (t?.IsEnable && t.SkillButtonDataMap) {
      var r = new SkillButtonDebugInfo(t.EntityHandle?.Id ?? 0, []);
      for (const a of t.SkillButtonDataMap.values()) {
        r.Button.push(a.GetDebugInfo());
      }
      o.push(r);
    }
    return o;
  }
  static OutputDebugInfo(o = true) {
    var e = new DebugInfo(Protocol_1.Aki.Protocol.i4s[ModelManager_1.ModelManager.GameModeModel.InstanceType], ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam(), ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.MapConfigId, Time_1.Time.TimeDilation, ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), [Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy.X.toFixed(2), Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy.Y.toFixed(2), Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy.Z.toFixed(2)], ModelManager_1.ModelManager.GameModeModel.IsMulti, ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer(), FormationDataController_1.FormationDataController.GetPlayerEntity(ModelManager_1.ModelManager.CreatureModel.GetPlayerId()).GetComponent(211).GetAllBuffs().map(o => String(o.Id)), CharacterGasDebugComponent_1.CharacterGasDebugComponent.GetFormationAttributeDebugStrings().replace(/\n/g, ",").replace(/\s/g, ""), ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems().map(o => ({
      EntityHandleId: o.EntityHandle?.Id,
      ConfigId: o.GetConfigId,
      IsMyRole: o.IsMyRole(),
      IsControl: o.IsControl(),
      IsDead: o.IsDead()
    })), this.GetSkillButtonDebugInfo());
    let g = Json_1.Json.Stringify(e);
    ModelManager_1.ModelManager.CreatureModel.GetAllEntities().forEach(o => {
      var e;
      var t;
      var r;
      var l = o.Entity;
      var n = l?.GetComponent(3);
      var a = l?.GetComponent(222);
      if (l && n && a) {
        e = l.GetComponent(0);
        t = l.GetComponent(217);
        r = l.GetComponent(183);
        l = l.GetComponent(111);
        g += `
***********
实体信息: EntityHandleId: ${o.Id}, CreatureDataId: ${e?.GetCreatureDataId()}, PbDataId: ${e?.GetPbDataId()}, Type: ${e?.GetEntityType()}, 位置: ${[n?.ActorLocationProxy.X.toFixed(2), n?.ActorLocationProxy.Y.toFixed(2), n?.ActorLocationProxy.Z.toFixed(2)]}, IsInFighting: ${l?.IsInFighting}
Buff信息: ${a?.GetAllBuffs().map(o => `${o.Id} ${o.Handle} ${o.StackCount}${o.IsActive() ? "" : "(非激活)"}`).join("|")}
属性信息: ${r?.GetDebugString()}
Tag信息: ${t?.TagContainer.GetExactTagsDebugString().replace(/\n/g, ",").replace(/\s/g, "")}`;
      }
    });
    if (o && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 28, `本地打印关键信息快照:
${g}`);
    }
    return g;
  }
  static RequestOutputDebugInfo() {
    var o = new Protocol_1.Aki.Protocol.Debug.FZn();
    o.GKn = LogController.OutputDebugInfo();
    Net_1.Net.Call(21564, o, o => {
      if (o && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Log", 37, "[Debug]服务器端战斗状态信息打印");
      }
    });
  }
}
(exports.LogController = LogController).Gfr = TickSystem_1.TickSystem.InvalidId;
LogController.Ofr = new Array();
LogController.kfr = FRAMING_LOG_NUM;
LogController.Ffr = Stats_1.Stat.Create("LogOnBattleEnd_Framing");
LogController.vMm = "";
LogController.Nfr = () => {
  LogController.Ffr.Start();
  var o = LogController.kfr;
  let e = 0;
  let t = LogController.Ofr.shift();
  while (e < o && t) {
    LogReportController_1.LogReportController.LogReport(t);
    e += 1;
    t = LogController.Ofr.shift();
  }
  if (LogController.Ofr.length === 0) {
    TickSystem_1.TickSystem.Remove(LogController.Gfr);
    LogController.Gfr = TickSystem_1.TickSystem.InvalidId;
  }
  LogController.Ffr.Stop();
};
LogController.SLn = o => {
  LogController.RequestOutputDebugInfo();
}; //# sourceMappingURL=LogController.js.map