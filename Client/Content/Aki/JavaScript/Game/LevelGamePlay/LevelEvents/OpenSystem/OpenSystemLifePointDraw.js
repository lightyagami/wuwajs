"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemLifePointDraw = undefined;
const ActivityControllerHolder_1 = require("../../../Module/Activity/ActivityControllerHolder");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemLifePointDraw extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, t) {
    return ActivityControllerHolder_1.ActivityControllerHolder.LifePointDrawActivityController.OpenLifePointDrawActivityView();
  }
  GetViewName(e, t) {
    return "LifePointDrawEntranceView";
  }
}
exports.OpenSystemLifePointDraw = OpenSystemLifePointDraw;
//# sourceMappingURL=OpenSystemLifePointDraw.js.map