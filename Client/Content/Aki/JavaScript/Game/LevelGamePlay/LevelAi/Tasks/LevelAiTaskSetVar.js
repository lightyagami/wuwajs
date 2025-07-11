"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAiTaskSetVar = undefined;
const LevelAiTask_1 = require("../LevelAiTask");
class LevelAiTaskSetVar extends LevelAiTask_1.LevelAiTask {
  CreatePlanSteps(e, t) {
    var s = this.Params;
    if (s.VarLeft.Type !== s.VarRight.Type || s.VarLeft.Source !== "Self" || s.VarRight.Source !== "Constant") {
      this.PrintDescription("配置错误");
    } else if (this.CIe(t, s.VarLeft.Name, s.VarRight)) {
      e.SubmitCandidatePlanStep(this, t, 0);
    } else {
      this.PrintDescription("配置类型错误");
    }
  }
  ExecuteTask() {
    var e = this.Params;
    if (e.VarLeft.Type === e.VarRight.Type && e.VarLeft.Source === "Self" && e.VarRight.Source === "Constant" && this.CIe(this.CharacterPlanComponent.WorldState, e.VarLeft.Name, e.VarRight)) {
      return 0;
    } else {
      return 1;
    }
  }
  CIe(e, t, s) {
    switch (s.Type) {
      case "Int":
        e.SetIntWorldState(t, s.Value);
        return true;
      case "Boolean":
        e.SetBooleanWorldState(t, s.Value);
        return true;
      default:
        return false;
    }
  }
}
exports.LevelAiTaskSetVar = LevelAiTaskSetVar;
//# sourceMappingURL=LevelAiTaskSetVar.js.map