"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BaseOptimizationStrategy = void 0;
class BaseOptimizationStrategy {
  constructor() {
    this.qW = !1, this.Bgu = !1, this.kgu = !1, this.GW = !1, this.qW = this.OnEnable !== BaseOptimizationStrategy.prototype.OnEnable, this.Bgu = this.OnMyPlayerInOutRangeLocal !== BaseOptimizationStrategy.prototype.OnMyPlayerInOutRangeLocal, this.kgu = this.OnEntityInOutRangeLocal !== BaseOptimizationStrategy.prototype.OnEntityInOutRangeLocal, this.GW = this.OnDisable !== BaseOptimizationStrategy.prototype.OnDisable
  }
  get NeedEnable() {
    return this.qW
  }
  get NeedTriggerMyPlayerInOutRange() {
    return this.Bgu
  }
  get NeedTriggerEntityInOutRange() {
    return this.kgu
  }
  get NeedDisable() {
    return this.GW
  }
  Enable() {
    this.qW && this.OnEnable()
  }
  MyPlayerEntityInOutRange(t) {
    this.Bgu && this.OnMyPlayerInOutRangeLocal(t)
  }
  EntityInOutRange(t, e) {
    this.kgu && this.OnEntityInOutRangeLocal(t, e)
  }
  Disable() {
    this.GW && this.OnDisable()
  }
  OnEnable() {}
  OnMyPlayerInOutRangeLocal(t) {}
  OnEntityInOutRangeLocal(t, e) {}
  OnDisable() {}
}
exports.BaseOptimizationStrategy = BaseOptimizationStrategy;
//# sourceMappingURL=BaseOptimizationStrategy.js.map