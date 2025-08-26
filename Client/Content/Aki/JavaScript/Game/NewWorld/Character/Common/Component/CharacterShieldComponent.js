"use strict";

var __decorate = this && this.__decorate || function (e, t, i, o) {
  var r;
  var s = arguments.length;
  var n = s < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(e, t, i, o);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (r = e[h]) {
        n = (s < 3 ? r(n) : s > 3 ? r(t, i, n) : r(t, i)) || n;
      }
    }
  }
  if (s > 3 && n) {
    Object.defineProperty(t, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterShieldComponent = exports.CharacterShield = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ShieldById_1 = require("../../../../../Core/Define/ConfigQuery/ShieldById");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage");
const SceneTeamController_1 = require("../../../../Module/SceneTeam/SceneTeamController");
const AbilityEvent_1 = require("./Abilities/AbilityEvent");
class CharacterShield {
  constructor(e, t, i) {
    this.Id = e;
    this.TemplateId = t;
    this.Value = i;
    this.Priority = 0;
    this.ShieldValue = 0;
    this.HandleId = 0;
    this.HandleId = e;
    e = ShieldById_1.configShieldById.GetConfig(t);
    if (e) {
      this.Priority = e.Priority;
      this.ShieldValue = i;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 35, "护盾添加失败，护盾Id不存在", ["Id", t]);
    }
  }
}
exports.CharacterShield = CharacterShield;
let CharacterShieldComponent = class CharacterShieldComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.m1t = undefined;
    this.Xte = undefined;
    this.Kjr = new Map();
    this.Qjr = 0;
  }
  get ShieldTotal() {
    return this.Qjr;
  }
  OnStart() {
    this.m1t = this.Entity.CheckGetComponent(175);
    this.Xte = this.Entity.CheckGetComponent(206);
    return true;
  }
  OnActivate() {
    this.Kjr.clear();
    this.Qjr = 0;
    var e = this.Entity.GetComponent(0).ComponentDataMap.get("Jys")?.Jys?.LTs;
    if (e) {
      for (const t of e) {
        this.Add(t.uVn, t.v9n, t.ETs);
      }
    }
    return true;
  }
  Xjr(e) {
    if (this.Qjr === 0 && e > 0) {
      this.Xte.AddTag(1219330576);
    } else if (this.Qjr > 0 && this.Qjr + e <= 0) {
      this.Xte.RemoveTag(1219330576);
    }
    this.Qjr += e;
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharShieldChange, this.Qjr);
  }
  Add(e, t, i, o = 0) {
    var r;
    if (this.Kjr.get(e)) {
      this.ChangeValue(e, t, i, o);
    } else {
      r = new CharacterShield(e, t, i);
      this.Kjr.set(e, r);
      this.Xjr(r.ShieldValue);
      this.Ymd(0, i, o, t);
    }
    this.m1t.TriggerEvents(7, this.m1t, {});
  }
  Remove(e, t, i = 1) {
    var o = this.Kjr.get(e);
    if (o) {
      this.Xjr(-o.ShieldValue);
      this.$jr();
      this.Kjr.delete(e);
      this.Ymd(o.ShieldValue, 0, i, t);
    }
  }
  ChangeValue(e, t, i, o = 2) {
    var r;
    var s = this.Kjr.get(e);
    if (s) {
      r = s.ShieldValue;
      s.ShieldValue = i;
      this.Xjr(i - r);
      this.Ymd(r, i, o, t);
    } else {
      this.Add(e, t, i);
    }
  }
  static OnShieldUpdateNotify(e, t) {
    var i = e?.GetComponent(75);
    if (i) {
      for (const s of t.kAs) {
        var o = s.OAs;
        var r = Protocol_1.Aki.Protocol.O4s;
        if (o === r.Proto_EShieldUpdateTypeAdd && s.ETs > 0) {
          i.Add(s.uVn, s.v9n, s.ETs);
        } else if (o === r.Proto_EShieldUpdateTypeDel && s.ETs === 0) {
          i.Remove(s.uVn, s.v9n);
        } else if (o === r.Proto_EShieldUpdateTypeModify && s.ETs > 0) {
          i.ChangeValue(s.uVn, s.v9n, s.ETs);
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Battle", 35, "护盾更新错误", ["shield", s]);
        }
      }
    }
  }
  GetShieldValue(e) {
    if (e === 0) {
      return this.ShieldTotal;
    }
    let t = 0;
    for (const i of this.Kjr.values()) {
      if (i.TemplateId === e) {
        t += i.ShieldValue;
      }
    }
    return t;
  }
  $jr() {
    this.m1t.TriggerEvents(8, this.m1t, {});
  }
  Ymd(e, t, i, o) {
    SceneTeamController_1.SceneTeamController.EmitAbilityEvent(this.Entity, 4, AbilityEvent_1.DEFAULT_KEY, this.Entity, e, t, i, o);
  }
  GetDebugShieldInfo() {
    return this.Kjr.entries();
  }
};
__decorate([CombatMessage_1.CombatNet.Listen("E3n", false)], CharacterShieldComponent, "OnShieldUpdateNotify", null);
CharacterShieldComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(75)], CharacterShieldComponent);
exports.CharacterShieldComponent = CharacterShieldComponent; //# sourceMappingURL=CharacterShieldComponent.js.map