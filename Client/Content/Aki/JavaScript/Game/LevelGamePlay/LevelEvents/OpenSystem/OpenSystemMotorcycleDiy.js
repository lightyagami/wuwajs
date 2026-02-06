"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemMotorcycleDiy = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemMotorcycleDiy extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    return await ControllerHolder_1.ControllerHolder.MotorcycleDiyController.OpenRootView();
  }
  GetViewName(e) {
    return "MotorcycleDiyRootView";
  }
}
exports.OpenSystemMotorcycleDiy = OpenSystemMotorcycleDiy;
//# sourceMappingURL=OpenSystemMotorcycleDiy.js.map