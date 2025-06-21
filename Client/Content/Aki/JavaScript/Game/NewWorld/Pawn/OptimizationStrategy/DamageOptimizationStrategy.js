"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DamageOptimizationStrategy = void 0;
const Log_1 = require("../../../../Core/Common/Log"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  BaseOptimizationStrategy_1 = require("./BaseOptimizationStrategy");
class DamageOptimizationStrategy extends BaseOptimizationStrategy_1.BaseOptimizationStrategy {
  constructor() {
    super(...arguments), this.Ogu = 0
  }
  OnEnable() {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("Optimization", 57, "DamageUIOptimizationStrategy Enable"), this.Ogu = ControllerHolder_1.ControllerHolder.DamageUiController.EnableDamageViewOptimization()
  }
  OnDisable() {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("Optimization", 57, "DamageUIOptimizationStrategy Disable"), ControllerHolder_1.ControllerHolder.DamageUiController.DisableDamageViewOptimization(this.Ogu)
  }
}
exports.DamageOptimizationStrategy = DamageOptimizationStrategy;
//# sourceMappingURL=DamageOptimizationStrategy.js.map