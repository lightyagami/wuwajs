"use strict";

var __decorate = this && this.__decorate || function (e, t, n, o) {
  var r;
  var i = arguments.length;
  var s = i < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, n) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, n, o);
  } else {
    for (var f = e.length - 1; f >= 0; f--) {
      if (r = e[f]) {
        s = (i < 3 ? r(s) : i > 3 ? r(t, n, s) : r(t, n)) || s;
      }
    }
  }
  if (i > 3 && s) {
    Object.defineProperty(t, n, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectAreaComponent = undefined;
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
let EffectAreaComponent = class EffectAreaComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Zhn = false;
    this.eln = e => {
      this.Zhn = e;
    };
  }
  OnInitData(e) {
    return true;
  }
  OnStart() {
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.eln);
    return true;
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.eln);
    if (this.Zhn) {
      this.eln(false);
    }
    return true;
  }
};
EffectAreaComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(233)], EffectAreaComponent);
exports.EffectAreaComponent = EffectAreaComponent; //# sourceMappingURL=EffectAreaComponent.js.map