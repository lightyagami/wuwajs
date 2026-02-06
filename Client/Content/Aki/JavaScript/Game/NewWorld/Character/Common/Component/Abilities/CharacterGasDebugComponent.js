"use strict";

var CharacterGasDebugComponent_1;
var __decorate = this && this.__decorate || function (t, e, r, a) {
  var i;
  var o = arguments.length;
  var n = o < 3 ? e : a === null ? a = Object.getOwnPropertyDescriptor(e, r) : a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, r, a);
  } else {
    for (var s = t.length - 1; s >= 0; s--) {
      if (i = t[s]) {
        n = (o < 3 ? i(n) : o > 3 ? i(e, r, n) : i(e, r)) || n;
      }
    }
  }
  if (o > 3 && n) {
    Object.defineProperty(e, r, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterGasDebugComponent = exports.OperateRecordNode = undefined;
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
var ESkillNeedRecordName;
var EMovementModeName;
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
const Info_1 = require("../../../../../../Core/Common/Info");
const Json_1 = require("../../../../../../Core/Common/Json");
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
  t[t.跳跃 = 0] = "跳跃";
  t[t.攻击 = 1] = "攻击";
  t[t.闪避 = 2] = "闪避";
  t[t.技能1 = 3] = "技能1";
  t[t.幻象1 = 4] = "幻象1";
  t[t.大招 = 5] = "大招";
  t[t.幻象2 = 6] = "幻象2";
  t[t.切换角色1 = 7] = "切换角色1";
  t[t.切换角色2 = 8] = "切换角色2";
  t[t.切换角色3 = 9] = "切换角色3";
  t[t.锁定目标 = 10] = "锁定目标";
  t[t.向右移动 = 11] = "向右移动";
  t[t.向左移动 = 12] = "向左移动";
})(ESkillNeedRecordName = ESkillNeedRecordName || {});
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
class OperateRecordNode extends Json_1.JsonObjBase {
  constructor(t, e, r, a = false, i = "", o = 0, n = 0, s = 0, h = 0) {
    super();
    this.TimeLine = "";
    this.Actor = "";
    this.Action = "";
    this.Press = false;
    this.Key = "";
    this.TimeInterval = 0;
    this.PositionX = 0;
    this.PositionY = 0;
    this.PositionZ = 0;
    this.TimeLine = t;
    this.Actor = e;
    this.Action = r;
    this.Press = a;
    this.Key = i;
    this.TimeInterval = o;
    this.PositionX = n;
    this.PositionY = s;
    this.PositionZ = h;
  }
}
exports.OperateRecordNode = OperateRecordNode;
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
    for (let t = 0; t < 15; t++) {
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
    for (let t = 0; t < 15; t++) {
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
    for (let t = 0; t < 15; t++) {
      var r = this.RecordDamage.get(t);
      e.push(r ? r.toFixed() : "0");
    }
    return e;
  }
}
class DamageRecordDsp {
  constructor(t, e, r, a, i, o) {
    this.TimeStamp = t;
    this.DamageValue = e;
    this.QteBegin = r;
    this.InGame = a;
    this.OutGame = i;
    this.OutGameSkill = o;
  }
}
const attributeIdArray = [EAttributeId.Proto_Life, EAttributeId.l5n, EAttributeId.Proto_Atk, EAttributeId.Proto_Crit, EAttributeId.Proto_CritDamage, EAttributeId.Proto_Def, EAttributeId.Proto_EnergyEfficiency, EAttributeId.Proto_EnergyMax, EAttributeId.Proto_Energy, EAttributeId.Proto_AutoAttackSpeed, EAttributeId.Proto_CastAttackSpeed, EAttributeId.Proto_DamageChangeNormalSkill, EAttributeId.Proto_DamageChange, EAttributeId.Proto_DamageChangePhantom, EAttributeId.Proto_DamageChangeAuto, EAttributeId.Proto_DamageChangeCast, EAttributeId.Proto_DamageChangeUltra, EAttributeId.Proto_DamageChangeQte, EAttributeId.Proto_DamageChangePhys, EAttributeId.Proto_DamageChangeElement1, EAttributeId.Proto_DamageChangeElement2, EAttributeId.Proto_DamageChangeElement3, EAttributeId.Proto_DamageChangeElement4, EAttributeId.Proto_DamageChangeElement5, EAttributeId.Proto_DamageChangeElement6, EAttributeId.Proto_DamageResistancePhys, EAttributeId.Proto_DamageResistanceElement1, EAttributeId.Proto_DamageResistanceElement2, EAttributeId.Proto_DamageResistanceElement3, EAttributeId.Proto_DamageResistanceElement4, EAttributeId.Proto_DamageResistanceElement5, EAttributeId.Proto_DamageResistanceElement6, EAttributeId.Proto_HealChange, EAttributeId.Proto_HealedChange, EAttributeId.Proto_DamageReduce, EAttributeId.Proto_DamageReducePhys, EAttributeId.Proto_DamageReduceElement1, EAttributeId.Proto_DamageReduceElement2, EAttributeId.Proto_DamageReduceElement3, EAttributeId.Proto_DamageReduceElement4, EAttributeId.Proto_DamageReduceElement5, EAttributeId.Proto_DamageReduceElement6, EAttributeId.Proto_ToughMax, EAttributeId.Proto_Tough, EAttributeId.Proto_ToughRecover, EAttributeId.Proto_ToughChange, EAttributeId.Proto_ToughReduce, EAttributeId.Proto_RageMax, EAttributeId.Proto_Rage, EAttributeId.Proto_RageRecover, EAttributeId.Proto_RagePunishTime, EAttributeId.Proto_RageChange, EAttributeId.Proto_RageReduce, EAttributeId.Proto_HardnessMax, EAttributeId.Proto_Hardness, EAttributeId.Proto_HardnessRecover, EAttributeId.Proto_HardnessPunishTime, EAttributeId.Proto_HardnessChange, EAttributeId.Proto_HardnessReduce, EAttributeId.Proto_BreakWeaknessRatio, EAttributeId.Proto_WeaknessMastery];
let CharacterGasDebugComponent = CharacterGasDebugComponent_1 = class CharacterGasDebugComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.qqr = undefined;
    this.EnableCollisionDebugDraw = false;
    this.Gqr = 0;
    this.Nqr = undefined;
    this.iCd = new Array();
    this.kqr = t => {
      if (!t.includes("Tag")) {
        this.Gqr = this.Gqr + 1;
        this.iCd.unshift("Num " + this.Gqr + ": " + t);
        if (this.iCd.length > MAX_DEBUG_STRING_NUMS) {
          this.iCd.pop();
        }
      }
    };
    this.rCd = new Array();
    this.BCd = new Array();
    this.tif = new Array();
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
            var o = a.Valid ? a.GetRoleId() : 0;
            var o = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(o);
            if (!o) {
              return;
            }
            o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(o);
            o = o ? ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(o.Name) : "";
            r.push(o);
          } else if (i === Protocol_1.Aki.Protocol.kks.Proto_Monster) {
            r.push("怪物");
            r.push(a.GetPbDataId().toFixed());
            o = PublicUtil_1.PublicUtil.GetConfigTextByKey(a.GetEntityTidName() ?? "");
            r.push(o);
          } else {
            if (i !== Protocol_1.Aki.Protocol.kks.HI_) {
              return;
            }
            if (!CharacterGasDebugComponent_1.g_g(e)) {
              return;
            }
            o = PublicUtil_1.PublicUtil.GetConfigTextByKey(a.GetEntityTidName() ?? "");
            r.push("摩托车");
            r.push(a.GetPbDataId().toFixed());
            r.push(o);
          }
          r.push(t.BulletRowName);
          i = t.BulletDataMain;
          r.push(i?.BulletName ?? "0");
          r.push(t.CollisionInfo.DamageId.toString());
          a = t.BulletInitParams.SkillId;
          r.push(a ? a.toFixed() : "");
          o = e.GetComponent(42);
          i = a ? o.GetSkillInfo(a) : undefined;
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
      var o;
      if (CharacterGasDebugComponent_1.$qr && t?.Valid && this.Yqr(this.Entity)) {
        a = this.Entity;
        (i = new Array()).push(CharacterGasDebugComponent_1.SecondsSinceStartup());
        i.push(CharacterGasDebugComponent_1.Jqr(Date.now()));
        if (a?.GetComponent(103)) {
          i.push("角色");
        } else {
          i.push("怪物");
        }
        o = a?.CheckGetComponent(0).GetPbDataId();
        i.push(o.toFixed(0));
        o = a?.GetComponent(3).Actor.GetName();
        i.push(o);
        i.push(e.toString());
        i.push(ESkillGenreName[r]);
        o = a.GetComponent(184);
        i.push(o.GetCurrentValue(EAttributeId.Proto_Atk).toFixed());
        i.push(o.GetCurrentValue(EAttributeId.Proto_Crit).toFixed());
        i.push(o.GetCurrentValue(EAttributeId.Proto_CritDamage).toFixed());
        i.push(o.GetCurrentValue(EAttributeId.Proto_Life).toFixed());
        i.push(o.GetCurrentValue(EAttributeId.Proto_Def).toFixed());
        i.push(o.GetCurrentValue(EAttributeId.Proto_DamageChange).toFixed());
        CharacterGasDebugComponent_1.eGr.push(i.join(","));
        CharacterGasDebugComponent_1.tGr(a, t.Entity, r);
      }
    };
    this.RecordInpuuAction = (e, r, a) => {
      if (CharacterGasDebugComponent_1.$qr && ESkillNeedRecordName[e] !== undefined && this.Yqr(this.Entity) && this.Entity?.GetComponent(3).Active) {
        var i = this.Entity;
        if (i?.GetComponent(103)) {
          var o = CharacterGasDebugComponent_1.LGr(i)?.Name ?? "unknown";
          var i = i.GetComponent(1);
          let t = new UE.Vector(0, 0, 0);
          if (i) {
            i = i?.ActorLocationProxy;
            t = new UE.Vector(i.X, i.Y, i.Z);
          }
          if (r) {
            CharacterGasDebugComponent_1.KQu.set(e, new OperateRecordNode(CharacterGasDebugComponent_1.SecondsSinceStartupFix(), o, e, r, a.KeyName.toString(), t.X, t.Y, t.Z));
          } else if (i = CharacterGasDebugComponent_1.KQu.get(e)) {
            i.TimeInterval = Number(CharacterGasDebugComponent_1.SecondsSinceStartupFix()) - Number(i.TimeLine);
            CharacterGasDebugComponent_1.V9u.push(new OperateRecordNode(i.TimeLine, i.Actor, i.Action, i.Press, i.Key, Number(i.TimeInterval.toFixed(2)), t.X, t.Y, t.Z));
            CharacterGasDebugComponent_1.KQu.delete(e);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Test", 89, "操作记录错误,只有抬起没有按下");
          }
        }
      }
    };
    this.ServerDebugInfo = undefined;
    this.ServerDebugInfoDirty = false;
    this.Zi1 = new Set();
    this.er1 = new Map();
    this.tr1 = 0;
    this.oGr = (t, e) => {
      var e = this.Entity.GetComponent(42)?.GetSkillInfo(e);
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
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharInputAction, this.RecordInpuuAction);
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
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharInputAction, this.RecordInpuuAction);
    return true;
  }
  hGr() {
    if (this.qqr) {
      this.Nqr = UE.AsyncTaskEffectDebugString.ListenForGameplayEffectExecutedDebugString(this.qqr);
      this.Nqr?.OnAnyGameplayEffectExecuted.Add(this.kqr);
    }
  }
  GetGeDebugStrings() {
    return this.iCd.join(" ");
  }
  GetTagDebugStrings() {
    return this.Entity.GetComponent(217)?.TagContainer.GetDebugString() ?? "找不到tag组件";
  }
  AddSkillLogString(t, ...e) {
    if (this.rCd.length >= MAX_DEBUG_STRING_NUMS) {
      this.rCd.shift();
    }
    let r = "#";
    r += t;
    if (e.length > 0) {
      r += " ";
      for (const a of e) {
        r += `[${a[0]}: ${a[1]}]`;
      }
    }
    if (r.includes("BeginSkill")) {
      r = "\n" + r;
    }
    this.rCd.push(r);
  }
  GetSkillLogString(t) {
    var e = [...t.matchAll(/[0-9]+/g)].map(t => t[0] ?? "");
    var r = [];
    for (const a of this.rCd) {
      if (!(e.length > 0) || !!e.some(t => a.includes(t))) {
        r.push(a);
      }
    }
    return r.join("\n");
  }
  ClearSkillLogString() {
    this.rCd.length = 0;
  }
  AddSkillBehaviorLogString(t, ...e) {
    if (this.BCd.length >= MAX_DEBUG_STRING_NUMS) {
      this.BCd.shift();
    }
    let r = "#";
    r += t;
    if (e.length > 0) {
      r += " ";
      for (const a of e) {
        r += `[${a[0]}: ${a[1]}]`;
      }
    }
    this.BCd.push(r);
  }
  GetSkillBehaviorLogString(t) {
    var e = [...t.matchAll(/[0-9]+/g)].map(t => t[0] ?? "");
    var r = [];
    for (const a of this.BCd) {
      if (!(e.length > 0) || !!e.some(t => a.includes(t))) {
        r.push(a);
      }
    }
    return r.join("\n");
  }
  ClearSkillBehaviorLogString() {
    this.BCd.length = 0;
  }
  AddBulletDebugLogString(t, ...e) {
    if (this.tif.length >= MAX_DEBUG_STRING_NUMS) {
      this.tif.shift();
    }
    let r = "#";
    r += t;
    if (e.length > 0) {
      r += " ";
      for (const a of e) {
        r += `[${a[0]}: ${a[1]}]`;
      }
    }
    this.tif.push(r);
  }
  GetBulletLogString(t) {
    var e = [...t.matchAll(/[0-9]+/g)].map(t => t[0] ?? "");
    var r = [];
    for (const a of this.tif) {
      if (!(e.length > 0) || !!e.some(t => a.includes(t))) {
        r.push(a);
      }
    }
    return r.join("\n");
  }
  ClearBulletLogString() {
    this.tif.length = 0;
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
    for (const r of this.Entity.GetComponent(185).BuffEffectManager.GetAllEffects()) {
      if (this.cGr(t, String(r.BuffId))) {
        e += `${r.constructor.name} buffId:${r.BuffId} handle:${r.ActiveHandleId}\n`;
      }
    }
    return e;
  }
  GetShieldDebugString(t = "") {
    this.Fqr.length = 0;
    var e;
    var r;
    var a;
    var i = [...t.matchAll(/[0-9]+/g)].map(t => t[0] ?? "");
    var t = this.Entity.GetComponent(80);
    if (t) {
      for (const [, o] of t.GetDebugShieldInfo()) {
        if (!(i.length > 0) || !!i.some(t => String(o.TemplateId).startsWith(t))) {
          e = o.ShieldValue;
          r = o.Priority;
          a = o.TemplateId;
          this.Fqr.push(`Shield magnitude: ${e} priority: ${r} templateId: ${a}`);
        }
      }
    }
    t = this.Entity.GetComponent(184)?.GetLockDebugString(i) ?? "";
    return "\n\nShields:\n" + this.Fqr.join("\n") + t;
  }
  GetAttributeDebugStrings() {
    var e = this.Entity.GetComponent(184);
    if (!e) {
      return "Invalid";
    }
    let r = "";
    for (let t = 1; t < CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX; t++) {
      var a = e.GetBaseValue(t);
      var i = e.GetCurrentValue(t);
      var o = Protocol_1.Aki.Protocol.Vks[t];
      if (CharacterAttributeTypes_1.stateAttributeIds.has(t) || i === a) {
        r += `#${t} ${o}	= ${i.toFixed(0)}
`;
      } else {
        r += a < i ? `#${t} ${o}	= ${i.toFixed(0)}(+${(i - a).toFixed(0)})
` : `#${t} ${o}	= ${i.toFixed(0)}(${(i - a).toFixed(0)})
`;
      }
    }
    return r += "\n队伍属性：\n" + CharacterGasDebugComponent_1.GetFormationAttributeDebugStrings();
  }
  GetAllAttributeDebugStrings() {
    this.Vqr.length = 0;
    var e = this.Entity.GetComponent(184);
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
    for (const o of FormationPropertyAll_1.configFormationPropertyAll.GetConfigList()) {
      var e = o.Id;
      var r = FormationAttributeController_1.FormationAttributeController.GetValue(e);
      var a = FormationAttributeController_1.FormationAttributeController.GetMax(e);
      var i = FormationAttributeController_1.FormationAttributeController.GetSpeed(e);
      t += `#${e} = ${r?.toFixed(0)}/${a?.toFixed(0)} (${i?.toFixed(0)}/s)
`;
    }
    return t;
  }
  GetAllAttributeDebugInfo() {
    var a = this.Entity.GetComponent(184);
    if (!a) {
      return "Invalid";
    }
    let i = "";
    const o = this.ServerDebugInfo?.GSs;
    var n = new Array(CharacterAttributeTypes_1.ATTRIBUTE_ID_MAX);
    if (o) {
      for (const p of o) {
        n[p.tSs] = p;
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
      const o = n[r];
      var C = o?.y6n.toFixed(0) ?? "0";
      let e = o ? (o.y6n - o.eSs).toFixed(0) : "0";
      if (o && o.y6n > o.eSs) {
        e = "+" + e;
      }
      e = o?.y6n === o?.eSs ? "" : `(${e})`;
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
      var c = FormationAttributeController_1.FormationAttributeController.GetValue(r);
      var l = FormationAttributeController_1.FormationAttributeController.GetMax(r);
      var g = FormationAttributeController_1.FormationAttributeController.GetSpeed(r);
      const o = e[r];
      var f = o?.y6n.toFixed(0) ?? "???";
      var m = o?.I6n.toFixed(0) ?? "???";
      var b = o?.L6n.toFixed(0) ?? "???";
      i += `#${r}	 C:${c?.toFixed(0)}/${l?.toFixed(0)} (${g?.toFixed(0)}/s) | S:${f}/${m} (${b}/s)
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
      this.Entity.GetComponent(184).SetBaseValue(t, e);
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
    Net_1.Net.Call(18647, e, t => {
      this.ReceiveSwitchServerLogMode(t.Jjn);
    });
  }
  static SecondsSinceStartup() {
    return (Time_1.Time.WorldTimeSeconds - CharacterGasDebugComponent_1.dGr - CharacterGasDebugComponent_1.sGr).toFixed(2);
  }
  static SecondsSinceStartupFix() {
    return (Time_1.Time.WorldTimeSeconds - CharacterGasDebugComponent_1.dGr).toFixed(2);
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
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTimeStopRequest, this.oVd);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.EnableActionRecord, true);
  }
  static EndRecord() {
    var t;
    if (this.$qr) {
      this.$qr = false;
      this.SetDamageRecord(false);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTimeStopRequest, this.oVd);
      t = this.pGr();
      this.CleanupRecord();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.EnableActionRecord, false);
      return t;
    } else {
      return "";
    }
  }
  static pGr() {
    var t = new Array();
    var e = "";
    UE.KuroStaticLibrary.SaveStringToFile("X秒,当前时间,对象,对象ID,对象名称,技能ID,技能类型,攻击,暴击,爆伤,生命,防御,伤害加成\n" + this.eGr.join("\n"), UE.BlueprintPathsLibrary.ProjectSavedDir() + this.Pt + "SkillRecord.csv", true);
    var r = Json_1.Json.Encode(this.V9u);
    var a = Time_1.Time.SystemNow;
    UE.KuroStaticLibrary.SaveStringToFile(r, UE.BlueprintPathsLibrary.ProjectSavedDir() + this.XQu + "OperateRecord" + a.toString() + ".json", true);
    var i = new Array();
    var r = "X秒,当前时间,对象,对象ID,对象名称,子弹ID,子弹名称,伤害ID,技能ID,技能类型,子弹是否命中\n";
    for (const n of this.Zqr) {
      var o = this.zqr.get(n);
      o.push(ModelManager_1.ModelManager.BulletModel.IsBulletHit(n) ? "1" : "0");
      i.push(o.join(","));
    }
    UE.KuroStaticLibrary.SaveStringToFile(r + i.join("\n"), UE.BlueprintPathsLibrary.ProjectSavedDir() + this.Pt + "BulletRecord.csv", true);
    r = "X秒,当前时间,对象,对象ID,对象名称,伤害来源,结算ID,子弹名称,伤害值,技能ID,技能名称,唯一ID,Config ID,攻击,暴击,爆伤,生命,防御,伤害加成\n";
    UE.KuroStaticLibrary.SaveStringToFile(r + this.vGr.join("\n"), UE.BlueprintPathsLibrary.ProjectSavedDir() + this.Pt + "DamageRecord.csv", true);
    r = "X秒,当前时间,对象,对象ID,对象名称,伤害来源,结算ID,子弹名称,伤害值,技能ID,技能名称,是否暴击,唯一ID,协奏能量,基础攻击,倍率系数,当前生效增伤,伤害总深,伤害加深,受击者集协buff层数,集协乘区伤害提升,防御承伤系数,抗性承伤系数,实际生效防御值,共鸣能量变动,实时暴击率,是否弱点伤害类型,弱点伤害增幅系数,怪物类型系数,受击方通用伤害减免,受击方属性伤害减免,偏谐值,实时当前生命值,实时生命值上限,实时攻击,暴击,实时暴击伤害,实时防御,实时共鸣效率,实时共鸣能量上限,实时共鸣能量,实时普攻速度,实时重击速度,实时共鸣技能伤害加成,实时通用伤害加成,实时声骸技能伤害加成,实时普攻伤害加成,实时蓄力攻击伤害加成,实时共鸣解放伤害加成,实时连携技能伤害加成,实时物理伤害加成,实时冷凝伤害加成,实时热熔伤害加成,实时导电伤害加成,实时气动伤害加成,实时衍射伤害加成,实时解离伤害加成,实时物理伤害抗性,实时冷凝伤害抗性,实时热熔伤害抗性,实时导电伤害抗性,实时气动伤害抗性,实时衍射伤害抗性,实时解离伤害抗性,实时治疗效果加成,实时受治疗效果加成,实时通用受伤减免,实时物理伤害减免,实时冷凝伤害减免,实时热熔伤害减免,实时导电伤害减免,实时气动伤害减免,实时衍射伤害减免,实时解离伤害减免,实时韧性上限,实时韧性,实时韧性恢复速度,实时削韧倍率,实时被削韧倍率,实时狂暴上限,实时狂暴,实时狂暴恢复,实时空狂暴惩罚时间,实时破狂暴倍率,实时被破狂暴倍率,实时共振度上限,实时共振度上限,实时共振度恢复速度,实时空共振度惩罚时间,实时破共振度倍率,实时被破共振度倍率,实时弱点击破速率,实时弱点增幅,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,弱点击破速率,弱点增幅,被击者实时当前生命值,被击者实时生命值上限,被击者实时攻击,被击者实时暴击,被击者实时暴击伤害,被击者实时防御,被击者实时共鸣效率,被击者实时共鸣能量上限,被击者实时共鸣能量,被击者实时普攻速度,被击者实时重击速度,被击者实时共鸣技能伤害加成,被击者实时通用伤害加成,被击者实时声骸技能伤害加成,被击者实时普攻伤害加成,被击者实时蓄力攻击伤害加成,被击者实时共鸣解放伤害加成,被击者实时连携技能伤害加成,被击者实时物理伤害加成,被击者实时冷凝伤害加成,被击者实时热熔伤害加成,被击者实时导电伤害加成,被击者实时气动伤害加成,被击者实时衍射伤害加成,被击者实时解离伤害加成,被击者实时物理伤害抗性,被击者实时冷凝伤害抗性,被击者实时热熔伤害抗性,被击者实时导电伤害抗性,被击者实时气动伤害抗性,被击者实时衍射伤害抗性,被击者实时解离伤害抗性,被击者实时治疗效果加成,被击者实时受治疗效果加成,被击者实时通用受伤减免,被击者实时物理伤害减免,被击者实时冷凝伤害减免,被击者实时热熔伤害减免,被击者实时导电伤害减免,被击者实时气动伤害减免,被击者实时衍射伤害减免,被击者实时解离伤害减免,被击者实时韧性上限,被击者实时韧性,被击者实时韧性恢复速度,被击者实时削韧倍率,被击者实时被削韧倍率,被击者实时狂暴上限,被击者实时狂暴,被击者实时狂暴恢复,被击者实时空狂暴惩罚时间,被击者实时破狂暴倍率,被击者实时被破狂暴倍率,被击者实时共振度上限,被击者实时共振度上限,被击者实时共振度恢复速度,被击者实时空共振度惩罚时间,被击者实时破共振度倍率,被击者实时被破共振度倍率,被击者实时弱点击破速率,被击者实时弱点增幅,被击者当前生命值,被击者生命值上限,被击者攻击,被击者暴击,被击者暴击伤害,被击者防御,被击者共鸣效率,被击者共鸣能量上限,被击者共鸣能量,被击者普攻速度,被击者重击速度,被击者共鸣技能伤害加成,被击者通用伤害加成,被击者声骸技能伤害加成,被击者普攻伤害加成,被击者蓄力攻击伤害加成,被击者共鸣解放伤害加成,被击者连携技能伤害加成,被击者物理伤害加成,被击者冷凝伤害加成,被击者热熔伤害加成,被击者导电伤害加成,被击者气动伤害加成,被击者衍射伤害加成,被击者解离伤害加成,被击者物理伤害抗性,被击者冷凝伤害抗性,被击者热熔伤害抗性,被击者导电伤害抗性,被击者气动伤害抗性,被击者衍射伤害抗性,被击者解离伤害抗性,被击者治疗效果加成,被击者受治疗效果加成,被击者通用受伤减免,被击者物理伤害减免,被击者冷凝伤害减免,被击者热熔伤害减免,被击者导电伤害减免,被击者气动伤害减免,被击者衍射伤害减免,被击者解离伤害减免,被击者韧性上限,被击者韧性,被击者韧性恢复速度,被击者削韧倍率,被击者被削韧倍率,被击者狂暴上限,被击者狂暴,被击者狂暴恢复,被击者空狂暴惩罚时间,被击者破狂暴倍率,被击者被破狂暴倍率,被击者共振度上限,被击者共振度上限,被击者共振度恢复速度,被击者空共振度惩罚时间,被击者破共振度倍率,被击者被破共振度倍率,被击者弱点击破速率,被击者弱点增幅,结算表HardnessLv,结算表Percent0,结算表Percent1,结算表ToughLv,结算表Energy,结算表ElementPowerType,结算表ElementPower,攻击者BuffID,攻击者Buff名称,受击者存在的BuffID,受击者存在的Buff名称\n";
    UE.KuroStaticLibrary.SaveStringToFile(r + this.MGr.join("\n"), UE.BlueprintPathsLibrary.ProjectSavedDir() + this.Pt + "DamageRecord_Attr.csv", true);
    r = "X秒,当前时间,对象,对象ID,对象名称,伤害来源,结算ID,子弹名称,伤害值,技能ID,技能名称,唯一ID,是否暴击,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,弱点击破速率,弱点增幅,当前生命值,生命值上限,攻击,暴击,暴击伤害,防御,共鸣效率,共鸣能量上限,共鸣能量,普攻速度,重击速度,共鸣技能伤害加成,通用伤害加成,声骸技能伤害加成,普攻伤害加成,蓄力攻击伤害加成,共鸣解放伤害加成,连携技能伤害加成,物理伤害加成,冷凝伤害加成,热熔伤害加成,导电伤害加成,气动伤害加成,衍射伤害加成,解离伤害加成,物理伤害抗性,冷凝伤害抗性,热熔伤害抗性,导电伤害抗性,气动伤害抗性,衍射伤害抗性,解离伤害抗性,治疗效果加成,受治疗效果加成,通用受伤减免,物理伤害减免,冷凝伤害减免,热熔伤害减免,导电伤害减免,气动伤害减免,衍射伤害减免,解离伤害减免,韧性上限,韧性,韧性恢复速度,削韧倍率,被削韧倍率,狂暴上限,狂暴,狂暴恢复,空狂暴惩罚时间,破狂暴倍率,被破狂暴倍率,共振度上限,共振度上限,共振度恢复速度,空共振度惩罚时间,破共振度倍率,被破共振度倍率,弱点击破速率,弱点增幅,削刃,大招能量,元素能量类型,元素能量,存在的BuffID,存在的Buff名称,存在的BuffID,存在的Buff名称\n";
    UE.KuroStaticLibrary.SaveStringToFile(r + this.EGr.join("\n"), UE.BlueprintPathsLibrary.ProjectSavedDir() + this.Pt + "DamageRecord_Snipeshot.csv", true);
    a = "X秒,当前时间,对象,对象ID,对象名称,BuffId,Buff名称,添加or删除\n" + this.SGr.join("\n");
    UE.KuroStaticLibrary.SaveStringToFile(a, UE.BlueprintPathsLibrary.ProjectSavedDir() + this.Pt + "BuffRecord.csv", true);
    for (const s of this.yGr.values()) {
      t.push(s.ToCsv().join(","));
    }
    a = "对象ID,对象名称,唯一Id,普攻,蓄力,E技能,大招,QTE,极限闪避反击,地面闪避,极限闪避,被动技能,战斗幻想技,探索幻象技,空中闪避\n" + t.join("\n");
    UE.KuroStaticLibrary.SaveStringToFile(a, UE.BlueprintPathsLibrary.ProjectSavedDir() + this.Pt + "MoveSum.csv", true);
    t.length = 0;
    e += a + "\n";
    r = "角色ID,角色名称,受伤来源ConfigId,受伤来源名称,受伤来源唯一ID,总伤害,普攻,蓄力,E技能,大招,QTE,极限闪避反击,地面闪避,极限闪避,被动技能,战斗幻想技,探索幻象技,空中闪避\n";
    for (const h of this.IGr.values()) {
      t.push(h.ToCsvForRole().join(","));
    }
    a = r + t.join("\n");
    UE.KuroStaticLibrary.SaveStringToFile(a, UE.BlueprintPathsLibrary.ProjectSavedDir() + this.Pt + "RoleDamageSum.csv", true);
    t.length = 0;
    e += a + "\n";
    r = "怪物ConfigID,怪物名称,怪物唯一Id,攻击者ConfigId,攻击者名称,总伤害,普攻,蓄力,E技能,大招,QTE,极限闪避反击,地面闪避,极限闪避,被动技能,战斗幻想技,探索幻象技,空中闪避\n";
    for (const u of this.TGr.values()) {
      t.push(u.ToCsvForMonster().join(","));
    }
    a = r + t.join("\n");
    UE.KuroStaticLibrary.SaveStringToFile(a, UE.BlueprintPathsLibrary.ProjectSavedDir() + this.Pt + "MonsterDamageSum.csv", true);
    t.length = 0;
    e += a + "\n";
    CharacterGasDebugComponent_1._Wd();
    return e;
  }
  static _Wd() {
    if (Info_1.Info.IsPlayInEditor) {
      let t = "";
      var a = Time_1.Time.WorldTimeSeconds - CharacterGasDebugComponent_1.dGr - CharacterGasDebugComponent_1.sGr;
      let r = 0;
      while (a >= r) {
        t += ",'" + r.toString() + "s'";
        r += 0.5;
      }
      let e = "";
      var i = (0, puerts_1.$ref)(e);
      UE.FileSystemOperation.ReadFile(UE.KismetSystemLibrary.GetProjectDirectory() + "../Config/ResConfig/RoleDspTpl.txt", i);
      e = (e = (0, puerts_1.$unref)(i)).replace("TPL_XAXIS_VALUES", t);
      var o = new StringBuilder_1.StringBuilder();
      var n = new Map();
      var s = new Map();
      var h = new Map();
      var u = new Map();
      var _ = new Map();
      var C = new Map();
      var c = new Map();
      var l = new Map();
      var g = new Map();
      for (r = 0; a >= r;) {
        for (var [f, m] of CharacterGasDebugComponent_1.rGr) {
          if (!u.has(f)) {
            u.set(f, new Array());
          }
          if (!_.has(f)) {
            _.set(f, new Array());
          }
          if (!C.has(f)) {
            C.set(f, new Array());
          }
          if (!c.has(f)) {
            c.set(f, new Array());
          }
          if (!l.has(f)) {
            l.set(f, new Array());
          }
          if (!g.has(f)) {
            g.set(f, new Array());
          }
          if (!n.has(f)) {
            n.set(f, 0);
          }
          if (!s.has(f)) {
            s.set(f, 0);
          }
          if (!h.has(f)) {
            h.set(f, false);
          }
          let t = false;
          let e = false;
          while (!m.Empty) {
            var b = m.Top;
            if (!(b.TimeStamp <= this.dGr + r)) {
              break;
            }
            if (b.DamageValue > 0) {
              n.set(f, n.get(f) + b.DamageValue);
            } else if (b.InGame) {
              h.set(f, true);
            } else if (b.OutGame) {
              h.set(f, false);
            } else if (b.QteBegin) {
              t = true;
            } else if (b?.OutGameSkill) {
              e = true;
            }
            m.Pop();
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Character", 20, "打印时间", ["time", b.TimeStamp]);
            }
          }
          u.get(f).push(n.get(f));
          _.get(f).push(h.get(f) ? "-10" : "'-'");
          C.get(f).push(t ? "-20" : "'-'");
          c.get(f).push(e ? "-30" : "'-'");
          var p = s.get(f);
          g.get(f).push(p > 0 ? n.get(f) / p : 0);
          l.get(f).push(r > 0 ? n.get(f) / r : 0);
          if (h.get(f)) {
            s.set(f, s.get(f) + 0.5);
          }
        }
        r += 0.5;
      }
      var D;
      var d;
      var E;
      var v;
      var A;
      var G;
      var S;
      var y;
      var I;
      var M;
      var U;
      var w;
      var T;
      var R;
      var B;
      var N;
      var O;
      var P = [];
      var $ = [];
      var L = [];
      for ([D, d] of u) {
        var q = EntitySystem_1.EntitySystem.Get(D);
        if (q?.Valid) {
          P.push(D);
          q = (q = q.GetComponent(0)).Valid ? q.GetRoleId() : 0;
          if (q = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(q)) {
            q = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(q);
            q = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(q.Name);
            $.push(q);
            o.Append(StringUtils_1.StringUtils.Format("{name: '{0}伤害', type: 'line', data: [{1}],},", q, d.join(",")));
          } else {
            L.push(D);
          }
        } else {
          L.push(D);
        }
      }
      for ([E, v] of l) {
        if (!L.includes(E)) {
          A = P.indexOf(E);
          o.Append(StringUtils_1.StringUtils.Format("{name: '{0}绝对DPS', type: 'line', data: [{1}],},", $[A], v.join(",")));
        }
      }
      for ([G, S] of g) {
        if (!L.includes(G)) {
          y = P.indexOf(G);
          o.Append(StringUtils_1.StringUtils.Format("{name: '{0}站场DPS', type: 'line', data: [{1}],},", $[y], S.join(",")));
        }
      }
      for ([I, M] of _) {
        if (!L.includes(I)) {
          U = P.indexOf(I);
          o.Append(StringUtils_1.StringUtils.Format("{name: '{0}在场上', type: 'line', data: [{1}],},", $[U], M.join(",")));
        }
      }
      for ([w, T] of C) {
        if (!L.includes(w)) {
          R = P.indexOf(w);
          o.Append(StringUtils_1.StringUtils.Format("{name: '{0}QTE', type: 'line', data: [{1}],},", $[R], T.join(",")));
        }
      }
      for ([B, N] of c) {
        if (!L.includes(B)) {
          O = P.indexOf(B);
          o.Append(StringUtils_1.StringUtils.Format("{name: '{0}退场技', type: 'line', data: [{1}],},", $[O], N.join(",")));
        }
      }
      e = e.replace("CONTENT_SERIES", o.ToString());
      UE.KuroStaticLibrary.SaveStringToFile(e, UE.BlueprintPathsLibrary.ProjectSavedDir() + this.Pt + "RoleDsp.html", true);
    }
  }
  Yqr(t) {
    return CharacterStatisticsComponent_1.CharacterStatisticsComponent.IsInRecordArea(t);
  }
  static RecordDamage(a, i, o, n) {
    var s = new Array();
    s.push(o);
    s.push(n);
    var o = CharacterGasDebugComponent_1.LGr(a);
    if (o) {
      s.push(o.Type);
      s.push(o.ConfigId);
      s.push(o.Name);
      if (a.GetComponent(103)) {
        s.push("角色");
      } else if (a.GetComponent(0)?.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_SceneEntity) {
        s.push("场景伤害");
      } else {
        s.push("怪物");
      }
      s.push(CharacterGasDebugComponent_1.Oom(i.KAs));
      let t = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(a, MathUtils_1.MathUtils.LongToBigInt(i.Mjn).toString(), false);
      let e = undefined;
      if (!t) {
        n = ControllerHolder_1.ControllerHolder.WorldController.GetCustomEntityId(a.Id, 1);
        if ((e = EntitySystem_1.EntitySystem.Get(n))?.Valid) {
          t = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(e, MathUtils_1.MathUtils.LongToBigInt(i.Mjn).toString());
        }
      }
      o = MathUtils_1.MathUtils.LongToNumber(i.r5n);
      s.push(t?.BulletName ?? "");
      s.push(i.QAs.toFixed());
      s.push(o.toFixed());
      let r = a.GetComponent(42)?.GetSkillInfo(o);
      r = r || e?.GetComponent(42)?.GetSkillInfo(o);
      s.push(r?.SkillName?.toString());
      s.push(MathUtils_1.MathUtils.LongToBigInt(i.Zjn.F4n).toString());
      var n = a?.CheckGetComponent(0).GetPbDataId().toFixed();
      s.push(n);
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
      o = ModelManager_1.ModelManager.CreatureModel.GetEntityId(MathUtils_1.MathUtils.LongToNumber(i.JAs.F4n));
      n = EntitySystem_1.EntitySystem.Get(o);
      CharacterGasDebugComponent_1.DGr(n, a, i.QAs, r?.SkillGenre);
    }
  }
  static DGr(t, e, r, a) {
    let i = this.IGr;
    if (!t?.GetComponent(103)) {
      i = this.TGr;
    }
    var o;
    var n = t.Id.toFixed() + e.Id.toFixed();
    var s = i.get(n);
    if (s) {
      s.TotalDamage += r;
      o = s.RecordDamage.get(a) ?? 0;
      s.RecordDamage.set(a, o + r);
    } else {
      s = new RecordDamageSum();
      o = t?.CheckGetComponent(0).GetPbDataId();
      s.ConfigId = o ?? 0;
      s.UniqueId = t.Id;
      s.Name = t?.GetComponent(1)?.Owner?.GetName() ?? "";
      o = e?.CheckGetComponent(0).GetPbDataId();
      s.DamageSourceConfigId = o;
      s.SourceName = e?.GetComponent(1)?.Owner?.GetName() ?? "";
      s.SourceUniqueId = e?.Id;
      s.TotalDamage = r;
      t = s.RecordDamage.get(a) ?? 0;
      s.RecordDamage.set(a, t + r);
      i.set(n, s);
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
      for (const o of this.ServerDebugInfo.xAs.EIs) {
        if (!(o.GTs.length <= 0)) {
          t += "[" + MathUtils_1.MathUtils.LongToBigInt(o.b6n).toString() + "] ";
          for (const n of o.GTs) {
            t += n.toFixed() + ", ";
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
  RGr(t, e, r, a, i, o, n, s, h) {
    return "[" + t + ", " + e + "] " + a + "层," + i + "级," + (o ? "激活. " : "失效. ") + "施:" + n + ". 时:" + s.toFixed(1) + "/" + h.toFixed() + ". " + r + "\n";
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
    this.Entity.GetComponent(222)?.GetAllBuffs()?.forEach(t => e.add(t.Handle));
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
    Net_1.Net.Call(17817, t, t => {
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
    const e = t.GetComponent(0);
    var r;
    var a = e.GetEntityType();
    if (a === Protocol_1.Aki.Protocol.kks.Proto_Player) {
      r = e.Valid ? e.GetRoleId() : 0;
      if (r = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(r)) {
        r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(r);
        return {
          Name: ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(r.Name),
          Type: "角色",
          ConfigId: e.GetPbDataId().toFixed()
        };
      } else {
        return undefined;
      }
    }
    if (a === Protocol_1.Aki.Protocol.kks.Proto_Monster) {
      return {
        Name: PublicUtil_1.PublicUtil.GetConfigTextByKey(e.GetEntityTidName() ?? ""),
        Type: "怪物",
        ConfigId: e.GetPbDataId().toFixed()
      };
    }
    if (a === Protocol_1.Aki.Protocol.kks.Proto_SceneEntity) {
      return {
        Name: PublicUtil_1.PublicUtil.GetConfigTextByKey(e.GetEntityTidName() ?? ""),
        Type: "场景实体",
        ConfigId: e.GetPbDataId().toFixed()
      };
    }
    if (a === Protocol_1.Aki.Protocol.kks.HI_ && CharacterGasDebugComponent_1.g_g(t)) {
      const e = t.GetComponent(0);
      if (e) {
        return {
          Name: PublicUtil_1.PublicUtil.GetConfigTextByKey(e.GetEntityTidName() ?? ""),
          Type: "摩托车",
          ConfigId: e.GetPbDataId().toFixed()
        };
      }
    }
  }
  static SetDamageRecord(t) {
    var e = Protocol_1.Aki.Protocol.Debug.GZn.create();
    e.tWn = t;
    Net_1.Net.Call(17258, e, t => {
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
    if (i.GetComponent(0)?.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_SceneEntity || i.GetComponent(0)?.GetEntityType() === Protocol_1.Aki.Protocol.kks.HI_ && CharacterGasDebugComponent_1.g_g(i) || i.GetComponent(27)?.GetStatisticsEnable()) {
      t = ((MathUtils_1.MathUtils.LongToNumber(r.WAs) - CharacterGasDebugComponent_1.CGr) * 0.001 - CharacterGasDebugComponent_1.sGr).toFixed(2);
      a = this.Jqr(r.WAs);
      this.RecordDamage(i, r, t, a);
      this.AGr(i, r, t, a);
      this.PGr(i, r, t, a);
      this.xGr(i, r);
    }
  }
  static g_g(t) {
    return !!t.GetComponent(268);
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
  static PGr(a, i, o, n) {
    var t = MathUtils_1.MathUtils.LongToNumber(i.KAs);
    var s = ModelManager_1.ModelManager.DamageModel?.GetDamageConfigById(t);
    if (s) {
      var h = new Array();
      h.push(o);
      h.push(n);
      var o = CharacterGasDebugComponent_1.LGr(a);
      if (o) {
        h.push(o.Type);
        h.push(o.ConfigId);
        h.push(o.Name);
        h.push(i.XAs === Protocol_1.Aki.Protocol.XAs.Proto_FromBullet ? "子弹" : "Buff");
        h.push(CharacterGasDebugComponent_1.Oom(i.KAs));
        let t = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(a, MathUtils_1.MathUtils.LongToBigInt(i.Mjn).toString(), false);
        let e = undefined;
        if (!t) {
          n = ControllerHolder_1.ControllerHolder.WorldController.GetCustomEntityId(a.Id, 1);
          if ((e = EntitySystem_1.EntitySystem.Get(n))?.Valid) {
            t = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(e, MathUtils_1.MathUtils.LongToBigInt(i.Mjn).toString());
          }
        }
        h.push(t?.BulletName ?? "");
        h.push(i.QAs.toFixed());
        o = MathUtils_1.MathUtils.LongToNumber(i.r5n);
        h.push(o.toFixed());
        let r = a.GetComponent(42)?.GetSkillInfo(o)?.SkillName;
        r = r || e?.GetComponent(42)?.GetSkillInfo(o)?.SkillName;
        h.push(r?.toString() ?? "");
        h.push(MathUtils_1.MathUtils.LongToBigInt(i.Zjn.F4n).toString());
        h.push(i.YAs ? "1" : "0");
        var n = h.length;
        var o = attributeIdArray.length;
        this.wGr(i.JAs.jAs, h, n);
        this.wGr(i.Zjn.jAs, h, n + o);
        var u = i.Wjn;
        h[n + o * 2] = AbilityUtils_1.AbilityUtils.GetLevelValue(s.ToughLv, u, 0).toString();
        h[n + o * 2 + 1] = AbilityUtils_1.AbilityUtils.GetLevelValue(s.Energy, u, 0).toString();
        h[n + o * 2 + 2] = s.ElementPowerType.toString();
        h[n + o * 2 + 3] = AbilityUtils_1.AbilityUtils.GetLevelValue(s.ElementPower, u, 0).toString();
        var _ = new Array();
        var C = new Array();
        for (const m of i.Zjn.$As) {
          var c = MathUtils_1.MathUtils.LongToNumber(m);
          var l = CharacterBuffController_1.default.GetBuffDefinition(c);
          _.push(l.Desc);
          C.push(c);
        }
        h[n + o * 2 + 4] = C.join("|");
        h[n + o * 2 + 5] = _.join("|");
        _.length = 0;
        C.length = 0;
        for (const b of i.JAs.$As) {
          var g = MathUtils_1.MathUtils.LongToNumber(b);
          var f = CharacterBuffController_1.default.GetBuffDefinition(g);
          _.push(f.Desc);
          C.push(g);
        }
        h[n + o * 2 + 6] = C.join("|");
        h[n + o * 2 + 7] = _.join("|");
        s = h.join(",");
        this.EGr.push(s);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Recorder", 20, "结算信息Snapshot", ["Result", s]);
        }
      }
    } else {
      u = a.GetComponent(1)?.Owner?.ActorLabel;
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Test", 20, "伤害配置为空", ["伤害ID", t], ["Name", u ?? ""]);
      }
    }
  }
  static Jqr(t) {
    t = new Date(MathUtils_1.MathUtils.LongToNumber(t));
    return StringUtils_1.StringUtils.Format("{0}月{1}日{2}:{3}:{4}:{5}", t.getMonth().toString(), t.getDate().toString(), t.getHours().toString(), t.getMinutes().toString(), t.getSeconds().toString(), t.getMilliseconds().toString());
  }
  static Oom(t) {
    t = MathUtils_1.MathUtils.LongToNumber(t);
    if (CharacterGasDebugComponent_1.Gom.has(t)) {
      return CharacterGasDebugComponent_1.Gom.get(t);
    } else {
      return t.toString();
    }
  }
  static AGr(i, o, n, s) {
    var t = MathUtils_1.MathUtils.LongToNumber(o.KAs);
    var h = ModelManager_1.ModelManager.DamageModel?.GetDamageConfigById(t);
    if (h) {
      var u = new Array();
      u.push(n);
      u.push(s);
      var n = CharacterGasDebugComponent_1.LGr(i);
      if (n) {
        u.push(n.Type);
        u.push(n.ConfigId);
        u.push(n.Name);
        u.push(o.XAs === Protocol_1.Aki.Protocol.XAs.Proto_FromBullet ? "子弹" : "Buff");
        u.push(CharacterGasDebugComponent_1.Oom(o.KAs));
        let t = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(i, MathUtils_1.MathUtils.LongToBigInt(o.Mjn).toString(), false);
        let e = undefined;
        if (!t) {
          s = ControllerHolder_1.ControllerHolder.WorldController.GetCustomEntityId(i.Id, 1);
          if ((e = EntitySystem_1.EntitySystem.Get(s))?.Valid) {
            t = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(e, MathUtils_1.MathUtils.LongToBigInt(o.Mjn).toString());
          }
        }
        u.push(t?.BulletName ?? "");
        u.push(o.QAs.toFixed());
        n = MathUtils_1.MathUtils.LongToNumber(o.r5n);
        u.push(n.toString());
        let r = i.GetComponent(42)?.GetSkillInfo(n)?.SkillName;
        r = r || e?.GetComponent(42)?.GetSkillInfo(n)?.SkillName;
        u.push(r?.toString() ?? "");
        u.push(o.YAs ? "1" : "0");
        u.push(MathUtils_1.MathUtils.LongToBigInt(o.Zjn.F4n).toString());
        let a = u.length;
        u.push("0");
        for (const m of o.Zjn.HAs) {
          if (m.tSs === EAttributeId.Proto_ElementEnergy) {
            u[a] = m.eSs.toFixed();
          }
        }
        u.push(MathUtils_1.MathUtils.LongToBigInt(o?.QKd?.GKd ?? 0).toString());
        var s = (o?.QKd?.VKd ?? 0) * 100;
        u.push(s.toFixed(2));
        u.push(o?.QKd?.jKd?.toString() ?? "0");
        u.push(o?.QKd?.HKd?.toString() ?? "0");
        u.push(o?.QKd?.PFg?.toString() ?? "0");
        u.push(o?.QKd?.wFg?.toString() ?? "0");
        u.push(o?.QKd?.AFg?.toString() ?? "0");
        u.push(o?.QKd?.$Kd?.toString() ?? "0");
        u.push(o?.QKd?.WKd?.toString() ?? "0");
        u.push(o?.QKd?.NKd?.toString() ?? "0");
        u.push(MathUtils_1.MathUtils.LongToBigInt(o?.QKd?.FKd ?? 0).toString());
        u.push(o?.QKd?.FJm ? MathUtils_1.MathUtils.LongToNumber(o.QKd.FJm).toString() : "0");
        u.push(o?._ig ? "1" : "0");
        u.push((o?.QKd?.sig ?? 0).toString());
        u.push((o?.QKd?.aig ?? 0).toString());
        u.push((o?.QKd?.hig ?? 0).toString());
        u.push((o?.QKd?.lig ?? 0).toString());
        u.push((o?.QKd?.Ypg ?? 0).toString());
        a = u.length;
        var n = attributeIdArray.length;
        CharacterGasDebugComponent_1.BGr(o.Zjn.HAs, u, a, a + n);
        CharacterGasDebugComponent_1.BGr(o.JAs.HAs, u, a + n * 2, a + n * 3);
        var s = o.Wjn;
        u[a + n * 4] = AbilityUtils_1.AbilityUtils.GetLevelValue(h.HardnessLv, s, 0).toString();
        u.push(AbilityUtils_1.AbilityUtils.GetLevelValue(h.Percent0, s, 0).toString());
        u.push(AbilityUtils_1.AbilityUtils.GetLevelValue(h.Percent1, s, 0).toString());
        u.push(AbilityUtils_1.AbilityUtils.GetLevelValue(h.ToughLv, s, 0).toString());
        u.push(AbilityUtils_1.AbilityUtils.GetLevelValue(h.Energy, s, 0).toString());
        u.push(h.ElementPowerType.toString());
        u.push(AbilityUtils_1.AbilityUtils.GetLevelValue(h.ElementPower, s, 0).toString());
        var _ = new Array();
        var C = new Array();
        for (const b of o.Zjn.$As) {
          var c = MathUtils_1.MathUtils.LongToNumber(b);
          var l = CharacterBuffController_1.default.GetBuffDefinition(c);
          _.push(l.Desc);
          C.push(c);
        }
        u.push(C.join("|"));
        u.push(_.join("|"));
        _.length = 0;
        C.length = 0;
        for (const p of o.JAs.$As) {
          var g = MathUtils_1.MathUtils.LongToNumber(p);
          var f = CharacterBuffController_1.default.GetBuffDefinition(g);
          _.push(f.Desc);
          C.push(g);
        }
        u.push(C.join("|"));
        u.push(_.join("|"));
        n = u.join(",");
        this.MGr.push(n);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Recorder", 20, "结算信息Attr", ["Result", n]);
        }
      }
    } else {
      h = i.GetComponent(1)?.Owner?.ActorLabel;
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Test", 20, "伤害配置为空", ["伤害ID", t], ["Name", h ?? ""]);
      }
    }
  }
  static BGr(r, a, i, o) {
    for (let t = 0, e = attributeIdArray.length; t < e; t++) {
      for (const n of r) {
        if (n.tSs === attributeIdArray[t]) {
          a[i + t] = (n.y6n > 0 ? n.y6n : n.eSs).toString();
          a[o + t] = n.eSs.toString();
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
    CharacterGasDebugComponent_1.V9u.length = 0;
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
CharacterGasDebugComponent.V9u = new Array();
CharacterGasDebugComponent.KQu = new Map();
CharacterGasDebugComponent.vGr = new Array();
CharacterGasDebugComponent.yGr = new Map();
CharacterGasDebugComponent.IGr = new Map();
CharacterGasDebugComponent.TGr = new Map();
CharacterGasDebugComponent.zqr = new Map();
CharacterGasDebugComponent.Zqr = new Array();
CharacterGasDebugComponent.Pt = "Statistics/FightDataRecord/";
CharacterGasDebugComponent.XQu = "Statistics/FightOperateRecord/";
CharacterGasDebugComponent.Gom = new Map([[1001, "1001(风蚀)"], [1002, "1002(电磁)"], [1003, "1003(霜渐)"], [1004, "1004(聚爆)"], [1005, "1005(光噪)"], [1006, "1006(虚湮)"]]);
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
CharacterGasDebugComponent.oVd = t => {
  CharacterGasDebugComponent_1.Qyn = t;
};
__decorate([CombatMessage_1.CombatNet.Listen("s3n", true)], CharacterGasDebugComponent, "OnDamageRecordNotify", null);
CharacterGasDebugComponent = CharacterGasDebugComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(22)], CharacterGasDebugComponent);
exports.CharacterGasDebugComponent = CharacterGasDebugComponent; //# sourceMappingURL=CharacterGasDebugComponent.js.map