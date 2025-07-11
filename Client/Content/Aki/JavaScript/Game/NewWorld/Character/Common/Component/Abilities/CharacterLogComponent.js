"use strict";

var CharacterLogComponent_1;
var __decorate = this && this.__decorate || function (t, e, r, a) {
  var o;
  var n = arguments.length;
  var i = n < 3 ? e : a === null ? a = Object.getOwnPropertyDescriptor(e, r) : a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    i = Reflect.decorate(t, e, r, a);
  } else {
    for (var s = t.length - 1; s >= 0; s--) {
      if (o = t[s]) {
        i = (n < 3 ? o(i) : n > 3 ? o(e, r, i) : o(e, r)) || i;
      }
    }
  }
  if (n > 3 && i) {
    Object.defineProperty(e, r, i);
  }
  return i;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterLogComponent = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../../Core/Common/Stats");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const LogReportDefine_1 = require("../../../../../Module/LogReport/LogReportDefine");
const LogController_1 = require("../../../../../World/Controller/LogController");
const CharacterAttributeTypes_1 = require("./CharacterAttributeTypes");
const CharacterDamageCalculations_1 = require("./CharacterDamageCalculations");
const CharacterUnifiedStateTypes_1 = require("./CharacterUnifiedStateTypes");
const ATK_RATIO = 1.4;
const SKILLLEVEL_CONST = 0.111111;
const RESONANT_CONST = 0.041667;
let CharacterLogComponent = CharacterLogComponent_1 = class CharacterLogComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.qGr = undefined;
    this.GGr = [];
    this.OnAggroChanged = (t, e) => {
      var r;
      var a;
      var o;
      if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) {
        r = e.CharActorComp.Entity.Id;
        e = e.CharActorComp.Entity;
        a = CharacterLogComponent_1.NGr;
        o = CharacterLogComponent_1.OGr;
        if (this.gWe(r)) {
          if (t) {
            a.add(r);
            CharacterLogComponent_1.kGr.set(r, this.FGr(r));
            if (!o.has(r)) {
              (t = CharacterLogComponent_1.VGr(r)).i_monster_level = e.GetComponent(173)?.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Lv) ?? 0;
              e = e.GetComponent(3)?.ActorLocationProxy;
              t.f_pos_x = e.X;
              t.f_pos_y = e.Y;
              t.f_pos_z = e.Z;
              t.InitTime = TimeUtil_1.TimeUtil.GetServerTime();
            }
            o.add(r);
          } else {
            CharacterLogComponent_1.HGr.add(r);
            a.delete(r);
          }
        } else {
          a.delete(r);
        }
      }
    };
    this.jGr = (t, e) => {
      if (CharacterLogComponent_1.WGr()) {
        CharacterLogComponent_1.KGr += t;
      }
      if (e) {
        this.QGr = 2;
      }
    };
    this.XGr = t => {
      if (t) {
        this.QGr = 3;
      }
    };
    this.$Gr = (t, e, r) => {
      if (CharacterLogComponent_1.WGr()) {
        switch (r) {
          case 6:
          case 11:
            CharacterLogComponent_1.YGr += 1;
            CharacterLogComponent_1.JGr.i_acc_dodge_times += 1;
            break;
          case 7:
            CharacterLogComponent_1.zGr += 1;
            CharacterLogComponent_1.JGr.i_dodge_succ_times += 1;
            break;
          case 4:
            CharacterLogComponent_1.ZGr += 1;
        }
        var a = this.Entity.GetComponent(0);
        if (a.IsRole()) {
          var o = CharacterLogComponent_1.eNr(this.Entity.Id, e);
          o.use_count++;
          o.skill_type = r;
          var n = CharacterLogComponent_1.tNr(this.Entity.Id);
          switch (r) {
            case 6:
            case 11:
              n.i_acc_dodge_times += 1;
              break;
            case 7:
              n.i_dodge_succ_times += 1;
          }
        } else if (a.IsMonster()) {
          CharacterLogComponent_1.iNr(this.Entity.Id, Number(e)).use_count++;
        }
        o = this.Entity.Id.toFixed() + "-" + e;
        CharacterLogComponent_1.oNr.set(o, false);
      }
    };
    this.rNr = (t, e) => {
      if (CharacterLogComponent_1.WGr()) {
        CharacterLogComponent_1.tNr(this.Entity.Id).i_bullet_rebound_times++;
        CharacterLogComponent_1.VGr(t.Id).i_bullet_rebound_times++;
        CharacterLogComponent_1.iNr(t.Id, e).bullet_rebound_times++;
        CharacterLogComponent_1.nNr++;
        CharacterLogComponent_1.JGr.i_bullet_rebound_times++;
      }
    };
    this.sNr = (t, e, r) => {
      if (CharacterLogComponent_1.WGr() && r < e) {
        CharacterLogComponent_1.tNr(this.Entity.Id).l_acc_element += e - r;
      }
    };
    this.aNr = (t, e, r) => {
      if (CharacterLogComponent_1.WGr() && t === CharacterAttributeTypes_1.EAttributeId.Proto_Energy && r < e && ((t = CharacterLogComponent_1.tNr(this.Entity.Id)).l_acc_energy += e - r, e >= this.Entity.GetComponent(173).GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_EnergyMax) - Number.EPSILON)) {
        t.i_full_energy_times++;
      }
    };
    this.hUe = () => {
      if (this.Entity.GetComponent(175)?.IsInFightState()) {
        CharacterLogComponent_1.hNr();
      }
    };
    this.BJe = (t, e) => {
      if (this.Entity.GetComponent(175)?.IsInFightState()) {
        CharacterLogComponent_1.hNr();
      }
    };
    this.lNr = () => {
      if (CharacterLogComponent_1.WGr()) {
        if (this.Entity.GetComponent(0).IsRole()) {
          CharacterLogComponent_1._Nr += 1;
          CharacterLogComponent_1.tNr(this.Entity.Id).i_revive_times += 1;
        }
        CharacterLogComponent_1.JGr.i_revive_times++;
      }
    };
    this.uNr = (t, e, r) => {
      r -= e;
      if (!(r <= 0)) {
        if ((e = CharacterLogComponent_1.VGr(this.Entity.Id)) && (e.l_acc_rage += r, this.Entity.GetComponent(61)?.IsTriggerCounterAttack)) {
          e.l_acc_rage_counter += r;
        }
      }
    };
    this.QGr = 0;
    this.cNr = (t, e) => {
      if (CharacterLogComponent_1.WGr() && e) {
        CharacterLogComponent_1.VGr(this.Entity.Id).i_paralysis_times++;
      }
    };
  }
  OnStart() {
    if (!CharacterLogComponent_1.mNr) {
      CharacterLogComponent_1.mNr = true;
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBattleStateChanged, CharacterLogComponent_1.dNr);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, CharacterLogComponent_1.CNr);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTeamLivingStateChange, CharacterLogComponent_1.gNr);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharOnRoleDead, CharacterLogComponent_1.fNr);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, CharacterLogComponent_1.pNr);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LeaveInstanceDungeon, CharacterLogComponent_1.vNr);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TriggerUiTimeDilation, CharacterLogComponent_1.MNr);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnInstResultNotify, CharacterLogComponent_1.ENr);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTowerChallengeChangeTeamNotify, CharacterLogComponent_1.SNr);
    }
    this.yNr();
    return true;
  }
  OnEnd() {
    this.INr();
    return true;
  }
  yNr() {
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.AiHateAddOrRemove, this.OnAggroChanged);
    this.qGr = this.Entity.CheckGetComponent(205).ListenForTagAddOrRemove(1922078392, this.cNr);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharRecordOperate, this.$Gr);
    var t = this.Entity.GetComponent(0);
    if (t.IsRole()) {
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnFallInjure, this.jGr);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRoleDrownInjure, this.XGr);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRevive, this.lNr);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.BulletRebound, this.rNr);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnElementEnergyChanged, this.sNr);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnEnergyChanged, this.aNr);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.hUe);
      this.GGr.push(this.Entity.CheckGetComponent(205).ListenForTagAddOrRemove(-1371021686, this.BJe));
      this.GGr.push(this.Entity.CheckGetComponent(205).ListenForTagAddOrRemove(-1800191060, this.BJe));
      this.GGr.push(this.Entity.CheckGetComponent(205).ListenForTagAddOrRemove(-1221493771, this.BJe));
    } else if (t.IsMonster()) {
      this.Entity.GetComponent(173)?.AddListener(CharacterAttributeTypes_1.EAttributeId.Proto_Rage, this.uNr);
    }
  }
  INr() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.AiHateAddOrRemove, this.OnAggroChanged);
    this.qGr.EndTask();
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharRecordOperate, this.$Gr);
    var t = this.Entity.GetComponent(0);
    if (t.IsRole()) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnFallInjure, this.jGr);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRoleDrownInjure, this.XGr);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRevive, this.lNr);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.BulletRebound, this.rNr);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnElementEnergyChanged, this.sNr);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnEnergyChanged, this.aNr);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.hUe);
      for (const e of this.GGr) {
        e.EndTask();
      }
      this.GGr.length = 0;
    } else if (t.IsMonster()) {
      this.Entity.GetComponent(173)?.RemoveListener(CharacterAttributeTypes_1.EAttributeId.Proto_Rage, this.uNr);
      for (const r of this.GGr) {
        r.EndTask();
      }
      this.GGr.length = 0;
    }
  }
  static WGr() {
    return !ModelManager_1.ModelManager.GameModeModel.IsMulti && !this.TNr() && this.c9 > 0;
  }
  static TNr() {
    var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(ModelManager_1.ModelManager.CreatureModel.GetInstanceId()).FightFormationId;
    return (ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(t)?.TrialRole?.length ?? 0) > 0;
  }
  FGr(t) {
    var e;
    var t = EntitySystem_1.EntitySystem.Get(t);
    if (t) {
      e = new LogReportDefine_1.MonsterInfoLogData(undefined);
      t = t.GetComponent(0);
      e.pbdata_id = t.GetPbDataId();
      e.config_type = t.GetEntityConfigType();
      return e;
    }
  }
  gWe(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    return !!t && (t.GetComponent(3)?.CreatureData).GetBaseInfo()?.Category.MainType === "Monster";
  }
  LNr() {
    var t = this.Entity.GetComponent(205);
    if (t.HasTag(-1800191060) || t.HasTag(-1221493771)) {
      return 7;
    } else if (t.HasTag(-1371021686)) {
      return 6;
    } else {
      return undefined;
    }
  }
  DNr() {
    switch (this.Entity.GetComponent(175).MoveState) {
      case CharacterUnifiedStateTypes_1.ECharMoveState.Walk:
      case CharacterUnifiedStateTypes_1.ECharMoveState.WalkStop:
      case CharacterUnifiedStateTypes_1.ECharMoveState.Run:
      case CharacterUnifiedStateTypes_1.ECharMoveState.RunStop:
      case CharacterUnifiedStateTypes_1.ECharMoveState.Sprint:
      case CharacterUnifiedStateTypes_1.ECharMoveState.SprintStop:
      case CharacterUnifiedStateTypes_1.ECharMoveState.LandRoll:
        return 1;
      case CharacterUnifiedStateTypes_1.ECharMoveState.NormalClimb:
      case CharacterUnifiedStateTypes_1.ECharMoveState.FastClimb:
        return 4;
      case CharacterUnifiedStateTypes_1.ECharMoveState.FastSwim:
      case CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim:
        return 2;
      case CharacterUnifiedStateTypes_1.ECharMoveState.Glide:
        return 3;
      case CharacterUnifiedStateTypes_1.ECharMoveState.Captured:
      case CharacterUnifiedStateTypes_1.ECharMoveState.HeavyKnock:
      case CharacterUnifiedStateTypes_1.ECharMoveState.KnockDown:
      case CharacterUnifiedStateTypes_1.ECharMoveState.KnockUp:
      case CharacterUnifiedStateTypes_1.ECharMoveState.Parry:
        return 5;
      default:
        return 0;
    }
  }
  static RNr() {
    if (this.CurrentEntity === undefined) {
      for (const r of this.UNr.values()) {
        if (r.Entity.GetComponent(175)?.IsInFightState()) {
          this.CurrentEntity = r;
          break;
        }
      }
    }
    var t;
    var e;
    if (this.CurrentEntity) {
      if ((e = (t = this.CurrentEntity.Entity.GetComponent(23))?.LNr()) !== undefined) {
        return e;
      } else {
        return t?.DNr() ?? 0;
      }
    } else {
      return 0;
    }
  }
  static ANr() {
    var t = this.PNr;
    t.i_move_duration = 0;
    t.i_swim_duration = 0;
    t.i_glide_duration = 0;
    t.i_climb_duration = 0;
    t.i_behit_duration = 0;
    t.i_skill_duration = 0;
    t.i_dash_duration = 0;
    t.i_other_duration = 0;
    var t = this.RNr();
    var e = TimeUtil_1.TimeUtil.GetServerTime();
    this.xNr = {
      State: t,
      StartTime: e
    };
  }
  static hNr() {
    var t = TimeUtil_1.TimeUtil.GetServerTime();
    var e = this.RNr();
    var r = this.PNr;
    if (this.xNr === undefined) {
      this.xNr = {
        State: e,
        StartTime: t
      };
      if (this.wNr > 0) {
        r.i_other_duration += t - this.wNr;
      }
    } else {
      var a = this.xNr;
      var o = this.JGr;
      var n = t - a.StartTime;
      switch (a.State) {
        case 1:
          r.i_move_duration += n;
          o.i_move_duration += n;
          break;
        case 2:
          r.i_swim_duration += n;
          o.i_swim_duration += n;
          break;
        case 3:
          r.i_glide_duration += n;
          o.i_glide_duration += n;
          break;
        case 4:
          r.i_climb_duration += n;
          o.i_climb_duration += n;
          break;
        case 5:
          r.i_behit_duration += n;
          o.i_behit_duration += n;
          break;
        case 6:
          r.i_skill_duration += n;
          o.i_skill_duration += n;
          break;
        case 7:
          r.i_dash_duration += n;
          o.i_dash_duration += n;
          break;
        default:
          r.i_other_duration += n;
          o.i_other_duration += n;
      }
      a.State = e;
      a.StartTime = t;
    }
  }
  static BNr(t) {
    if (t?.Valid && (t = t.GetComponent(0))?.Valid) {
      return t.GetRoleId();
    } else {
      return -1;
    }
  }
  static get UNr() {
    return ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(true);
  }
  static bNr() {
    this.c9 = 0;
    this.qNr = 0;
    this._Nr = 0;
    this.GNr = 0;
    this.KGr = 0;
    this.NNr = 0;
    this.ONr = 0;
    this.kNr = 0;
    this.FNr = 0;
    this.YGr = 0;
    this.zGr = 0;
    this.VNr = 0;
    this.HNr = 0;
    this.jNr = 0;
    this.ZGr = 0;
    this.wNr = 0;
    this.WNr = 0;
    this.KNr = 0;
    this.nNr = 0;
    this.xNr = undefined;
    this.PNr.s_monster_hate.length = 0;
    this.PNr.s_death_monster.length = 0;
    this.PNr.s_run_monster.length = 0;
    this.PNr.s_team_character.length = 0;
    this.PNr.s_team_hp_per.length = 0;
    this.PNr.i_move_duration = 0;
    this.PNr.i_swim_duration = 0;
    this.PNr.i_glide_duration = 0;
    this.PNr.i_climb_duration = 0;
    this.PNr.i_behit_duration = 0;
    this.PNr.i_skill_duration = 0;
    this.PNr.i_dash_duration = 0;
    this.PNr.i_other_duration = 0;
    this.NGr.clear();
    this.OGr.clear();
    this.QNr.clear();
    this.HGr.clear();
    this.kGr.clear();
    this.oNr.clear();
  }
  static tNr(t) {
    let e = this.XNr.get(t);
    if (!e) {
      if (EntitySystem_1.EntitySystem.Get(t)?.GetComponent(0)?.GetRoleId()) {
        if (e = this.$Nr(t)) {
          this.XNr.set(t, e);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 19, "无法获取entity的config Id", ["entityId", t]);
      }
    }
    return e;
  }
  static YNr() {
    var t = this.UNr;
    var e = new Array();
    for (const a of t) {
      var r = this.tNr(a.Id);
      e.push(r.i_role_id);
    }
    return e.toString();
  }
  static eNr(r, a) {
    var o = r.toFixed() + "-" + a.toFixed();
    let n = this.JNr.get(o);
    if (!n) {
      n = new LogReportDefine_1.RoleSkillRecord(a);
      this.JNr.set(o, n);
      let t = this.zNr.get(r);
      if (!t) {
        t = new Array();
        this.zNr.set(r, t);
      }
      t.push(n);
      let e = this.ZNr.get(r);
      if (!e) {
        a = this.BNr(EntitySystem_1.EntitySystem.Get(r));
        o = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(a);
        (e = this.eOr() ? new LogReportDefine_1.InstRoleSkillReportLog(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId, ModelManager_1.ModelManager.CreatureModel.GetSceneId()) : new LogReportDefine_1.RoleSkillReportLog()).s_battle_id = (ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString() ?? "0") + "_" + String(this.c9);
        e.i_role_id = a;
        e.i_role_level = o.GetLevelData()?.GetLevel();
        e.i_role_quality = o.GetQualityConfig().Id;
        this.ZNr.set(r, e);
      }
    }
    return n;
  }
  static VGr(t) {
    let e = this.tOr.get(t);
    var r;
    var a;
    if (!e) {
      if (a = EntitySystem_1.EntitySystem.Get(t)) {
        r = a.GetComponent(0);
        (e = this.eOr() ? new LogReportDefine_1.InstMonsterStateRecord(r.GetPbDataId(), r.EntityPbModelConfigId, ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId, ModelManager_1.ModelManager.CreatureModel.GetSceneId()) : new LogReportDefine_1.MonsterStateRecord(r.GetPbDataId(), r.EntityPbModelConfigId)).s_battle_id = (ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString() ?? "0") + "_" + String(this.c9);
        e.i_monster_score = this.iOr(t);
        r = a.GetComponent(0).GetPbDataId();
        if ((a = ModelManager_1.ModelManager.CreatureModel.GetEntityOwner(ModelManager_1.ModelManager.GameModeModel.MapConfig.MapId, r))?.Type === "Quest") {
          e.i_from_quest = a.QuestId;
        } else if (a?.Type === "LevelPlay") {
          e.i_from_play = a.LevelPlayId;
        }
        this.tOr.set(t, e);
      }
    }
    return e;
  }
  static iNr(r, a) {
    var o = r.toFixed() + "-" + a.toFixed();
    let n = this.oOr.get(o);
    if (!n) {
      n = new LogReportDefine_1.MonsterSkillRecord(a);
      this.oOr.set(o, n);
      let t = this.rOr.get(r);
      if (!t) {
        t = new Array();
        this.rOr.set(r, t);
      }
      t.push(n);
      let e = this.nOr.get(r);
      if (!e) {
        o = (a = EntitySystem_1.EntitySystem.Get(r)).GetComponent(0);
        (e = this.eOr() ? new LogReportDefine_1.InstMonsterSkillReportLog(o.GetPbDataId(), o.EntityPbModelConfigId, ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId, ModelManager_1.ModelManager.CreatureModel.GetSceneId()) : new LogReportDefine_1.MonsterSkillReportLog(o.GetPbDataId(), o.EntityPbModelConfigId)).s_battle_id = (ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString() ?? "0") + "_" + String(this.c9);
        e.i_monster_level = a.GetComponent(173)?.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Lv) ?? 0;
        this.nOr.set(r, e);
      }
    }
    return n;
  }
  static sOr() {
    if (!(this.c9 > 0) && !this.eOr() && !(this.c9 = Math.floor(TimeUtil_1.TimeUtil.GetServerTime()), this.c9 <= 0)) {
      this.aOr.Start();
      var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
      var e = t.Entity.GetComponent(3);
      this.wNr = TimeUtil_1.TimeUtil.GetServerTime();
      this.ANr();
      if (t?.Valid) {
        (t = this.tNr(t.Id)).LastGoToBattleTimePoint = TimeUtil_1.TimeUtil.GetServerTime();
        t.i_enter_times++;
      }
      var t = this.UNr;
      var r = new Array();
      var a = new Array();
      for (const i of t) {
        var o = this.tNr(i.Id);
        var n = i.Entity.GetComponent(173);
        o.i_begin_hp = n.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Life);
        o.i_hp_max = n.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.l5n);
        o.i_enter_battle_score = this.hOr(i.Id);
        r.push(o.i_role_id);
        a.push(Math.round(o.i_begin_hp / o.i_hp_max * 10000));
        if (n.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Energy) >= n.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_EnergyMax)) {
          o.i_full_energy_times++;
        }
      }
      this.lOr.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId;
      this.lOr.f_x = e.ActorLocationProxy.X;
      this.lOr.f_y = e.ActorLocationProxy.Y;
      this.lOr.f_z = e.ActorLocationProxy.Z;
      this.lOr.s_battle_id = (ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString() ?? "0") + "_" + String(this.c9);
      this.lOr.s_team_character = r;
      this.lOr.s_team_hp_per = a;
      if (this.c9 > 0) {
        LogController_1.LogController.LogBattleStartPush(this.lOr);
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 4, "战斗ID不合法", ["battle_id", this.c9]);
      }
      this.aOr.Stop();
    }
  }
  static _Or() {
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti && this.c9 !== 0 && !this.eOr()) {
      this.uOr.Start();
      var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
      var [r, a] = this.cOr(e.Entity);
      const o = this.PNr;
      o.i_area_id = ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId;
      e = e.Entity.GetComponent(3).ActorLocationProxy;
      o.f_x = e.X;
      o.f_y = e.Y;
      o.f_z = e.Z;
      o.s_team_character = r;
      o.s_team_hp_per = a;
      o.s_battle_id = (ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString() ?? "0") + "_" + String(this.c9);
      const n = this.kGr;
      this.OGr.forEach(t => {
        o.s_monster_hate.push(n.get(t));
      });
      this.QNr.forEach(t => {
        o.s_death_monster.push(new LogReportDefine_1.MonsterInfoLogData(n.get(t)));
      });
      this.OGr.forEach(t => {
        if (!this.QNr.has(t)) {
          o.s_run_monster.push(new LogReportDefine_1.MonsterInfoLogData(n.get(t)));
        }
      });
      e = o.s_run_monster.length;
      let t = this.WNr;
      if (t !== Protocol_1.Aki.Protocol.w4s.Proto_Death) {
        if (e === 0) {
          t = Protocol_1.Aki.Protocol.w4s.Proto_AllKill;
        } else if (e < this.OGr.size) {
          t = Protocol_1.Aki.Protocol.w4s.mEs;
        } else if (e === this.OGr.size) {
          t = Protocol_1.Aki.Protocol.w4s.Proto_Run;
        }
      }
      o.i_result = t;
      o.i_death_role_count = this.qNr;
      o.i_revive_times = this._Nr;
      o.l_acc_damage = this.NNr;
      o.l_acc_shield_damage = this.ONr;
      o.l_acc_self_damage = this.GNr;
      o.l_acc_skill_heal = this.kNr;
      o.l_acc_item_heal = this.FNr;
      o.i_stop_times = this.VNr;
      o.i_damage_max = this.HNr;
      o.i_acc_dodge_times = this.YGr;
      o.i_dodge_succ_times = this.zGr;
      o.i_non_character_damage = this.KGr;
      o.i_non_character_shield_damage = 0;
      o.i_change_character_times = this.jNr;
      o.i_qte_times = this.ZGr;
      o.i_cost_time = TimeUtil_1.TimeUtil.GetServerTime() - this.wNr;
      o.i_counter_attack_times = this.KNr;
      o.i_bullet_rebound_times = this.nNr;
      this.hNr();
      if (o.i_cost_time <= 0 || o.s_monster_hate.length <= 0) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 4, "战斗时长为0,或者历史仇恨为0", ["Data", o]);
        }
      } else {
        LogController_1.LogController.LogBattleEndPush(o, true);
      }
      this.mOr();
      this.dOr();
      this.COr();
      this.gOr();
      this.fOr();
      this.bNr();
      this.uOr.Stop();
    }
  }
  static mOr() {
    for (const t of this.XNr.values()) {
      LogController_1.LogController.LogSingleCharacterStatusPush(t, true);
    }
    this.XNr.clear();
  }
  static dOr() {
    for (const e of this.tOr.values()) {
      if (e.i_acc_time <= 0) {
        e.i_acc_time = TimeUtil_1.TimeUtil.GetServerTime() - e.InitTime;
      }
      var t = e.l_acc_rage;
      e.l_acc_rage_other = t - e.l_acc_rage_normal - e.l_acc_rage_counter - e.l_acc_rage_vision;
      LogController_1.LogController.LogSingleMonsterStatusPush(e, true);
    }
    this.tOr.clear();
  }
  static COr() {
    for (const t of this.ZNr.entries()) {
      LogController_1.LogController.LogRoleSkillReportPush(t[1], this.zNr.get(t[0]), true);
    }
    this.zNr.clear();
    this.JNr.clear();
    this.ZNr.clear();
  }
  static gOr() {
    if (this.pOr.size > 0) {
      let t = undefined;
      if (this.eOr()) {
        t = new LogReportDefine_1.InstReactionLogRecord(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId, ModelManager_1.ModelManager.CreatureModel.GetSceneId());
      } else {
        (t = new LogReportDefine_1.ReactionLogRecord()).s_battle_id = (ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString() ?? "0") + "_" + String(this.c9);
      }
      LogController_1.LogController.LogDoubleBallReport(t, this.pOr, true);
    }
    this.pOr.clear();
    this.vOr.clear();
  }
  static MOr() {
    this.EOr.Clear();
    this.JGr.Clear();
    this.EOr.i_start_time = TimeUtil_1.TimeUtil.GetServerTime();
    this.EOr.i_inst_id = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
    this.EOr.s_fight_id = ModelManager_1.ModelManager.CreatureModel.GetSceneId();
    this.EOr.s_fight_roles = this.YNr();
    this.EOr.i_area_index = this.SOr;
    LogController_1.LogController.LogInstFightStartPush(this.EOr);
  }
  static yOr() {
    this.JGr.i_inst_id = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
    this.JGr.s_fight_id = ModelManager_1.ModelManager.CreatureModel.GetSceneId();
    this.cOr(ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity);
    this.JGr.i_fight_use_time += TimeUtil_1.TimeUtil.GetServerTime() - this.wNr;
    this.JGr.i_inst_use_time = TimeUtil_1.TimeUtil.GetServerTime() - this.EOr.i_start_time;
    this.JGr.s_fight_roles = this.YNr();
    this.JGr.i_area_index = this.SOr;
    this.mOr();
    this.dOr();
    this.COr();
    this.gOr();
    this.fOr();
    this.bNr();
    LogController_1.LogController.LogInstFightEndPush(this.JGr);
    this.EOr.Clear();
    this.JGr.Clear();
  }
  static fOr() {
    for (const t of this.nOr.entries()) {
      LogController_1.LogController.LogMonsterSkillReportPush(t[1], this.rOr.get(t[0]), true);
    }
    this.oOr.clear();
    this.rOr.clear();
    this.nOr.clear();
  }
  static IOr(t) {
    var e = new Map();
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(t, {
      ParamType: 1
    }).GetConfigId;
    var r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t);
    for (const o of r.GetSkillData().GetSkillList()) {
      var a = r.GetSkillData().GetSkillLevel(o.Id);
      e.set(o.Id, a);
    }
    return Object.fromEntries(e);
  }
  static TOr(t) {
    const a = new Array();
    ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(t).GetIncrIdList().forEach((t, e) => {
      var r;
      if (t) {
        r = new Array();
        t = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(t);
        r.push(t.GetConfigId());
        r.push(t.GetPhantomLevel());
        r.push(e);
        a.push(r);
      }
    });
    return a;
  }
  static hOr(t) {
    var e = 0;
    var r = EntitySystem_1.EntitySystem.Get(t);
    var a = r.GetComponent(173);
    var r = r.GetComponent(91);
    var r = CharacterDamageCalculations_1.Calculation.GetElementDamageBonus(a.TakeSnapshot(), r.RoleElementType);
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(t, {
      ParamType: 1
    }).GetConfigId;
    var o = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t);
    var t = a.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Atk);
    var e = ATK_RATIO * t;
    var t = a.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Crit);
    var n = a.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_CritDamage);
    e *= t / CharacterAttributeTypes_1.PER_TEN_THOUSAND * (n / CharacterAttributeTypes_1.PER_TEN_THOUSAND) + (1 - t / CharacterAttributeTypes_1.PER_TEN_THOUSAND);
    var n = a.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_DamageChange);
    e *= 1 + n / CharacterAttributeTypes_1.PER_TEN_THOUSAND + r / CharacterAttributeTypes_1.PER_TEN_THOUSAND;
    var t = o.GetSkillData().GetSkillList();
    let i = 0;
    let s = 0;
    for (const _ of t) {
      var h = o.GetSkillData().GetSkillLevel(_.Id);
      if (i < h) {
        i = h;
      } else if (s < h) {
        s = h;
      }
    }
    return e = (e *= 1 + ((i + s) / 2 - 1) * SKILLLEVEL_CONST) * (1 + o.GetResonanceData().GetResonantChainGroupIndex() * RESONANT_CONST);
  }
  static $Nr(e) {
    var r = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e)?.Entity?.GetComponent(0)?.GetRoleId() ?? 0;
    var a = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(e, {
      ParamType: 1
    });
    if (a) {
      let t = undefined;
      (t = this.eOr() ? new LogReportDefine_1.InstRoleStateRecord(r, ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId, ModelManager_1.ModelManager.CreatureModel.GetSceneId()) : new LogReportDefine_1.RoleStateRecord(r)).s_battle_id = (ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString() ?? "0") + "_" + String(this.c9);
      r = a.GetConfigId;
      a = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(r);
      t.i_role_level = a.GetLevelData().GetLevel();
      t.i_role_quality = a.GetQualityConfig().Id;
      t.i_role_reson = a.GetResonanceData().GetResonantChainGroupIndex();
      a = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(r);
      t.i_weapon_id = a.GetItemId();
      t.i_weapon_type = a.GetItemConfig().WeaponType;
      t.i_weapon_quality = a.GetItemConfig().QualityId;
      t.i_weapon_level = a.GetLevel();
      a = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(r, 0);
      a = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(a);
      if (a) {
        t.i_vision_skill_id = a.GetConfigId();
        t.i_vision_skill_level = a.GetPhantomLevel();
      }
      t.s_role_skill = this.IOr(e);
      t.s_phantom_battle_data = this.TOr(r);
      t.s_phantom_fetter_list = [...ModelManager_1.ModelManager.PhantomBattleModel.GetTargetRoleFetterList(r)];
      return t;
    }
  }
  static iOr(t) {
    var t = EntitySystem_1.EntitySystem.Get(t).GetComponent(173);
    var e = (t.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_DamageResistancePhys) + t.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_DamageResistanceElement1) + t.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_DamageResistanceElement2) + t.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_DamageResistanceElement3) + t.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_DamageResistanceElement4) + t.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_DamageResistanceElement5) + t.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_DamageResistanceElement6)) / 7 / CharacterAttributeTypes_1.PER_TEN_THOUSAND;
    var t = t.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.l5n) / (1 - e) / 0.5;
    let r = 0;
    for (const o of this.UNr) {
      var a = this.tNr(o.Id);
      if (a.i_enter_battle_score > r) {
        r = a.i_enter_battle_score;
      }
    }
    return t / r;
  }
  static eOr() {
    return this.EOr.i_start_time > 0;
  }
  static cOr(t) {
    if (t?.Valid && (t = this.tNr(t.Id)).LastGoToBattleTimePoint !== 0) {
      t.i_acc_time += TimeUtil_1.TimeUtil.GetServerTime() - t.LastGoToBattleTimePoint;
    }
    var t = this.UNr;
    var e = new Array();
    var r = new Array();
    for (const n of t) {
      var a = this.tNr(n.Id);
      var o = n.Entity.GetComponent(173);
      a.i_end_hp = o.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Life);
      a.i_hp_max = o.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.l5n);
      e.push(a.i_role_id);
      r.push(Math.round(a.i_end_hp / a.i_hp_max * 10000));
    }
    return [e, r];
  }
};
CharacterLogComponent.mNr = false;
CharacterLogComponent.dNr = t => {
  if (t) {
    CharacterLogComponent_1.sOr();
  } else {
    CharacterLogComponent_1._Or();
  }
};
CharacterLogComponent.pNr = () => {
  if (ModelManager_1.ModelManager.GameModeModel.InstanceType > 1 && !ModelManager_1.ModelManager.GameModeModel.IsMulti) {
    CharacterLogComponent_1.SOr = 0;
    CharacterLogComponent_1.MOr();
  }
};
CharacterLogComponent.vNr = () => {
  if (ModelManager_1.ModelManager.GameModeModel.InstanceType > 1 && !ModelManager_1.ModelManager.GameModeModel.IsMulti) {
    CharacterLogComponent_1.yOr();
    CharacterLogComponent_1.SOr = 0;
  }
};
CharacterLogComponent.MNr = () => {
  if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) {
    CharacterLogComponent_1.VNr += 1;
    CharacterLogComponent_1.JGr.i_stop_times += 1;
  }
};
CharacterLogComponent.xNr = undefined;
CharacterLogComponent.CurrentEntity = undefined;
CharacterLogComponent.CNr = (t, e) => {
  CharacterLogComponent_1.CurrentEntity = t;
  if (CharacterLogComponent_1.WGr()) {
    CharacterLogComponent_1.jNr += 1;
    if (t = CharacterLogComponent_1.tNr(t?.Id)) {
      t.LastGoToBattleTimePoint = TimeUtil_1.TimeUtil.GetServerTime();
      t.i_enter_times++;
    }
    if (t = CharacterLogComponent_1.tNr(e?.Id ?? 0)) {
      t.i_leave_times += 1;
      if (t.LastGoToBattleTimePoint !== 0) {
        t.i_acc_time += TimeUtil_1.TimeUtil.GetServerTime() - t.LastGoToBattleTimePoint;
      } else {
        t.LastGoToBattleTimePoint = TimeUtil_1.TimeUtil.GetServerTime();
      }
    }
    CharacterLogComponent_1.hNr();
  }
};
CharacterLogComponent.gNr = (t, e, r) => {
  if (t && e === 1 && r !== 1 && CharacterLogComponent_1.WGr()) {
    CharacterLogComponent_1.WNr = Protocol_1.Aki.Protocol.w4s.Proto_Death;
    CharacterLogComponent_1.dNr(false);
  }
};
CharacterLogComponent.c9 = 0;
CharacterLogComponent.qNr = 0;
CharacterLogComponent._Nr = 0;
CharacterLogComponent.GNr = 0;
CharacterLogComponent.KGr = 0;
CharacterLogComponent.ONr = 0;
CharacterLogComponent.NNr = 0;
CharacterLogComponent.kNr = 0;
CharacterLogComponent.FNr = 0;
CharacterLogComponent.YGr = 0;
CharacterLogComponent.zGr = 0;
CharacterLogComponent.VNr = 0;
CharacterLogComponent.HNr = 0;
CharacterLogComponent.jNr = 0;
CharacterLogComponent.ZGr = 0;
CharacterLogComponent.wNr = 0;
CharacterLogComponent.WNr = 0;
CharacterLogComponent.KNr = 0;
CharacterLogComponent.nNr = 0;
CharacterLogComponent.NGr = new Set();
CharacterLogComponent.OGr = new Set();
CharacterLogComponent.QNr = new Set();
CharacterLogComponent.HGr = new Set();
CharacterLogComponent.kGr = new Map();
CharacterLogComponent.oNr = new Map();
CharacterLogComponent.EOr = new LogReportDefine_1.InstFightStartRecord();
CharacterLogComponent.JGr = new LogReportDefine_1.InstFightEndRecord();
CharacterLogComponent.SOr = 0;
CharacterLogComponent.XNr = new Map();
CharacterLogComponent.JNr = new Map();
CharacterLogComponent.zNr = new Map();
CharacterLogComponent.ZNr = new Map();
CharacterLogComponent.tOr = new Map();
CharacterLogComponent.oOr = new Map();
CharacterLogComponent.rOr = new Map();
CharacterLogComponent.nOr = new Map();
CharacterLogComponent.pOr = new Map();
CharacterLogComponent.vOr = new Map();
CharacterLogComponent.lOr = new LogReportDefine_1.BattleStartLogData();
CharacterLogComponent.aOr = Stats_1.Stat.Create("LogOnBattleStart");
CharacterLogComponent.PNr = new LogReportDefine_1.BattleEndLogData();
CharacterLogComponent.uOr = Stats_1.Stat.Create("LogOnBattleEnd");
CharacterLogComponent.fNr = t => {
  var e;
  if (!ModelManager_1.ModelManager.GameModeModel.IsMulti && !ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
    if ((t = EntitySystem_1.EntitySystem.Get(t))?.GetComponent(0)?.IsRole() && (e = CharacterLogComponent_1.BNr(t), t = t.GetComponent(23), e)) {
      LogController_1.LogController.LogCharacterDeathPush(e, t.QGr, true);
      t.QGr = 0;
    }
    CharacterLogComponent_1.JGr.i_death_role_count++;
  }
};
CharacterLogComponent.ENr = t => {
  if (t.tMs) {
    CharacterLogComponent_1.JGr.i_result = Number(t.tMs);
  }
  if (t.x9n) {
    CharacterLogComponent_1.JGr.i_reason = t.x9n;
  }
};
CharacterLogComponent.SNr = () => {
  if (ModelManager_1.ModelManager.GameModeModel.InstanceType > 1 && !ModelManager_1.ModelManager.GameModeModel.IsMulti) {
    CharacterLogComponent_1.SOr++;
    CharacterLogComponent_1.yOr();
    CharacterLogComponent_1.MOr();
  }
};
CharacterLogComponent = CharacterLogComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(23)], CharacterLogComponent);
exports.CharacterLogComponent = CharacterLogComponent; //# sourceMappingURL=CharacterLogComponent.js.map