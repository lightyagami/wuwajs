"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAiTaskLeisureInteract = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const LevelAiTask_1 = require("../LevelAiTask");
const LevelAiTaskSitDown_1 = require("./LevelAiTaskSitDown");
class LevelAiTaskLeisureInteract extends LevelAiTask_1.LevelAiTask {
  constructor() {
    super(...arguments);
    this.CanRecordPlanProgress = false;
    this.Cost = 0;
    this.gU = false;
  }
  MakePlanExpansions(e, i) {
    this.PrintDescription("Leisure Interact Task Make Plan Expansions", ["LevelIndex", e.CurrentLevelIndex], ["StepIndex", e.CurrentStepIndex]);
    if (!this.gU) {
      this.Init();
    }
    this.CreatePlanSteps(e, i.MakeCopy());
  }
  Init() {
    if (!this.gU) {
      var i = this.Params;
      if (i) {
        let e = undefined;
        if (i.Option.Type === IAction_1.ENpcLeisureInteract.SitDown) {
          (e = new LevelAiTaskSitDown_1.LevelAiTaskSitDown()).Serialize(this.CharacterPlanComponent, this.CreatureDataComponent, this.Description + " SitDownTask", i);
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("LevelAi", 50, "[LevelAiTaskLeisureInteract] 未配置正确的行为类型", ["PbDataId", this.CreatureDataComponent.GetPbDataId()]);
        }
        if (e) {
          if (this.NextNodes.length) {
            for (const s of this.NextNodes) {
              e.NextNodes.push(s);
            }
            this.NextNodes.length = 0;
          }
          this.NextNodes.push(e);
        }
        this.gU = true;
      }
    }
  }
}
exports.LevelAiTaskLeisureInteract = LevelAiTaskLeisureInteract;
//# sourceMappingURL=LevelAiTaskLeisureInteract.js.map