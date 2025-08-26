"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchDebugInfoActionData = undefined;
const FloroRanchDebugLogUtil_1 = require("../../FloroRanchDebugLogUtil");
const FloroRanchActionBase_1 = require("./FloroRanchActionBase");
class FloroRanchDebugInfoActionData extends FloroRanchActionBase_1.FloroRanchActionDataBase {
  constructor(o) {
    super(o);
    this.fKu = undefined;
    this.fKu = o.d7u;
  }
  async OnExecute() {
    FloroRanchDebugLogUtil_1.FloroRanchDebugLogUtil.LogTagActionInfo(this.CasterEntity, this.fKu);
    return Promise.resolve();
  }
}
exports.FloroRanchDebugInfoActionData = FloroRanchDebugInfoActionData;
//# sourceMappingURL=FloroRanchDebugInfoActionData.js.map