"use strict";

var __decorate = this && this.__decorate || function (t, e, o, s) {
  var i;
  var r = arguments.length;
  var f = r < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, o) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    f = Reflect.decorate(t, e, o, s);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (i = t[n]) {
        f = (r < 3 ? i(f) : r > 3 ? i(e, o, f) : i(e, o)) || f;
      }
    }
  }
  if (r > 3 && f) {
    Object.defineProperty(e, o, f);
  }
  return f;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionBuffComponent = undefined;
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const CombatLog_1 = require("../../../../../Utils/CombatLog");
const CharacterBuffComponent_1 = require("./CharacterBuffComponent");
let VisionBuffComponent = class VisionBuffComponent extends CharacterBuffComponent_1.CharacterBuffComponent {
  constructor() {
    super(...arguments);
    this.a2r = undefined;
  }
  h2r() {
    var t;
    var e;
    if (this.a2r !== undefined) {
      return this.a2r;
    } else {
      return (e = this.Entity.GetComponent(56)?.GetAttributeHolder()) !== this.Entity && ((e = e?.CheckGetComponent(43)) && (t = e.GetVisionId(), e = e.GetVisionData(t), this.a2r = e?.buff是否转移 === true), this.a2r ?? false);
    }
  }
  AddBuff(t, e) {
    var o;
    if (this.CreatureDataId !== e.InstigatorId && this.h2r()) {
      if ((o = this.Entity.GetComponent(56)?.GetAttributeHolder()?.GetComponent(174)) && o !== this) {
        o.AddBuff(t, e);
      } else {
        CombatLog_1.CombatLog.Error("Buff", this.Entity, "添加幻象buff时无法获取到合法的召唤者", ["buffId", t], ["reason", e?.Reason]);
      }
    } else {
      super.AddBuff(t, e);
    }
  }
  RemoveBuff(t, e, o) {
    var s;
    if (this.h2r()) {
      if ((s = this.Entity.GetComponent(56)?.GetAttributeHolder()?.GetComponent(174)) && s !== this) {
        s.RemoveBuff(t, e, o);
      } else {
        CombatLog_1.CombatLog.Error("Buff", this.Entity, "移除幻象buff时无法获取到合法的召唤者", ["buffId", t], ["reason", o]);
      }
    }
    super.RemoveBuff(t, e, o);
  }
  GetBuffApplyTarget(t, e) {
    var o;
    if (this.CreatureDataId === e || !this.h2r()) {
      return this;
    } else if ((o = this.Entity.GetComponent(56)?.GetAttributeHolder()?.GetComponent(174)) && o !== this) {
      return o.GetBuffApplyTarget(t, e);
    } else {
      return undefined;
    }
  }
};
VisionBuffComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(176)], VisionBuffComponent);
exports.VisionBuffComponent = VisionBuffComponent; //# sourceMappingURL=VisionBuffComponent.js.map