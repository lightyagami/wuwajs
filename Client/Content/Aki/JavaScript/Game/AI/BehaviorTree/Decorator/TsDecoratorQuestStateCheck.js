"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
class TsDecoratorQuestStateCheck extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.QuestId = 0;
    this.CheckStateId = 0;
    this.CheckType = 0;
    this.IsInitTsVariables = false;
    this.TsQuestId = 0;
    this.TsCheckStateId = 0;
    this.TsCheckType = 0;
  }
  Constructor() {
    this.IsInitTsVariables = false;
    this.TsQuestId = 0;
    this.TsCheckStateId = 0;
    this.TsCheckType = 0;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsQuestId = this.QuestId;
      this.TsCheckStateId = this.CheckStateId;
      this.TsCheckType = this.CheckType;
    }
  }
  PerformConditionCheckAI(t, e) {
    if (!t.AiController) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
      }
      return false;
    }
    this.InitTsVariables();
    if (!this.TsQuestId) {
      return false;
    }
    var s = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(this.TsQuestId) === this.TsCheckStateId;
    switch (this.TsCheckType) {
      case 0:
        return s;
      case 1:
        return !s;
      default:
        return false;
    }
  }
}
exports.default = TsDecoratorQuestStateCheck;
//# sourceMappingURL=TsDecoratorQuestStateCheck.js.map