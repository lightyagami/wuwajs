"use strict";

var __decorate = this && this.__decorate || function (t, e, o, i) {
  var s;
  var r = arguments.length;
  var n = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, o) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, o, i);
  } else {
    for (var f = t.length - 1; f >= 0; f--) {
      if (s = t[f]) {
        n = (r < 3 ? s(n) : r > 3 ? s(e, o, n) : s(e, o)) || n;
      }
    }
  }
  if (r > 3 && n) {
    Object.defineProperty(e, o, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionBuffComponent = undefined;
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const PhantomUtil_1 = require("../../../../../Module/Phantom/PhantomUtil");
const CombatLog_1 = require("../../../../../Utils/CombatLog");
const CharacterBuffComponent_1 = require("./CharacterBuffComponent");
let VisionBuffComponent = class VisionBuffComponent extends CharacterBuffComponent_1.CharacterBuffComponent {
  constructor() {
    super(...arguments);
    this.a2r = undefined;
  }
  h2r() {
    var t;
    if (this.a2r !== undefined) {
      return this.a2r;
    } else {
      return !!(t = this.Entity.GetComponent(61)?.GetAttributeHolder()) && t !== this.Entity && ((t = this.CreatureDataComponent.GetVisionComponent()) && (t = t.VisionId, t = PhantomUtil_1.PhantomUtil.GetVisionData(t), this.a2r = t?.buff是否转移 === true), this.a2r ?? false);
    }
  }
  AddBuff(t, e) {
    var o;
    if (this.CreatureDataId !== e.InstigatorId && this.h2r()) {
      if ((o = this.Entity.GetComponent(61)?.GetAttributeHolder()?.GetComponent(185)) && o !== this) {
        o.AddBuff(t, e);
      } else {
        CombatLog_1.CombatLog.Error("Buff", this.Entity, "添加幻象buff时无法获取到合法的召唤者", ["buffId", t], ["reason", e?.Reason]);
      }
    } else {
      super.AddBuff(t, e);
    }
  }
  RemoveBuff(t, e, o) {
    var i;
    if (this.h2r()) {
      if ((i = this.Entity.GetComponent(61)?.GetAttributeHolder()?.GetComponent(185)) && i !== this) {
        i.RemoveBuff(t, e, o);
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
    } else if ((o = this.Entity.GetComponent(61)?.GetAttributeHolder()?.GetComponent(185)) && o !== this) {
      return o.GetBuffApplyTarget(t, e);
    } else {
      return undefined;
    }
  }
};
VisionBuffComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(187)], VisionBuffComponent);
exports.VisionBuffComponent = VisionBuffComponent; //# sourceMappingURL=VisionBuffComponent.js.map