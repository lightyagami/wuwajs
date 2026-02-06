"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const ActorUtils_1 = require("../../../Utils/ActorUtils");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskChangeMovementMode extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.MovementMode = 0;
    this.IsInitTsVariables = false;
    this.TsMovementMode = 0;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsMovementMode = 0;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsMovementMode = this.MovementMode;
    }
  }
  ReceiveExecuteAI(e, t) {
    this.InitTsVariables();
    var s;
    var o = e.AiController;
    if (o) {
      if ((o = o.CharActorComp) && (s = ActorUtils_1.ActorUtils.GetEntityByActor(o.Actor)) && s.Entity.GetComponent(48)) {
        o.Actor.KuroSetMovementMode({
          Mode: this.TsMovementMode,
          Context: "[TsTaskChangeMovementMode.ReceiveExecuteAI]"
        });
      }
      this.FinishExecute(true);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
}
exports.default = TsTaskChangeMovementMode;
//# sourceMappingURL=TsTaskChangeMovementMode.js.map