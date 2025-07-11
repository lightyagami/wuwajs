"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseOptimizationStrategy = undefined;
class BaseOptimizationStrategy {
  constructor() {
    this.qW = false;
    this.p7c = false;
    this.v7c = false;
    this.GW = false;
    this.qW = this.OnEnable !== BaseOptimizationStrategy.prototype.OnEnable;
    this.p7c = this.OnMyPlayerInOutRangeLocal !== BaseOptimizationStrategy.prototype.OnMyPlayerInOutRangeLocal;
    this.v7c = this.OnEntityInOutRangeLocal !== BaseOptimizationStrategy.prototype.OnEntityInOutRangeLocal;
    this.GW = this.OnDisable !== BaseOptimizationStrategy.prototype.OnDisable;
  }
  get NeedEnable() {
    return this.qW;
  }
  get NeedTriggerMyPlayerInOutRange() {
    return this.p7c;
  }
  get NeedTriggerEntityInOutRange() {
    return this.v7c;
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
    if (this.p7c) {
      this.OnMyPlayerInOutRangeLocal(t);
    }
  }
  EntityInOutRange(t, e) {
    if (this.v7c) {
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