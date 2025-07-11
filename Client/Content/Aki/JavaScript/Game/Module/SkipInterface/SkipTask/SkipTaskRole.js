"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipTaskRole = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const SkipTask_1 = require("./SkipTask");
const DEFAULT_PARAM = "0";
class SkipTaskRole extends SkipTask_1.SkipTask {
  OnRun(e) {
    let o = undefined;
    if (e !== DEFAULT_PARAM) {
      o = e;
    }
    ControllerHolder_1.ControllerHolder.RoleController.OpenRoleMainView(0, 0, [], o);
    this.Finish();
  }
}
exports.SkipTaskRole = SkipTaskRole;
//# sourceMappingURL=SkipTaskRole.js.map