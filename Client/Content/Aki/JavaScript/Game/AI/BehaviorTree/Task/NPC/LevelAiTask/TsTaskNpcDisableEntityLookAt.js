"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const TsTaskAbortImmediatelyBase_1 = require("../../TsTaskAbortImmediatelyBase");
class TsTaskNpcDisableEntityLookAt extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.Key = "";
  }
  Constructor() {
    super.Constructor();
  }
  ReceiveExecuteAI(e, s) {
    if (this.Key !== "") {
      if (ControllerHolder_1.ControllerHolder.NpcPerformController.EntityLookAtCacheForKey.has(this.Key)) {
        ControllerHolder_1.ControllerHolder.NpcPerformController.RemoveNpcLookAtParams(this.Key);
      }
    }
    this.FinishExecute(true);
  }
}
exports.default = TsTaskNpcDisableEntityLookAt;
//# sourceMappingURL=TsTaskNpcDisableEntityLookAt.js.map