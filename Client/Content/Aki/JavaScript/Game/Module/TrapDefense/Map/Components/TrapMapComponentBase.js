"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapMapComponentBase = undefined;
class TrapMapComponentBase {
  constructor(t) {
    this.Parent = t;
    this.N9c = false;
    this.dYa = false;
    this.V9c = false;
    this.mYa = 0;
  }
  static GenComponentId() {
    TrapMapComponentBase._Xe = TrapMapComponentBase._Xe + 1;
    return TrapMapComponentBase._Xe;
  }
  get ComponentId() {
    if (this.mYa === 0) {
      this.mYa = TrapMapComponentBase.GenComponentId();
    }
    return this.mYa;
  }
  set ComponentId(t) {
    this.mYa = t;
  }
  get Enable() {
    return this.N9c;
  }
  set Enable(t) {
    if (this.N9c = t) {
      if (this.dYa) {
        this.dYa = false;
        this.OnStart();
      }
      this.OnEnable();
    } else {
      this.OnDisable();
    }
  }
  get EnableTick() {
    return this.V9c;
  }
  set EnableTick(t) {
    this.V9c = t;
  }
  Init() {
    this.dYa = true;
    this.OnInit();
  }
  Add() {
    this.OnAdd();
  }
  Remove() {
    this.OnRemove();
  }
  Tick(t) {
    if (this.Enable && this.EnableTick) {
      this.OnTick(t);
    }
  }
  OnAdd() {}
  OnStart() {}
  OnEnable() {}
  OnTick(t) {}
  OnDisable() {}
  OnRemove() {}
  OnInit() {}
}
(exports.TrapMapComponentBase = TrapMapComponentBase)._Xe = 0;
//# sourceMappingURL=TrapMapComponentBase.js.map