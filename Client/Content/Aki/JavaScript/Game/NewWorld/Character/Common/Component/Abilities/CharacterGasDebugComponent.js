"use strict";

var CharacterGasDebugComponent_1;
var __decorate = this && this.__decorate || function (t, e, r, a) {
  var i;
  var n = arguments.length;
  var o = n < 3 ? e : a === null ? a = Object.getOwnPropertyDescriptor(e, r) : a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, e, r, a);
  } else {
    for (var s = t.length - 1; s >= 0; s--) {
      if (i = t[s]) {
        o = (n < 3 ? i(o) : n > 3 ? i(e, r, o) : i(e, r)) || o;
      }
    }
  }
  if (n > 3 && o) {
    Object.defineProperty(e, r, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterGasDebugComponent = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const Time_1 = require("../../../../../../Core/Common/Time");
const PriorityQueue_1 = require("../../../../../../Core/Container/PriorityQueue");
const FormationPropertyAll_1 = require("../../../../../../Core/Define/ConfigQuery/FormationPropertyAll");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../../../Core/Net/Net");
const GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const StringBuilder_1 = require("../../../../../../Core/Utils/StringBuilder");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const TestModuleBridge_1 = require("../../../../../Bridge/TestModuleBridge");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../../../Common/PublicUtil");
const Global_1 = require("../../../../../Global");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const FormationAttributeController_1 = require("../../../../../Module/Abilities/FormationAttributeController");
const CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage");
const AbilityUtils_1 = require("./AbilityUtils");
const CharacterAttributeTypes_1 = require("./CharacterAttributeTypes");
const CharacterBuffController_1 = require("./CharacterBuffController");
const CharacterStatisticsComponent_1 = require("./CharacterStatisticsComponent");
const CharacterUnifiedStateTypes_1 = require("./CharacterUnifiedStateTypes");
var ESkillGenreName;
var EMovementModeName;
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
const Info_1 = require("../../../../../../Core/Common/Info");
const MAX_DEBUG_STRING_NUMS = 50;
(function (t) {
  t[t.普攻 = 0] = "普攻";
  t[t.蓄力 = 1] = "蓄力";
  t[t.E技能 = 2] = "E技能";
  t[t.大招 = 3] = "大招";
  t[t.QTE = 4] = "QTE";
  t[t.极限闪避反击 = 5] = "极限闪避反击";
  t[t.地面闪避 = 6] = "地面闪避";
  t[t.极限闪避 = 7] = "极限闪避";
  t[t.被动技能 = 8] = "被动技能";
  t[t.战斗幻想技 = 9] = "战斗幻想技";
  t[t.探索幻象技 = 10] = "探索幻象技";
  t[t.空中闪避 = 11] = "空中闪避";
})(ESkillGenreName = ESkillGenreName || {});
(function (t) {
  t[t.MOVE_None = 0] = "MOVE_None";
  t[t.MOVE_Walking = 1] = "MOVE_Walking";
  t[t.MOVE_NavWalking = 2] = "MOVE_NavWalking";
  t[t.MOVE_Falling = 3] = "MOVE_Falling";
  t[t.MOVE_Swimming = 4] = "MOVE_Swimming";
  t[t.MOVE_Flying = 5] = "MOVE_Flying";
  t[t.MOVE_Custom = 6] = "MOVE_Custom";
  t[t.MOVE_MAX = 7] = "MOVE_MAX";
})(EMovementModeName = EMovementModeName || {});
class RecordMoveSum {
  constructor() {
    this.Name = "";
    this.ConfigId = 0;
    this.TargetUniqueId = 0;
    this.RecordNum = new Map();
  }
  ToCsv() {
    var e = new Array();
    e.push(this.ConfigId.toFixed());
    e.push(this.Name);
    e.push(this.TargetUniqueId.toFixed());
    for (let t = 0; t < 14; t++) {
      var r = this.RecordNum.get(t);
      e.push(r ? r.toFixed() : "0");
    }
    return e;
  }
}
class RecordDamageSum {
  constructor() {
    this.ConfigId = 0;
    this.Name = "";
    this.UniqueId = 0;
    this.DamageSourceConfigId = 0;
    this.SourceName = "";
    this.SourceUniqueId = 0;
    this.TotalDamage = 0;
    this.RecordDamage = new Map();
  }
  ToCsvForRole() {
    var e = new Array();
    e.push(this.ConfigId.toFixed());
    e.push(this.Name);
    e.push(this.DamageSourceConfigId.toFixed());
    e.push(this.SourceName);
    e.push(this.SourceUniqueId.toFixed());
    e.push(this.TotalDamage.toFixed());
    for (let t = 0; t < 14; t++) {
      var r = this.RecordDamage.get(t);
      e.push(r ? r.toFixed() : "0");
    }
    return e;
  }
  ToCsvForMonster() {
    var e = new Array();
    e.push(this.ConfigId.toFixed());
    e.push(this.Name);
    e.push(this.UniqueId.toFixed());
    e.push(this.DamageSourceConfigId.toFixed());
    e.push(this.SourceName);
    e.push(this.TotalDamage.toFixed());
    for (let t = 0; t < 14; t++) {
      var r = this.RecordDamage.get(t);
      e.push(r ? r.toFixed() : "0");
    }
    return e;
  }
}
class DamageRecordDsp {
  constructor(t, e, r, a, i, n) {
    this.TimeStamp = t;
    this.DamageValue = e;
    this.QteBegin = r;
    this.InGame = a;
    this.OutGame = i;
    this.OutGameSkill = n;
  }
}
const attributeIdArray = [EAttributeId.Proto_Life, EAttributeId.l5n, EAttributeId.Proto_Atk, EAttributeId.Proto_Crit, EAttributeId.Proto_CritDamage, EAttributeId.Proto_Def, EAttributeId.Proto_EnergyEfficiency, EAttributeId.Proto_EnergyMax, EAttributeId.Proto_Energy, EAttributeId.Proto_AutoAttackSpeed, EAttributeId.Proto_CastAttackSpeed, EAttributeId.Proto_DamageChangeNormalSkill, EAttributeId.Proto_DamageChange, EAttributeId.Proto_DamageChangePhantom, EAttributeId.Proto_DamageChangeAuto, EAttributeId.Proto_DamageChangeCast, EAttributeId.Proto_DamageChangeUltra, EAttributeId.Proto_DamageChangeQte, EAttributeId.Proto_DamageChangePhys, EAttributeId.Proto_DamageChangeElement1, EAttributeId.Proto_DamageChangeElement2, EAttributeId.Proto_DamageChangeElement3, EAttributeId.Proto_DamageChangeElement4, EAttributeId.Proto_DamageChangeElement5, EAttributeId.Proto_DamageChangeElement6, EAttributeId.Proto_DamageResistancePhys, EAttributeId.Proto_DamageResistanceElement1, EAttributeId.Proto_DamageResistanceElement2, EAttributeId.Proto_DamageResistanceElement3, EAttributeId.Proto_DamageResistanceElement4, EAttributeId.Proto_DamageResistanceElement5, EAttributeId.Proto_DamageResistanceElement6, EAttributeId.Proto_HealChange, EAttributeId.Proto_HealedChange, EAttributeId.Proto_DamageReduce, EAttributeId.Proto_DamageReducePhys, EAttributeId.Proto_DamageReduceElement1, EAttributeId.Proto_DamageReduceElement2, EAttributeId.Proto_DamageReduceElement3, EAttributeId.Proto_DamageReduceElement4, EAttributeId.Proto_DamageReduceElement5, EAttributeId.Proto_DamageReduceElement6, EAttributeId.Proto_ToughMax, EAttributeId.Proto_Tough, EAttributeId.Proto_ToughRecover, EAttributeId.Proto_ToughChange, EAttributeId.Proto_ToughReduce, EAttributeId.Proto_RageMax, EAttributeId.Proto_Rage, EAttributeId.Proto_RageRecover, EAttributeId.Proto_RagePunishTime, EAttributeId.Proto_RageChange, EAttributeId.Proto_RageReduce, EAttributeId.Proto_HardnessMax, EAttributeId.Proto_Hardness, EAttributeId.Proto_HardnessRecover, EAttributeId.Proto_HardnessPunishTime, EAttributeId.Proto_HardnessChange, EAttributeId.Proto_HardnessReduce];
let CharacterGasDebugComponent = CharacterGasDebugComponent_1 = class CharacterGasDebugComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.qqr = undefined;
    this.EnableCollisionDebugDraw = false;
    this.Gqr = 0;
    this.Nqr = undefined;
    this.Oqr = new Array();
    this.kqr = t => {
      if (!t.includes("Tag")) {
        this.Gqr = this.Gqr + 1;
        this.Oqr.unshift("Num " + this.Gqr + ": " + t);
        if (this.Oqr.length > MAX_DEBUG_STRING_NUMS) {
          this.Oqr.pop();
        }
      }
    };
    this.Fqr = new Array();
    this.Vqr = new Array();
    this.Hqr = (t, e, r, a, i) => {
      this.jqr.unshift(EMovementModeName[e] + "." + a.toFixed() + " ->" + EMovementModeName[r] + "." + i.toFixed());
    };
    this.Wqr = (t, e) => {
      this.jqr.unshift(CharacterUnifiedStateTypes_1.ECharMoveState[t] + " ->" + CharacterUnifiedStateTypes_1.ECharMoveState[e]);
    };
    this.Kqr = (t, e) => {
      this.jqr.unshift(CharacterUnifiedStateTypes_1.ECharPositionState[t] + " ->" + CharacterUnifiedStateTypes_1.ECharPositionState[e]);
    };
    this.Qqr = t => {
      this.jqr.unshift("Set NewBeHit:" + t);
    };
    this.jqr = new Array();
    this.Xqr = t => {
      if (CharacterGasDebugComponent_1.$qr) {
        var e = t.Attacker;
        if (this.Yqr(e)) {
          var r = new Array();
          r.push(CharacterGasDebugComponent_1.SecondsSinceStartup());
          r.push(CharacterGasDebugComponent_1.Jqr(Date.now()));
          var a = e.GetComponent(0);
          var i = a.GetEntityType();
          if (i === Protocol_1.Aki.Protocol.kks.Proto_Player) {
            r.push("角色");
            r.push(a.GetPbDataId().toFixed());
            var n = a.Valid ? a.GetRoleId() : 0;
            var n = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(n);
            if (!n) {
              return;
            }
            n = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(n);
            n = n ? ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(n.Name) : "";
            r.push(n);
          } else {
            if (i !== Protocol_1.Aki.Protocol.kks.Proto_Monster) {
              return;
            }
            r.push("怪物");
            r.push(a.GetPbDataId().toFixed());
            n = PublicUtil_1.PublicUtil.GetConfigTextByKey(a.GetEntityTidName() ?? "");
            r.push(n);
          }
          r.push(t.BulletRowName);
          i = t.BulletDataMain;
          r.push(i?.BulletName ?? "0");
          r.push(t.CollisionInfo.DamageId.toString());
          a = t.BulletInitParams.SkillId;
          r.push(a ? a.toFixed() : "");
          n = e.GetComponent(39);
          i = a ? n.GetSkillInfo(a) : undefined;
          r.push(i ? ESkillGenreName[i.SkillGenre] : "");
          e = t.Entity.Id;
          CharacterGasDebugComponent_1.zqr.set(e, r);
          CharacterGasDebugComponent_1.Zqr.push(e);
        }
      }
    };
    this.RecordMove = (t, e, r) => {
      var a;
      var i;
      var n;
      if (CharacterGasDebugComponent_1.$qr && t?.Valid && this.Yqr(this.Entity)) {
        a = this.Entity;
        (i = new Array()).push(CharacterGasDebugComponent_1.SecondsSinceStartup());
        i.push(CharacterGasDebugComponent_1.Jqr(Date.now()));
        if (a?.GetComponent(95)) {
          i.push("角色");
        } else {
          i.push("怪物");
        }
        n = a?.CheckGetComponent(0).GetPbDataId();
        i.push(n.toFixed(0));
        n = a?.GetComponent(3).Actor.GetName();
        i.push(n);
        i.push(e.toString());
        i.push(ESkillGenreName[r]);
        n = a.GetComponent(173);
        i.push(n.GetCurrentValue(EAttributeId.Proto_Atk).toFixed());
        i.push(n.GetCurrentValue(EAttributeId.Proto_Crit).toFixed());
        i.push(n.GetCurrentValue(EAttributeId.Proto_CritDamage).toFixed());
        i.push(n.GetCurrentValue(EAttributeId.Proto_Life).toFixed());
        i.push(n.GetCurrentValue(EAttributeId.Proto_Def).toFixed());
        i.push(n.GetCurrentValue(EAttributeId.Proto_DamageChange).toFixed());
        CharacterGasDebugComponent_1.eGr.push(i.join(","));
        CharacterGasDebugComponent_1.tGr(a, t.Entity, r);
      }
    };
    this.ServerDebugInfo = undefined;
    this.ServerDebugInfoDirty = false;
    this.Zi1 = new Set();
    this.er1 = new Map();
    this.tr1 = 0;
    this.oGr = (t, e) => {
      var e = this.Entity.GetComponent(39)?.GetSkillInfo(e);
      CharacterGasDebugComponent_1.rGr ||= new Map();
      var r = this.Entity.Id;
      if (e.SkillGenre === 4) {
        let t = CharacterGasDebugComponent_1.rGr.get(r);
        if (!t) {
          t = new PriorityQueue_1.PriorityQueue(CharacterGasDebugComponent_1.nGr);
          CharacterGasDebugComponent_1.rGr.set(r, t);
        }
        var a = new DamageRecordDsp(Time_1.Time.WorldTimeSeconds - CharacterGasDebugComponent_1.sGr, -1, true, false, false, false);
        t.Push(a);
      } else if (e.SkillGenre === 12) {
        let t = CharacterGasDebugComponent_1.rGr.get(r);
        if (!t) {
          t = new PriorityQueue_1.PriorityQueue(CharacterGasDebugComponent_1.nGr);
          CharacterGasDebugComponent_1.rGr.set(r, t);
        }
        a = new DamageRecordDsp(Time_1.Time.WorldTimeSeconds - CharacterGasDebugComponent_1.sGr, -1, false, false, false, true);
        t.Push(a);
      }
    };
  }
  OnStart() {
    var t = this.Entity.GetComponent(3);
    this.qqr = t?.Actor.AbilitySystemComponent;
    this.hGr();
    this.lGr();
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharRecordOperate, this.RecordMove);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharUseSkill, this.oGr);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.BulletCreate, this.Xqr);
    return true;
  }
  OnTick(t) {
    if (CharacterGasDebugComponent_1.Qyn && Time_1.Time.Frame > CharacterGasDebugComponent_1.Xyn) {
      CharacterGasDebugComponent_1.sGr += t * 0.001;
      CharacterGasDebugComponent_1.Xyn = Time_1.Time.Frame;
    }
    if (this.EnableCollisionDebugDraw) {
      var e = this.Entity.GetComponent(3);
      if (e) {
        var r = e.Actor.K2_GetComponentsByClass(UE.CapsuleComponent.StaticClass());
        for (let t = 0; t < r.Num(); t++) {
          var a = r.Get(t);
          UE.KismetSystemLibrary.D_DrawDebugCapsule(e.Actor, a.D_K2_GetComponentLocation(), a.CapsuleHalfHeight, a.CapsuleRadius, a.K2_GetComponentRotation(), new UE.LinearColor(1, 1, 0, 1), 0, 1);
        }
      }
    }
  }
  OnEnd() {
    this.Nqr?.EndTask();
    this.Nqr = undefined;
    this._Gr();
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharRecordOperate, this.RecordMove);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharUseSkill, this.oGr);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.BulletCreate, this.Xqr);
    return true;
  }
  hGr() {
    if (this.qqr) {
      this.Nqr = UE.AsyncTaskEffectDebugString.ListenForGameplayEffectExecutedDebugString(this.qqr);
      this.Nqr?.OnAnyGameplayEffectExecuted.Add(this.kqr);
    }
  }
  GetGeDebugStrings() {
    return this.Oqr.join(" ");
  }
  GetTagDebugStrings() {
    return this.Entity.GetComponent(205)?.TagContainer.GetDebugString() ?? "找不到tag组件";
  }
  GetTagContainerDebugString(e) {
    var r = e.GameplayTags?.Num() ?? 0;
    if (r <= 0) {
      return "";
    }
    let a = "";
    for (let t = 0; t < r; t++) {
      a += e.GameplayTags.Get(t).TagName + " ";
    }
    return a;
  }
  GetBuffEffectDebugString(t) {
    let e = "";
    for (const r of this.Entity.GetComponent(174).BuffEffectManager.GetAllEffects()) {
      if (this.cGr(t, String(r.BuffId))) {
        e += `${r.constructor.name} buffId:${r.BuffId} handle:${r.ActiveHandleId}\n`;
      }
    }
    return e;
  }
  GetShieldDebugString() {
    this.Fqr.length = 0;
    var t = this.Entity.GetComponent(75);
    if (t) {
      for (var [, e] of t.GetDebugShieldInfo()) {
        var r = e.ShieldValue;
        var a = e.Priority;
        var e = e.TemplateId;
        this.Fqr.push(`Shield magnitude: ${r} priority: ${a} templateId: ${e}`);
      }
    }
    t = this.Entity.GetComponent(173)?.GetLockDebugString() ?? "";
    return "\n\nShields:\n" + this.Fqr.join("\n") + t;
  }
  GetAttributeDebugStrings() {
    var e = this.Entity.GetComponent(173);
    if (!e) {
      return "Invalid";
    }
    let r = "";
    for (let t = 1; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; t++) {
      var a = e.GetBaseValue(t);
      var i = e.GetCurrentValue(t);
      var n = Protocol_1.Aki.Protocol.Vks[t];
      if (CharacterAttributeTypes_1.stateAttributeIds.has(t) || i === a) {
        r += `#${t} ${n}	= ${i.toFixed(0)}
`;
      } else {
        r += a < i ? `#${t} ${n}	= ${i.toFixed(0)}(+${(i - a).toFixed(0)})
` : `#${t} ${n}	= ${i.toFixed(0)}(${(i - a).toFixed(0)})
`;
      }
    }
    return r += "\n队伍属性：\n" + CharacterGasDebugComponent_1.GetFormationAttributeDebugStrings();
  }
  GetAllAttributeDebugStrings() {
    this.Vqr.length = 0;
    var e = this.Entity.GetComponent(173);
    for (let t = 1; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; t++) {
      var r = e.GetBaseValue(t);
      var a = e.GetCurrentValue(t);
      var i = Protocol_1.Aki.Protocol.Vks[t];
      var i = `Attribute ID: ${t}   ${i}  
    Base: ${r.toFixed()}    Current: ${a.toFixed()} 
`;
      this.Vqr.push(i);
    }
    return this.Vqr.join("\n");
  }
  static GetFormationAttributeDebugStrings() {
    let t = "";
    for (const n of FormationPropertyAll_1.configFormationPropertyAll.GetConfigList()) {
      var e = n.Id;
      var r = FormationAttributeController_1.FormationAttributeController.GetValue(e);
      var a = FormationAttributeController_1.FormationAttributeController.GetMax(e);
      var i = FormationAttributeController_1.FormationAttributeController.GetSpeed(e);
      t += `#${e} = ${r?.toFixed(0)}/${a?.toFixed(0)} (${i?.toFixed(0)}/s)
`;
    }
    return t;
  }
  GetAllAttributeDebugInfo() {
    var a = this.Entity.GetComponent(173);
    if (!a) {
      return "Invalid";
    }
    let i = "";
    const n = this.ServerDebugInfo?.GSs;
    var o = new Array(CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX);
    if (n) {
      for (const p of n) {
        o[p.tSs] = p;
      }
    }
    for (let r = 1; r < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; r++) {
      var s = a.GetBaseValue(r);
      var h = a.GetCurrentValue(r);
      var u = h.toFixed(0);
      let t = (h - s).toFixed(0);
      if (s <= h) {
        t = "+" + t;
      }
      t = h === s ? "" : `(${t})`;
      var _ = Protocol_1.Aki.Protocol.Vks[r].replace("Proto_", "");
      const n = o[r];
      var C = n?.y6n.toFixed(0) ?? "0";
      let e = n ? (n.y6n - n.eSs).toFixed(0) : "0";
      if (n && n.y6n > n.eSs) {
        e = "+" + e;
      }
      e = n?.y6n === n?.eSs ? "" : `(${e})`;
      if (CharacterAttributeTypes_1.stateAttributeIds.has(r) || h === s) {
        i += `#${r} ${_}	 C:${u} | S:${C}
`;
      } else {
        i += `#${r} ${_}	 C:${u}(${t}) | S:${C}(${e})
`;
      }
    }
    i += "\n队伍属性：\n";
    var t = this.ServerDebugInfo?.M6n;
    var e = new Array();
    if (t) {
      for (const D of t) {
        e[D.E6n] = D;
      }
    }
    for (const d of FormationPropertyAll_1.configFormationPropertyAll.GetConfigList()) {
      var r = d.Id;
      var l = FormationAttributeController_1.FormationAttributeController.GetValue(r);
      var c = FormationAttributeController_1.FormationAttributeController.GetMax(r);
      var f = FormationAttributeController_1.FormationAttributeController.GetSpeed(r);
      const n = e[r];
      var g = n?.y6n.toFixed(0) ?? "???";
      var m = n?.I6n.toFixed(0) ?? "???";
      var b = n?.L6n.toFixed(0) ?? "???";
      i += `#${r}	 C:${l?.toFixed(0)}/${c?.toFixed(0)} (${f?.toFixed(0)}/s) | S:${g}/${m} (${b}/s)
`;
    }
    return i;
  }
  lGr() {
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharMovementModeChanged, this.Hqr);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.Wqr);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.Kqr);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnSetNewBeHit, this.Qqr);
  }
  _Gr() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharMovementModeChanged, this.Hqr);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.Wqr);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.Kqr);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnSetNewBeHit, this.Qqr);
  }
  GetAllMovementHistory() {
    if (this.jqr.length > 50) {
      this.jqr.pop();
    }
    return this.jqr.join("\n");
  }
  DebugResetBaseValue(t, e) {
    if (t >= EAttributeId.Proto_Lv && t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX) {
      this.Entity.GetComponent(173).SetBaseValue(t, e);
    }
  }
  static get IsServerLogOff() {
    return this.mGr;
  }
  static ReceiveSwitchServerLogMode(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 19, "[CharacterAbilityComponent]Server switch Buff Mode", ["isClientControl", t]);
    }
    this.mGr = t;
  }
  static RequestSwitchServerMode(t) {
    var e = Protocol_1.Aki.Protocol.pis.create({
      Jjn: t,
      zjn: Protocol_1.Aki.Protocol.B4s.PAs
    });
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 19, "[CharacterDamageComponent]Request Buff Mode", ["isClientControl", t]);
    }
    Net_1.Net.Call(19990, e, t => {
      this.ReceiveSwitchServerLogMode(t.Jjn);
    });
  }
  static SecondsSinceStartup() {
    return (Time_1.Time.WorldTimeSeconds - CharacterGasDebugComponent_1.dGr - CharacterGasDebugComponent_1.sGr).toFixed(2);
  }
  static SetDistanceMax(t) {}
  static BeginRecord() {
    this.sGr = 0;
    this.$qr = true;
    this.dGr = Time_1.Time.WorldTimeSeconds;
    this.CGr = Time_1.Time.ServerTimeStamp;
    this.SetDamageRecord(true);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie);
    CharacterGasDebugComponent_1.rGr = undefined;
    CharacterGasDebugComponent_1.gGr(Global_1.Global.BaseCharacter.EntityId, true, false);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAbsoluteTimeStop, this.fGr);
  }
  static EndRecord() {
    var t;
    if (this.$qr) {
      this.$qr = false;
      this.SetDamageRecord(false);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAbsoluteTimeStop, this.fGr);
      t = this.pGr();
      this.CleanupRecord();
      return t;
    } else {
      return "";
    }
  }
  static pGr() {
    var t = new Array();
    var e = "";
    let r = "";
    UE.KuroStaticLibrary.SaveStringToFile("X秒,当前时间,对象,对象ID,对象名称,技能ID,技能类型,攻击,暴击,爆伤,生命,防御,伤害加成\n" + this.eGr.join("\n"), UE.BlueprintPathsLibrary.ProjectSavedDir() + this.Pt + "SkillRecord.csv", true);
    var a = new Array();
    var i = "X秒,当前时间,对象,对象ID,对象名称,子弹ID,子弹名称,伤害ID,技能ID,技能类型,子弹是否命中\n";
    for (const $ of this.Zqr) {
      var n = this.zqr.get($);
      n.push(ModelManager_1.ModelManager.BulletModel.IsBulletHit($) ? "1" : "0");
      a.push(n.join(","));
    }
    UE.KuroStaticLibrary.SaveStringToFile(i + a.join("\n"), UE.BlueprintPathsLibrary.ProjectSavedDir() + this.Pt + "BulletRecord.csv", true);
    i = "X秒,当前时间,对象,对象ID,对象名称,伤害来源,结算ID,子弹名称,伤害值,技能ID,技能名称,唯一ID,Config ID,攻击,暴击,爆伤,生命,防御,伤害加成\n";
    UE.KuroStaticLibrary.SaveStringToFile(i + this.vGr.join("\n"), UE.BlueprintPathsLibrary.ProjectSavedDir() + this.Pt + "DamageRecord.csv", true);
    i = "X秒,当前时间,对象,对象ID,对象名称,伤害来源,结算ID,子弹名称,伤害值,技能ID,技能名称,是否暴击,唯一ID,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,削刃,大招能量,元素能量类型,元素能量,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振���上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,白条倍率,白条倍率百分比0,白条倍率百分比1,削刃,大招能量,元素能量类型,元素能量,存在的BuffID,存在的Buff名称,存在的BuffID,存在的Buff名称\n";
    UE.KuroStaticLibrary.SaveStringToFile(i + this.MGr.join("\n"), UE.BlueprintPathsLibrary.ProjectSavedDir() + this.Pt + "DamageRecord_Attr.csv", true);
    i = "X秒,当前时间,对象,对象ID,对象名称,伤害来源,结算ID,子弹名称,伤害值,技能ID,技能名称,唯一ID,是否暴击,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,削刃,大招能量,元素能量类型,元素能量,存在的BuffID,存在的Buff名称,存在的BuffID,存在的Buff名称\n";
    UE.KuroStaticLibrary.SaveStringToFile(i + this.EGr.join("\n"), UE.BlueprintPathsLibrary.ProjectSavedDir() + this.Pt + "DamageRecord_Snipeshot.csv", true);
    r = "X秒,当前时间,对象,对象ID,对象名称,BuffId,Buff名称,添加or删除\n" + this.SGr.join("\n");
    UE.KuroStaticLibrary.SaveStringToFile(r, UE.BlueprintPathsLibrary.ProjectSavedDir() + this.Pt + "BuffRecord.csv", true);
    for (const V of this.yGr.values()) {
      t.push(V.ToCsv().join(","));
    }
    r = "对象ID,对象名称,唯一Id,普攻,蓄力,E技能,大招,QTE,极限闪避反击,地面闪避,极限闪避,被动技能,战斗幻想技,探索幻象技,空中闪避\n" + t.join("\n");
    UE.KuroStaticLibrary.SaveStringToFile(r, UE.BlueprintPathsLibrary.ProjectSavedDir() + this.Pt + "MoveSum.csv", true);
    t.length = 0;
    e += r + "\n";
    i = "角色ID,角色名称,受伤来源ConfigId,受伤来源名称,受伤来源唯一ID,总伤害,普攻,蓄力,E技能,大招,QTE,极限闪避反击,地面闪避,极限闪避,被动技能,战斗幻想技,探索幻象技,空中闪避\n";
    for (const x of this.IGr.values()) {
      t.push(x.ToCsvForRole().join(","));
    }
    r = i + t.join("\n");
    UE.KuroStaticLibrary.SaveStringToFile(r, UE.BlueprintPathsLibrary.ProjectSavedDir() + this.Pt + "RoleDamageSum.csv", true);
    t.length = 0;
    e += r + "\n";
    i = "怪物ConfigID,怪物名称,怪物唯一Id,攻击者ConfigId,攻击者名称,总伤害,普攻,蓄力,E技能,大招,QTE,极限闪避反击,地面闪避,极限闪避,被动技能,战斗幻想技,探索幻象技,空中闪避\n";
    for (const j of this.TGr.values()) {
      t.push(j.ToCsvForMonster().join(","));
    }
    r = i + t.join("\n");
    UE.KuroStaticLibrary.SaveStringToFile(r, UE.BlueprintPathsLibrary.ProjectSavedDir() + this.Pt + "MonsterDamageSum.csv", true);
    t.length = 0;
    e += r + "\n";
    r = "";
    var o = Time_1.Time.WorldTimeSeconds - CharacterGasDebugComponent_1.dGr - CharacterGasDebugComponent_1.sGr;
    let s = 0;
    while (o >= s) {
      r += ",'" + s.toString() + "s'";
      s += 0.5;
    }
    let h = "";
    var i = (0, puerts_1.$ref)(h);
    UE.FileSystemOperation.ReadFile(UE.KismetSystemLibrary.GetProjectDirectory() + "../Config/ResConfig/RoleDspTpl.txt", i);
    h = (h = (0, puerts_1.$unref)(i)).replace("TPL_XAXIS_VALUES", r);
    var u = new StringBuilder_1.StringBuilder();
    var _ = new Map();
    var C = new Map();
    var l = new Map();
    var c = new Map();
    var f = new Map();
    var g = new Map();
    var m = new Map();
    var b = new Map();
    var p = new Map();
    for (s = 0; o >= s;) {
      for (var [D, d] of CharacterGasDebugComponent_1.rGr) {
        if (!c.has(D)) {
          c.set(D, new Array());
        }
        if (!f.has(D)) {
          f.set(D, new Array());
        }
        if (!g.has(D)) {
          g.set(D, new Array());
        }
        if (!m.has(D)) {
          m.set(D, new Array());
        }
        if (!b.has(D)) {
          b.set(D, new Array());
        }
        if (!p.has(D)) {
          p.set(D, new Array());
        }
        if (!_.has(D)) {
          _.set(D, 0);
        }
        if (!C.has(D)) {
          C.set(D, 0);
        }
        if (!l.has(D)) {
          l.set(D, false);
        }
        let t = false;
        let e = false;
        while (!d.Empty) {
          var E = d.Top;
          if (!(E.TimeStamp <= this.dGr + s)) {
            break;
          }
          if (E.DamageValue > 0) {
            _.set(D, _.get(D) + E.DamageValue);
          } else if (E.InGame) {
            l.set(D, true);
          } else if (E.OutGame) {
            l.set(D, false);
          } else if (E.QteBegin) {
            t = true;
          } else if (E?.OutGameSkill) {
            e = true;
          }
          d.Pop();
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Character", 20, "打印时间", ["time", E.TimeStamp]);
          }
        }
        c.get(D).push(_.get(D));
        f.get(D).push(l.get(D) ? "-10" : "'-'");
        g.get(D).push(t ? "-20" : "'-'");
        m.get(D).push(e ? "-30" : "'-'");
        var v = C.get(D);
        p.get(D).push(v > 0 ? _.get(D) / v : 0);
        b.get(D).push(s > 0 ? _.get(D) / s : 0);
        if (l.get(D)) {
          C.set(D, C.get(D) + 0.5);
        }
      }
      s += 0.5;
    }
    var A;
    var y;
    var G;
    var I;
    var q;
    var M;
    var N;
    var O;
    var S;
    var L;
    var F;
    var U;
    var k;
    var H;
    var w;
    var Q;
    var X;
    var T = [];
    var R = [];
    var B = [];
    for ([A, y] of c) {
      var P = EntitySystem_1.EntitySystem.Get(A);
      if (P?.Valid) {
        T.push(A);
        P = (P = P.GetComponent(0)).Valid ? P.GetRoleId() : 0;
        if (P = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(P)) {
          P = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(P);
          P = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(P.Name);
          R.push(P);
          u.Append(StringUtils_1.StringUtils.Format("{name: '{0}伤害', type: 'line', data: [{1}],},", P, y.join(",")));
        } else {
          B.push(A);
        }
      } else {
        B.push(A);
      }
    }
    for ([G, I] of b) {
      if (!B.includes(G)) {
        q = T.indexOf(G);
        u.Append(StringUtils_1.StringUtils.Format("{name: '{0}绝对DPS', type: 'line', data: [{1}],},", R[q], I.join(",")));
      }
    }
    for ([M, N] of p) {
      if (!B.includes(M)) {
        O = T.indexOf(M);
        u.Append(StringUtils_1.StringUtils.Format("{name: '{0}站场DPS', type: 'line', data: [{1}],},", R[O], N.join(",")));
      }
    }
    for ([S, L] of f) {
      if (!B.includes(S)) {
        F = T.indexOf(S);
        u.Append(StringUtils_1.StringUtils.Format("{name: '{0}在场上', type: 'line', data: [{1}],},", R[F], L.join(",")));
      }
    }
    for ([U, k] of g) {
      if (!B.includes(U)) {
        H = T.indexOf(U);
        u.Append(StringUtils_1.StringUtils.Format("{name: '{0}QTE', type: 'line', data: [{1}],},", R[H], k.join(",")));
      }
    }
    for ([w, Q] of m) {
      if (!B.includes(w)) {
        X = T.indexOf(w);
        u.Append(StringUtils_1.StringUtils.Format("{name: '{0}退场技', type: 'line', data: [{1}],},", R[X], Q.join(",")));
      }
    }
    h = h.replace("CONTENT_SERIES", u.ToString());
    UE.KuroStaticLibrary.SaveStringToFile(h, UE.BlueprintPathsLibrary.ProjectSavedDir() + this.Pt + "RoleDsp.html", true);
    return e;
  }
  Yqr(t) {
    return CharacterStatisticsComponent_1.CharacterStatisticsComponent.IsInRecordArea(t);
  }
  static RecordDamage(a, i, n, o) {
    var s = new Array();
    s.push(n);
    s.push(o);
    var n = CharacterGasDebugComponent_1.LGr(a);
    if (n) {
      s.push(n.Type);
      s.push(n.ConfigId);
      s.push(n.Name);
      if (a.GetComponent(95)) {
        s.push("角色");
      } else if (a.GetComponent(0)?.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_SceneEntity) {
        s.push("场景伤害");
      } else {
        s.push("怪物");
      }
      s.push(MathUtils_1.MathUtils.LongToBigInt(i.KAs).toString());
      let t = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(a, MathUtils_1.MathUtils.LongToBigInt(i.Mjn).toString(), false);
      let e = undefined;
      if (!t) {
        o = ControllerHolder_1.ControllerHolder.WorldController.GetCustomEntityId(a.Id, 1);
        if ((e = EntitySystem_1.EntitySystem.Get(o))?.Valid) {
          t = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(e, MathUtils_1.MathUtils.LongToBigInt(i.Mjn).toString());
        }
      }
      n = MathUtils_1.MathUtils.LongToNumber(i.r5n);
      s.push(t?.BulletName ?? "");
      s.push(i.QAs.toFixed());
      s.push(n.toFixed());
      let r = a.GetComponent(39)?.GetSkillInfo(n);
      r = r || e?.GetComponent(39)?.GetSkillInfo(n);
      s.push(r?.SkillName?.toString());
      s.push(MathUtils_1.MathUtils.LongToBigInt(i.Zjn.F4n).toString());
      var o = a?.CheckGetComponent(0).GetPbDataId().toFixed();
      s.push(o);
      var h = s.length;
      for (const u of i.JAs.HAs) {
        if (u.tSs === EAttributeId.Proto_Atk) {
          s[h] = u.y6n.toFixed();
        } else if (u.tSs === EAttributeId.Proto_Crit) {
          s[h + 1] = u.y6n.toFixed();
        } else if (u.tSs === EAttributeId.Proto_CritDamage) {
          s[h + 2] = u.y6n.toFixed();
        } else if (u.tSs === EAttributeId.Proto_Life) {
          s[h + 3] = u.y6n.toFixed();
        } else if (u.tSs === EAttributeId.Proto_Def) {
          s[h + 4] = u.y6n.toFixed();
        } else if (u.tSs === EAttributeId.Proto_DamageChange) {
          s[h + 5] = u.y6n.toFixed();
        }
      }
      CharacterGasDebugComponent_1.vGr.push(s.join(","));
      n = ModelManager_1.ModelManager.CreatureModel.GetEntityId(MathUtils_1.MathUtils.LongToNumber(i.JAs.F4n));
      o = EntitySystem_1.EntitySystem.Get(n);
      CharacterGasDebugComponent_1.DGr(o, a, i.QAs, r?.SkillGenre);
    }
  }
  static DGr(t, e, r, a) {
    let i = this.IGr;
    if (!t?.GetComponent(95)) {
      i = this.TGr;
    }
    var n;
    var o = t.Id.toFixed() + e.Id.toFixed();
    var s = i.get(o);
    if (s) {
      s.TotalDamage += r;
      n = s.RecordDamage.get(a) ?? 0;
      s.RecordDamage.set(a, n + r);
    } else {
      s = new RecordDamageSum();
      n = t?.CheckGetComponent(0).GetPbDataId();
      s.ConfigId = n ?? 0;
      s.UniqueId = t.Id;
      s.Name = t?.GetComponent(3).Actor.GetName() ?? "";
      n = e?.CheckGetComponent(0).GetPbDataId();
      s.DamageSourceConfigId = n;
      s.SourceName = e?.GetComponent(3).Actor.GetName();
      s.SourceUniqueId = e?.Id;
      s.TotalDamage = r;
      t = s.RecordDamage.get(a) ?? 0;
      s.RecordDamage.set(a, t + r);
      i.set(o, s);
    }
  }
  static tGr(t, e, r) {
    var a = t?.GetComponent(3).Actor.GetName() ?? "";
    var t = t?.CheckGetComponent(0).GetPbDataId() ?? 0;
    var e = e?.Id ?? 0;
    var i = this.yGr.get(t + e);
    if (i) {
      i.RecordNum.set(r, i.RecordNum.get(r) + 1);
    } else {
      (i = new RecordMoveSum()).ConfigId = t;
      i.Name = a;
      i.TargetUniqueId = e;
      i.RecordNum.set(r, 1);
      this.yGr.set(t + e, i);
    }
  }
  cGr(t, e) {
    return !t || e.includes(t) || t.includes(e);
  }
  GetServerBuffString() {
    if (!this.ServerDebugInfo?.xAs?.SIs) {
      return "";
    }
    let t = "";
    for (const i of this.ServerDebugInfo.xAs.SIs) {
      var e = MathUtils_1.MathUtils.LongToNumber(i.b6n);
      var r = MathUtils_1.MathUtils.LongToBigInt(i.Rjn).toString();
      var a = CharacterBuffController_1.default.GetBuffDefinition(e);
      var a = a ? a.Desc : "";
      t += this.RGr(e.toString(), i.cVn, a, i.Bjn, i.F6n, i.WHn, r, i.QEs, i.n5n);
    }
    if (this.ServerDebugInfo.xAs.EIs.length > 0) {
      t += "\nCD : \n";
      for (const n of this.ServerDebugInfo.xAs.EIs) {
        if (!(n.GTs.length <= 0)) {
          t += "[" + MathUtils_1.MathUtils.LongToBigInt(n.b6n).toString() + "] ";
          for (const o of n.GTs) {
            t += o.toFixed() + ", ";
          }
        }
      }
    }
    return t;
  }
  GetServerBuffRemainDuration(t) {
    if (!this.ServerDebugInfo?.xAs?.SIs) {
      return -1;
    }
    let e = -1;
    for (const r of this.ServerDebugInfo.xAs.SIs) {
      if (r.cVn === t) {
        e = r.QEs;
        break;
      }
    }
    return e;
  }
  GetServerBuffTotalDuration(t) {
    if (!this.ServerDebugInfo?.xAs?.SIs) {
      return -1;
    }
    let e = 0;
    for (const r of this.ServerDebugInfo.xAs.SIs) {
      if (r.cVn === t) {
        e = r.n5n;
        break;
      }
    }
    return e;
  }
  HasBuffRequest(t) {
    return this.Zi1.has(t);
  }
  HasServerBuff(t) {
    if (this.ServerDebugInfo?.xAs?.SIs) {
      for (const e of this.ServerDebugInfo.xAs.SIs) {
        if (e.cVn === t) {
          return true;
        }
      }
    }
    return false;
  }
  RGr(t, e, r, a, i, n, o, s, h) {
    return "[" + t + ", " + e + "] " + a + "层," + i + "级," + (n ? "激活. " : "失效. ") + "施:" + o + ". 时:" + s.toFixed(1) + "/" + h.toFixed() + ". " + r + "\n";
  }
  GetServerTagString() {
    let t = "";
    if (this.ServerDebugInfo?.bAs) {
      for (const e of this.ServerDebugInfo.bAs) {
        t = t + GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(e.m5n).TagName + " " + e.m9n.toString() + "\n";
      }
    }
    if (this.ServerDebugInfo?.qAs) {
      for (const r of this.ServerDebugInfo.qAs) {
        t = t + "[编] " + GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(r.m5n).TagName + " " + r.m9n.toString() + "\n";
      }
    }
    return t;
  }
  GetServerAttributeString() {
    if (!this.ServerDebugInfo?.GSs) {
      return "";
    }
    let t = "";
    for (const e of this.ServerDebugInfo.GSs) {
      t = t + e.tSs + " " + Protocol_1.Aki.Protocol.Vks[e.tSs] + ":[" + e.eSs.toString() + "][" + e.y6n.toString() + "]\n";
    }
    t += "\n队伍属性：\n";
    for (const r of this.ServerDebugInfo.M6n) {
      t = t + r.E6n.toString() + "=" + r.y6n.toString() + "/" + r.I6n.toString() + "(" + r.L6n.toString() + "/s)\n";
    }
    return t;
  }
  GetServerPartString() {
    if (!this.ServerDebugInfo?.BAs?.PTs) {
      return "";
    }
    let t = "";
    for (const e of this.ServerDebugInfo.BAs.PTs) {
      t += e.jjn + " :  " + e.eWn.toFixed(1) + " / " + e.l5n.toFixed(1) + ", " + e._5n + "\n";
    }
    return t;
  }
  GetServerHateString() {
    if (!this.ServerDebugInfo?.ISs) {
      return "";
    }
    let t = "";
    for (const e of this.ServerDebugInfo.ISs) {
      t += MathUtils_1.MathUtils.LongToBigInt(e.F4n) + " : " + e.Z8n.toFixed(1) + "\n";
    }
    return t;
  }
  GetServerShieldString() {
    if (!this.ServerDebugInfo?.Jys) {
      return "";
    }
    let t = "护盾总值: " + this.ServerDebugInfo.Jys.RTs + "\n";
    for (const e of this.ServerDebugInfo.Jys.LTs) {
      t += "[" + e.v9n + "," + e.uVn + "] " + (e.TTs ? "生效" : "失效") + ", " + e.ETs + "," + e.ITs + "," + e.yTs + "\n";
    }
    return t;
  }
  GetCltBuffHandleSet() {
    const e = new Set();
    this.Entity.GetComponent(209)?.GetAllBuffs()?.forEach(t => e.add(t.Handle));
    return e;
  }
  Union(e, t) {
    t.forEach(t => !e.has(t) && e.add(t));
  }
  ServerDebugInfoRequest() {
    this.tr1 += 1;
    const e = this.tr1;
    const r = this.GetCltBuffHandleSet();
    this.Zi1.forEach(t => !r.has(t) && this.Zi1.delete(t));
    this.er1.set(e, r);
    var t = Protocol_1.Aki.Protocol.Uis.create();
    t.F4n = MathUtils_1.MathUtils.NumberToLong(ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(this.Entity.Id));
    Net_1.Net.Call(28584, t, t => {
      if (this.er1.has(e)) {
        this.Union(this.Zi1, this.er1.get(e));
        this.er1.delete(e);
      }
      if (t) {
        this.ServerDebugInfo = t;
        this.ServerDebugInfoDirty = true;
      }
    });
  }
  OnBuffAdded(t) {
    if (CharacterGasDebugComponent_1.$qr && (t = this.UGr(t, "添加"))) {
      CharacterGasDebugComponent_1.SGr.push(t.join(","));
    }
  }
  OnBuffRemoved(t) {
    if (CharacterGasDebugComponent_1.$qr && (t = this.UGr(t, "删除"))) {
      CharacterGasDebugComponent_1.SGr.push(t.join(","));
    }
  }
  UGr(t, e) {
    var r = new Array();
    r.push(CharacterGasDebugComponent_1.SecondsSinceStartup());
    r.push(CharacterGasDebugComponent_1.Jqr(Date.now()));
    var a = t.GetInstigator();
    var a = a ? CharacterGasDebugComponent_1.LGr(a) : undefined;
    if (a) {
      r.push(a.Type);
      r.push(a.ConfigId);
      r.push(a.Name);
      r.push(t.Config.Id.toString());
      r.push(t.Config.Desc);
      r.push(e);
      return r;
    }
  }
  static LGr(t) {
    var e;
    var t = t.GetComponent(0);
    var r = t.GetEntityType();
    if (r === Protocol_1.Aki.Protocol.kks.Proto_Player) {
      e = t.Valid ? t.GetRoleId() : 0;
      if (e = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(e)) {
        e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
        return {
          Name: ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(e.Name),
          Type: "角色",
          ConfigId: t.GetPbDataId().toFixed()
        };
      } else {
        return undefined;
      }
    } else if (r === Protocol_1.Aki.Protocol.kks.Proto_Monster) {
      return {
        Name: PublicUtil_1.PublicUtil.GetConfigTextByKey(t.GetEntityTidName() ?? ""),
        Type: "怪物",
        ConfigId: t.GetPbDataId().toFixed()
      };
    } else if (r === Protocol_1.Aki.Protocol.kks.Proto_SceneEntity) {
      return {
        Name: PublicUtil_1.PublicUtil.GetConfigTextByKey(t.GetEntityTidName() ?? ""),
        Type: "场景实体",
        ConfigId: t.GetPbDataId().toFixed()
      };
    } else {
      return undefined;
    }
  }
  static SetDamageRecord(t) {
    var e = Protocol_1.Aki.Protocol.Debug.GZn.create();
    e.tWn = t;
    Net_1.Net.Call(24762, e, t => {
      if (t && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CombatInfo", 20, "", ["Response", t]);
      }
    });
  }
  static OnDamageRecordNotify(e, r) {
    if (!Info_1.Info.IsBuildShipping) {
      TestModuleBridge_1.TestModuleBridge.TryGetTestModuleExports().then(t => {
        if (t && t.RoleTest) {
          t.RoleTest.RecordDamageNotify(e, r);
        }
      });
    }
    var t;
    var a;
    var i = EntitySystem_1.EntitySystem.Get(ModelManager_1.ModelManager.CreatureModel.GetEntityId(MathUtils_1.MathUtils.LongToNumber(r.Zjn.F4n)));
    if (i.GetComponent(0)?.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_SceneEntity || !!i.GetComponent(27)?.GetStatisticsEnable()) {
      t = ((MathUtils_1.MathUtils.LongToNumber(r.WAs) - CharacterGasDebugComponent_1.CGr) * 0.001 - CharacterGasDebugComponent_1.sGr).toFixed(2);
      a = this.Jqr(r.WAs);
      this.RecordDamage(i, r, t, a);
      this.AGr(i, r, t, a);
      this.PGr(i, r, t, a);
      this.xGr(i, r);
    }
  }
  static xGr(e, r) {
    var a = e.GetComponent(0);
    if (a && a.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player) {
      this.rGr ||= new Map();
      a = e.Id;
      let t = this.rGr.get(a);
      if (!t) {
        t = new PriorityQueue_1.PriorityQueue(this.nGr);
        this.rGr.set(a, t);
      }
      e = new DamageRecordDsp(Time_1.Time.WorldTimeSeconds - CharacterGasDebugComponent_1.sGr, r.QAs, false, false, false, false);
      t.Push(e);
    }
  }
  static gGr(t, e, r) {
    CharacterGasDebugComponent_1.rGr ||= new Map();
    let a = CharacterGasDebugComponent_1.rGr.get(t);
    if (!a) {
      a = new PriorityQueue_1.PriorityQueue(CharacterGasDebugComponent_1.nGr);
      CharacterGasDebugComponent_1.rGr.set(t, a);
    }
    t = new DamageRecordDsp(Time_1.Time.WorldTimeSeconds - CharacterGasDebugComponent_1.sGr, -1, false, e, r, false);
    a.Push(t);
  }
  static PGr(a, i, n, o) {
    var t = MathUtils_1.MathUtils.LongToNumber(i.KAs);
    var s = ModelManager_1.ModelManager.DamageModel?.GetDamageConfigById(t);
    if (s) {
      var h = new Array();
      h.push(n);
      h.push(o);
      var n = CharacterGasDebugComponent_1.LGr(a);
      if (n) {
        h.push(n.Type);
        h.push(n.ConfigId);
        h.push(n.Name);
        h.push(i.XAs === Protocol_1.Aki.Protocol.XAs.Proto_FromBullet ? "子弹" : "Buff");
        h.push(MathUtils_1.MathUtils.LongToBigInt(i.KAs).toString());
        let t = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(a, MathUtils_1.MathUtils.LongToBigInt(i.Mjn).toString(), false);
        let e = undefined;
        if (!t) {
          o = ControllerHolder_1.ControllerHolder.WorldController.GetCustomEntityId(a.Id, 1);
          if ((e = EntitySystem_1.EntitySystem.Get(o))?.Valid) {
            t = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(e, MathUtils_1.MathUtils.LongToBigInt(i.Mjn).toString());
          }
        }
        h.push(t?.BulletName ?? "");
        h.push(i.QAs.toFixed());
        n = MathUtils_1.MathUtils.LongToNumber(i.r5n);
        h.push(n.toFixed());
        let r = a.GetComponent(39)?.GetSkillInfo(n)?.SkillName;
        r = r || e?.GetComponent(39)?.GetSkillInfo(n)?.SkillName;
        h.push(r?.toString() ?? "");
        h.push(MathUtils_1.MathUtils.LongToBigInt(i.Zjn.F4n).toString());
        h.push(i.YAs ? "1" : "0");
        var o = h.length;
        this.wGr(i.JAs.jAs, h, o);
        this.wGr(i.Zjn.jAs, h, o + 59);
        var n = i.Wjn;
        h[o + 118] = AbilityUtils_1.AbilityUtils.GetLevelValue(s.ToughLv, n, 0).toString();
        h[o + 119] = AbilityUtils_1.AbilityUtils.GetLevelValue(s.Energy, n, 0).toString();
        h[o + 120] = s.ElementPowerType.toString();
        h[o + 121] = AbilityUtils_1.AbilityUtils.GetLevelValue(s.ElementPower, n, 0).toString();
        var u = new Array();
        var _ = new Array();
        for (const g of i.Zjn.$As) {
          var C = MathUtils_1.MathUtils.LongToNumber(g);
          var l = CharacterBuffController_1.default.GetBuffDefinition(C);
          u.push(l.Desc);
          _.push(C);
        }
        h[o + 122] = _.join("|");
        h[o + 123] = u.join("|");
        u.length = 0;
        _.length = 0;
        for (const m of i.JAs.$As) {
          var c = MathUtils_1.MathUtils.LongToNumber(m);
          var f = CharacterBuffController_1.default.GetBuffDefinition(c);
          u.push(f.Desc);
          _.push(c);
        }
        h[o + 124] = _.join("|");
        h[o + 125] = u.join("|");
        s = h.join(",");
        this.EGr.push(s);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Recorder", 20, "结算信息Snapshot", ["Result", s]);
        }
      }
    } else {
      n = a.GetComponent(1)?.Owner?.ActorLabel;
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Test", 20, "伤害配置为空", ["伤害ID", t], ["Name", n ?? ""]);
      }
    }
  }
  static Jqr(t) {
    t = new Date(MathUtils_1.MathUtils.LongToNumber(t));
    return StringUtils_1.StringUtils.Format("{0}月{1}日{2}:{3}:{4}:{5}", t.getMonth().toString(), t.getDate().toString(), t.getHours().toString(), t.getMinutes().toString(), t.getSeconds().toString(), t.getMilliseconds().toString());
  }
  static AGr(a, i, n, o) {
    var t = MathUtils_1.MathUtils.LongToNumber(i.KAs);
    var s = ModelManager_1.ModelManager.DamageModel?.GetDamageConfigById(t);
    if (s) {
      var h = new Array();
      h.push(n);
      h.push(o);
      var n = CharacterGasDebugComponent_1.LGr(a);
      if (n) {
        h.push(n.Type);
        h.push(n.ConfigId);
        h.push(n.Name);
        h.push(i.XAs === Protocol_1.Aki.Protocol.XAs.Proto_FromBullet ? "子弹" : "Buff");
        h.push(MathUtils_1.MathUtils.LongToBigInt(i.KAs).toString());
        let t = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(a, MathUtils_1.MathUtils.LongToBigInt(i.Mjn).toString(), false);
        let e = undefined;
        if (!t) {
          o = ControllerHolder_1.ControllerHolder.WorldController.GetCustomEntityId(a.Id, 1);
          if ((e = EntitySystem_1.EntitySystem.Get(o))?.Valid) {
            t = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(e, MathUtils_1.MathUtils.LongToBigInt(i.Mjn).toString());
          }
        }
        h.push(t?.BulletName ?? "");
        h.push(i.QAs.toFixed());
        n = MathUtils_1.MathUtils.LongToNumber(i.r5n);
        h.push(n.toFixed());
        let r = a.GetComponent(39)?.GetSkillInfo(n)?.SkillName;
        r = r || e?.GetComponent(39)?.GetSkillInfo(n)?.SkillName;
        h.push(r?.toString() ?? "");
        h.push(i.YAs ? "1" : "0");
        h.push(MathUtils_1.MathUtils.LongToBigInt(i.Zjn.F4n).toString());
        var u = h.length;
        CharacterGasDebugComponent_1.BGr(i.JAs.HAs, h, u, u + 122);
        var _ = EAttributeId.Proto_ElementEnergy;
        h[u + 120] = s.ElementPowerType.toString();
        for (const b of i.Zjn.HAs) {
          if (b.tSs === EAttributeId.Proto_ToughChange) {
            h[u + 118] = b.y6n.toFixed();
          } else if (b.tSs === EAttributeId.Proto_Energy) {
            h[u + 119] = b.y6n.toFixed();
          } else if (_ && b.tSs === _) {
            h[u + 121] = b.y6n.toFixed();
          }
        }
        CharacterGasDebugComponent_1.BGr(i.Zjn.HAs, h, u + 59, u + 181);
        var o = i.Wjn;
        h[u + 240] = AbilityUtils_1.AbilityUtils.GetLevelValue(s.HardnessLv, o, 0).toString();
        h[u + 241] = AbilityUtils_1.AbilityUtils.GetLevelValue(s.Percent0, o, 0).toString();
        h[u + 242] = AbilityUtils_1.AbilityUtils.GetLevelValue(s.Percent1, o, 0).toString();
        h[u + 243] = AbilityUtils_1.AbilityUtils.GetLevelValue(s.ToughLv, o, 0).toString();
        h[u + 244] = AbilityUtils_1.AbilityUtils.GetLevelValue(s.Energy, o, 0).toString();
        h[u + 245] = s.ElementPowerType.toString();
        h[u + 246] = AbilityUtils_1.AbilityUtils.GetLevelValue(s.ElementPower, o, 0).toString();
        var C = new Array();
        var l = new Array();
        for (const p of i.Zjn.$As) {
          var c = MathUtils_1.MathUtils.LongToNumber(p);
          var f = CharacterBuffController_1.default.GetBuffDefinition(c);
          C.push(f.Desc);
          l.push(c);
        }
        h[u + 247] = l.join("|");
        h[u + 248] = C.join("|");
        C.length = 0;
        l.length = 0;
        for (const D of i.JAs.$As) {
          var g = MathUtils_1.MathUtils.LongToNumber(D);
          var m = CharacterBuffController_1.default.GetBuffDefinition(g);
          C.push(m.Desc);
          l.push(g);
        }
        h[u + 249] = l.join("|");
        h[u + 250] = C.join("|");
        n = h.join(",");
        this.MGr.push(n);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Recorder", 20, "结算信息Attr", ["Result", n]);
        }
      }
    } else {
      s = a.GetComponent(1)?.Owner?.ActorLabel;
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Test", 20, "伤害配置为空", ["伤害ID", t], ["Name", s ?? ""]);
      }
    }
  }
  static BGr(t, r, a, i) {
    for (const n of t) {
      for (let t = 0, e = attributeIdArray.length; t < e; t++) {
        if (n.tSs === attributeIdArray[t]) {
          r[a + t] = (n.y6n > 0 ? n.y6n : n.eSs).toString();
          r[i + t] = n.eSs.toString();
          break;
        }
      }
    }
  }
  static wGr(t, r, a) {
    for (const i of t) {
      for (let t = 0, e = attributeIdArray.length; t < e; t++) {
        if (i.tSs === attributeIdArray[t]) {
          r[a + t] = (i.y6n > 0 ? i.y6n : i.eSs).toString();
          break;
        }
      }
    }
  }
  static CleanupRecord() {
    CharacterGasDebugComponent_1.Qyn = false;
    CharacterGasDebugComponent_1.sGr = 0;
    CharacterGasDebugComponent_1.eGr.length = 0;
    CharacterGasDebugComponent_1.vGr.length = 0;
    CharacterGasDebugComponent_1.yGr.clear();
    CharacterGasDebugComponent_1.IGr.clear();
    CharacterGasDebugComponent_1.TGr.clear();
    CharacterGasDebugComponent_1.zqr.clear();
    CharacterGasDebugComponent_1.Zqr.length = 0;
    CharacterGasDebugComponent_1.SGr.length = 0;
    CharacterGasDebugComponent_1.rGr?.clear();
    CharacterGasDebugComponent_1.EGr.length = 0;
    CharacterGasDebugComponent_1.MGr.length = 0;
  }
};
CharacterGasDebugComponent.mGr = false;
CharacterGasDebugComponent.$qr = false;
CharacterGasDebugComponent.dGr = 0;
CharacterGasDebugComponent.CGr = 0;
CharacterGasDebugComponent.eGr = new Array();
CharacterGasDebugComponent.vGr = new Array();
CharacterGasDebugComponent.yGr = new Map();
CharacterGasDebugComponent.IGr = new Map();
CharacterGasDebugComponent.TGr = new Map();
CharacterGasDebugComponent.zqr = new Map();
CharacterGasDebugComponent.Zqr = new Array();
CharacterGasDebugComponent.Pt = "Statistics/FightDataRecord/";
CharacterGasDebugComponent.SGr = new Array();
CharacterGasDebugComponent.rGr = undefined;
CharacterGasDebugComponent.nGr = (t, e) => t.TimeStamp - e.TimeStamp;
CharacterGasDebugComponent.xie = (t, e) => {
  CharacterGasDebugComponent_1.gGr(t.Id, true, false);
  if (e) {
    CharacterGasDebugComponent_1.gGr(e.Id, false, true);
  }
};
CharacterGasDebugComponent.EGr = new Array();
CharacterGasDebugComponent.MGr = new Array();
CharacterGasDebugComponent.Qyn = false;
CharacterGasDebugComponent.sGr = 0;
CharacterGasDebugComponent.Xyn = 0;
CharacterGasDebugComponent.fGr = t => {
  CharacterGasDebugComponent_1.Qyn = t;
};
__decorate([CombatMessage_1.CombatNet.Listen("s3n", true)], CharacterGasDebugComponent, "OnDamageRecordNotify", null);
CharacterGasDebugComponent = CharacterGasDebugComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(22)], CharacterGasDebugComponent);
exports.CharacterGasDebugComponent = CharacterGasDebugComponent; //# sourceMappingURL=CharacterGasDebugComponent.js.map