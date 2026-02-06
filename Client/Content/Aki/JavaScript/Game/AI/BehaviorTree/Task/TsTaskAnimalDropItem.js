"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class TsTaskAnimalDropItem extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.DoOnce = true;
    this.IsInitTsVariables = false;
    this.TsDoOnce = true;
    this.HasDone = false;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsDoOnce = true;
    this.HasDone = false;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsDoOnce = this.DoOnce;
    }
  }
  ReceiveExecuteAI(e, s) {
    this.InitTsVariables();
    var t = e.AiController;
    if (t) {
      if ((t = t.CharActorComp.Entity).GetComponent(50)) {
        if (!this.TsDoOnce || !this.HasDone) {
          t = t.GetComponent(0).GetCreatureDataId();
          ControllerHolder_1.ControllerHolder.CreatureController.AnimalDropItemRequest(Number(t));
          this.HasDone = true;
        }
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
exports.default = TsTaskAnimalDropItem;
//# sourceMappingURL=TsTaskAnimalDropItem.js.map