"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputCombinationActionMapping = undefined;
const InputCombinationActionBinding_1 = require("../Binding/InputCombinationActionBinding");
class InputCombinationActionMapping {
  constructor() {
    this.YEe = new Map();
    this.JEe = new Map();
    this.zEe = new Set();
  }
  Clear() {
    for (const i of this.YEe.values()) {
      i.Clear();
    }
    this.YEe.clear();
    this.JEe.clear();
    this.zEe.clear();
  }
  NewCombinationActionBinding(i, n, t) {
    var o = new InputCombinationActionBinding_1.InputCombinationActionBinding();
    o.Initialize(i, n, t);
    this.YEe.set(i, o);
    return o;
  }
  AddKey(i, n, t, o) {
    i.AddKey(n, t, o);
    let e = this.JEe.get(n);
    if (!e) {
      e = new Map();
      this.JEe.set(n, e);
    }
    let s = e.get(t);
    if (!s) {
      s = new Map();
      e.set(t, s);
    }
    s.set(i.GetActionName(), i);
    this.zEe.add(n);
  }
  RemoveKey(i, n, t, o) {
    i.RemoveKey(n, o);
    var o = i.GetActionName();
    var e = this.JEe.get(n);
    if (e) {
      var s = e.get(t);
      if (!s) {
        return;
      }
      if (!i.HasKeyByAll(n, t)) {
        s.delete(o);
      }
      if (s.size <= 0) {
        e.delete(t);
      }
      if (e.size <= 0) {
        this.JEe.delete(n);
        this.zEe.delete(n);
      }
    } else {
      this.zEe.delete(n);
    }
    if (!i.HasAnyKey()) {
      this.YEe.delete(o);
    }
  }
  GetCombinationActionBindingByKeyName(i, n) {
    i = this.JEe.get(i);
    if (i) {
      return i.get(n);
    }
  }
  GetCombinationActionBindingByActionName(i) {
    return this.YEe.get(i);
  }
  GetCombinationActionBindingMap() {
    return this.YEe;
  }
  IsMainKey(i) {
    return this.zEe.has(i);
  }
  SwitchKeysByBindingType(i) {
    for (const n of this.YEe.values()) {
      n.SwitchKeysByBindingType(i);
    }
  }
}
exports.InputCombinationActionMapping = InputCombinationActionMapping;
//# sourceMappingURL=InputCombinationActionMapping.js.map