"use strict";

var SafetyLocationComponent_1;
var __decorate = this && this.__decorate || function (t, e, n, o) {
  var i;
  var r = arguments.length;
  var s = r < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, n) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, e, n, o);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (i = t[a]) {
        s = (r < 3 ? i(s) : r > 3 ? i(e, n, s) : i(e, n)) || s;
      }
    }
  }
  if (r > 3 && s) {
    Object.defineProperty(e, n, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SafetyLocationComponent = undefined;
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../Global");
let SafetyLocationComponent = SafetyLocationComponent_1 = class SafetyLocationComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.R0n = undefined;
    this.Rya = false;
    this.Aya = t => {
      this.Rya = t;
      var e = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()?.GetComponent(100);
      if (e) {
        if (t) {
          e.AddSafetyLocationConfig(this.Entity, this.R0n);
        } else {
          e.RemoveSafetyLocationConfig(this.Entity);
        }
      }
    };
  }
  OnInitData(t) {
    t = t.GetParam(SafetyLocationComponent_1)[0];
    this.R0n = t;
    return true;
  }
  OnStart() {
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.Aya);
    return true;
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.Aya);
    if (this.Rya) {
      this.Aya(false);
    }
    return true;
  }
};
SafetyLocationComponent = SafetyLocationComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(256)], SafetyLocationComponent);
exports.SafetyLocationComponent = SafetyLocationComponent; //# sourceMappingURL=SafetyLocationComponent.js.map