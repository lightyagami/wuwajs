"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskAiUseItem extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.ItemBlackboardKey = "";
    this.IsInitTsVariables = false;
    this.TsItemBlackboardKey = "";
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsItemBlackboardKey = "";
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsItemBlackboardKey = this.ItemBlackboardKey;
    }
  }
  ReceiveExecuteAI(e, r) {
    var s;
    var t = e.AiController;
    if (t) {
      this.InitTsVariables();
      t = t.CharActorComp;
      s = ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(t.Entity.Id, this.TsItemBlackboardKey);
      if (GlobalData_1.GlobalData.Networking()) {
        ModelManager_1.ModelManager.AiWeaponModel.Net.SendHoldWeaponPushOnSafe(t.Entity.Id, s);
        this.FinishExecute(true);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
    }
  }
}
exports.default = TsTaskAiUseItem;
//# sourceMappingURL=TsTaskAiUseItem.js.map