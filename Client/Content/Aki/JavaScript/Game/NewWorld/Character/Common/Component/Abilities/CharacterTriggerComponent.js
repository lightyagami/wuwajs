"use strict";
var __decorate = this && this.__decorate || function(e, r, t, o) {
  var n, i = arguments.length,
    a = i < 3 ? r : null === o ? o = Object.getOwnPropertyDescriptor(r, t) : o;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, r, t, o);
  else
    for (var g = e.length - 1; 0 <= g; g--)(n = e[g]) && (a = (i < 3 ? n(a) : 3 < i ? n(r, t, a) : n(r, t)) || a);
  return 3 < i && a && Object.defineProperty(r, t, a), a
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CharacterTriggerComponent = void 0;
const Log_1 = require("../../../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  FormationAttributeController_1 = require("../../../../../Module/Abilities/FormationAttributeController"),
  Trigger_1 = require("./Trigger/Trigger"),
  TriggerType_1 = require("./Trigger/TriggerType");

function checkRoleAttr(e, r, t, o) {
  var n = (e?.GetComponent(173))?.GetCurrentValue(t);
  return n ? 0 === r ? n < o ? 1 : 0 : 1 === r ? n === o ? 1 : 0 : 2 === r && o < n ? 1 : 0 : (Log_1.Log.CheckWarn() && Log_1.Log.Warn("Battle", 85, "被动获取不到属性", ["owner", e?.Id], ["attrId", t]), 0)
}
const builtinFunc = {
  GetTags: e => {
    var r = [];
    for (const t of e.CheckGetComponent(205).TagContainer.GetAllExactTags() ?? []) r.push(GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t));
    return r
  },
  GetAttributeByID(e, r) {
    return e.CheckGetComponent(173).GetCurrentValue(r)
  },
  HasInt: (e, r) => !(!r || 0 === r.length) && r.includes(e),
  MatchAnyInt: (e, r) => !(!e || !r || 0 === e.length || 0 === r.length) && e.some(e => r.includes(e)),
  MatchAllInt: (e, r) => !(!e || !r || 0 === e.length || 0 === r.length) && e.every(e => r.includes(e)),
  MatchAnyTag: (e, r) => e.CheckGetComponent(205).HasAnyTag(r.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e))),
  MatchAllTags: (e, r) => e.CheckGetComponent(205).HasAllTag(r.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e))),
  GetShieldValue: e => e.CheckGetComponent(75)?.ShieldTotal ?? 0,
  Distance: (e, r) => {
    var t = ModelManager_1.ModelManager.CreatureModel,
      o = e?.GetComponent(0),
      n = r?.GetComponent(0),
      o = o?.IsRole() ? t.GetScenePlayerData(o.GetPlayerId())?.GetLocation() : e?.CheckGetComponent(3)?.ActorLocationProxy,
      e = n?.IsRole() ? t.GetScenePlayerData(n.GetPlayerId())?.GetLocation() : r?.CheckGetComponent(3)?.ActorLocationProxy;
    return o && e ? Vector_1.Vector.Dist(o, e) : 1 / 0
  },
  Distance2D: (e, r) => {
    var t = ModelManager_1.ModelManager.CreatureModel,
      o = e?.GetComponent(0),
      n = r?.GetComponent(0),
      o = o?.IsRole() ? t.GetScenePlayerData(o.GetPlayerId())?.GetLocation() : e?.CheckGetComponent(3)?.ActorLocationProxy,
      e = n?.IsRole() ? t.GetScenePlayerData(n.GetPlayerId())?.GetLocation() : r?.CheckGetComponent(3)?.ActorLocationProxy;
    return o && e ? Vector_1.Vector.Dist2D(o, e) : 1 / 0
  },
  GetBattleScore: () => ModelManager_1.ModelManager.BattleScoreModel.GetCurScore(),
  GetBuffStack: (e, r) => {
    var t = e.CheckGetComponent(190),
      r = Number(r);
    return t ? (t.GetFormationBuffComp()?.GetFormationBuffTotalStackById(r) ?? 0) + (t.GetBuffTotalStackById(r) ?? 0) : e.CheckGetComponent(209)?.GetBuffTotalStackById(r) ?? 0
  },
  MatchAnyBattleFlags: (e, r) => !(!e || !r || 0 === e.length || 0 === r.length) && e.some(e => r.includes(e)),
  GetTagStackCount: (e, r) => e.GetComponent(205)?.GetTagCount(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(r)) ?? 0,
  MatchAnyBuff: (e, r) => {
    const t = e?.GetComponent(209);
    return !(!t || !r || 0 === r.length) && r.some(e => t.HasBuff(e))
  },
  MatchAllBuff: (e, r) => {
    const t = e?.GetComponent(209);
    return !(!t || !r || 0 === r.length) && r.every(e => t.HasBuff(e))
  },
  GetMaxTagCountIndex: (e, r) => {
    let t = 0,
      o = 0;
    const n = e.GetComponent(205);
    return n && r && 0 !== r.length && r.forEach((e, r) => {
      e = n.GetTagCount(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e));
      e > o && (o = e, t = r)
    }), t
  },
  GetEntityCountCheckAttr: (e, r, t, o, n) => {
    let i = 0;
    if (0 === r) return checkRoleAttr(e, o, t, n);
    var a = ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(),
      g = e.GetComponent(0).GetPlayerId();
    for (const l of a) 1 === r && l.Entity?.GetComponent(0).GetPlayerId() !== g || (i += checkRoleAttr(l.Entity, o, t, n));
    return i
  }
};
let triggerHandleCounter = 0,
  CharacterTriggerComponent = class CharacterTriggerComponent extends EntityComponent_1.EntityComponent {
    constructor() {
      super(...arguments), this.wkr = new Map, this.Bkr = new Map
    }
    get TriggerFormulaFunc() {
      return this.Bkr
    }
    OnInit() {
      return !0
    }
    OnStart() {
      for (const e of Object.keys(builtinFunc)) this.Bkr.set(e, builtinFunc[e]);
      return this.Bkr.set("GetSelfTeamAttributeByID", e => {
        return ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(this.Entity.Id, {
          ParamType: 1
        })?.IsMyRole() ?? !1 ? FormationAttributeController_1.FormationAttributeController.GetValue(e) : 0
      }), this.Bkr.set("GetSelfTeamMaxAttributeByID", e => {
        return ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(this.Entity.Id, {
          ParamType: 1
        })?.IsMyRole() ?? !1 ? FormationAttributeController_1.FormationAttributeController.GetMax(e) : 0
      }), !0
    }
    OnClear() {
      this.Bkr.clear();
      for (const e of this.wkr.keys()) this.RemoveTrigger(e);
      return this.wkr.clear(), !0
    }
    AddTrigger(r, e, t) {
      if (!r) return Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 19, "添加Trigger失败，找不到对应配置", ["owner", this.Entity.Id]), TriggerType_1.INVALID_TRIGGER_HANDLE;
      var o = TriggerType_1.ETriggerEvent[r.Type],
        o = Trigger_1.Trigger.GetClass(o);
      if (void 0 === o) return Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 19, "添加Trigger失败, 找不到对应的Trigger类型或客户端未作实现", ["owner", this.Entity.Id], ["triggerType", r.Type]), TriggerType_1.INVALID_TRIGGER_HANDLE;
      var n = triggerHandleCounter++;
      try {
        var i = new o(r, n, this, this.Bkr, e, t);
        i.OnInitParams(r.Preset), this.wkr.set(n, i)
      } catch (e) {
        return e instanceof Error ? Log_1.Log.CheckError() && Log_1.Log.ErrorWithStack("Battle", 19, "创建Trigger实例失败", e, ["owner", this.Entity.Id], ["triggerType", r.Type], ["formula", r.Formula], ["error", e.message]) : Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 19, "创建Trigger实例失败", ["owner", this.Entity.Id], ["triggerType", r.Type], ["formula", r.Formula], ["error", e]), TriggerType_1.INVALID_TRIGGER_HANDLE
      }
      return n
    }
    GetTrigger(e) {
      return this.wkr.get(e)
    }
    RemoveTrigger(e) {
      var r = this.wkr.get(e);
      r && (r.Destroy(), this.wkr.delete(e))
    }
    SetTriggerActive(e, r) {
      this.wkr.get(e)?.SetActive(r)
    }
  };
CharacterTriggerComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(28)], CharacterTriggerComponent), exports.CharacterTriggerComponent = CharacterTriggerComponent;
//# sourceMappingURL=CharacterTriggerComponent.js.map