"use strict";

var __decorate = this && this.__decorate || function (e, o, t, r) {
  var n;
  var i = arguments.length;
  var a = i < 3 ? o : r === null ? r = Object.getOwnPropertyDescriptor(o, t) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(e, o, t, r);
  } else {
    for (var l = e.length - 1; l >= 0; l--) {
      if (n = e[l]) {
        a = (i < 3 ? n(a) : i > 3 ? n(o, t, a) : n(o, t)) || a;
      }
    }
  }
  if (i > 3 && a) {
    Object.defineProperty(o, t, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiMotorDecorationComponent = undefined;
const SkeletalObserverManager_1 = require("../../../SkeletalObserver/SkeletalObserverManager");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelUtil_1 = require("../../UiModelUtil");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiMotorDecorationComponent = class UiMotorDecorationComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments);
    this._Gg = new Map();
  }
  OnEnd() {
    this.RemoveAllDecorationHandle();
  }
  GetDecorationHandle(e, o) {
    e = this._Gg.get(e);
    if (e) {
      return e.get(o);
    }
  }
  RemoveAllDecorationHandle() {
    for (const e of this._Gg.values()) {
      for (const o of e.values()) {
        SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(o);
      }
    }
    this._Gg.clear();
  }
  RemoveDecorationHandle(e, o) {
    var t = this._Gg.get(e);
    if (t) {
      if (o !== undefined) {
        var r = t.get(o);
        if (r !== undefined) {
          SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(r);
        }
        t.delete(o);
      } else {
        for (const n of t.values()) {
          SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(n);
        }
        this._Gg.delete(e);
      }
    }
  }
  AddDecorationHandle(e, o) {
    var t = SkeletalObserverManager_1.SkeletalObserverManager.NewSkeletalObserver(19);
    let r = this._Gg.get(e);
    (r = r || new Map()).set(o, t);
    this._Gg.set(e, r);
    return t;
  }
  ShowAllDecoration(e) {
    for (const o of this._Gg.values()) {
      for (const t of o.values()) {
        if (t && t.Model) {
          UiModelUtil_1.UiModelUtil.SetVisible(t.Model, e);
        }
      }
    }
  }
};
UiMotorDecorationComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(37)], UiMotorDecorationComponent);
exports.UiMotorDecorationComponent = UiMotorDecorationComponent; //# sourceMappingURL=UiMotorDecorationComponent.js.map