"use strict";

var __decorate = this && this.__decorate || function (e, r, t, o) {
  var n;
  var i = arguments.length;
  var a = i < 3 ? r : o === null ? o = Object.getOwnPropertyDescriptor(r, t) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(e, r, t, o);
  } else {
    for (var g = e.length - 1; g >= 0; g--) {
      if (n = e[g]) {
        a = (i < 3 ? n(a) : i > 3 ? n(r, t, a) : n(r, t)) || a;
      }
    }
  }
  if (i > 3 && a) {
    Object.defineProperty(r, t, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterTriggerComponent = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const FormationAttributeController_1 = require("../../../../../Module/Abilities/FormationAttributeController");
const Trigger_1 = require("./Trigger/Trigger");
const TriggerType_1 = require("./Trigger/TriggerType");
function checkRoleAttr(e, r, t, o) {
  var n = e?.GetComponent(174)?.GetCurrentValue(t);
  if (n) {
    if (r === 0) {
      if (n < o) {
        return 1;
      } else {
        return 0;
      }
    } else if (r === 1) {
      if (n === o) {
        return 1;
      } else {
        return 0;
      }
    } else if (r === 2 && o < n) {
      return 1;
    } else {
      return 0;
    }
  } else {
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Battle", 85, "被动获取不到属性", ["owner", e?.Id], ["attrId", t]);
    }
    return 0;
  }
}
const builtinFunc = {
  GetTags: e => {
    var r = [];
    for (const t of e.CheckGetComponent(206).TagContainer.GetAllExactTags() ?? []) {
      r.push(GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t));
    }
    return r;
  },
  GetAttributeByID(e, r) {
    return e.CheckGetComponent(174).GetCurrentValue(r);
  },
  HasInt: (e, r) => !!r && r.length !== 0 && r.includes(e),
  MatchAnyInt: (e, r) => !!e && !!r && e.length !== 0 && r.length !== 0 && e.some(e => r.includes(e)),
  MatchAllInt: (e, r) => !!e && !!r && e.length !== 0 && r.length !== 0 && e.every(e => r.includes(e)),
  MatchAnyTag: (e, r) => e.CheckGetComponent(206).HasAnyTag(r.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e))),
  MatchAllTags: (e, r) => e.CheckGetComponent(206).HasAllTag(r.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e))),
  GetShieldValue: e => e.CheckGetComponent(75)?.ShieldTotal ?? 0,
  Distance: (e, r) => {
    var t = ModelManager_1.ModelManager.CreatureModel;
    var o = e?.GetComponent(0);
    var n = r?.GetComponent(0);
    var o = o?.IsRole() ? t.GetScenePlayerData(o.GetPlayerId())?.GetLocation() : e?.CheckGetComponent(3)?.ActorLocationProxy;
    var e = n?.IsRole() ? t.GetScenePlayerData(n.GetPlayerId())?.GetLocation() : r?.CheckGetComponent(3)?.ActorLocationProxy;
    if (o && e) {
      return Vector_1.Vector.Dist(o, e);
    } else {
      return Infinity;
    }
  },
  Distance2D: (e, r) => {
    var t = ModelManager_1.ModelManager.CreatureModel;
    var o = e?.GetComponent(0);
    var n = r?.GetComponent(0);
    var o = o?.IsRole() ? t.GetScenePlayerData(o.GetPlayerId())?.GetLocation() : e?.CheckGetComponent(3)?.ActorLocationProxy;
    var e = n?.IsRole() ? t.GetScenePlayerData(n.GetPlayerId())?.GetLocation() : r?.CheckGetComponent(3)?.ActorLocationProxy;
    if (o && e) {
      return Vector_1.Vector.Dist2D(o, e);
    } else {
      return Infinity;
    }
  },
  GetBattleScore: () => ModelManager_1.ModelManager.BattleScoreModel.GetCurScore(),
  GetBuffStack: (e, r) => {
    var t = e.CheckGetComponent(191);
    var r = Number(r);
    if (t) {
      return (t.GetFormationBuffComp()?.GetFormationBuffTotalStackById(r) ?? 0) + (t.GetBuffTotalStackById(r) ?? 0);
    } else {
      return e.CheckGetComponent(210)?.GetBuffTotalStackById(r) ?? 0;
    }
  },
  MatchAnyBattleFlags: (e, r) => !!e && !!r && e.length !== 0 && r.length !== 0 && e.some(e => r.includes(e)),
  GetTagStackCount: (e, r) => e.GetComponent(206)?.GetTagCount(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(r)) ?? 0,
  MatchAnyBuff: (e, r) => {
    const t = e?.GetComponent(210);
    return !!t && !!r && r.length !== 0 && r.some(e => t.HasBuff(e));
  },
  MatchAllBuff: (e, r) => {
    const t = e?.GetComponent(210);
    return !!t && !!r && r.length !== 0 && r.every(e => t.HasBuff(e));
  },
  GetMaxTagCountIndex: (e, r) => {
    let t = 0;
    let o = 0;
    const n = e.GetComponent(206);
    if (n && r && r.length !== 0) {
      r.forEach((e, r) => {
        e = n.GetTagCount(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e));
        if (e > o) {
          o = e;
          t = r;
        }
      });
    }
    return t;
  },
  GetEntityCountCheckAttr: (e, r, t, o, n) => {
    let i = 0;
    if (r === 0) {
      return checkRoleAttr(e, o, t, n);
    }
    var a = ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities();
    var g = e.GetComponent(0).GetPlayerId();
    for (const l of a) {
      if (r !== 1 || l.Entity?.GetComponent(0).GetPlayerId() === g) {
        i += checkRoleAttr(l.Entity, o, t, n);
      }
    }
    return i;
  }
};
let triggerHandleCounter = 0;
let CharacterTriggerComponent = class CharacterTriggerComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.wkr = new Map();
    this.Bkr = new Map();
  }
  get TriggerFormulaFunc() {
    return this.Bkr;
  }
  OnInit() {
    return true;
  }
  OnStart() {
    for (const e of Object.keys(builtinFunc)) {
      this.Bkr.set(e, builtinFunc[e]);
    }
    this.Bkr.set("GetSelfTeamAttributeByID", e => {
      if (ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(this.Entity.Id, {
        ParamType: 1
      })?.IsMyRole() ?? false) {
        return FormationAttributeController_1.FormationAttributeController.GetValue(e);
      } else {
        return 0;
      }
    });
    this.Bkr.set("GetSelfTeamMaxAttributeByID", e => {
      if (ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(this.Entity.Id, {
        ParamType: 1
      })?.IsMyRole() ?? false) {
        return FormationAttributeController_1.FormationAttributeController.GetMax(e);
      } else {
        return 0;
      }
    });
    return true;
  }
  OnClear() {
    this.Bkr.clear();
    for (const e of this.wkr.keys()) {
      this.RemoveTrigger(e);
    }
    this.wkr.clear();
    return true;
  }
  AddTrigger(r, e, t) {
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 19, "添加Trigger失败，找不到对应配置", ["owner", this.Entity.Id]);
      }
      return TriggerType_1.INVALID_TRIGGER_HANDLE;
    }
    var o = TriggerType_1.ETriggerEvent[r.Type];
    var o = Trigger_1.Trigger.GetClass(o);
    if (o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 19, "添加Trigger失败, 找不到对应的Trigger类型或客户端未作实现", ["owner", this.Entity.Id], ["triggerType", r.Type]);
      }
      return TriggerType_1.INVALID_TRIGGER_HANDLE;
    }
    var n = triggerHandleCounter++;
    try {
      var i = new o(r, n, this, this.Bkr, e, t);
      i.OnInitParams(r.Preset);
      this.wkr.set(n, i);
    } catch (e) {
      if (e instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("Battle", 19, "创建Trigger实例失败", e, ["owner", this.Entity.Id], ["triggerType", r.Type], ["formula", r.Formula], ["error", e.message]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 19, "创建Trigger实例失败", ["owner", this.Entity.Id], ["triggerType", r.Type], ["formula", r.Formula], ["error", e]);
      }
      return TriggerType_1.INVALID_TRIGGER_HANDLE;
    }
    return n;
  }
  GetTrigger(e) {
    return this.wkr.get(e);
  }
  RemoveTrigger(e) {
    var r = this.wkr.get(e);
    if (r) {
      r.Destroy();
      this.wkr.delete(e);
    }
  }
  SetTriggerActive(e, r) {
    this.wkr.get(e)?.SetActive(r);
  }
};
CharacterTriggerComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(28)], CharacterTriggerComponent);
exports.CharacterTriggerComponent = CharacterTriggerComponent; //# sourceMappingURL=CharacterTriggerComponent.js.map