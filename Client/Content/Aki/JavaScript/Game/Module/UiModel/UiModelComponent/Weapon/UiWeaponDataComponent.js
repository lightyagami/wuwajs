"use strict";

var __decorate = this && this.__decorate || function (e, o, t, n) {
  var a;
  var i = arguments.length;
  var p = i < 3 ? o : n === null ? n = Object.getOwnPropertyDescriptor(o, t) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    p = Reflect.decorate(e, o, t, n);
  } else {
    for (var r = e.length - 1; r >= 0; r--) {
      if (a = e[r]) {
        p = (i < 3 ? a(p) : i > 3 ? a(o, t, p) : a(o, t)) || p;
      }
    }
  }
  if (i > 3 && p) {
    Object.defineProperty(o, t, p);
  }
  return p;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiWeaponDataComponent = undefined;
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiWeaponDataComponent = class UiWeaponDataComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments);
    this.ABr = undefined;
  }
  get WeaponConfigId() {
    return this.ABr?.GetItemId() ?? 0;
  }
  get WeaponData() {
    return this.ABr;
  }
  SetWeaponData(e) {
    this.ABr = e;
  }
};
UiWeaponDataComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(22)], UiWeaponDataComponent);
exports.UiWeaponDataComponent = UiWeaponDataComponent; //# sourceMappingURL=UiWeaponDataComponent.js.map