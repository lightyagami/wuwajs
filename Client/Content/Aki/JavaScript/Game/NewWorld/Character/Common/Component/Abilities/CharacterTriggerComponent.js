"use strict";

var __decorate = this && this.__decorate || function (e, t, r, n) {
  var o;
  var a = arguments.length;
  var i = a < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, r) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    i = Reflect.decorate(e, t, r, n);
  } else {
    for (var g = e.length - 1; g >= 0; g--) {
      if (o = e[g]) {
        i = (a < 3 ? o(i) : a > 3 ? o(t, r, i) : o(t, r)) || i;
      }
    }
  }
  if (a > 3 && i) {
    Object.defineProperty(t, r, i);
  }
  return i;
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
function checkRoleAttr(e, t, r, n) {
  var o = e?.GetComponent(182)?.GetCurrentValue(r);
  if (o) {
    if (t === 0) {
      if (o < n) {
        return 1;
      } else {
        return 0;
      }
    } else if (t === 1) {
      if (o === n) {
        return 1;
      } else {
        return 0;
      }
    } else if (t === 2 && n < o) {
      return 1;
    } else {
      return 0;
    }
  } else {
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Battle", 85, "被动获取不到属性", ["owner", e?.Id], ["attrId", r]);
    }
    return 0;
  }
}
const builtinFunc = {
  GetTags: e => {
    var t = [];
    for (const r of e.CheckGetComponent(215).TagContainer.GetAllExactTags() ?? []) {
      t.push(GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(r));
    }
    return t;
  },
  GetAttributeByID(e, t) {
    return e.CheckGetComponent(182).GetCurrentValue(t);
  },
  HasInt: (e, t) => !!t && t.length !== 0 && t.includes(e),
  MatchAnyInt: (e, t) => !!e && !!t && e.length !== 0 && t.length !== 0 && e.some(e => t.includes(e)),
  MatchAllInt: (e, t) => !!e && !!t && e.length !== 0 && t.length !== 0 && e.every(e => t.includes(e)),
  MatchAnyTag: (e, t) => e.CheckGetComponent(215).HasAnyTag(t.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e))),
  MatchAllTags: (e, t) => e.CheckGetComponent(215).HasAllTag(t.map(e => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e))),
  GetShieldValue: e => e.CheckGetComponent(78)?.ShieldTotal ?? 0,
  Distance: (e, t) => {
    var r = ModelManager_1.ModelManager.CreatureModel;
    var n = e?.GetComponent(0);
    var o = t?.GetComponent(0);
    var n = n?.IsRole() ? r.GetScenePlayerData(n.GetPlayerId())?.GetLocation() : e?.CheckGetComponent(3)?.ActorLocationProxy;
    var e = o?.IsRole() ? r.GetScenePlayerData(o.GetPlayerId())?.GetLocation() : t?.CheckGetComponent(3)?.ActorLocationProxy;
    if (n && e) {
      return Vector_1.Vector.Dist(n, e);
    } else {
      return Infinity;
    }
  },
  Distance2D: (e, t) => {
    var r = ModelManager_1.ModelManager.CreatureModel;
    var n = e?.GetComponent(0);
    var o = t?.GetComponent(0);
    var n = n?.IsRole() ? r.GetScenePlayerData(n.GetPlayerId())?.GetLocation() : e?.CheckGetComponent(3)?.ActorLocationProxy;
    var e = o?.IsRole() ? r.GetScenePlayerData(o.GetPlayerId())?.GetLocation() : t?.CheckGetComponent(3)?.ActorLocationProxy;
    if (n && e) {
      return Vector_1.Vector.Dist2D(n, e);
    } else {
      return Infinity;
    }
  },
  GetBattleScore: () => ModelManager_1.ModelManager.BattleScoreModel.GetCurScore(),
  GetBuffStack: (e, t) => {
    var r = e.CheckGetComponent(200);
    var t = Number(t);
    if (r) {
      return (r.GetFormationBuffComp()?.GetFormationBuffTotalStackById(t) ?? 0) + (r.GetBuffTotalStackById(t) ?? 0);
    } else {
      return e.CheckGetComponent(220)?.GetBuffTotalStackById(t) ?? 0;
    }
  },
  MatchAnyBattleFlags: (e, t) => !!e && !!t && e.length !== 0 && t.length !== 0 && e.some(e => t.includes(e)),
  GetTagStackCount: (e, t) => e.GetComponent(215)?.GetTagCount(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t)) ?? 0,
  MatchAnyBuff: (e, t) => {
    const r = e?.GetComponent(220);
    return !!r && !!t && t.length !== 0 && t.some(e => r.HasBuff(e));
  },
  MatchAllBuff: (e, t) => {
    const r = e?.GetComponent(220);
    return !!r && !!t && t.length !== 0 && t.every(e => r.HasBuff(e));
  },
  GetMaxTagCountIndex: (e, t) => {
    let r = 0;
    let n = 0;
    const o = e.GetComponent(215);
    if (o && t && t.length !== 0) {
      t.forEach((e, t) => {
        e = o.GetTagCount(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e));
        if (e > n) {
          n = e;
          r = t;
        }
      });
    }
    return r;
  },
  GetEntityCountCheckAttr: (e, t, r, n, o) => {
    let a = 0;
    if (t === 0) {
      return checkRoleAttr(e, n, r, o);
    }
    var i = ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities();
    var g = e.GetComponent(0).GetPlayerId();
    for (const l of i) {
      if (t !== 1 || l.Entity?.GetComponent(0).GetPlayerId() === g) {
        a += checkRoleAttr(l.Entity, n, r, o);
      }
    }
    return a;
  },
  GetContainTagEntityCount: (e, t, r) => {
    let n = 0;
    if (t === 0) {
      if (e.GetComponent(215)?.HasTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(r))) {
        return 1;
      } else {
        return 0;
      }
    }
    var o = ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities();
    var a = e.GetComponent(0).GetPlayerId();
    for (const i of o) {
      if (t !== 1 || i.Entity?.GetComponent(0).GetPlayerId() === a) {
        if (i.Entity?.GetComponent(215)?.HasTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(r))) {
          n++;
        }
      }
    }
    return n;
  },
  GetArrayElement: (e, t) => t >= 0 && t < e.length ? e[t] : (Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 85, "被动获取数组元素异常index不合法", ["index", t], ["array", e]), 0)
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
  AddTrigger(t, e, r) {
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 19, "添加Trigger失败，找不到对应配置", ["owner", this.Entity.Id]);
      }
      return TriggerType_1.INVALID_TRIGGER_HANDLE;
    }
    var n = TriggerType_1.ETriggerEvent[t.Type];
    var n = Trigger_1.Trigger.GetClass(n);
    if (n === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 19, "添加Trigger失败, 找不到对应的Trigger类型或客户端未作实现", ["owner", this.Entity.Id], ["triggerType", t.Type]);
      }
      return TriggerType_1.INVALID_TRIGGER_HANDLE;
    }
    var o = triggerHandleCounter++;
    try {
      var a = new n(t, o, this, this.Bkr, e, r);
      a.OnInitParams(t.Preset);
      this.wkr.set(o, a);
    } catch (e) {
      if (e instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("Battle", 19, "创建Trigger实例失败", e, ["owner", this.Entity.Id], ["triggerType", t.Type], ["formula", t.Formula], ["error", e.message]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 19, "创建Trigger实例失败", ["owner", this.Entity.Id], ["triggerType", t.Type], ["formula", t.Formula], ["error", e]);
      }
      return TriggerType_1.INVALID_TRIGGER_HANDLE;
    }
    return o;
  }
  GetTrigger(e) {
    return this.wkr.get(e);
  }
  RemoveTrigger(e) {
    var t = this.wkr.get(e);
    if (t) {
      t.Destroy();
      this.wkr.delete(e);
    }
  }
  SetTriggerActive(e, t) {
    this.wkr.get(e)?.SetActive(t);
  }
};
CharacterTriggerComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(28)], CharacterTriggerComponent);
exports.CharacterTriggerComponent = CharacterTriggerComponent; //# sourceMappingURL=CharacterTriggerComponent.js.map