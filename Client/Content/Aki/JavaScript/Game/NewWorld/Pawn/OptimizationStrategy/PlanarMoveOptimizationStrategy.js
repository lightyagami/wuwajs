"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlanarMoveOptimizationStrategy = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const BaseOptimizationStrategy_1 = require("./BaseOptimizationStrategy");
class PlanarMoveOptimizationStrategy extends BaseOptimizationStrategy_1.BaseOptimizationStrategy {
  OnEntityInOutRangeLocal(t, e) {
    var a;
    if (e?.Valid && (a = e.Entity.GetComponent(189))?.Valid) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Optimization", 57, "[PlanarMoveOptimizationStrategy] 角色", ["handleId", e.Id], ["isEnter", t]);
      }
      a.SetKuroPlanarPhysWalking(t);
      a.SetKuroAsyncRootMotion(t);
    }
  }
}
exports.PlanarMoveOptimizationStrategy = PlanarMoveOptimizationStrategy;
//# sourceMappingURL=PlanarMoveOptimizationStrategy.js.map