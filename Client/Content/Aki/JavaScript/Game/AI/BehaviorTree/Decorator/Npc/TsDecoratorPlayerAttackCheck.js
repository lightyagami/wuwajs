"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const GlobalData_1 = require("../../../../GlobalData");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const TsAiController_1 = require("../../../Controller/TsAiController");
class TsDecoratorPlayerAttackCheck extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.BlackboardKey = "玩家攻击";
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
    this.InitTsVariables();
    return r instanceof TsAiController_1.default && (this.IsCollected || (e = r.AiController.NpcDecision) && (this.IsCollected = true, e.CheckPlayerAttack = true), !!(e = r.AiController.CharActorComp)) && (r = e.Entity.Id, ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(r, this.TsBlackboardKey) === 1);
  }
}
exports.default = TsDecoratorPlayerAttackCheck;
//# sourceMappingURL=TsDecoratorPlayerAttackCheck.js.map