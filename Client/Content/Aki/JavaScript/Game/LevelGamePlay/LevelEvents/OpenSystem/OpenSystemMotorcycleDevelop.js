"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemMotorcycleDevelop = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemMotorcycleDevelop extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, o) {
    return await ControllerHolder_1.ControllerHolder.MotorcycleDevelopController.OpenRootView();
  }
  GetViewName(e) {
    return "MotorcycleRootView";
  }
}
exports.OpenSystemMotorcycleDevelop = OpenSystemMotorcycleDevelop;
//# sourceMappingURL=OpenSystemMotorcycleDevelop.js.map