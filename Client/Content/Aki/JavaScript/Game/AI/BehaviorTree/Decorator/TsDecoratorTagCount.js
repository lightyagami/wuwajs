"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class TsDecoratorTagCount extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments);
    this.BlackboardKeyTarget = "";
    this.Tag = undefined;
    this.Range = undefined;
    this.IsInitTsVariables = false;
    this.TsBlackboardKeyTarget = "";
    this.TsTag = undefined;
    this.TsRange = undefined;
  }
  Constructor() {
    this.IsInitTsVariables = false;
    this.TsBlackboardKeyTarget = "";
    this.TsTag = undefined;
    this.TsRange = undefined;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsBlackboardKeyTarget = this.BlackboardKeyTarget;
      this.TsTag = this.Tag;
      this.TsRange = new MathUtils_1.FastUeFloatRange(this.Range);
    }
  }
  PerformConditionCheckAI(t, r) {
    var i = t.AiController;
    if (!i) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
      }
      return false;
    }
    this.InitTsVariables();
    let o = i.CharActorComp;
    if (this.TsBlackboardKeyTarget) {
      t = ControllerHolder_1.ControllerHolder.BlackboardController.GetEntityIdByEntity(i.CharAiDesignComp.Entity.Id, this.TsBlackboardKeyTarget);
      if (!t) {
        return false;
      }
      i = ControllerHolder_1.ControllerHolder.CharacterController.GetCharacterActorComponentById(t);
      if (!i) {
        return false;
      }
      o = i;
    }
    t = o.Entity.CheckGetComponent(209).GetTagCount(this.TsTag.TagId);
    return MathUtils_1.MathUtils.InFastUeRange(t, this.TsRange);
  }
}
exports.default = TsDecoratorTagCount;
//# sourceMappingURL=TsDecoratorTagCount.js.map