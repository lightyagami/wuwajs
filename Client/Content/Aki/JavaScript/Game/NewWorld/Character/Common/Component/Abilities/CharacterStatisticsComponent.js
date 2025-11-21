"use strict";

var CharacterStatisticsComponent_1;
var __decorate = this && this.__decorate || function (t, i, e, a) {
  var s;
  var r = arguments.length;
  var n = r < 3 ? i : a === null ? a = Object.getOwnPropertyDescriptor(i, e) : a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, i, e, a);
  } else {
    for (var o = t.length - 1; o >= 0; o--) {
      if (s = t[o]) {
        n = (r < 3 ? s(n) : r > 3 ? s(i, e, n) : s(i, e)) || n;
      }
    }
  }
  if (r > 3 && n) {
    Object.defineProperty(i, e, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterStatisticsComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const Time_1 = require("../../../../../../Core/Common/Time");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const StringBuilder_1 = require("../../../../../../Core/Utils/StringBuilder");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../../../Common/PublicUtil");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CharacterUnifiedStateTypes_1 = require("./CharacterUnifiedStateTypes");
const skillTypeToString = ["常态攻击", "共鸣技能", "共鸣解放", "固有技能", "连携技能", "异能力", "声骸技能"];
const attackTypeToString = ["普攻伤害", "蓄力攻击伤害", "大招伤害", "QTE伤害", "普通技能伤害", "战斗幻象技能伤害", "探索幻象技能伤害"];
class TargetDamageStatistics {
  constructor(t) {
    this.TargetId = t;
    this.DQo = 0;
    this.IsValid = true;
    var t = EntitySystem_1.EntitySystem.Get(t).GetComponent(0);
    var i = t.GetEntityType();
    this.JB = i === Protocol_1.Aki.Protocol.kks.Proto_Monster;
    this.Xjt = i === Protocol_1.Aki.Protocol.kks.Proto_Player;
    this.Mne = 0;
    this.RQo = "";
    if (this.JB) {
      this.Mne = t.GetPbDataId();
      this.RQo = PublicUtil_1.PublicUtil.GetConfigTextByKey(t.GetEntityTidName() ?? "");
    } else if (this.Xjt) {
      i = t.Valid ? t.GetRoleId() : 0;
      if (t = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(i)) {
        this.Mne = t;
        i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.Mne);
        this.RQo = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(i.Name);
      } else {
        this.IsValid = false;
      }
    }
  }
  AddDamageValue(t) {
    this.DQo += t;
  }
  ToString() {
    return StringUtils_1.StringUtils.Format(",{0},{1},{2},{3},{4}", this.JB ? "怪物" : this.Xjt ? "角色" : "出错？？", this.RQo, this.Mne.toString(), this.TargetId.toString(), this.DQo.toString());
  }
}
class DamageStatisticsData {
  constructor(t, i, e, a) {
    this.RoleId = t;
    this.RoleName = i;
    this.DamageType = e;
    this.IsHeal = a;
    this.UQo = new Map();
  }
  AddDamageValue(t, i) {
    let e = this.UQo.get(t);
    if (!e) {
      if (!(e = new TargetDamageStatistics(t)).IsValid) {
        return;
      }
      this.UQo.set(t, e);
    }
    e.AddDamageValue(i);
  }
  GetTargetCount() {
    return this.UQo.size;
  }
  ToString() {
    var t = new StringBuilder_1.StringBuilder();
    for (const i of this.UQo.values()) {
      t.Append(i.ToString());
    }
    return StringUtils_1.StringUtils.Format("{0},{1},{2},{3}{4}\n", this.RoleId.toString(), this.RoleName, this.IsHeal ? "治疗" : "伤害", this.DamageType, t.ToString());
  }
}
class CombatDataBase {
  constructor(t, i = 0) {
    this.AttackerId = t;
    this.TargetId = i;
    this.String = "";
    var t = new Date();
    var i = t.getHours();
    var e = t.getMinutes();
    var t = t.getSeconds();
    this.DateCreate = StringUtils_1.StringUtils.Format("{0}-{1}-{2}", i < 10 ? "0" + i : i.toString(), e < 10 ? "0" + e : e.toString(), t < 10 ? "0" + t : t.toString());
  }
  ToString() {
    if (!this.String || !(this.String.length > 0)) {
      this.String = this.ParseToString();
    }
    return this.String;
  }
  static GetEntityConfigName(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (t) {
      var i;
      var t = t.GetComponent(0);
      var e = t?.GetEntityType();
      if (e === Protocol_1.Aki.Protocol.kks.Proto_Player) {
        i = t.Valid ? t.GetRoleId() : 0;
        if (i = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(i)) {
          i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i);
          return ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(i.Name);
        } else {
          return undefined;
        }
      }
      if (e === Protocol_1.Aki.Protocol.kks.Proto_Monster) {
        return PublicUtil_1.PublicUtil.GetConfigTextByKey(t.GetEntityTidName() ?? "");
      }
    }
  }
  static GetSkillConfigName(t, i) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (t) {
      return t.GetComponent(40).GetSkillInfo(i).SkillName.toString();
    }
  }
  static GetEntityConfigNameAndSkillName(t, i, e) {
    t = EntitySystem_1.EntitySystem.Get(t);
    let a = undefined;
    let s = undefined;
    if (t) {
      var r = t.GetComponent(0);
      var n = r?.GetEntityType();
      if (n === Protocol_1.Aki.Protocol.kks.Proto_Player) {
        var o = r.Valid ? r.GetRoleId() : 0;
        var o = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(o);
        if (!o) {
          return [undefined, undefined];
        }
        o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(o);
        a = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(o.Name);
        o = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(o.SkillId);
        let t = -1;
        if (o) {
          for (const h of o) {
            if (h.DamageList.includes(i)) {
              s = skillTypeToString[h.SkillType - 1];
              t = h.SkillType;
              break;
            }
          }
        }
        if (t < 0 && (ModelManager_1.ModelManager.DamageModel?.GetDamageConfigById(i)).Type === 5) {
          s = "幻象技能";
        }
        return [a, s];
      }
      if (n === Protocol_1.Aki.Protocol.kks.Proto_Monster) {
        a = PublicUtil_1.PublicUtil.GetConfigTextByKey(r.GetEntityTidName() ?? "");
        o = t.GetComponent(40).GetSkillInfo(e);
        s = o.SkillName.toString();
        return [a, s];
      }
    }
    return [undefined, undefined];
  }
}
class CombatDataDamage extends CombatDataBase {
  constructor(t, i, e, a, s = 0) {
    super(t, s);
    this.DamageId = i;
    this.DamageValue = e;
    this.SkillId = a;
  }
  ParseToString() {
    var [t, i] = CombatDataBase.GetEntityConfigNameAndSkillName(this.AttackerId, this.DamageId, this.SkillId);
    var e = CombatDataBase.GetEntityConfigName(this.TargetId);
    var a = 0;
    var a = EntitySystem_1.EntitySystem.Get(this.TargetId).GetComponent(177).GetCurrentValue(Protocol_1.Aki.Protocol.Vks.Proto_Life);
    return StringUtils_1.StringUtils.Format("<Date>[{0}]</><Atk>{1}</>施放了<Skill>{2}</>对<Victim>{3}</>造成<NumDmg>{4}</>点伤害<Change>{5}</>", this.DateCreate, t ?? "", i ?? "", e ?? "", this.DamageValue.toString(), a <= 0 ? "(死亡)" : StringUtils_1.StringUtils.Format("({0}->{1})", (a + this.DamageValue).toString(), a.toString()));
  }
}
class CombatDataHeal extends CombatDataBase {
  constructor(t, i, e, a, s = 0) {
    super(t, s);
    this.HealId = i;
    this.HealValue = e;
    this.SkillId = a;
  }
  ParseToString() {
    var [t, i] = CombatDataBase.GetEntityConfigNameAndSkillName(this.AttackerId, this.HealId, this.SkillId);
    var e = CombatDataBase.GetEntityConfigName(this.TargetId);
    var a = 0;
    var s = EntitySystem_1.EntitySystem.Get(this.TargetId).GetComponent(177);
    var a = s.GetCurrentValue(Protocol_1.Aki.Protocol.Vks.Proto_Life);
    var s = s.GetCurrentValue(Protocol_1.Aki.Protocol.Vks.l5n);
    return StringUtils_1.StringUtils.Format("<Date>[{0}]</><Atk>{1}</>施放了<Skill>{2}</>使<Victim>{3}</>恢复<NumDmg>{4}</>点生命<Change>{5}</>", this.DateCreate, t ?? "", i ?? "", e ?? "", this.HealValue.toString(), a === s ? "(满血)" : StringUtils_1.StringUtils.Format("({0}->{1})", a.toString(), (a - this.HealValue).toString()));
  }
}
class CombatDataSkill extends CombatDataBase {
  constructor(t, i, e = 0) {
    super(t, e);
    this.SkillId = i;
  }
  ParseToString() {
    var t = CombatDataBase.GetEntityConfigName(this.AttackerId);
    var i = CombatDataBase.GetSkillConfigName(this.AttackerId, this.SkillId);
    return StringUtils_1.StringUtils.Format("<Date>[{0}]</><Atk>{1}</>施放了技能<Skill>{2}</>。", this.DateCreate, t ?? "", i ?? "");
  }
}
class CombatDataBuffAdded extends CombatDataBase {
  constructor(t, i, e = 0) {
    super(t, e);
    this.BuffId = i;
  }
  ParseToString() {
    var t = CombatDataBase.GetEntityConfigName(this.AttackerId);
    var i = CombatDataBase.GetEntityConfigName(this.TargetId);
    return StringUtils_1.StringUtils.Format("<Date>{0}</><Victim>{1}</>获得了<Atk>{2}</>添加的Buff<NumDmg>{3}</>", this.DateCreate, i ?? "", t ?? "", this.BuffId.toString());
  }
}
class CombatDataBuffRemoved extends CombatDataBase {
  constructor(t, i, e = 0) {
    super(t, e);
    this.BuffId = i;
  }
  ParseToString() {
    var t = CombatDataBase.GetEntityConfigName(this.TargetId);
    return StringUtils_1.StringUtils.Format("<Date>{0}</><Victim>{1}</>失去了Buff<NumDmg>{2}</>", this.DateCreate, t ?? "", this.BuffId.toString());
  }
}
class CombatDataKilled extends CombatDataBase {
  ParseToString() {
    var t = CombatDataBase.GetEntityConfigName(this.AttackerId);
    var i = CombatDataBase.GetEntityConfigName(this.TargetId);
    return StringUtils_1.StringUtils.Format("<Date>{0}</><Atk>{1}</>消灭了<Victim>{2}</>!", this.DateCreate, t ?? "", i ?? "");
  }
}
class CombatDataRevive extends CombatDataBase {
  ParseToString() {
    var t = CombatDataBase.GetEntityConfigName(this.AttackerId);
    return StringUtils_1.StringUtils.Format("<Date>{0}</><Atk>{1}</>复活", this.DateCreate, t ?? "");
  }
}
let CharacterStatisticsComponent = CharacterStatisticsComponent_1 = class CharacterStatisticsComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.qOr = (t, i, e, a, s) => {
      var r = a.Damage;
      var n = a.DamageData;
      switch (n.CalculateType) {
        case 1:
          if (this.GOr) {
            this.NOr(-r, t, i, a);
          }
          this.OOr(-r, t, i, a, e);
          break;
        case 0:
          if (this.GOr) {
            this.kOr(r, a.Element, s, t, i, e.IsCritical, n.DamageTextType, e.IsImmune, n.Id, e.BulletId, e.BuffId);
          }
          this.FOr(r, a.Element, s, t, i, e.IsCritical, n.DamageTextType, e.IsImmune, n.Id, e.BulletId, e.BuffId, e.IsTargetKilled, e);
      }
    };
    this.VOr = () => {
      this.HOr();
    };
    this.GOr = false;
    this.jOr = new Map();
    this.WOr = new Map();
    this.KOr = new Map();
    this.QOr = new Array();
    this.XOr = (t, i) => {
      if (CharacterStatisticsComponent_1.$Or && this.Entity.GetComponent(0).IsRole()) {
        this.YOr(t);
        this.JOr(i);
      }
    };
    this.zOr = (t, i) => {
      var e;
      if (CharacterStatisticsComponent_1.$Or && this.Entity.GetComponent(0).IsRole()) {
        if (this.jOr.get(i) && (e = this.Entity.GetComponent(0).GetRoleConfig(), Log_1.Log.CheckError())) {
          Log_1.Log.Error("Character", 20, "记录技能开始使用时间时有技能未执行EndSkill", ["RoleName", ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(e.Name)], ["SkillId", i]);
        }
        this.jOr.set(i, Time_1.Time.NowSeconds);
      }
    };
    this.ZOr = (e, a) => {
      if (CharacterStatisticsComponent_1.$Or && this.Entity.GetComponent(0).IsRole()) {
        let t = CharacterStatisticsComponent_1.ekr.get(e);
        if (!t) {
          r = this.Entity.GetComponent(0).GetRoleConfig();
          s = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(r.Name);
          t = new CharacterOperationRecord(s, e, r.Id);
          CharacterStatisticsComponent_1.ekr.set(e, t);
        }
        var s = this.Entity.GetComponent(40).GetSkillInfo(a).SkillGenre;
        let i = t.SkillOperationMap.get(s);
        if (!i) {
          i = new SkillOperationRecord(CharacterStatisticsComponent_1.tkr[s]);
          t.SkillOperationMap.set(s, i);
        }
        var r = this.jOr.get(a);
        if (r === undefined) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Test", 20, "计算出现异常 EndSkill", ["Name", t.Name], ["Id", t.EntityId], ["Map", this.jOr]);
          }
        } else {
          e = Time_1.Time.NowSeconds - r;
          i.AddOptCountAndTime(e);
        }
        this.jOr.set(a, undefined);
      }
    };
    this.UWi = (e, a) => {
      if (CharacterStatisticsComponent_1.$Or) {
        if (a) {
          this.WOr.set(e, Time_1.Time.NowSeconds);
        } else {
          var a = this.WOr.get(e);
          var s = Time_1.Time.NowSeconds - a;
          var r = this.Entity.Id;
          let t = CharacterStatisticsComponent_1.ekr.get(r);
          var n = this.Entity.GetComponent(0);
          if (!t) {
            if ((o = n.GetEntityType()) === Protocol_1.Aki.Protocol.kks.Proto_Monster) {
              h = PublicUtil_1.PublicUtil.GetConfigTextByKey(n.GetEntityTidName() ?? "");
              t = new CharacterOperationRecord(h, r, n.GetPbDataId());
            } else if (o === Protocol_1.Aki.Protocol.kks.Proto_Player) {
              h = n.GetRoleConfig();
              o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(h.Name);
              t = new CharacterOperationRecord(o, r, h.Id);
            }
            CharacterStatisticsComponent_1.ekr.set(r, t);
          }
          let i = t.TagOperationMap.get(e);
          var o = n.GetEntityType();
          var h = CharacterStatisticsComponent_1.StageInfo(o);
          if (!i) {
            i = new SkillOperationRecord(h.get(e));
            t.TagOperationMap.set(e, i);
          }
          if (Number.isNaN(s)) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Test", 20, "计算出现异常 OnTagChanged", ["Id", this.Entity.Id], ["beginTime", a], ["Map", this.WOr], ["TagId", e]);
            }
          } else {
            i.AddOptCountAndTime(s);
          }
        }
      }
    };
    this.ikr = (t, i) => {
      if (CharacterStatisticsComponent_1.okr && ((i = new CombatDataSkill(this.Entity.Id, i)).ToString(), CharacterStatisticsComponent_1.rkr.push(i), CharacterStatisticsComponent_1.nkr(i))) {
        CharacterStatisticsComponent_1.skr.push(i);
      }
    };
  }
  OnInit(t) {
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharBeDamage, this.qOr);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharUseSkill, this.ikr);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRevive, this.VOr);
    return true;
  }
  OnStart() {
    this.akr();
    return true;
  }
  OnActivate() {
    if (CharacterStatisticsComponent_1.OpenOperationRecord) {
      this.GOr = CharacterStatisticsComponent_1.IsInRecordArea(this.Entity);
    }
    this.hkr();
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharBeDamage, this.qOr);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharUseSkill, this.ikr);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRevive, this.VOr);
    if (CharacterStatisticsComponent_1.$Or) {
      this.lkr();
    }
    return true;
  }
  OnBuffAdded(t) {
    this._kr(t);
  }
  OnBuffRemoved(t) {
    this.ukr(t);
  }
  GetStatisticsEnable() {
    return this.GOr;
  }
  static SetStatisticsEnable(t) {
    if (t) {
      var i;
      for (const a of ModelManager_1.ModelManager.CreatureModel.GetAllEntities()) {
        if (CharacterStatisticsComponent_1.IsInRecordArea(a.Entity) && (i = a.Entity.GetComponent(27))?.Valid) {
          i.GOr = true;
          this.ckr.push(a.Id);
        }
      }
    } else {
      for (const s of this.ckr) {
        var e = EntitySystem_1.EntitySystem.Get(s);
        if (e?.Valid) {
          e.GetComponent(27).GOr = false;
        }
      }
      this.ckr.length = 0;
    }
  }
  static CleanupRecordData() {
    this.mkr.clear();
    this.dkr.clear();
    this.Ckr.clear();
    this.gkr.clear();
  }
  NOr(t, i, e, a) {
    var s = a.Damage;
    var a = a.DamageData.Id;
    CharacterStatisticsComponent_1.ProcessRecordBySkillType(s, i, e, a, true);
    CharacterStatisticsComponent_1.fkr(s, i, e, a, true);
  }
  kOr(t, i, e, a, s, r, n, o, h, c, C) {
    CharacterStatisticsComponent_1.ProcessRecordBySkillType(t, a, s, h, false, c, C);
    CharacterStatisticsComponent_1.fkr(t, a, s, h, false);
  }
  static ProcessRecordBySkillType(a, t, s, r, n, o, h) {
    t = t.GetComponent(0);
    if (t.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player) {
      var t = t.Valid ? t.GetRoleId() : 0;
      var c = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(t);
      if (c) {
        var C = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(c);
        var _ = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(C.Name);
        var C = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(C.SkillId);
        let i = 0;
        if (C) {
          for (const m of C) {
            if (m.DamageList.includes(r)) {
              i = m.SkillType;
              break;
            }
          }
        }
        C = n ? CharacterStatisticsComponent_1.gkr : CharacterStatisticsComponent_1.Ckr;
        let e = C.get(c);
        if (!e) {
          e = new Map();
          C.set(c, e);
        }
        if (i > 0) {
          let t = e.get(i);
          if (!t) {
            C = skillTypeToString[i - 1];
            t = new DamageStatisticsData(c, _, C, n);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Test", 20, "伤害记录-技能", ["伤害ID", r], ["类型", C]);
            }
            e.set(i, t);
          }
          t.AddDamageValue(s.Id, a);
          if (t.GetTargetCount() > this.pkr) {
            this.pkr = t.GetTargetCount();
          }
        } else if ((ModelManager_1.ModelManager.DamageModel?.GetDamageConfigById(r)).Type !== 5) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Test", 20, "结算ID不在幻象表中", ["结算ID", r], ["子弹ID", o], ["buffID", h]);
          }
        } else {
          let t = e.get(6);
          if (!t) {
            t = new DamageStatisticsData(c, _, skillTypeToString[6], n);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Test", 20, "伤害记录-技能", ["伤害ID", r], ["类型", "声骸技能"]);
            }
            e.set(6, t);
          }
          t.AddDamageValue(s.Id, a);
          if (t.GetTargetCount() > this.pkr) {
            this.pkr = t.GetTargetCount();
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Test", 20, "获取不到roleData", ["roleId", t]);
      }
    }
  }
  static fkr(e, t, a, i, s) {
    t = t.GetComponent(0);
    if (t?.IsRole()) {
      var r = ModelManager_1.ModelManager.DamageModel?.GetDamageConfigById(i);
      if (r) {
        var t = t.Valid ? t.GetRoleId() : 0;
        var n = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(t);
        if (n) {
          var o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(n);
          var o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(o.Name);
          var h = s ? this.dkr : this.mkr;
          let t = h.get(n);
          if (!t) {
            t = new Map();
            h.set(n, t);
          }
          let i = t.get(r.Type);
          if (!i) {
            i = new DamageStatisticsData(n, o, attackTypeToString[r.Type], s);
            t.set(r.Type, i);
          }
          i.AddDamageValue(a.Id, e);
          if (this.vkr < i.GetTargetCount()) {
            this.vkr = i.GetTargetCount();
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Test", 20, "获取不到roleData", ["roleId", t]);
        }
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Test", 20, "伤害表中找不到id", ["伤害Id", i]);
      }
    }
  }
  static ExportStatisticsBySkillType() {
    var i = new StringBuilder_1.StringBuilder();
    i.Append("角色Id,名称,治疗/伤害,技能");
    for (let t = 0; t < this.pkr; t++) {
      var e = (t + 1).toString();
      i.Append(StringUtils_1.StringUtils.Format(this.Mkr, e, e, e, e, e));
    }
    i.Append("\n");
    var t = this.Ckr;
    if (t?.size > 0) {
      for (var [, a] of t) {
        for (var [, s] of a) {
          i.Append(s.ToString());
        }
      }
    }
    if ((t = this.gkr)?.size > 0) {
      for (var [, r] of t) {
        for (var [, n] of r) {
          i.Append(n.ToString());
        }
      }
    }
    return i.ToString();
  }
  static ExportStatisticsByAttackType() {
    var i = new StringBuilder_1.StringBuilder();
    i.Append("角色Id,名称,治疗/伤害,伤害类型");
    for (let t = 0; t < this.vkr; t++) {
      var e = (t + 1).toString();
      i.Append(StringUtils_1.StringUtils.Format(this.Mkr, e, e, e, e, e));
    }
    i.Append("\n");
    var t = this.mkr;
    if (t?.size > 0) {
      for (var [, a] of t) {
        for (var [, s] of a) {
          i.Append(s.ToString());
        }
      }
    }
    if ((t = this.dkr)?.size > 0) {
      for (var [, r] of t) {
        for (var [, n] of r) {
          i.Append(n.ToString());
        }
      }
    }
    return i.ToString();
  }
  static get OpenOperationRecord() {
    return this.$Or;
  }
  hkr() {
    var t;
    if (CharacterStatisticsComponent_1.$Or) {
      t = this.Entity;
      if (!CharacterStatisticsComponent_1.ekr.has(t.Id)) {
        if (CharacterStatisticsComponent_1.IsInRecordArea(t)) {
          this.Ekr();
        }
      }
    }
  }
  Ekr() {
    this.jOr.clear();
    this.KOr.clear();
    this.WOr.clear();
    if (this.Entity.GetComponent(0).IsRole()) {
      CharacterStatisticsComponent_1.Skr.push(this.Entity.Id);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharUseSkill, this.zOr);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSkillEnd, this.ZOr);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.XOr);
      var t;
      var i = this.Entity.GetComponent(179);
      if (i?.Valid) {
        i = i.MoveState;
        this.JOr(i);
      }
      var e = this.Entity.CheckGetComponent(209);
      if (e?.Valid) {
        this.QOr.push(e.ListenForTagAddOrRemove(-2044964178, this.UWi));
      }
      for ([t] of CharacterStatisticsComponent_1.ykr) {
        if (e.HasTag(t)) {
          this.WOr.set(t, Time_1.Time.NowSeconds);
        }
      }
    } else {
      var a = this.Entity.CheckGetComponent(209);
      if (a?.Valid) {
        CharacterStatisticsComponent_1.Skr.push(this.Entity.Id);
        this.QOr.push(a.ListenForTagAddOrRemove(-1112841587, this.UWi));
        this.QOr.push(a.ListenForTagAddOrRemove(-1109506297, this.UWi));
        this.QOr.push(a.ListenForTagAddOrRemove(-1838149281, this.UWi));
        this.QOr.push(a.ListenForTagAddOrRemove(1922078392, this.UWi));
        for (var [s] of CharacterStatisticsComponent_1.Ikr) {
          if (a.HasTag(s)) {
            this.WOr.set(s, Time_1.Time.NowSeconds);
          }
        }
      }
    }
  }
  lkr() {
    if (this.Entity.GetComponent(0)?.IsRole()) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharUseSkill, this.zOr);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSkillEnd, this.ZOr);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.XOr);
    }
    for (const t of this.QOr) {
      t.EndTask();
    }
    this.QOr.length = 0;
  }
  JOr(t) {
    var i;
    if (CharacterStatisticsComponent_1.Tkr.has(t)) {
      if (this.KOr.get(t) && (i = this.Entity.GetComponent(0).GetRoleConfig(), Log_1.Log.CheckError())) {
        Log_1.Log.Error("Character", 20, "记录移动开始时间时有未执行OnMoveStateEnd", ["RoleName", ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(i.Name)], ["State", t]);
      }
      this.KOr.set(t, Time_1.Time.NowSeconds);
    }
  }
  YOr(e) {
    if (CharacterStatisticsComponent_1.Tkr.has(e)) {
      var a = this.Entity.Id;
      let t = CharacterStatisticsComponent_1.ekr.get(a);
      if (!t) {
        s = this.Entity.GetComponent(0).GetRoleConfig();
        r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(s.Name);
        t = new CharacterOperationRecord(r, a, s.Id);
        CharacterStatisticsComponent_1.ekr.set(a, t);
      }
      let i = t.MoveOperationMap.get(e);
      if (!i) {
        i = new SkillOperationRecord(CharacterStatisticsComponent_1.Tkr.get(e));
        t.MoveOperationMap.set(e, i);
      }
      var s;
      var r = this.KOr.get(e);
      if (r === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Test", 20, "计算出现异常 OnMoveStateEnd", ["Name", t.Name], ["Id", t.EntityId], ["Map", this.KOr]);
        }
      } else {
        s = Time_1.Time.NowSeconds - r;
        i.AddOptCountAndTime(s);
      }
      this.KOr.set(e, undefined);
    }
  }
  static StageInfo(t) {
    if (t === Protocol_1.Aki.Protocol.kks.Proto_Monster) {
      return CharacterStatisticsComponent_1.Ikr;
    } else if (t === Protocol_1.Aki.Protocol.kks.Proto_Player) {
      return CharacterStatisticsComponent_1.ykr;
    } else {
      return undefined;
    }
  }
  akr() {
    if (CharacterStatisticsComponent_1.$Or) {
      var t = this.Entity.GetComponent(209);
      if (t) {
        var i = this.Entity.GetComponent(0).GetEntityType();
        var i = CharacterStatisticsComponent_1.StageInfo(i);
        if (i) {
          for (var [e] of i) {
            if (t.HasTag(e) && (this.UWi(e, true), Log_1.Log.CheckDebug())) {
              Log_1.Log.Debug("Test", 20, "InitStageBeginTime", ["Id", this.Entity.Id], ["TagId", e]);
            }
          }
        }
      }
    }
  }
  static OperationRecord(t) {
    if (this.$Or = t) {
      for (const a of ModelManager_1.ModelManager.CreatureModel.GetAllEntities()) {
        var i = a.Entity.GetComponent(27);
        if (i && a.Entity.GetComponent(18)?.Valid && this.IsInRecordArea(a.Entity)) {
          i.GOr = true;
          i.Ekr();
        }
      }
    } else {
      for (const s of this.Skr) {
        var e = EntitySystem_1.EntitySystem.Get(s);
        if (e?.Valid && (e = e.GetComponent(27))) {
          e.GOr = false;
          e.lkr();
        }
      }
      this.Skr.length = 0;
    }
  }
  static IsInRecordArea(t) {
    if (t?.Valid) {
      var i = t.GetComponent(0);
      if (i.IsRole()) {
        return true;
      }
      if (i.IsMonster()) {
        i = t.GetComponent(1);
        if (!i) {
          return false;
        }
        if (Vector_1.Vector.DistSquaredXY(i.ActorLocationProxy, ModelManager_1.ModelManager.CameraModel.CameraLocation) < CharacterStatisticsComponent_1.HalfLengthRecordSquared) {
          return true;
        }
      }
    }
    return false;
  }
  static ExportRecord() {
    if (this.ekr.size !== 0) {
      if (this.$Or) {
        this.OperationRecord(false);
      }
      var t;
      var i = new StringBuilder_1.StringBuilder();
      i.Append(this.Lkr);
      for ([, t] of this.ekr) {
        i.Append(t.ToString());
      }
      return i.ToString();
    }
  }
  static OperationRecordCount() {
    let t = 0;
    for (var [, i] of this.ekr) {
      t = (t = (t += i.SkillOperationMap.size) + i.MoveOperationMap.size) + i.TagOperationMap.size;
    }
    return t;
  }
  static CleanupOperationRecord() {
    this.ekr.clear();
  }
  static SetCombatStarted(t, i, e, a) {
    if (this.okr = t) {
      this.SetTypeOpen(i);
      this.SetCurrentAttacker(e);
      this.SetCurrentTarget(a);
    }
  }
  static GetAttackerCombatEntities() {
    this.Dkr.length = 0;
    var t = UE.NewArray(UE.BuiltinString);
    t.Add("无");
    this.Dkr.push(0);
    var i = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    for (const a of i) {
      var e = this.GetEntityName(a);
      if (e) {
        t.Add(e);
        this.Dkr.push(a.Id);
      }
    }
    return t;
  }
  static GetTargetCombatEntities() {
    this.Rkr.length = 0;
    var t = UE.NewArray(UE.BuiltinString);
    t.Add("无");
    this.Rkr.push(0);
    var i = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    for (const a of i) {
      var e = this.GetEntityName(a);
      if (e) {
        t.Add(e);
        this.Rkr.push(a.Id);
      }
    }
    return t;
  }
  static GetEntityName(t) {
    var i;
    var e;
    if (t) {
      if ((i = (t = t.Entity.GetComponent(0))?.GetEntityType()) === Protocol_1.Aki.Protocol.kks.Proto_Player) {
        e = t.Valid ? t.GetRoleId() : 0;
        if (e = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(e)) {
          e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
          return ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(e.Name);
        } else {
          return undefined;
        }
      } else if (i === Protocol_1.Aki.Protocol.kks.Proto_Monster) {
        return PublicUtil_1.PublicUtil.GetConfigTextByKey(t.GetEntityTidName() ?? "");
      } else {
        return undefined;
      }
    }
  }
  static SetTypeOpen(e) {
    if (!this.Ukr) {
      var i = e.length;
      if (this.Akr.size !== i) {
        this.Ukr = true;
      } else {
        for (let t = 0; t < i; t++) {
          var a = e[t];
          if (!this.Akr.get(a)) {
            this.Ukr = true;
            break;
          }
        }
      }
    }
    this.Akr.clear();
    for (let t = 0, i = e.length; t < i; t++) {
      var s = e[t];
      this.Akr.set(s, true);
    }
  }
  static SetCurrentAttacker(t) {
    t = this.Dkr[t];
    if (this.Pkr !== t) {
      this.Ukr = true;
    }
    this.Pkr = t;
  }
  static SetCurrentTarget(t) {
    t = this.Rkr[t];
    if (this.xkr !== t) {
      this.Ukr = true;
    }
    this.xkr = t;
  }
  static get ItemReset() {
    return this.Ukr;
  }
  static OnItemsResetFinished() {
    this.Ukr = false;
    this.skr.length = 0;
    for (const t of this.rkr) {
      if (this.nkr(t)) {
        this.skr.push(t);
      }
    }
  }
  static GetSubItemsListView(i, e) {
    var a = UE.NewArray(UE.BuiltinString);
    for (let t = 0; t < e; t++) {
      a.Add(this.skr[i + t].ToString());
    }
    return a;
  }
  static GetItemListViewCount() {
    return this.skr.length;
  }
  OOr(t, i, e, a, s) {
    var r;
    if (CharacterStatisticsComponent_1.okr && (r = a.Damage, a = a.DamageData.Id, (i = new CombatDataHeal(i.Id, a, r, s.SkillId, e.Id)).ToString(), CharacterStatisticsComponent_1.rkr.push(i), CharacterStatisticsComponent_1.nkr(i))) {
      CharacterStatisticsComponent_1.skr.push(i);
    }
  }
  FOr(t, i, e, a, s, r, n, o, h, c, C, _, m) {
    if (CharacterStatisticsComponent_1.okr && ((h = new CombatDataDamage(a.Id, h, t, m.SkillId, s.Id)).ToString(), CharacterStatisticsComponent_1.rkr.push(h), CharacterStatisticsComponent_1.nkr(h) && CharacterStatisticsComponent_1.skr.push(h), _) && ((t = new CombatDataKilled(a.Id, s.Id)).ToString(), CharacterStatisticsComponent_1.rkr.push(t), CharacterStatisticsComponent_1.nkr(t))) {
      CharacterStatisticsComponent_1.skr.push(t);
    }
  }
  _kr(t) {
    var i;
    if (!!CharacterStatisticsComponent_1.okr && !!(i = t.Config.Id) && !(i <= 0)) {
      (i = new CombatDataBuffAdded(t.GetInstigator().Id, i, t.GetOwner().Id)).ToString();
      CharacterStatisticsComponent_1.rkr.push(i);
      if (CharacterStatisticsComponent_1.nkr(i)) {
        CharacterStatisticsComponent_1.skr.push(i);
      }
    }
  }
  ukr(t) {
    var i;
    if (!!CharacterStatisticsComponent_1.okr && !!(i = t.Config.Id) && !(i <= 0)) {
      (i = new CombatDataBuffRemoved(t.GetInstigator().Id, i, t.GetOwner().Id)).ToString();
      CharacterStatisticsComponent_1.rkr.push(i);
      if (CharacterStatisticsComponent_1.nkr(i)) {
        CharacterStatisticsComponent_1.skr.push(i);
      }
    }
  }
  HOr() {
    var t;
    if (CharacterStatisticsComponent_1.okr && ((t = new CombatDataRevive(this.Entity.Id)).ToString(), CharacterStatisticsComponent_1.rkr.push(t), CharacterStatisticsComponent_1.nkr(t))) {
      CharacterStatisticsComponent_1.skr.push(t);
    }
  }
  static nkr(t) {
    return (!(this.Pkr > 0) || this.Pkr === t.AttackerId) && (!(this.xkr > 0) || this.xkr === t.TargetId) && (!!this.Akr.get(0) || !(t instanceof CombatDataDamage)) && (!!this.Akr.get(1) || !(t instanceof CombatDataHeal)) && (!!this.Akr.get(2) || !(t instanceof CombatDataSkill)) && (!!this.Akr.get(3) || !(t instanceof CombatDataBuffRemoved) && !(t instanceof CombatDataBuffAdded)) && (!!this.Akr.get(4) || !(t instanceof CombatDataKilled)) && (!!this.Akr.get(5) || !(t instanceof CombatDataRevive));
  }
};
CharacterStatisticsComponent.ckr = new Array();
CharacterStatisticsComponent.Ckr = new Map();
CharacterStatisticsComponent.mkr = new Map();
CharacterStatisticsComponent.gkr = new Map();
CharacterStatisticsComponent.dkr = new Map();
CharacterStatisticsComponent.Mkr = ",目标{0}类型,目标{1}名称,目标{2}配置ID,目标{3}单位Id,目标{4}伤害";
CharacterStatisticsComponent.pkr = 0;
CharacterStatisticsComponent.vkr = 0;
CharacterStatisticsComponent.HalfLengthRecordSquared = 25000000;
CharacterStatisticsComponent.ekr = new Map();
CharacterStatisticsComponent.$Or = false;
CharacterStatisticsComponent.Tkr = new Map([[CharacterUnifiedStateTypes_1.ECharMoveState.Walk, "走"], [CharacterUnifiedStateTypes_1.ECharMoveState.Run, "跑"], [CharacterUnifiedStateTypes_1.ECharMoveState.Sprint, "冲刺"], [CharacterUnifiedStateTypes_1.ECharMoveState.Dodge, "闪避"]]);
CharacterStatisticsComponent.tkr = ["普攻0", "蓄力1", "E技能2", "大招3", "QTE4", "极限闪避反击5", "地面闪避6", "极限闪避7", "被动技能8", "战斗幻象技9", "探索幻象技10", "空中闪避11", "无类别"];
CharacterStatisticsComponent.Ikr = new Map([[-1109506297, "正常时间"], [-1838149281, "狂暴时间"], [1922078392, "瘫痪时间"], [-1112841587, "脆弱时间"]]);
CharacterStatisticsComponent.ykr = new Map([[-2044964178, "受击硬直"]]);
CharacterStatisticsComponent.Skr = new Array();
CharacterStatisticsComponent.Lkr = "角色ID,角色名称,配置ID,技能/阶段,时间,次数\n";
CharacterStatisticsComponent.okr = false;
CharacterStatisticsComponent.Akr = new Map();
CharacterStatisticsComponent.Dkr = new Array();
CharacterStatisticsComponent.Rkr = new Array();
CharacterStatisticsComponent.Pkr = 0;
CharacterStatisticsComponent.xkr = 0;
CharacterStatisticsComponent.Ukr = false;
CharacterStatisticsComponent.skr = new Array();
CharacterStatisticsComponent.rkr = new Array();
CharacterStatisticsComponent = CharacterStatisticsComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(27)], CharacterStatisticsComponent);
exports.CharacterStatisticsComponent = CharacterStatisticsComponent;
const SKILL_RECORD_FMT = "{0},{1},{2}";
class SkillOperationRecord {
  constructor(t) {
    this.he = t;
    this.oUe = 0;
    this.JXt = 0;
  }
  AddOptCountAndTime(t, i = 1) {
    this.oUe += t;
    this.JXt += i;
  }
  ToString() {
    return StringUtils_1.StringUtils.Format(SKILL_RECORD_FMT, this.he, this.oUe.toString(), this.JXt.toString());
  }
}
const CHARACTER_RECORD_FMT = "{0},{1},{2},{3}\n";
class CharacterOperationRecord {
  constructor(t, i, e) {
    this.Name = t;
    this.EntityId = i;
    this.AQo = e;
    this.SkillOperationMap = new Map();
    this.MoveOperationMap = new Map();
    this.TagOperationMap = new Map();
  }
  ToString() {
    var t;
    var i;
    var e;
    var a = new StringBuilder_1.StringBuilder();
    for ([, t] of this.SkillOperationMap) {
      var s = StringUtils_1.StringUtils.Format(CHARACTER_RECORD_FMT, this.EntityId.toString(), this.Name, this.AQo.toString(), t.ToString());
      a.Append(s);
    }
    for ([, i] of this.MoveOperationMap) {
      var r = StringUtils_1.StringUtils.Format(CHARACTER_RECORD_FMT, this.EntityId.toString(), this.Name, this.AQo.toString(), i.ToString());
      a.Append(r);
    }
    for ([, e] of this.TagOperationMap) {
      var n = StringUtils_1.StringUtils.Format(CHARACTER_RECORD_FMT, this.EntityId.toString(), this.Name, this.AQo.toString(), e.ToString());
      a.Append(n);
    }
    return a.ToString();
  }
}
//# sourceMappingURL=CharacterStatisticsComponent.js.map