"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemTrapDefenseMapChange = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemTrapDefenseMapChange extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    return ControllerHolder_1.ControllerHolder.TrapDefenseController.OpenTrapDefenseTerrainChangeTips();
  }
  GetViewName(e) {
    return "TrapDefenseEventTerrainChangeTips";
  }
}
exports.OpenSystemTrapDefenseMapChange = OpenSystemTrapDefenseMapChange;
//# sourceMappingURL=OpenSystemTrapDefenseMapChange.js.map