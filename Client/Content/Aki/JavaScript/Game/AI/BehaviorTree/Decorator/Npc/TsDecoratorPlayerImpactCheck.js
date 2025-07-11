"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const GlobalData_1 = require("../../../../GlobalData");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const TsAiController_1 = require("../../../Controller/TsAiController");
class TsDecoratorPlayerImpactCheck extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.BlackboardKey = "玩家冲撞";
    this.IsCollected = false;
    this.IsInitTsVariables = false;
    this.TsBlackboardKey = "";
  }
  Constructor() {
    this.IsCollected = false;
    this.IsInitTsVariables = false;
    this.TsBlackboardKey = "";
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsBlackboardKey = this.BlackboardKey;
    }
  }
  PerformConditionCheckAI(r, t) {
    var e;
    return r instanceof TsAiController_1.default && (this.InitTsVariables(), this.IsCollected || (e = r.AiController.NpcDecision) && (this.IsCollected = true, e.CheckPlayerImpact = true), !!(e = r.AiController.CharActorComp)) && (r = e.Entity.Id, ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(r, this.TsBlackboardKey) === 1);
  }
}
exports.default = TsDecoratorPlayerImpactCheck;
//# sourceMappingURL=TsDecoratorPlayerImpactCheck.js.map