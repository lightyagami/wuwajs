"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const ICondition_1 = require("../../../../../../UniverseEditor/Interface/ICondition");
const GlobalData_1 = require("../../../../../GlobalData");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
class TsDecoratorLevelPlayStateCheck extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.CheckType = 0;
    this.LevelPlayId = 0;
    this.StateId = 0;
    this.IsInitTsVariables = false;
    this.TsCheckType = 0;
    this.TsLevelPlayId = 0;
    this.TsStateId = ICondition_1.ELevelPlayState.Close;
  }
  Constructor() {
    this.IsInitTsVariables = false;
    this.TsCheckType = 0;
    this.TsLevelPlayId = 0;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsCheckType = this.CheckType;
      this.TsLevelPlayId = this.LevelPlayId;
      this.TsStateId = this.StateId;
    }
  }
  PerformConditionCheckAI(e, t) {
    if (!e.AiController) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      return false;
    }
    this.InitTsVariables();
    if (!this.TsLevelPlayId) {
      return false;
    }
    switch (this.TsCheckType) {
      case 0:
        return ModelManager_1.ModelManager.LevelPlayModel.CheckLevelPlayState(this.TsLevelPlayId, this.TsStateId, "Eq");
      case 1:
        return ModelManager_1.ModelManager.LevelPlayModel.CheckLevelPlayState(this.TsLevelPlayId, this.TsStateId, "Ne");
      default:
        return false;
    }
  }
}
exports.default = TsDecoratorLevelPlayStateCheck;
//# sourceMappingURL=TsDecoratorLevelPlayStateCheck.js.map