"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DamageOptimizationStrategy = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const BaseOptimizationStrategy_1 = require("./BaseOptimizationStrategy");
class DamageOptimizationStrategy extends BaseOptimizationStrategy_1.BaseOptimizationStrategy {
  constructor() {
    super(...arguments);
    this.c5u = 0;
  }
  OnEnable() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Optimization", 57, "DamageUIOptimizationStrategy Enable");
    }
    this.c5u = ControllerHolder_1.ControllerHolder.DamageUiController.EnableDamageViewOptimization();
  }
  OnDisable() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Optimization", 57, "DamageUIOptimizationStrategy Disable");
    }
    ControllerHolder_1.ControllerHolder.DamageUiController.DisableDamageViewOptimization(this.c5u);
  }
}
exports.DamageOptimizationStrategy = DamageOptimizationStrategy;
//# sourceMappingURL=DamageOptimizationStrategy.js.map