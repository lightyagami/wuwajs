"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipTaskHelp = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const SkipTask_1 = require("./SkipTask");
class SkipTaskHelp extends SkipTask_1.SkipTask {
  OnRun(e) {
    e = typeof e == "string" ? Number(e) : e;
    ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(e);
    this.Finish();
  }
}
exports.SkipTaskHelp = SkipTaskHelp;
//# sourceMappingURL=SkipTaskHelp.js.map