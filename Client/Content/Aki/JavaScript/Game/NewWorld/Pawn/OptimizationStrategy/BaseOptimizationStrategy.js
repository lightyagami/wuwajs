"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseOptimizationStrategy = undefined;
class BaseOptimizationStrategy {
  constructor() {
    this.qW = false;
    this._5u = false;
    this.u5u = false;
    this.GW = false;
    this.qW = this.OnEnable !== BaseOptimizationStrategy.prototype.OnEnable;
    this._5u = this.OnMyPlayerInOutRangeLocal !== BaseOptimizationStrategy.prototype.OnMyPlayerInOutRangeLocal;
    this.u5u = this.OnEntityInOutRangeLocal !== BaseOptimizationStrategy.prototype.OnEntityInOutRangeLocal;
    this.GW = this.OnDisable !== BaseOptimizationStrategy.prototype.OnDisable;
  }
  get NeedEnable() {
    return this.qW;
  }
  get NeedTriggerMyPlayerInOutRange() {
    return this._5u;
  }
  get NeedTriggerEntityInOutRange() {
    return this.u5u;
  }
  get NeedDisable() {
    return this.GW;
  }
  Enable() {
    if (this.qW) {
      this.OnEnable();
    }
  }
  MyPlayerEntityInOutRange(t) {
    if (this._5u) {
      this.OnMyPlayerInOutRangeLocal(t);
    }
  }
  EntityInOutRange(t, e) {
    if (this.u5u) {
      this.OnEntityInOutRangeLocal(t, e);
    }
  }
  Disable() {
    if (this.GW) {
      this.OnDisable();
    }
  }
  OnEnable() {}
  OnMyPlayerInOutRangeLocal(t) {}
  OnEntityInOutRangeLocal(t, e) {}
  OnDisable() {}
}
exports.BaseOptimizationStrategy = BaseOptimizationStrategy;
//# sourceMappingURL=BaseOptimizationStrategy.js.map