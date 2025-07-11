"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemExpostulation = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemExpostulation extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, t) {
    return t.Type === 1 && ControllerHolder_1.ControllerHolder.AdviceController.OpenAdviceInfoView(t.EntityId);
  }
  GetViewName(e, t) {
    if (t.Type === 1) {
      return "AdviceInfoView";
    }
  }
}
exports.OpenSystemExpostulation = OpenSystemExpostulation;
//# sourceMappingURL=OpenSystemExpostulation.js.map