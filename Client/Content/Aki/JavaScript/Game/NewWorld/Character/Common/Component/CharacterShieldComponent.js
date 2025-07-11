"use strict";

var __decorate = this && this.__decorate || function (t, e, i, o) {
  var r;
  var s = arguments.length;
  var h = s < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, e, i, o);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (r = t[n]) {
        h = (s < 3 ? r(h) : s > 3 ? r(e, i, h) : r(e, i)) || h;
      }
    }
  }
  if (s > 3 && h) {
    Object.defineProperty(e, i, h);
  }
  return h;
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
class CharacterShield {
  constructor(t, e, i) {
    this.Id = t;
    this.TemplateId = e;
    this.Value = i;
    this.Priority = 0;
    this.ShieldValue = 0;
    this.HandleId = 0;
    this.HandleId = t;
    t = ShieldById_1.configShieldById.GetConfig(e);
    if (t) {
      this.Priority = t.Priority;
      this.ShieldValue = i;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 35, "护盾添加失败，护盾Id不存在", ["Id", e]);
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
    this.m1t = this.Entity.CheckGetComponent(174);
    this.Xte = this.Entity.CheckGetComponent(205);
    return true;
  }
  OnActivate() {
    this.Kjr.clear;
    this.Qjr = 0;
    var t = this.Entity.GetComponent(0).ComponentDataMap.get("Jys")?.Jys?.LTs;
    if (t) {
      for (const e of t) {
        this.Add(e.uVn, e.v9n, e.ETs);
      }
    }
    return true;
  }
  Xjr(t) {
    if (this.Qjr === 0 && t > 0) {
      this.Xte.AddTag(1219330576);
    } else if (this.Qjr > 0 && this.Qjr + t <= 0) {
      this.Xte.RemoveTag(1219330576);
    }
    this.Qjr += t;
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharShieldChange, this.Qjr);
  }
  Add(t, e, i) {
    if (this.Kjr.get(t)) {
      this.ChangeValue(t, e, i);
    } else {
      e = new CharacterShield(t, e, i);
      this.Kjr.set(t, e);
      this.Xjr(e.ShieldValue);
    }
    this.m1t.TriggerEvents(7, this.m1t, {});
  }
  Remove(t) {
    var e = this.Kjr.get(t);
    if (e) {
      this.Xjr(-e.ShieldValue);
      this.$jr();
      this.Kjr.delete(t);
    }
  }
  ChangeValue(t, e, i) {
    var o;
    var r = this.Kjr.get(t);
    if (r) {
      o = r.ShieldValue;
      r.ShieldValue = i;
      this.Xjr(i - o);
    } else {
      this.Add(t, e, i);
    }
  }
  static OnShieldUpdateNotify(t, e) {
    var i = t?.GetComponent(75);
    if (i) {
      for (const s of e.kAs) {
        var o = s.OAs;
        var r = Protocol_1.Aki.Protocol.O4s;
        if (o === r.Proto_EShieldUpdateTypeAdd && s.ETs > 0) {
          i.Add(s.uVn, s.v9n, s.ETs);
        } else if (o === r.Proto_EShieldUpdateTypeDel && s.ETs === 0) {
          i.Remove(s.uVn);
        } else if (o === r.Proto_EShieldUpdateTypeModify && s.ETs > 0) {
          i.ChangeValue(s.uVn, s.v9n, s.ETs);
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Battle", 35, "护盾更新错误", ["shield", s]);
        }
      }
    }
  }
  GetShieldValue(t) {
    if (t === 0) {
      return this.ShieldTotal;
    }
    let e = 0;
    for (const i of this.Kjr.values()) {
      if (i.TemplateId === t) {
        e += i.ShieldValue;
      }
    }
    return e;
  }
  $jr() {
    this.m1t.TriggerEvents(8, this.m1t, {});
  }
  GetDebugShieldInfo() {
    return this.Kjr.entries();
  }
};
__decorate([CombatMessage_1.CombatNet.Listen("E3n", false)], CharacterShieldComponent, "OnShieldUpdateNotify", null);
CharacterShieldComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(75)], CharacterShieldComponent);
exports.CharacterShieldComponent = CharacterShieldComponent; //# sourceMappingURL=CharacterShieldComponent.js.map