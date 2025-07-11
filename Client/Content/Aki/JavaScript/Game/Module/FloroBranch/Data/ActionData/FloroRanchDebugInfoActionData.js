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
    this.a9c = undefined;
    this.a9c = o.Ejc;
  }
  async OnExecute() {
    FloroRanchDebugLogUtil_1.FloroRanchDebugLogUtil.LogTagActionInfo(this.CasterEntity, this.a9c);
    return Promise.resolve();
  }
}
exports.FloroRanchDebugInfoActionData = FloroRanchDebugInfoActionData;
//# sourceMappingURL=FloroRanchDebugInfoActionData.js.map