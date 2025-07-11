"use strict";

var __decorate = this && this.__decorate || function (e, t, o, n) {
  var i;
  var r = arguments.length;
  var s = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, o, n);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (i = e[a]) {
        s = (r < 3 ? i(s) : r > 3 ? i(t, o, s) : i(t, o)) || s;
      }
    }
  }
  if (r > 3 && s) {
    Object.defineProperty(t, o, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterAbilityComponent = undefined;
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const BaseAbilityComponent_1 = require("./BaseAbilityComponent");
let CharacterAbilityComponent = class CharacterAbilityComponent extends BaseAbilityComponent_1.BaseAbilityComponent {
  GetAbilitySystemComponent() {
    var e = this.Entity.GetComponent(3);
    if (e) {
      e.Actor.TryAddTsAbilitySystemComponent();
      return e.Actor.AbilitySystemComponent;
    }
  }
};
CharacterAbilityComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(18)], CharacterAbilityComponent);
exports.CharacterAbilityComponent = CharacterAbilityComponent; //# sourceMappingURL=CharacterAbilityComponent.js.map