"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseOptimizationStrategy = undefined;
class BaseOptimizationStrategy {
  constructor() {
    this.qW = false;
    this.dVu = false;
    this.mVu = false;
    this.GW = false;
    this.qW = this.OnEnable !== BaseOptimizationStrategy.prototype.OnEnable;
    this.dVu = this.OnMyPlayerInOutRangeLocal !== BaseOptimizationStrategy.prototype.OnMyPlayerInOutRangeLocal;
    this.mVu = this.OnEntityInOutRangeLocal !== BaseOptimizationStrategy.prototype.OnEntityInOutRangeLocal;
    this.GW = this.OnDisable !== BaseOptimizationStrategy.prototype.OnDisable;
  }
  get NeedEnable() {
    return this.qW;
  }
  get NeedTriggerMyPlayerInOutRange() {
    return this.dVu;
  }
  get NeedTriggerEntityInOutRange() {
    return this.mVu;
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
    if (this.dVu) {
      this.OnMyPlayerInOutRangeLocal(t);
    }
  }
  EntityInOutRange(t, e) {
    if (this.mVu) {
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