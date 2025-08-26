"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConditionListener = undefined;
class ConditionListener {
  constructor() {
    this.nK = new Map();
    this.BCu = new Map();
    this.sK = undefined;
    this.aK = undefined;
  }
  get PendingAddHandles() {
    return this.sK;
  }
  get PendingRemoveHandles() {
    return this.aK;
  }
  IsHandlesEmpty() {
    return this.nK.size === 0;
  }
  Has(e, t) {
    e = this.nK.get(e);
    return !!e && e.has(t);
  }
  IsInPendingAdd(e, t) {
    return !!this.sK && !!(e = this.sK.get(e)) && e.has(t);
  }
  IsInPendingRemove(e, t) {
    return !!this.aK && !!(e = this.aK.get(e)) && e.has(t);
  }
  GetHandlesByParam(e) {
    return this.nK.get(e);
  }
  DeleteHandlesByParam(e) {
    return this.nK.delete(e);
  }
  GetHandleListenCount(e) {
    return this.BCu.get(e) ?? 0;
  }
  Add(e, t, n) {
    let s = this.nK.get(e);
    if (!s) {
      s = new Map();
      this.nK.set(e, s);
    }
    if (s.has(t)) {
      return false;
    }
    s.set(t, n);
    e = this.BCu.get(t) ?? 0;
    this.BCu.set(t, ++e);
    return true;
  }
  Remove(e, t) {
    var n;
    var e = this.nK.get(e);
    return !!e && (e = e.delete(t), (n = this.BCu.get(t)) && (--n > 0 ? this.BCu.set(t, n) : this.BCu.delete(t)), e);
  }
  AddToPendingAddHandles(e, t, n) {
    this.sK ||= new Map();
    let s = this.sK.get(e);
    return !s?.has(t) && (s || (s = new Map(), this.sK.set(e, s)), s.set(t, n), true);
  }
  AddToPendingRemoveHandles(e, t) {
    this.aK ||= new Map();
    let n = this.aK.get(e);
    return !n?.has(t) && (n || (n = new Set(), this.aK.set(e, n)), n.add(t), true);
  }
  RemoveFromPendingAddHandles(e, t) {
    return !!this.sK && !!(e = this.sK.get(e)) && e.delete(t);
  }
  RemoveFromPendingMoveHandles(e, t) {
    return !!this.aK && !!(e = this.aK.get(e)) && e.delete(t);
  }
}
exports.ConditionListener = ConditionListener;
//# sourceMappingURL=EventConditionListener.js.map