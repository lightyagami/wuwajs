"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const GlobalData_1 = require("../../../../../GlobalData");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
class TsDecoratorEntityStateCheck extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.CheckType = 0;
    this.StatusEntityId = 0;
    this.State = "";
    this.IsInitTsVariables = false;
    this.TsCheckType = 0;
    this.TsStatusEntityId = 0;
    this.TsState = "";
  }
  Constructor() {
    this.IsInitTsVariables = false;
    this.TsCheckType = 0;
    this.TsStatusEntityId = 0;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsCheckType = this.CheckType;
      this.TsStatusEntityId = this.StatusEntityId;
      this.TsState = this.State;
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
    if (!this.TsStatusEntityId || this.TsState === "") {
      return false;
    }
    t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.TsStatusEntityId);
    if (!t?.Valid) {
      return false;
    }
    t = t.Entity.GetComponent(208);
    if (!t) {
      return false;
    }
    var r = t.ContainsTagByName(this.TsState);
    switch (this.TsCheckType) {
      case 0:
        return r;
      case 1:
        return !r;
      default:
        return false;
    }
  }
}
exports.default = TsDecoratorEntityStateCheck;
//# sourceMappingURL=TsDecoratorEntityStateCheck.js.map