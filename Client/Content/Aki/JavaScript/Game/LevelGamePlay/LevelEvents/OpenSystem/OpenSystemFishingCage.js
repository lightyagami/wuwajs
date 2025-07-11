"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemFishingCage = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemFishingCage extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    if (e) {
      e = e.BoardId;
      await ControllerHolder_1.ControllerHolder.FishingController.OpenDockyardCageView(e);
    }
    return true;
  }
  GetViewName(e, r) {
    return "DockyardCageView";
  }
}
exports.OpenSystemFishingCage = OpenSystemFishingCage;
//# sourceMappingURL=OpenSystemFishingCage.js.map