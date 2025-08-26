"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemActivityFunPlay = undefined;
const ActivityControllerHolder_1 = require("../../../Module/Activity/ActivityControllerHolder");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemActivityFunPlay extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, t) {
    return ActivityControllerHolder_1.ActivityControllerHolder.ActivityFunPlayController.OpenActivityFunPlayView();
  }
  GetViewName(e, t) {
    return "ActivityFunPlayView";
  }
}
exports.OpenSystemActivityFunPlay = OpenSystemActivityFunPlay;
//# sourceMappingURL=OpenSystemActivityFunPlay.js.map