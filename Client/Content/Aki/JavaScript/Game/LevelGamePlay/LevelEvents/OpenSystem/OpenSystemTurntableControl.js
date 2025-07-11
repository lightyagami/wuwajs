"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemTurntableControl = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemTurntableControl extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    return r.Type === 1 && ControllerHolder_1.ControllerHolder.TurntableControlController.OpenTurntableControlView(r.EntityId);
  }
  GetViewName(e, r) {
    return "TurntableControlView";
  }
}
exports.OpenSystemTurntableControl = OpenSystemTurntableControl;
//# sourceMappingURL=OpenSystemTurntableControl.js.map