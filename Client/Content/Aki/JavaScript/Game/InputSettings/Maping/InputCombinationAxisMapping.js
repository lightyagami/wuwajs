"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputCombinationAxisMapping = undefined;
const Log_1 = require("../../../Core/Common/Log");
const InputCombinationAxisBinding_1 = require("../Binding/InputCombinationAxisBinding");
class InputCombinationAxisMapping {
  constructor() {
    this.ZEe = new Map();
    this.eSe = new Map();
    this.zEe = new Set();
  }
  Clear() {
    for (const i of this.ZEe.values()) {
      i.Clear();
    }
    this.ZEe.clear();
    this.eSe.clear();
  }
  NewCombinationAxisBinding(i) {
    var n;
    var t;
    var e;
    var s;
    var o = i.AxisName;
    var a = new InputCombinationAxisBinding_1.InputCombinationAxisBinding();
    a.Initialize(i);
    this.ZEe.set(o, a);
    var o = new Map();
    a.GetPcKeyNameMap(o, i.ExclusiveType);
    var r = new Map();
    a.GetGamepadKeyNameMap(r, i.ExclusiveType);
    for ([n, t] of o) {
      this.AddKeyMap(a, n, t, i.ExclusiveType);
    }
    for ([e, s] of r) {
      this.AddKeyMap(a, e, s, i.ExclusiveType);
    }
  }
  AddKeyMap(i, n, t, e) {
    let s = this.eSe.get(t);
    if (!s) {
      s = new Map();
      this.eSe.set(t, s);
    }
    let o = s.get(n);
    if (!o) {
      o = [];
      s.set(n, o);
    }
    o.push(i);
    i.AddKey(n, t, e);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InputSettings", 10, "[AddKeyMap]", ["mainKeyName", t], ["secondaryKeyName", n], ["MainKeySet", this.zEe]);
    }
    this.zEe.add(t);
  }
  RemoveKeyMap(i, n, t, e) {
    i.RemoveKey(t, e);
    var s = i.GetAxisName();
    var o = this.eSe.get(n);
    if (o) {
      var a = o.get(t);
      if (!a) {
        return;
      }
      var r = a.indexOf(i);
      a.splice(r, 1);
      if (a.length <= 0) {
        o.delete(t);
      }
      if (o.size <= 0) {
        this.eSe.delete(n);
        this.zEe.delete(n);
      }
    } else {
      this.zEe.delete(n);
    }
    r = new Map();
    i.GetKeyMap(r, e);
    if (r.size <= 0) {
      this.ZEe.delete(s);
    }
  }
  GetCombinationAxisBindingMapByMainKeyName(i) {
    return this.eSe.get(i);
  }
  GetCombinationAxisBindingByKeyName(i, n) {
    i = this.eSe.get(i);
    if (i) {
      return i.get(n);
    }
  }
  GetCombinationAxisBindingByAxisName(i) {
    return this.ZEe.get(i);
  }
  GetCombinationAxisBindingMap() {
    return this.ZEe;
  }
  IsMainKey(i) {
    return this.zEe.has(i);
  }
  SwitchKeysByBindingType(i) {
    for (const n of this.ZEe.values()) {
      n.SwitchKeysByBindingType(i);
    }
  }
}
exports.InputCombinationAxisMapping = InputCombinationAxisMapping;
//# sourceMappingURL=InputCombinationAxisMapping.js.map