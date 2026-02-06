"use strict";

var __decorate = this && this.__decorate || function (t, e, o, i) {
  var n;
  var r = arguments.length;
  var s = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, o) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, e, o, i);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (n = t[a]) {
        s = (r < 3 ? n(s) : r > 3 ? n(e, o, s) : n(e, o)) || s;
      }
    }
  }
  if (r > 3 && s) {
    Object.defineProperty(e, o, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiMotorDataComponent = undefined;
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiMotorDataComponent = class UiMotorDataComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments);
    this.bVi = 0;
    this.hGg = [];
    this.FYh = 0;
    this.lGg = [];
    this.JGi = 0;
    this.aTl = 0;
    this.K7g = "";
  }
  GetSkinId() {
    return this.bVi;
  }
  GetFrameId() {
    return this.FYh;
  }
  GetStickerIdList() {
    return this.hGg;
  }
  GetDecorateIdList() {
    return this.lGg;
  }
  SetSkinId(t) {
    this.bVi = t;
  }
  SetFrameId(t) {
    this.FYh = t;
  }
  SetStickerIdList(t) {
    this.hGg = t;
  }
  SetDecorateIdList(t) {
    this.lGg = t;
  }
  SetDecorationId(t, e) {
    this.lGg[t - 1] = e;
  }
  IsSameDecorationId(t, e) {
    return this.lGg[t - 1] === e;
  }
  SetRoleData(t, e, o) {
    this.JGi = t;
    this.aTl = e;
    this.K7g = o ?? "";
  }
  GetRoleId() {
    return this.JGi;
  }
  GetRoleSkinId() {
    return this.aTl;
  }
  GetAnimPath() {
    return this.K7g;
  }
};
UiMotorDataComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(32)], UiMotorDataComponent);
exports.UiMotorDataComponent = UiMotorDataComponent; //# sourceMappingURL=UiMotorDataComponent.js.map