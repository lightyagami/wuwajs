"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskWriteEntityId extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.BlackboardKeyTarget = "";
    this.BlackboardKeyWriteTo = "";
    this.IsInitTsVariables = false;
    this.TsBlackboardKeyTarget = "";
    this.TsBlackboardKeyWriteTo = "";
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsBlackboardKeyTarget = "";
    this.TsBlackboardKeyWriteTo = "";
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsBlackboardKeyTarget = this.BlackboardKeyTarget;
      this.TsBlackboardKeyWriteTo = this.BlackboardKeyWriteTo;
    }
  }
  ReceiveTickAI(e, t, r) {
    var s = e.AiController;
    if (s) {
      this.InitTsVariables();
      if (this.TsBlackboardKeyTarget) {
        let e = 0;
        if (this.TsBlackboardKeyTarget) {
          if (!(e = ControllerHolder_1.ControllerHolder.BlackboardController.GetEntityIdByEntity(s.CharAiDesignComp.Entity.Id, this.TsBlackboardKeyTarget))) {
            this.FinishExecute(false);
            return;
          }
          if (!(ModelManager_1.ModelManager.CreatureModel.GetEntityById(e)?.Entity?.GetComponent(1)?.Owner instanceof TsBaseCharacter_1.default)) {
            this.FinishExecute(false);
            return;
          }
        }
        ControllerHolder_1.ControllerHolder.BlackboardController.SetEntityIdByEntity(e, this.TsBlackboardKeyWriteTo, s.CharAiDesignComp.Entity.Id);
        this.FinishExecute(true);
      } else {
        this.FinishExecute(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
}
exports.default = TsTaskWriteEntityId;
//# sourceMappingURL=TsTaskWriteEntityId.js.map