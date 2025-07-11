"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskGamePlayCallFinish extends TsTaskAbortImmediatelyBase_1.default {
  Constructor() {
    super.Constructor();
  }
  ReceiveExecuteAI(e, s) {
    this.FinishExecute(true);
  }
}
exports.default = TsTaskGamePlayCallFinish;
//# sourceMappingURL=TsTaskGamePlayCallFinish.js.map