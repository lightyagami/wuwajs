"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemInstanceFailure = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemInstanceFailure extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    return ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.OpenInstanceDungeonFailView();
  }
  GetViewName(e, r) {
    return "InstanceDungeonFailView";
  }
}
exports.OpenSystemInstanceFailure = OpenSystemInstanceFailure;
//# sourceMappingURL=OpenSystemInstanceFailure.js.map