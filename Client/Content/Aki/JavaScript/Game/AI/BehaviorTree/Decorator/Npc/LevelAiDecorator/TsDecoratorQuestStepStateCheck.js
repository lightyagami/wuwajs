"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const GlobalData_1 = require("../../../../../GlobalData");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
class TsDecoratorQuestStepStateCheck extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.QuestId = 0;
    this.ChildQuestId = 0;
    this.CheckType = 0;
    this.IsInitTsVariables = false;
    this.TsQuestId = 0;
    this.TsChildQuestId = 0;
    this.TsCheckType = 0;
  }
  Constructor() {
    this.IsInitTsVariables = false;
    this.TsQuestId = 0;
    this.TsChildQuestId = 0;
    this.TsCheckType = 0;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsQuestId = this.QuestId;
      this.TsChildQuestId = this.ChildQuestId;
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
    if (!this.TsQuestId || !this.TsChildQuestId) {
      return false;
    }
    let s = false;
    switch (ModelManager_1.ModelManager.QuestNewModel.GetQuestState(this.TsQuestId)) {
      case 0:
      case 1:
        s = false;
        break;
      case 3:
        s = true;
        break;
      case 2:
        var r = ModelManager_1.ModelManager.QuestNewModel.GetQuest(this.TsQuestId)?.GetNode(this.TsChildQuestId);
        s = r?.IsSuccess ?? false;
    }
    if (this.TsCheckType === 0) {
      return s;
    } else {
      return !s;
    }
  }
}
exports.default = TsDecoratorQuestStepStateCheck;
//# sourceMappingURL=TsDecoratorQuestStepStateCheck.js.map