"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAiStandaloneNode = undefined;
const LevelAiNode_1 = require("./LevelAiNode");
class LevelAiStandaloneNode extends LevelAiNode_1.LevelAiNode {
  constructor() {
    super(...arguments);
    this.PlanNextNodesAfterThis = true;
    this.NextNodes = new Array();
    this.Decorators = new Array();
  }
  MakePlanExpansions(e, t) {}
  GetNextSteps(e, t) {
    e.SubmitPlanStep(t);
  }
  OnSubLevelStepFinished(e, t, s, o, n) {
    return true;
  }
}
exports.LevelAiStandaloneNode = LevelAiStandaloneNode;
//# sourceMappingURL=LevelAiStandaloneNode.js.map